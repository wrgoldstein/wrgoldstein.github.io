---
layout: post
title: 'Farkle'
date: 2019-07-29
---

**Note**: The images for this post are long gone. I might add the ability to play a game of Farkle here in the future.

-------

I played a game recently called [Farkle](https://en.wikipedia.org/wiki/Farkle).

The rules are that you roll six dice and earn a score for certain combinations:

| hand         | points                             |
| ------------ | ---------------------------------- |
| 6 of a kind  | 3,000 points                       |
| 5 of a kind  | 2,000 points                       |
| 1-6 straight | 1,500 points                       |
| three pairs  | 1,500 points                       |
| 4 of a kind  | 1,000 points                       |
| 3 of kind    | 100 \* pip (so three fives is 500) |
| a single 1   | 100                                |
| a single 5   | 50                                 |

<br>
But you must follow these additional rules:

1. You remove any scored dice from what was rolled, adding the points earned to a running total for the turn.
2. If you cannot score any dice, you earn 0 for the turn regardless of any previous points earned.
3. If your total score is over 500 points you may stop, otherwise you must reroll the unscored dice.
4. If you score all six dice, you may roll all six again to continue adding to your score.

<div class="example">
    <h3> Example: </h3>
    If you roll 
    <div class='dice'>⚅ ⚅ ⚅ ⚀ ⚀</div>

    You may take 600 points for the three sixes, and two hundred for the two ones. Since you have reached 500 points you may stop rolling, or you may continue with all six dice.

    If the next roll is

    <div class='dice'>⚄ ⚁ ⚂ ⚃ ⚃ ⚁</div>

    You may take 50 points for the 5 for a total of 650. You may stop here, or you may continue. Let's say you roll one more time (rolling only 5 dice since you removed the 5 for 50 points).

    <div class='dice'>⚁ ⚁ ⚃ ⚃ ⚂</div>

    Farkle! You receive 0 for this round, and play passes to your left.

</div>
<br>

Clearly, just like in [Hog Dice](/blog/hog-dice), this is a game about balancing more opportunities to score against the probability of getting a 0. It's also clearly also solveable.

I wrote a simulation of the game and examined the scoring outcomes of a few different strategies. Here's what I learned.

Consider three strategies for choosing between the following:

<div class='dice'>⚂ ⚂ ⚂ ⚀ ⚁ ⚁</div>

1. Take three threes and a one for 400 points and reroll two dice.
2. Take only the one for 100 points and reroll five dice.
3. Take three threes for 300 points and reroll three dice.

This boils down to: If you have a choice between taking extra points and rolling extra dice, what should you do?

Choice (1) is what I call the greedy approach where you take as many points as are available.

Choice (2) is the gambler approach, where you always try to roll as many dice as possible.

Choice (3) is what I call the balanced approach, where you try to take a larger point total where it won't force you to roll too few dice.

Obviously on any given role, the greedy approach (take all available points) will dominate. On average, this approach is safest and leads to the fewest farkles:

--

That pattern is also visible here, where we break out the distribution of scores for each strategy given the roll from above:

--

However, you can also see that the other strategies are more likely to score a higher point total in a given turn.

Does the higher point total balance out the risk you take by rolling more often? It turns out, yes, it comes quite close to catching up to the greedy approach in the long run (this is a game of 100 rolls):

--

Which leaves only one more question: Is the long run soon enough for a game of farkle to 10,000 points? The answer appears to be yes, but that finish line is actually fairly close to the crossover point. There's also a lot of luck in this game. Here's the % of games won by the greedy strategy for various thresholds for victory.

--

The gambler approach pays off in the long run, indicating the expected value of that approach is higher, but the risk of additional farkles means it isn't that much better than the greedy approach. Balanced runs a distant third unless you play a lot of games.

<style>
table {
  padding: 0; 
  max-width: 50%;
  margin: auto;
}
th {
    text-align: center;
}
table tr {
    border-top: 1px solid #cccccc;
    background-color: white;
    margin: 0;
    padding: 0; 
}
table tr th {
    font-weight: bold;
    border: 1px solid #cccccc;
    margin: 0;
    padding: 6px 13px; 
}
table tr td {
    border: 1px solid #cccccc;
    text-align: right;
    margin: 0;
    padding: 6px 13px; 
}

.dice {
    font-size: 56px;
    margin-bottom: 28px;
    width: 65%;
    margin: auto;
    text-align: center;
}

.example {
    margin-top: 2rem;
    background-color: #eee;
    border-radius: 15px;
    padding: 0 15px 15px 15px;
}
</style>