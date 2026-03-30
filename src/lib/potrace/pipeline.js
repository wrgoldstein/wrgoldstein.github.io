/**
 * Pipeline Orchestrator
 *
 * Chains all five stages into a single generator that yields every
 * intermediate PipelineState from every sub-generator.
 *
 * Callers can either:
 *   A) Consume the full generator to get the final state:
 *        const gen = runPipeline(imageData, opts);
 *        let result;
 *        for (const state of gen) result = state;
 *
 *   B) Step through manually for animation / debugging:
 *        const gen = runPipeline(imageData, opts);
 *        const { value, done } = gen.next();
 *        // value is a PipelineState snapshot; inspect value._stage / value._done
 *
 *   C) Collect all snapshots for a scrubber UI:
 *        const steps = [...runPipeline(imageData, opts)];
 *
 * @param {ImageData} imageData
 * @param {PipelineOptions} [opts]
 * @returns {Generator<import('./types').PipelineState>}
 */

import { thresholdStage } from './threshold.js';
import { traceStage }     from './trace.js';
import { simplifyStage }  from './simplify.js';
import { bezierStage }    from './bezier.js';
import { svgStage }       from './svg.js';

/**
 * @typedef {Object} PipelineOptions
 * @property {number} [threshold=128]
 * @property {'luminance'|'average'|'red'} [channel='luminance']
 * @property {number} [epsilon=1.0]          - RDP simplification tolerance
 * @property {number} [cornerThreshold=1.0]  - Bézier corner detection
 * @property {number} [curveOptimizeIterations=5]
 *
 * @property {boolean} [runThreshold=true]
 * @property {boolean} [runTrace=true]
 * @property {boolean} [runSimplify=true]
 * @property {boolean} [runBezier=true]
 * @property {boolean} [runSvg=true]
 */

export function* runPipeline(imageData, opts = {}) {
  const {
    threshold   = 128,
    channel     = 'luminance',
    epsilon     = 1.0,
    cornerThreshold = 1.0,
    maxError        = 1.0,
    maxDepth        = 4,

    runThreshold = true,
    runTrace     = true,
    runSimplify  = true,
    runBezier    = true,
    runSvg       = true,
  } = opts;

  let state = {};

  // ------------------------------------------------------------------
  // Stage 1: Threshold
  // ------------------------------------------------------------------
  if (runThreshold) {
    let last;
    for (const s of thresholdStage(imageData, { threshold, channel })) {
      last = s;
      yield s;
    }
    state = { ...state, bitmap: last.bitmap };
  }

  if (!state.bitmap) {
    throw new Error('Pipeline: bitmap is required but thresholding was skipped.');
  }

  // ------------------------------------------------------------------
  // Stage 2: Trace
  // ------------------------------------------------------------------
  if (runTrace) {
    let last;
    for (const s of traceStage(state.bitmap)) {
      last = { ...state, ...s };
      yield last;
    }
    state = { ...state, contours: last.contours };
  }

  if (!state.contours) {
    throw new Error('Pipeline: contours are required but tracing was skipped.');
  }

  // ------------------------------------------------------------------
  // Stage 3: Simplify
  // ------------------------------------------------------------------
  if (runSimplify) {
    let last;
    for (const s of simplifyStage(state.bitmap, state.contours, { epsilon })) {
      last = { ...state, ...s };
      yield last;
    }
    state = { ...state, polygons: last.polygons };
  }

  if (!state.polygons) {
    throw new Error('Pipeline: polygons are required but simplification was skipped.');
  }

  // ------------------------------------------------------------------
  // Stage 4: Bézier fitting
  // ------------------------------------------------------------------
  if (runBezier) {
    let last;
    for (const s of bezierStage(state.bitmap, state.contours, state.polygons, {
      cornerThreshold,
      maxError,
      maxDepth,
    })) {
      last = { ...state, ...s };
      yield last;
    }
    state = { ...state, paths: last.paths };
  }

  if (!state.paths) {
    throw new Error('Pipeline: paths are required but Bézier fitting was skipped.');
  }

  // ------------------------------------------------------------------
  // Stage 5: SVG
  // ------------------------------------------------------------------
  if (runSvg) {
    for (const s of svgStage(state.bitmap, state.contours, state.polygons, state.paths)) {
      const final = { ...state, ...s };
      yield final;
      state = final;
    }
  }

  return state;
}

/**
 * Convenience: run the full pipeline eagerly and return just the final state.
 *
 * @param {ImageData} imageData
 * @param {PipelineOptions} [opts]
 * @returns {import('./types').PipelineState & { svg?: string }}
 */
export function runPipelineSync(imageData, opts = {}) {
  let last;
  for (const state of runPipeline(imageData, opts)) {
    last = state;
  }
  return last;
}
