---
layout: post
title:  "Most Published Findings Are False"
date:   2017-03-03
---

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.10.0-rc.1/dist/katex.min.css" integrity="sha384-D+9gmBxUQogRLqvARvNLmA9hS2x//eK1FhVb9PiU86gmcrBrJAQT8okdJ4LMp2uv" crossorigin="anonymous">
<script src="https://cdn.jsdelivr.net/npm/katex@0.10.0-rc.1/dist/katex.min.js" integrity="sha384-483A6DwYfKeDa0Q52fJmxFXkcPCFfnXMoXblOkJ4JcA8zATN6Tm78UNL72AKk+0O" crossorigin="anonymous"></script>

There's a [commonly referenced paper](https://journals.plos.org/plosmedicine/article?id=10.1371/journal.pmed.0020124) which says that the majority of scientific results are actually false.  I think the math there is instructive to think about:

If a p-value indicates the probability of seeing a given experimental outcome given a false hypothesis, we can accept only results with a p-value of .05 or less and expect to make mistakes no more than 95% of the time.

However, when we zoom out and look at many tests like this as a whole, we have to ask ourselves about the overall probability of a given hypothesis being true.  If we say scientists (or product managers!) are only generating/testing correct hypotheses 10% of the time, our p-value means something different. We know from Bayes' Theorem:
<br>
<div id="bayes theorem"></div>
<script>
var formula = "P(false|reject) = \\frac{P(reject|false) \\times P(false)}{P(reject|false) \\times P(false) + P(reject|true) \\times P(true)}"
katex.render(formula, document.getElementById("bayes theorem"), {
    throwOnError: false
});
</script>
<br>
Where <span id="false given reject"></span> is the probability of a false hypothesis given a positive test result (p-value < .05).

<script>
var formula ="p( false | reject )"
katex.render(formula, document.getElementById("false given reject"), {
    throwOnError: false
});
</script>
Since: 
- <span id="derivation1"></span> is the probability of getting a positive result given a false hypothesis (the type I error rate)
- <span id="derivation2"></span> is the overall probability of a false hypothesis
- <span id="derivation3"></span> is the overall probability of a true hypothesis (inverse probability of a false hypothesis)
- <span id="derivation4"></span> is the probability of getting a negative result where there is a real relationship (one minus the _power_).

<script>
var derivations = {
    derivation1: `p( false | reject )`,
    derivation2: "p(false)",
    derivation3: "p(true)",
    derivation4: "p(reject | true)"
}

for (k in derivations){
    katex.render(derivations[k], document.getElementById(k), {
        throwOnError: false
    });
}
</script>

And since we often set our type I error rate to .05 and our power to .80, if we claim 10% of theories that get tested are true, we get:

<div id="result"></div>
<br>
<script>
var formula = "\\frac{.05 \\times .90}{(.90 * .05)+(.20 * .10)} \\approx .69"
katex.render(formula, document.getElementById("result"), {
    throwOnError: false
});
</script>

Which tells us that under the theory that the outside chance of a hypothesis being right is 10%, the probability of a result being false even though the p-value is small is actually 69%: way higher than the type I error rate we actually test at.
