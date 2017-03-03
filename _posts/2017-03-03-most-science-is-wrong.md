---
layout: post
title:  "'Most Science Is Wrong'"
date:   2017-03-03
---

There's a commonly referenced paper (I'll find a link) which says that the majority of scientific results are actually false.  I think the math there is instructive to think about:

If a p-value indicates the probability of seeing a given experimental outcome given a false hypothesis, we can accept only results with a p-value of .05 or less and expect to make mistakes no more than 95% of the time.

However, when we zoom out and look at many tests like this as a whole, we have to ask ourselves about the overall probability of a given hypothesis being true.  If we say scientists (or product managers!) are only generating/testing correct hypotheses 20% of the time, our p-value means something different. We know from Bayes' Theorem:

    p( f | + ) = p( + | f ) * p( f ) / 
                 p( f ) * p( + | f ) + p( t )*p( + | t )

Where `p( f | + )` is the probability of a false conclusion given a positive test result (p-value < .05).

We know:

    p( + | f ) := the probability of getting a positive result given a false hypothesis (the type I error rate)
    p( f ) := the total probability of a false result
    p( t ) := 1 - p( f )
    p( + | t ) := the probability of getting a positive where there is a real relationship (the _power_).

And since we often set our type I error rate to .05 and our power to .80, if we claim 20% of tested relationships are true on average, then we get

    .05 * 0.8 / ((.05 * .08) + (.80 * .20))

Which tells us the probability of a result being false even though the p-value is small is actually 20%, way higher than the type I error rate we actually test at.
