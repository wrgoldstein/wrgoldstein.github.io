/**
 * Stage 2 — Contour Tracing
 *
 * Traces the boundaries between foreground and background pixels on a
 * half-integer grid (pixel corners), exactly as Potrace does.
 *
 * Key idea: instead of visiting pixels, we walk the *edges* between pixels.
 * Each edge on the grid is a unit segment connecting two half-integer corners.
 * A foreground pixel at (px, py) occupies the unit square whose corners are
 * (px, py), (px+1, py), (px+1, py+1), (px, py+1) in corner-space.
 *
 * We find every edge that separates a foreground pixel from a background pixel
 * and stitch those edges into closed polygons.  The result is a set of
 * axis-aligned polygons with integer-or-half-integer vertices — no diagonals,
 * no duplicates, guaranteed closed.
 *
 * Yields after completing each contour so the UI can draw them one by one.
 *
 * @param {import('./types').Bitmap} bitmap
 * @returns {Generator<import('./types').PipelineState>}
 */
export function* traceStage(bitmap) {
  const { width, height } = bitmap;

  // Build the full edge set: every edge between a fg and bg pixel.
  // Edges are stored as { x0, y0, x1, y1 } in corner-space coordinates
  // where corner (cx, cy) is at pixel position (cx - 0.5, cy - 0.5).
  // We index them by their start-corner so we can look up "what edge leaves
  // corner (cx,cy) ?" in O(1).

  // edge map: key = `${cx},${cy}` → { x0,y0, x1,y1 }
  // We only store the *canonical* directed edge (fg is always to the left of
  // the direction of travel, following the right-hand rule).
  const edgeMap = _buildEdgeMap(bitmap);

  const contours = [];

  // Consume edges from the map, stitching each connected chain into a polygon.
  for (const [startKey, startEdge] of edgeMap) {
    // May have been consumed by a previous contour
    if (!edgeMap.has(startKey)) continue;

    const points = [];
    let key = startKey;
    let edge = startEdge;

    // Walk the chain until we return to the start corner
    while (true) {
      edgeMap.delete(key);
      points.push({ x: edge.x0, y: edge.y0 });

      const nextKey = `${edge.x1},${edge.y1}`;
      if (nextKey === startKey) break; // closed the loop

      edge = edgeMap.get(nextKey);
      if (!edge) break; // shouldn't happen in a well-formed bitmap, but guard anyway
      key = nextKey;
    }

    if (points.length < 3) continue; // degenerate — skip

    // Determine winding: positive area = outer contour (CCW in screen coords
    // where y increases downward), negative = hole.
    const area = _signedArea(points);
    const isHole = area < 0;

    const contour = { points, isHole };
    contours.push(contour);

    yield { bitmap, contours: [...contours], _stage: 'trace', _done: false };
  }

  yield { bitmap, contours, _stage: 'trace', _done: true };
}

// ---------------------------------------------------------------------------
// Edge map construction
// ---------------------------------------------------------------------------

/**
 * Build a map from corner-key → directed edge for every fg/bg boundary.
 *
 * Convention (right-hand rule, fg on left):
 *   Horizontal edge between row y-1 (above) and row y (below):
 *     if [y-1] is fg and [y] is bg → edge goes LEFT  (x1 → x0, i.e. east→west)
 *     if [y-1] is bg and [y] is fg → edge goes RIGHT (x0 → x1, i.e. west→east)
 *   Vertical edge between col x-1 (left) and col x (right):
 *     if [x-1] is fg and [x] is bg → edge goes DOWN  (y0 → y1)
 *     if [x-1] is bg and [x] is fg → edge goes UP    (y1 → y0)
 *
 * In corner-space: pixel (px, py) occupies square [px, px+1] × [py, py+1].
 *
 * @param {import('./types').Bitmap} bitmap
 * @returns {Map<string, {x0:number,y0:number,x1:number,y1:number}>}
 */
function _buildEdgeMap(bitmap) {
  const { width, height, data } = bitmap;
  const map = new Map();

  function px(x, y) {
    if (x < 0 || y < 0 || x >= width || y >= height) return 0;
    return data[y * width + x];
  }

  function addEdge(x0, y0, x1, y1) {
    map.set(`${x0},${y0}`, { x0, y0, x1, y1 });
  }

  // Horizontal edges: between pixel row (y-1) and row (y)
  // Corner row cy runs from 0..height; pixel row py = cy (below) and py-1 (above)
  for (let cy = 0; cy <= height; cy++) {
    for (let cx = 0; cx < width; cx++) {
      const above = px(cx, cy - 1); // pixel above the edge
      const below = px(cx, cy);     // pixel below the edge

      if (above === below) continue; // same → no boundary

      if (above === 1 && below === 0) {
        // fg above, bg below → travel west along the top face of the fg pixel
        // corners: (cx+1, cy) → (cx, cy)
        addEdge(cx + 1, cy, cx, cy);
      } else {
        // bg above, fg below → travel east
        // corners: (cx, cy) → (cx+1, cy)
        addEdge(cx, cy, cx + 1, cy);
      }
    }
  }

  // Vertical edges: between pixel col (x-1) and col (x)
  for (let cy = 0; cy < height; cy++) {
    for (let cx = 0; cx <= width; cx++) {
      const left  = px(cx - 1, cy);
      const right = px(cx,     cy);

      if (left === right) continue;

      if (left === 1 && right === 0) {
        // fg left, bg right → travel south (down)
        // corners: (cx, cy) → (cx, cy+1)
        addEdge(cx, cy, cx, cy + 1);
      } else {
        // bg left, fg right → travel north (up)
        // corners: (cx, cy+1) → (cx, cy)
        addEdge(cx, cy + 1, cx, cy);
      }
    }
  }

  return map;
}

// ---------------------------------------------------------------------------
// Winding / area helpers
// ---------------------------------------------------------------------------

/**
 * Signed area of a polygon (shoelace formula).
 * Positive = CCW winding in standard math coords (y-up).
 * In screen coords (y-down), positive area = CW = outer contour.
 *
 * @param {import('./types').Point[]} pts
 * @returns {number}
 */
function _signedArea(pts) {
  let area = 0;
  const n = pts.length;
  for (let i = 0; i < n; i++) {
    const j = (i + 1) % n;
    area += pts[i].x * pts[j].y;
    area -= pts[j].x * pts[i].y;
  }
  return area / 2;
}
