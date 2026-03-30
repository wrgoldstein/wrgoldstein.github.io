/**
 * Stage 4 — Cubic Bézier Fitting
 *
 * Converts simplified polygons into smooth paths composed of straight-line
 * segments and cubic Bézier curves.
 *
 * Pipeline per polygon:
 *   1. Detect "corner" vertices — points where the turning angle is sharp
 *      (cos of angle < cornerThreshold).
 *   2. Split the polygon at corners into arcs.
 *   3. For each arc, fit a single cubic Bézier using the Schneider (1990)
 *      least-squares tangent method.
 *   4. If the fit error exceeds `maxError`, split the arc at its worst point
 *      and recurse (up to `maxDepth` times).
 *
 * References:
 *   Schneider, P.J. (1990). "An Algorithm for Automatically Fitting Digitized
 *   Curves." Graphics Gems, pp. 612–626.
 *
 *   Selinger, P. (2003). "Potrace: a polygon-based tracing algorithm."
 *   https://potrace.sourceforge.net/potrace.pdf
 *
 * @param {import('./types').Bitmap}    bitmap
 * @param {import('./types').Contour[]} contours
 * @param {import('./types').Polygon[]} polygons
 * @param {Object} [opts]
 * @param {number} [opts.cornerThreshold=0.5]
 *   cos(angle) below which a vertex is a corner. 0.5 ≈ 60°, 0 = 90°, -1 = 180°.
 * @param {number} [opts.maxError=1.0]
 *   Max allowed RMS pixel distance between the fitted curve and the polygon arc.
 * @param {number} [opts.maxDepth=4]
 *   Max recursion depth when splitting a poorly-fitting arc.
 * @returns {Generator<import('./types').PipelineState>}
 */
export function* bezierStage(bitmap, contours, polygons, opts = {}) {
  const {
    cornerThreshold = 0.5,
    maxError        = 1.0,
    maxDepth        = 4,
  } = opts;

  const paths = [];

  for (const polygon of polygons) {
    const segments = fitPolygon(polygon.points, { cornerThreshold, maxError, maxDepth });
    const path = { segments, isHole: polygon.isHole };
    paths.push(path);

    yield { bitmap, contours, polygons, paths: [...paths], _stage: 'bezier', _done: false };
  }

  yield { bitmap, contours, polygons, paths, _stage: 'bezier', _done: true };
}

// ---------------------------------------------------------------------------
// Top-level polygon fitter
// ---------------------------------------------------------------------------

/**
 * @param {import('./types').Point[]} pts
 * @param {{ cornerThreshold: number, maxError: number, maxDepth: number }} opts
 * @returns {import('./types').Segment[]}
 */
function fitPolygon(pts, opts) {
  if (pts.length < 2) return [];

  const corners = detectCorners(pts, opts.cornerThreshold);

  const segments = [];

  // No corners — treat the whole polygon as one smooth closed arc.
  if (corners.length === 0) {
    // Close the arc by appending the start point so the curve meets itself
    const arc = [...pts, pts[0]];
    const t1  = tangentAt(pts, 0,              +1);
    const t2  = tangentAt(pts, pts.length - 1, -1);
    fitCurveRecursive(arc, t1, t2, opts.maxError, opts.maxDepth, segments);
    return segments;
  }

  for (let ci = 0; ci < corners.length; ci++) {
    const from = corners[ci];
    const to   = corners[(ci + 1) % corners.length];

    // Extract the arc of polygon points from `from` to `to` (inclusive, wrapping)
    const arc = extractArc(pts, from, to);

    if (arc.length < 2) continue;

    // Straight line for very short arcs (2 points)
    if (arc.length === 2) {
      segments.push({ type: 'line', p0: arc[0], p3: arc[1] });
      continue;
    }

    // Estimate endpoint tangents from the arc itself
    const t1 = tangentAt(arc, 0,              +1);
    const t2 = tangentAt(arc, arc.length - 1, -1);

    fitCurveRecursive(arc, t1, t2, opts.maxError, opts.maxDepth, segments);
  }

  return segments;
}

// ---------------------------------------------------------------------------
// Corner detection
// ---------------------------------------------------------------------------

/**
 * Return indices of "corner" vertices in a closed polygon.
 * A corner is a vertex where the incoming and outgoing edge vectors have a
 * dot product below `threshold` (i.e. the turn is sharp).
 *
 * @param {import('./types').Point[]} pts
 * @param {number} threshold  cos(angle) below which = corner
 * @returns {number[]}
 */
export function detectCorners(pts, threshold) {
  const n = pts.length;
  const corners = [];
  for (let i = 0; i < n; i++) {
    if (turningAngleCos(pts, i) < threshold) {
      corners.push(i);
    }
  }
  return corners;
}

// ---------------------------------------------------------------------------
// Recursive cubic Bézier fitting (Schneider 1990)
// ---------------------------------------------------------------------------

