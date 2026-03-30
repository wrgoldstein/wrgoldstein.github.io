/**
 * Stage 1 — Thresholding
 *
 * Converts an ImageData (RGBA) into a 1-bit Bitmap.
 * Yields one step per row so the UI can animate the sweep.
 *
 * @param {ImageData} imageData
 * @param {Object}    [opts]
 * @param {number}    [opts.threshold=128]  - 0–255; pixels darker than this become foreground
 * @param {'luminance'|'average'|'red'} [opts.channel='luminance']
 * @returns {Generator<import('./types').PipelineState>}
 */
export function* thresholdStage(imageData, opts = {}) {
  const { threshold = 128, channel = 'luminance' } = opts;
  const { width, height, data } = imageData;

  // Output bitmap — we'll fill it row by row
  const bitmap = {
    width,
    height,
    data: new Uint8Array(width * height),
  };

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      // alpha is data[i + 3] — fully transparent pixels treated as background
      const a = data[i + 3];

      let value;
      if (a < 128) {
        value = 0; // transparent → background
      } else {
        switch (channel) {
          case 'luminance': value = 0.299 * r + 0.587 * g + 0.114 * b; break;
          case 'average':   value = (r + g + b) / 3; break;
          case 'red':       value = r; break;
          default:          value = 0.299 * r + 0.587 * g + 0.114 * b;
        }
      }

      // Darker than threshold → foreground (1), otherwise background (0)
      bitmap.data[y * width + x] = value < threshold ? 1 : 0;
    }

    // Yield after every row so the caller can observe progress
    // State is partial — bitmap.data is being filled in-place
    yield { bitmap, _stage: 'threshold', _progress: y / (height - 1) };
  }

  // Final yield with completed bitmap
  yield { bitmap, _stage: 'threshold', _done: true };
}
