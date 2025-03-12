---
layout: 'post'
title: 'Beam search nearest neighbors'
summary: A visualization of my favorite algorithm
date: 2015-12-28
updated: 2025-03-12
---

<script>
let n = $state(50) // nodes
let k = $state(3) // edges
let iter = $state(75) // iterations
let particles = $state(new Array(n))
const width = 1000
const height = 300
let running = $state(false)
let edges = $state({})
let unpacked = $derived.by(() => {
    const unpacked = [];
  
    for (const source in edges) {
      const sourceIndex = parseInt(source);
      const sourceParticle = particles[sourceIndex];
      
      edges[source].forEach(targetIndex => {
        const targetParticle = particles[targetIndex];
        unpacked.push([sourceParticle, targetParticle]);
      });
    }
    
    return unpacked;
})
let beam_ix = $state(100000)
let algo_step = $state(0)
let old_edges

let step = $state("Initialize random edges")
let actions = {
  "Initialize random edges": () => {
    initializeEdges()
    step = "Solve quickly"
  },
  "Solve quickly": () => {
    old_edges = $state.snapshot(edges)
    runAlgorithmFast()
    step = "Wait, slow that down"
  },
  "Wait, slow that down": () => {
    edges = old_edges
    runAlgorithmSlow()
    step = "Wow cool"
  },
  "Wow cool": () => {
    step = "Start over"
  },
  "Start over": () => {
    edges = {}
    initializeParticles()
    step = "Initialize random edges"
  }
}

function takeAction(){
  actions[step]()
}

function initializeParticles(){
  particles = new Array(n)
  for (var i = 0; i < n; ++i) {
    particles[i] = {
      x: .1 * width + .9 * width * Math.random(),
      y: .05 * height + .9 * height * Math.random(),
      r: 3,
      color: "black"
    };
  }
}
initializeParticles()

function initializeEdges(){
  edges = {}
  particles.forEach((source, i) => {
      let targets = []
      choices(particles, k).forEach(target => {
        targets.push(target);
      });
      edges[i] = targets
    });
}

// Create an array of given size with sequential elements (0 to size-1)
function range(size) {
  return Array.from({ length: size }, (_, i) => i);
}

// Select n random elements from a list without replacement
function choices(list, n) {
  const shuffled = [...range(list.length)].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
}


function runAlgorithmFast(){
  algo_step = 0
  for (let i = 0; i < iter; i++) {
    _step(true);
  }
}

function runAlgorithmSlow() {
  running = true
  algo_step = 0
  let i = 0;
  
  function nextStep() {
    if (i < iter) {
      _step();
      i++;
      setTimeout(nextStep, 250); // 0.25 seconds = 250 milliseconds
    } else {
      running = false
    }
  }
  
  nextStep();
}

function _step(fast){
  beam_ix = (beam_ix >= n - 1) ? 0 : beam_ix + 1;

  if (!fast) updateParticle(beam_ix, {color: 'red', r: 10})
  algo_step += 1;

  // Get first-degree connections
  let first_degree_ixs = edges[beam_ix] || [];

  // Get second-degree connections (excluding original node and first-degree connections)
  let second_degree_ixs = [...new Set(
    first_degree_ixs.flatMap(ix => edges[ix] || [])
      .filter(ix => ix !== beam_ix && !first_degree_ixs.includes(ix))
  )];

  // Convert indices to particles and calculate distances
  let neighbor_ixs = [...first_degree_ixs, ...second_degree_ixs];
  let distances = neighbor_ixs.map(ix => {
    if (!fast){
      updateParticle(ix, {color: 'grey', r: 5 })
      updateParticleWithtimeout(beam_ix, { color: 'black', r: 3}, 50)
    }

    return euclideanDistance(particles[ix], particles[beam_ix])
  });

  // Sort by distance and take the closest k neighbors
  let sorted_indices = Array.from({ length: distances.length }, (_, i) => i)
    .sort((a, b) => distances[a] < distances[b] ? 1 : -1)
    .slice(0, k);

  // Update edges with the closest neighbors
  edges[beam_ix] = sorted_indices.map(i => neighbor_ixs[i]);
  if (!fast) updateParticleWithtimeout(beam_ix, { color: 'black', r: 3}, 100)
}

function updateParticle(ix, update){
  particles[ix] = {...particles[ix], ...update}
}

function updateParticleWithtimeout(ix, update, timeout){
  setTimeout(() => {
    updateParticle(ix, update)
  }, timeout)
}

function euclideanDistance(p1, p2) {
  let sum_of_squares = 0;
  sum_of_squares += Math.pow(p1.x - p2.x, 2);
  sum_of_squares += Math.pow(p1.y - p2.y, 2);
  return 1.0 / (1 + Math.sqrt(sum_of_squares));
}

function uniq_fast(a) {
    var seen = {};
    var out = [];
    var len = a.length;
    var j = 0;
    for(var i = 0; i < len; i++) {
         var item = a[i];
         if(seen[item] !== 1) {
               seen[item] = 1;
               out[j++] = item;
         }
    }
    return out;
}


</script>

A common problem is finding the nearest neighbors of a given object in some search space. [Beam search](https://en.wikipedia.org/wiki/Beam_search) is an "anytime" heuristic search algorithm which very efficiently accomplishes this.

Imagine we have a set of N nodes, each randomly "closest" (connected by an edge) to n other nodes. The algorithm works as follows:

1. Pick a node; paint it red.
2. Paint its neighbors grey. Also paint the neighbors for each of those neighbors.
3. "Fix" the edges of the red node by connecting it to the closest of these grey nodes.
4. Repeat for each node.

Click to proceed with the algorithm: <button onclick={takeAction} class="px-2 py-1 text-white {running ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600' } rounded  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 inline-flex items-center" disabled={running}>{step}</button>

<div class="flex">
  <div>
    Number of nodes:
    <input class="w-8 text-blue-500" bind:value={n} onchange={initializeParticles}>
  </div>
  <div>
    Number of neighbors to find:
    <input class="w-8 text-blue-500" bind:value={k} onchange={initializeEdges}>
  </div>
  <div>
    Iterations: {algo_step} / <input class="w-8 text-blue-500" bind:value={iter} >
  </div>
</div>

<div class="w-full flex justify-center mt-12 mb-32">
  <svg class="w-full mx-auto" viewBox="0 0 1000 300">
    {#each particles as p}
      <circle cx={p.x} cy={p.y} r={p.r} fill={p.color}/>
    {/each}
    {#each unpacked as [p1, p2]}
      <line x1={p1.x} x2={p2.x} y1={p1.y} y2={p2.y} width=3 stroke="grey"/>
    {/each}
  </svg>
</div>