/**
 * Fit a cubic Bézier to `pts` with given endpoint tangents.
 * If the fit is poor, split and recurse.
 *
 * @param {import('./types').Point[]} pts
 * @param {{ x:number, y:number }} t1  unit tangent leaving  pts[0]
 * @param {{ x:number, y:number }} t2  unit tangent entering pts[n-1] (pointing inward, toward pts[0])
 * @param {number} maxError
 * @param {number} depth
 * @param {import('./types').Segment[]} out
 */
function fitCurveRecursive(pts, t1, t2, maxError, depth, out) {
  const p0 = pts[0];
  const p3 = pts[pts.length - 1];

  const u       = chordLengthParam(pts);
  const { c1, c2 } = fitCubicLeastSquares(pts, u, t1, t2);

  // Measure the worst-case distance between fitted curve and data points
  let maxDist = 0;
  let splitIdx = 1;
  for (let i = 1; i < pts.length - 1; i++) {
    const q  = evalCubic(p0, c1, c2, p3, u[i]);
    const dx = pts[i].x - q.x;
    const dy = pts[i].y - q.y;
    const d  = dx * dx + dy * dy;
    if (d > maxDist) { maxDist = d; splitIdx = i; }
  }

  if (Math.sqrt(maxDist) <= maxError) {
    out.push({ type: 'curve', p0, c1, c2, p3 });
    return;
  }

  // Recursion limit reached — emit a straight line rather than a bad curve
  if (depth === 0) {
    out.push({ type: 'line', p0, p3 });
    return;
  }

  // Split at the worst point and recurse
  const mid = pts[splitIdx];
  const tMid = tangentAt(pts, splitIdx, 0); // bidirectional tangent at split

  fitCurveRecursive(pts.slice(0, splitIdx + 1), t1, tMid,  maxError, depth - 1, out);
  fitCurveRecursive(pts.slice(splitIdx),         tMid, t2, maxError, depth - 1, out);
}

// ---------------------------------------------------------------------------
// Least-squares cubic Bézier fitting (Schneider 1990, §12.7)
// ---------------------------------------------------------------------------

/**
 * Given points, chord-length params, and endpoint tangents, solve the
 * 2×2 linear system that minimises sum-of-squared distances.
 *
 * The cubic Bézier is:
 *   B(t) = (1-t)³ p0 + 3(1-t)²t c1 + 3(1-t)t² c2 + t³ p3
 *
 * We write c1 = p0 + α1·t1  and  c2 = p3 + α2·t2
 * and solve for scalars α1, α2 via the 2×2 system:
 *   [A11 A12] [α1]   [b1]
 *   [A21 A22] [α2] = [b2]
 *
 * @param {import('./types').Point[]} pts
 * @param {number[]} u
 * @param {{ x:number, y:number }} t1
 * @param {{ x:number, y:number }} t2
 * @returns {{ c1: import('./types').Point, c2: import('./types').Point }}
 */
export function fitCubicLeastSquares(pts, u, t1, t2) {
  const p0 = pts[0];
  const p3 = pts[pts.length - 1];
  const n  = pts.length;

  // We solve:  [A11 A12] [α1]   [rhs1]
  //            [A12 A22] [α2] = [rhs2]
  //
  // where A and rhs are built by summing over all data points.
  // Both x and y coordinates contribute independently to the same scalar system.

  let A11 = 0, A12 = 0, A22 = 0;
  let rhs1 = 0, rhs2 = 0;

  for (let i = 0; i < n; i++) {
    const t  = u[i];
    const mt = 1 - t;

    // Bernstein basis weights for the two free control points
    const b1w = 3 * mt * mt * t;   // B_{1,3}(t) — weight of c1 term
    const b2w = 3 * mt * t  * t;   // B_{2,3}(t) — weight of c2 term

    // Column vectors of the design matrix (2D, x and y components)
    const a1x = t1.x * b1w,  a1y = t1.y * b1w;
    const a2x = t2.x * b2w,  a2y = t2.y * b2w;

    // A^T A  (symmetric, so only 3 unique entries)
    A11  += a1x * a1x + a1y * a1y;
    A12  += a1x * a2x + a1y * a2y;
    A22  += a2x * a2x + a2y * a2y;

    // Residual: data point minus the "fixed" endpoint Bernstein terms
    //   fixed(t) = (1-t)³·p0 + t³·p3
    const mt3 = mt * mt * mt;
    const t3  = t  * t  * t;
    const rx  = pts[i].x - (mt3 * p0.x + t3 * p3.x);
    const ry  = pts[i].y - (mt3 * p0.y + t3 * p3.y);

    // A^T · residual  (dot product in 2D)
    rhs1 += a1x * rx + a1y * ry;
    rhs2 += a2x * rx + a2y * ry;
  }

  const det = A11 * A22 - A12 * A12;

  // Chord length — used as fallback and as a sanity upper bound
  const chord = Math.sqrt((p3.x - p0.x) ** 2 + (p3.y - p0.y) ** 2);

  let alpha1, alpha2;
  if (Math.abs(det) < 1e-6) {
    // Degenerate system (e.g. all points collinear or identical tangents)
    // Place control points at 1/3 and 2/3 of the chord length
    alpha1 = chord / 3;
    alpha2 = chord / 3;
  } else {
    alpha1 = (A22 * rhs1 - A12 * rhs2) / det;
    alpha2 = (A11 * rhs2 - A12 * rhs1) / det;
  }

  // Clamp: negative alpha flips the control point past the endpoint (spike).
  // Also clamp to a reasonable multiple of chord length to prevent blow-up
  // when the least-squares system is near-degenerate.
  const maxAlpha = chord * 4;
  alpha1 = Math.max(0, Math.min(alpha1, maxAlpha));
  alpha2 = Math.max(0, Math.min(alpha2, maxAlpha));

  return {
    c1: { x: p0.x + alpha1 * t1.x, y: p0.y + alpha1 * t1.y },
    c2: { x: p3.x + alpha2 * t2.x, y: p3.y + alpha2 * t2.y },
  };
}

