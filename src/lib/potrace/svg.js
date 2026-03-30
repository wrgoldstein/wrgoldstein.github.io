/**
 * Stage 5 — SVG Serialization
 *
 * Converts FittedPath[] into an SVG path `d` string (or a full <svg> string).
 *
 * This stage is synchronous — it doesn't yield intermediate states because
 * serialization is O(segments) and fast. The generator wrapper is kept for
 * pipeline consistency.
 *
 * @param {import('./types').Bitmap}      bitmap
 * @param {import('./types').Contour[]}   contours
 * @param {import('./types').Polygon[]}   polygons
 * @param {import('./types').FittedPath[]} paths
 * @returns {Generator<import('./types').PipelineState & { svg: string }>}
 */
export function* svgStage(bitmap, contours, polygons, paths) {
  const d = pathsToD(paths);
  const svg = wrapSvg(d, bitmap.width, bitmap.height);

  yield { bitmap, contours, polygons, paths, svg, d, _stage: 'svg', _done: true };
}

// ---------------------------------------------------------------------------
// Path → SVG `d` attribute
// ---------------------------------------------------------------------------

/**
 * Convert an array of FittedPaths to a single SVG `d` string.
 * Uses the even-odd fill rule, so holes are handled automatically by
 * nesting outer and inner contours in the same path.
 *
 * @param {import('./types').FittedPath[]} paths
 * @returns {string}
 */
export function pathsToD(paths) {
  return paths.map(pathToD).join(' ');
}

/**
 * Convert one FittedPath to a `d` string fragment.
 *
 * @param {import('./types').FittedPath} path
 * @returns {string}
 */
export function pathToD(path) {
  const { segments } = path;
  if (segments.length === 0) return '';

  const parts = [];

  // Move to start of first segment
  const { p0 } = segments[0];
  parts.push(`M ${fmt(p0.x)} ${fmt(p0.y)}`);

  for (const seg of segments) {
    if (seg.type === 'line') {
      parts.push(`L ${fmt(seg.p3.x)} ${fmt(seg.p3.y)}`);
    } else if (seg.type === 'curve') {
      parts.push(
        `C ${fmt(seg.c1.x)} ${fmt(seg.c1.y)} ` +
        `${fmt(seg.c2.x)} ${fmt(seg.c2.y)} ` +
        `${fmt(seg.p3.x)} ${fmt(seg.p3.y)}`
      );
    }
  }

  parts.push('Z');
  return parts.join(' ');
}

/**
 * Wrap a `d` string in a minimal <svg> element.
 *
 * @param {string} d
 * @param {number} width
 * @param {number} height
 * @param {Object} [opts]
 * @param {string} [opts.fill='black']
 * @param {string} [opts.background='none']
 * @returns {string}
 */
export function wrapSvg(d, width, height, opts = {}) {
  const { fill = 'black', background = 'none' } = opts;
  return [
    `<svg xmlns="http://www.w3.org/2000/svg"`,
    `     viewBox="0 0 ${width} ${height}"`,
    `     width="${width}" height="${height}">`,
    background !== 'none'
      ? `  <rect width="100%" height="100%" fill="${background}"/>`
      : '',
    `  <path fill="${fill}" fill-rule="evenodd" d="${d}"/>`,
    `</svg>`,
  ].filter(Boolean).join('\n');
}

// ---------------------------------------------------------------------------
// Formatting helper
// ---------------------------------------------------------------------------

/**
 * Format a coordinate to at most 2 decimal places, stripping trailing zeros.
 * @param {number} n
 * @returns {string}
 */
function fmt(n) {
  return parseFloat(n.toFixed(2)).toString();
}
