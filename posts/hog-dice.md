---
layout: post
title: 'Hog Dice'
date: 2016-07-24
---

<script>
  import * as d3 from "d3"

  let n = 40
  let r = d3.range(n)

  function realAnswer(n) {
    return Math.pow(5/6, n) * n * 4.0
  }

  // function roll(){
  //   return Math.ceil(Math.random() * 6)
  // }

  // function rollMany(n){
  //   let results = [];
  //   for (let i = 0; i < n; i++) {
  //     results.push(roll());
  //   }
  //   if (results.includes(1)) return 0;

  //   return results.reduce((acc, curr) => acc + curr, 0);
  // }

  // let step = $state(0)

  // let results = $state(Array(n).fill(0))

  // function simulate(){
  //   step++
  //   for (let i = 0; i < n; i++) {
  //     let rollResult = rollMany(i + 1);

  //     results = results.map(r => 
  //       (r == 0 && rollResult == 0) ? 0 : r * step + rollResult / (step + 1)
  //     )
  //   }
  // }

  // simulate()

</script>

I'm giving a presentation at [Artsy's offsite](http://observer.com/2015/08/artsys-wet-hot-american-summer/) on Analytics at Artsy, and I wanted an accessible and relevant ice breaker. I decided to go with the [HOG Dice Game](http://www.amstat.org/publications/jse/v11n2/feldman.html) to try to get at how data analytics can be useful for solving real world problems. The game is simple:

1. Players take turns rolling dice. Each player may choose any number of dice from one up to the total number of dice available. (We recommend that at least ten dice be available for each player or team.)
2. The number of dice a player chooses to roll can vary from turn to turn.
3. The player's score for a turn is zero if at least one of the dice comes up with the value one. Otherwise, the player's score for the turn is the sum of the faces showing on the dice. (Rolling a one sets only the score for that turn to zero, not the total cumulative score for the player.)
4. A cumulative running total of the scores is kept for each player.
5. The first player to reach or exceed a predetermined score (100 works well) wins the game. If more than one player reaches the predetermined score on the same turn then the player with the highest point total wins the game.

To help explain the optimal results, I've made a small visualization of the theoretical vs experimental best choice for how many dice to roll. The below chart shows the analytical solution (orange) alongside the average return from a dice throw simulation. The experimental converges to the theoretical, but not as quickly as you might think.

Here's the expected value for each number of dice a player can choose:

<div class="flex gap-1 items-end my-8">
  {#each d3.range(n) as i}
    <div style="height: {realAnswer(i)}rem; width: 1rem;" class="relative bg-gray-500 bg-opacity-20"></div>
  {/each}
</div>