// ---------------------------------------------------------------------------
// Bézier math utilities
// ---------------------------------------------------------------------------

/**
 * Evaluate a cubic Bézier at parameter t ∈ [0,1].
 *
 * @param {import('./types').Point} p0
 * @param {import('./types').Point} c1
 * @param {import('./types').Point} c2
 * @param {import('./types').Point} p3
 * @param {number} t
 * @returns {import('./types').Point}
 */
export function evalCubic(p0, c1, c2, p3, t) {
  const mt = 1 - t;
  const mt2 = mt * mt;
  const mt3 = mt2 * mt;
  const t2  = t  * t;
  const t3  = t2 * t;
  return {
    x: mt3 * p0.x + 3 * mt2 * t * c1.x + 3 * mt * t2 * c2.x + t3 * p3.x,
    y: mt3 * p0.y + 3 * mt2 * t * c1.y + 3 * mt * t2 * c2.y + t3 * p3.y,
  };
}

/**
 * Chord-length parameterization: returns t ∈ [0,1] for each point.
 *
 * @param {import('./types').Point[]} pts
 * @returns {number[]}
 */
export function chordLengthParam(pts) {
  const n = pts.length;
  const u = new Array(n).fill(0);
  let total = 0;
  for (let i = 1; i < n; i++) {
    const dx = pts[i].x - pts[i-1].x;
    const dy = pts[i].y - pts[i-1].y;
    total += Math.sqrt(dx * dx + dy * dy);
    u[i] = total;
  }
  if (total > 0) for (let i = 1; i < n; i++) u[i] /= total;
  return u;
}

/**
 * Unit tangent at index `i` in direction `dir` (+1 forward, -1 backward, 0 bidirectional).
 * Uses a small window of neighbours for stability.
 *
 * @param {import('./types').Point[]} pts
 * @param {number} i
 * @param {number} dir
 * @returns {{ x: number, y: number }}
 */
export function tangentAt(pts, i, dir) {
  const n = pts.length;
  let dx = 0, dy = 0;

  if (dir >= 0 && i < n - 1) {
    // Forward difference — use up to 2 points ahead for smoothness
    const j = Math.min(i + 2, n - 1);
    dx += pts[j].x - pts[i].x;
    dy += pts[j].y - pts[i].y;
  }
  if (dir <= 0 && i > 0) {
    // Backward difference
    const j = Math.max(i - 2, 0);
    dx += pts[i].x - pts[j].x;
    dy += pts[i].y - pts[j].y;
  }

  const len = Math.sqrt(dx * dx + dy * dy);
  if (len < 1e-10) return { x: 1, y: 0 }; // degenerate fallback
  return { x: dx / len, y: dy / len };
}

/**
 * cos of the turning angle at index `i` of a closed polygon.
 *
 * @param {import('./types').Point[]} pts
 * @param {number} i
 * @returns {number}
 */
export function turningAngleCos(pts, i) {
  const n    = pts.length;
  const prev = pts[(i - 1 + n) % n];
  const curr = pts[i];
  const next = pts[(i + 1) % n];

  const ax = curr.x - prev.x, ay = curr.y - prev.y;
  const bx = next.x - curr.x, by = next.y - curr.y;

  const lenA = Math.sqrt(ax * ax + ay * ay);
  const lenB = Math.sqrt(bx * bx + by * by);
  if (lenA < 1e-10 || lenB < 1e-10) return 1;

  return (ax * bx + ay * by) / (lenA * lenB);
}

// ---------------------------------------------------------------------------
// Arc extraction helper
// ---------------------------------------------------------------------------

/**
 * Extract a sub-arc from a closed polygon, from index `from` to `to` (inclusive),
 * wrapping around if necessary.
 *
 * @param {import('./types').Point[]} pts
 * @param {number} from
 * @param {number} to
 * @returns {import('./types').Point[]}
 */
function extractArc(pts, from, to) {
  const n = pts.length;
  const arc = [];
  let i = from;
  // Always take at least one step before checking termination,
  // so that from===to correctly wraps the whole polygon.
  do {
    arc.push(pts[i]);
    if (arc.length > n + 1) break; // safety against degenerate input
    i = (i + 1) % n;
  } while (i !== to);
  arc.push(pts[to]); // include the endpoint
  return arc;
}
