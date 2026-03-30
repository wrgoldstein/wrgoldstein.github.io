/**
 * Shared types / plain data structures used throughout the pipeline.
 * Everything is plain JS objects — no classes — so they serialize easily
 * for the step-through debugger.
 */

/**
 * A 1-bit bitmap derived from an ImageData source.
 * @typedef {Object} Bitmap
 * @property {number}   width
 * @property {number}   height
 * @property {Uint8Array} data  - 1 byte per pixel, 0 = background, 1 = foreground
 */

/**
 * A raw contour: an ordered list of {x,y} pixel-boundary points produced
 * by the border-tracing stage, before any simplification.
 * @typedef {Object} Contour
 * @property {Point[]} points
 * @property {boolean} isHole  - true if the contour is a hole (inner boundary)
 */

/**
 * A 2-D point.
 * @typedef {{ x: number, y: number }} Point
 */

/**
 * A simplified polygon: a subset of contour points after Ramer-Douglas-Peucker.
 * @typedef {Object} Polygon
 * @property {Point[]} points
 * @property {boolean} isHole
 */

/**
 * A path segment — either a straight line or a cubic Bézier curve.
 * @typedef {Object} Segment
 * @property {'line' | 'curve'} type
 * @property {Point}  p0   - start point (same as previous segment's end)
 * @property {Point}  p3   - end point
 * @property {Point}  [c1] - first control point  (curve only)
 * @property {Point}  [c2] - second control point (curve only)
 */

/**
 * A fitted path: the final output for one contour, ready to emit as SVG.
 * @typedef {Object} FittedPath
 * @property {Segment[]} segments
 * @property {boolean}   isHole
 */

/**
 * The top-level pipeline state threaded through every generator stage.
 * Each stage reads what it needs and appends its own output key.
 *
 * @typedef {Object} PipelineState
 * @property {Bitmap}       [bitmap]
 * @property {Contour[]}    [contours]
 * @property {Polygon[]}    [polygons]
 * @property {FittedPath[]} [paths]
 */
