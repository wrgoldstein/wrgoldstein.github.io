---
layout: post
title: Building a Potrace-style Bitmap Tracer
summary: Implementing bitmap-to-SVG tracing in JavaScript — edge maps, closed-polygon RDP, and Bézier fitting
date: 2026-03-29
---

A bitmap tracer converts a raster image (pixels) into a smooth vector graphic (SVG paths). The classic tool for this is [Potrace](https://potrace.sourceforge.net/), and this post walks through re-implementing its core algorithm in JavaScript.

## The pipeline

The tracer runs in five stages, each implemented as a generator so you can pause and inspect the intermediate state at any step:

1. **Threshold** — convert RGBA pixels to a 1-bit bitmap
2. **Trace** — extract closed contours as sequences of corner points
3. **Simplify** — reduce contours to lightweight polygons via Ramer-Douglas-Peucker
4. **Bézier fit** — replace polygon edges with cubic Bézier curves
5. **SVG** — serialize to an SVG `<path>` element

## Tracing on a half-integer grid

The key insight is to trace *edges between pixels* rather than pixels themselves. Each foreground pixel occupies a unit square on a half-integer grid; the boundary between a foreground and background pixel is a directed unit edge. We build a map of all such edges and stitch them into closed polygons in one pass.

This gives exact, closed outlines with no ambiguity about winding order — holes are detected automatically via the shoelace signed-area formula.

## Closed-polygon RDP

Standard Ramer-Douglas-Peucker locks its endpoints, so applying it to a closed polygon always leaves an artifact at the seam. The fix: find the two maximally-distant points in the polygon, split there, and run open RDP on each half independently.

## Least-squares Bézier fitting

Between detected corners, we fit a cubic Bézier using the Schneider (1990) least-squares method: parameterize the arc by chord length, then solve a 2×2 linear system for the two control-point offsets α₁ and α₂. If the fit error exceeds a threshold, split at the worst point and recurse.

## Try it

The interactive debugger below lets you upload any image, tune the parameters, and scrub through every step of the pipeline:

<a href="/potrace" class="inline-block mt-2 underline">Open the step-through debugger →</a>
