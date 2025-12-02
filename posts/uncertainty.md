---
layout: post
title: Uncertainty
date: 2025-11-26
---

<script>
    function randomWalk(steps = 100, stepSize = 5) {
        let points = [{x: 0, y: 0}];
        for (let i = 0; i < steps; i++) {
            let last = points[points.length - 1];
            let dy = (Math.random() - 0.5) * stepSize;
            points.push({x: last.x + 6, y: last.y + dy});
        }
        return points;
    }

    function pointsToPath(points) {
        let minY = Math.min(...points.map(p => p.y));
        let maxY = Math.max(...points.map(p => p.y));
        let height = maxY - minY;
        let scale = 30 / Math.max(height, 1);

        let scaled = points.map(p => ({
            x: p.x,
            y: 20 + (p.y - minY - height/2) * scale
        }));

        let d = `M ${scaled[0].x} ${scaled[0].y}`;
        for (let i = 1; i < scaled.length; i++) {
            d += ` L ${scaled[i].x} ${scaled[i].y}`;
        }
        return d;
    }


    function jitteredSpiral(turns = 4, points = 150, jitter = 2.5) {
        let cx = 75, cy = 75;
        let maxRadius = 50;
        let path = [];
        let noiseX = 0, noiseY = 0;

        for (let i = 0; i < points; i++) {
            let t = i / points;
            let angle = t * turns * 2 * Math.PI;
            let radius = t * maxRadius;

            // random walk jitter
            noiseX += (Math.random() - 0.5) * jitter;
            noiseY += (Math.random() - 0.5) * jitter;

            let x = cx + Math.cos(angle) * radius + noiseX;
            let y = cy + Math.sin(angle) * radius + noiseY;
            path.push({x, y});
        }

        let d = `M ${path[0].x} ${path[0].y}`;
        for (let i = 1; i < path.length; i++) {
            d += ` L ${path[i].x} ${path[i].y}`;
        }
        return d;
    }

    $effect.root(() => {
        document.querySelectorAll('.random-walk-divider').forEach(svg => {
            let path = svg.querySelector('path');
            let points = randomWalk();
            path.setAttribute('d', pointsToPath(points));
        });

        document.querySelectorAll('.jittered-spiral').forEach(svg => {
            let path = svg.querySelector('path');
            path.setAttribute('d', jitteredSpiral());
        });
    })

    
</script>

<style>
    .random-walk-divider {
        display: block;
        margin: 2em 0;
        width: 100%;
        height: 40px;
    }
    .random-walk-divider path {
        fill: none;
        stroke: #888;
        stroke-width: 1.5;
        stroke-linecap: round;
        stroke-linejoin: round;
    }
    .jittered-spiral {
        display: block;
        margin: 2em auto;
        width: 150px;
        height: 150px;
    }
    .jittered-spiral path {
        fill: none;
        stroke: #888;
        stroke-width: 1.5;
        stroke-linecap: round;
        stroke-linejoin: round;
    }
</style>

{#snippet divider() }
<svg class="random-walk-divider" viewBox="0 0 600 40" preserveAspectRatio="none"><path d=""/></svg>
{/snippet}

The skeptical person's position on statistics is something like: "If you don't have statistical significance, you don't have evidence. You're just making decisions based on vibes. That's not rigorous."

But this isn't actually true. It's an artifact of a specific tradition in statistics, one that traces all the way back to Jacob Bernoulli in the 1600s.

Bernoulli was the one who first realized the Law of Large Numbers meant that, under some conditions you could be "morally certain" about something given a large enough sample of data. He set up the problem the way he did because he was interested in legal applications where you need to reach a binary verdict. He chose a hard, yes-or-no objective cutoff because of the hard yes-or-no requirements of a court of law.

But when we use applied statistics in the business world we're not tied to the same constraints. No one is wrongfully imprisoned if we're wrong.

{@render divider()}

Often, being wrong isn't that expensive, but being certain is. Consider the distinction between these questions: 

- "Is this true?"
- "Should I act as if this is true?"

In genuinely uncertain problem spaces, most experiments yield nothing. The base rate of "this doesn't work" is high. Under those conditions, the cost of rigorously evaluating a dud is pure waste—you get high confidence in a null result you could have reached with a shrug.

This suggests a two-stage approach: filter loosely, validate tightly. Use cheap, noisy signals to kill things fast. Save the rigorous evaluation for whatever survives initial contact. The goal in the early phase isn't to be right—it's to be wrong efficiently, to clear the dead ends quickly so you can find the thing worth taking seriously.

Being wrong 30% of the time is fine if you can run five experiments in the time it would take to be certain about one.

In my career, mostly at startups, I've often been in situations where collecting data is expensive and the payoffs are asymmetric. In those contexts, the goal isn't to avoid being wrong. It's to experiment fast, learn cheaply, and explore a highly uncertain problem space. 

"Enough data to make a good decision" is a completely different framing from Bernoulli's courtroom setting. It's about expected value under uncertainty, not about certainty itself. An essential insight of all professional gamblers is that you can rationally act on a 55% belief if the payoff structure is right.

Even if you switch to Bayesian methods (which I recommend) or lower your significance threshold, you're still treating sampling error as your dominant uncertainty. But you're actually facing Knightian uncertainty: the kind where you don't know whether you're measuring the right thing at all — whether tomorrow's data will look like today's, whether your categories make sense. Formal methods address the uncertainty you can quantify while assuming away everything else.

When you can't know what you're optimizing for, optimization itself becomes the wrong frame.

{@render divider()}

In these conditions I always come back to the psychologist Gerd Gigerenzer.

Gigerenzer has this classic example: if you ask people which of two cities is larger, they often just pick the one they've heard of. This "recognition heuristic" sounds lazy, but it turns out to be remarkably accurate— because the things that make a city famous are correlated with size. 

The heuristic isn't optimal, but it's robust (in the statistical sense). It works even when you know almost nothing. This is the deeper insight from Gigerenzer: When you try to incorporate more variables-- does the city have a sports team I've heard of? Is the city in an important country? You often do _worse_ than the simple heuristic because you're overfitting to cities you know well.

When data is expensive, don't ask "how do I get enough data to optimize?" Ask "what simple decision rule will be robust to the data I don't have?" The value of additional data in reducing sampling error is much reduced if sampling error isn't where your problems are.

{@render divider()}

To tie this back— I'm currently working on building an AI system that analyzes pull requests for potential bugs. The outputs are noisy. The same prompt, same code, same model can give you meaningfully different results across runs. Classical significance testing would tell me I need hundreds of evaluations to confidently say one approach beats another.

Designing and running those experiments at scale is time consuming, and the landscape is shifting underneath me anyway— new models, new techniques, new understanding of what "good" even looks like. New delivery systems. New UX. New human feedback loops.

Under that much uncertainty, waiting for statistical confidence is its own kind of mistake. People fear fallibility, but the fear should be proportional to the cost of being wrong. When you're not waiting for certainty, you can explore more of the problem space. The observations are noisy, but they compound, which means you can build confidence even while changing approach.

The real advantage isn't just speed—it's that you're more likely to stumble onto the right question.

<svg class="jittered-spiral" viewBox="0 0 150 150"><path d=""/></svg>
