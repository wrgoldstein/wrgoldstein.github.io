/**
 * Stage 3 — Polygon Simplification
 *
 * Reduces the raw pixel-boundary contours to lightweight polygons using the
 * Ramer-Douglas-Peucker algorithm. This removes collinear / near-collinear
 * points so the subsequent Bézier fitter works with meaningful corners only.
 *
 * Yields after processing each contour.
 *
 * @param {import('./types').Bitmap}    bitmap
 * @param {import('./types').Contour[]} contours
 * @param {Object} [opts]
 * @param {number} [opts.epsilon=1.0]  - max pixel distance from the simplified line
 * @returns {Generator<import('./types').PipelineState>}
 */
export function* simplifyStage(bitmap, contours, opts = {}) {
  const { epsilon = 1.0 } = opts;

  const polygons = [];

  for (const contour of contours) {
    const simplified = rdpClosed(contour.points, epsilon);
    const polygon = { points: simplified, isHole: contour.isHole };
    polygons.push(polygon);

    yield { bitmap, contours, polygons: [...polygons], _stage: 'simplify', _done: false };
  }

  yield { bitmap, contours, polygons, _stage: 'simplify', _done: true };
}

// ---------------------------------------------------------------------------
// Ramer-Douglas-Peucker
// ---------------------------------------------------------------------------

/**
 * RDP for a *closed* polygon.
 *
 * Standard RDP locks the first and last point, so the wrap-around edge is
 * never simplified.  We fix this by finding the globally most-distant point
 * from the "seam" chord and using it as the mandatory split, then running
 * standard RDP on both halves.
 *
 * @param {import('./types').Point[]} points
 * @param {number} epsilon
 * @returns {import('./types').Point[]}
 */
export function rdpClosed(points, epsilon) {
  const n = points.length;
  if (n <= 3) return [...points];

  // Find the pair of points (i, j) with maximum mutual distance — these are
  // the two "poles" of the polygon and make the best seam for closed RDP.
  // O(n²) but n is typically small (< a few hundred after pixel tracing).
  let maxDist = 0;
  let poleA = 0;
  let poleB = Math.floor(n / 2);

  for (let i = 0; i < n - 1; i++) {
    for (let j = i + 1; j < n; j++) {
      const dx = points[j].x - points[i].x;
      const dy = points[j].y - points[i].y;
      const d  = dx * dx + dy * dy;
      if (d > maxDist) { maxDist = d; poleA = i; poleB = j; }
    }
  }

  // Rotate so poleA is index 0 for cleaner open-RDP slicing
  const rotated = [...points.slice(poleA), ...points.slice(0, poleA)];
  const newB    = poleB - poleA; // poleB's index in rotated array

  const half1 = rdp(rotated.slice(0, newB + 1), epsilon);  // poleA → poleB
  const half2 = rdp(rotated.slice(newB),         epsilon);  // poleB → poleA (wraps)

  // Merge: half1 ends at poleB, half2 starts at poleB — drop duplicate.
  // half2 ends at poleA which is the same as rotated[0] — drop it too.
  return [...half1.slice(0, -1), ...half2.slice(0, -1)];
}

/**
 * Recursively simplify an *open* polyline (standard RDP).
 *
 * @param {import('./types').Point[]} points
 * @param {number} epsilon
 * @returns {import('./types').Point[]}
 */
export function rdp(points, epsilon) {
  if (points.length <= 2) return [...points];

  // Find the point with the maximum distance from the line start→end
  let maxDist = 0;
  let maxIdx = 0;

  const start = points[0];
  const end   = points[points.length - 1];

  for (let i = 1; i < points.length - 1; i++) {
    const d = perpendicularDistance(points[i], start, end);
    if (d > maxDist) {
      maxDist = d;
      maxIdx = i;
    }
  }

  if (maxDist > epsilon) {
    // Significant point — recurse on both halves
    const left  = rdp(points.slice(0, maxIdx + 1), epsilon);
    const right = rdp(points.slice(maxIdx), epsilon);
    // Merge, removing the duplicated junction point
    return [...left.slice(0, -1), ...right];
  } else {
    // All intermediate points are within epsilon — discard them
    return [start, end];
  }
}

/**
 * Perpendicular distance from point P to the infinite line through A and B.
 *
 * @param {import('./types').Point} p
 * @param {import('./types').Point} a
 * @param {import('./types').Point} b
 * @returns {number}
 */
export function perpendicularDistance(p, a, b) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.sqrt(dx * dx + dy * dy);

  if (len === 0) {
    // A and B are the same point — return distance to that point
    return Math.sqrt((p.x - a.x) ** 2 + (p.y - a.y) ** 2);
  }

  // Signed area of the triangle / base length
  return Math.abs(dy * p.x - dx * p.y + b.x * a.y - b.y * a.x) / len;
}
