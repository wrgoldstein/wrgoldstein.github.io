---
layout:  "post"
title:  "Beam search nearest neighbors"
date: 2015-12-28
---

A common problem is finding the nearest neighbors of a given object in some search space.  [Beam search](https://en.wikipedia.org/wiki/Beam_search) is an "anytime" heuristic search algorithm which very efficiently accomplishes this.

Imagine we have a set of N nodes, each randomly "closest" (connected by an edge) to n other nodes.  The algorithm works as follows:

1. Pick a node; paint it red.
2. Paint its neighbors grey. Also paint the neighbors for each of those neighbors.
3. "Fix" the edges of the red node by connecting it to the closest of these grey nodes.
4. Repeat for each node.

<head>
<style type="text/css">
svg {
        box-shadow: 0px 0px 10px #888888;
        margin-top: 5px;
        margin-left: 25%;
        width: 50%;
    }
</style>
</head>
<body>
<script src="/js/d3.min.js"></script>
<script>
var width = 600,
    height = 400,
    n = 50, // number of points
    s = 5,  // number of neighbors per point
    delay = 500, //
    beam_ix = 0, // start with the first node
    neighbor_ixs = undefined,  // or neighbors
    iterations = 3 * n,
    step = 0,
    paused = true;

var svg = d3.select("body").append("svg")
    .attr("height", height)
    .attr("id", "main")
    .on("click", function(){
      if (!paused){
        paused = true;
        console.log("paused was false turning it true")
        add_play_btn();
      }
    });

var width = svg.style("width").slice(0,-2)

function add_play_btn() {
  d3.xml("/assets/play.svg", "image/svg+xml", function(error, xml) {
    if (error) throw error;
    svg.node().appendChild(xml.documentElement);
    svg.select(".play")
      .attr("x", 8 * width / 20)
      .attr("y", 7 * height / 20)
      .attr("width", width / 5)
      .attr("height", 3 * height / 10)
      .on("click", function(){
        d3.event.stopPropagation();
        paused = false;
        console.log("paused was true turning it false")
        this.remove();
        update_step();
        setTimeout(update_step, 600);
      })
  });
}


var particles = new Array(n);
for (var i = 0; i < n; ++i) {
  particles[i] = {
    x: .1 * width + .9 * width * Math.random(),
    y: .05 * height + .9 * height * Math.random(),
    r: 3 //height * .01 * Math.random()
  };
}

// node and edge selections
var nodes = svg.selectAll(".dot")
  .data(particles);

var edges = svg.selectAll(".edge")
  .data(particles);


// choose initial neighbors
var choices = d3.range(particles.length);
var neighbors = particles.map(function(el, ix){
  return d3.shuffle(choices).slice(0, s);
})

function initialize(j){
  nodes.enter()
    .append("circle")
    .attr("cx", function(d){ return d.x; })
    .attr("cy", function(d){ return d.y; })
    .attr("r", function(d){ return d.r; })

  d3.range(s).forEach(function(_el, j){
    edges.enter().append("line")
        .attr("x1", function(d, ix){ return d.x })
        .attr("y1", function(d, ix){ return d.y })
        .attr("x2", function(d, ix){ return lookup(ix, j).x })
        .attr("y2", function(d, ix){ return lookup(ix, j).y })
        .attr("stroke", "grey")
        .classed('edge_' + j, true);
  })
  add_play_btn();
}

function update_neighbors(){
  var first_degree_ixs,
      neighbors_as_particles,
      distances,
      distance_ixs,
      closest;



  beam_ix = (beam_ix >= n - 1) ? 0 : beam_ix + 1;
  step += 1;
  console.log("step");
  // grab the neighbors of the node in the beam
  first_degree_ixs = neighbors[beam_ix];
  // grab the neighbors of those neighbors, removing
  // any that might be duplicates or the node itself.
  // (merge flattens an array of arrays)
  neighbor_ixs = uniq_fast(d3.merge(
    first_degree_ixs.map(function(el){
      return neighbors[el] }
    ))
    .concat(first_degree_ixs));

  neighbors_as_particles = neighbor_ixs.map(function(el){ return particles[el] })
  distances = neighbors_as_particles.map(function(p) {
    return euclideanDistance(p, particles[beam_ix])
  });
  distance_ixs = d3.range(distances.length);
  distance_ixs.sort(function(a,b){
    return distances[a] < distances[b] ? 1 : -1 }
  );
  closest = distance_ixs.slice(0, s);
  neighbors[beam_ix] = closest.map(function(i) { return neighbor_ixs[i] })
}

function update(){
  // color nodes
  nodes.transition().duration(delay)
    .attr("r", function(d, ix){ return (ix == beam_ix) ? 20 :
        (neighbor_ixs.indexOf(ix) > -1) ? 10 : 3 })
    .attr("fill", function(d, ix){ return (ix == beam_ix) ? "red" : "grey" })

  // move edges
  d3.range(s).forEach(function(el, j){
    d3.selectAll('.edge_' + j).transition().duration(delay)
    .attr("x2", function(d, ix){ return lookup(ix, j).x })
    .attr("y2", function(d, ix){ return lookup(ix, j).y })
  })
}

function update_step(){
  update_neighbors();
  update();
  if (!(step > iterations) && (!paused)){ setTimeout(update_step, delay); };
}

initialize();


// helpers
function lookup(i, j){
  return particles[neighbors[i][j]]
}

function euclideanDistance(p1, p2) {
  sum_of_squares = 0;
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