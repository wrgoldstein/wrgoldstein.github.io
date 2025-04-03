---
title: Layouts
summary: Some of the coolest algorithms you use everyday without knowing it
date: 2025-03-28
---

<script>
    import { Tween } from "svelte/motion"
    import { fade } from "svelte/transition"
    import { codeToHtml } from 'shiki'

    // Tree node structure
    class TreeNode {
        x = $state(new Tween(0)) // x-coordinate for drawing
        y = $state(new Tween(0)) // y-coordinate for drawing
        mod = $state(0) // modifier for shifting subtrees
        constructor(value) {
            this.value = value;
            this.children = [];
        }
        
        addChild(child) {
            this.children.push(child);
            return child;
        }
    }

    // First pass: assign y-coordinates based on depth
    const assignDepth = (node, depth = 0, levelHeight = 30) => {
        // Set vertical position based on depth
        node.y.target = depth * levelHeight;

        // Process all children recursively
        node.children.forEach(child => {
            assignDepth(child, depth + 1, levelHeight);
        });
    };

    // Second pass: assign x-coordinates
    const assignXPositions = (node, nextLeafPosition, leafHorizontalSpacing) => {
        node.x.target = nextLeafPosition
        nextLeafPosition += leafHorizontalSpacing
        
        // Process all children recursively first
        node.children.forEach((child, i) => {
            assignXPositions(child, nextLeafPosition*(i+1), leafHorizontalSpacing);
        });
    };

    const centerNodesBasedOnChildren = (node) => {
        // First process all children recursively
        node.children.forEach(child => {
            centerNodesBasedOnChildren(child);
        });
        
        // Then position this node at the center of its children
        const firstChild = node.children[0];
        const lastChild = node.children[node.children.length - 1];
        
        if (firstChild) {
            node.x.target = (firstChild.x.target + lastChild.x.target) / 2;
        }
    };



    const sampleData = {
        nodes: ["🐄", "🥛", "🧀", "🧈"],
        edges: [
            {in: "🐄", out: "🥛"},
            {in: "🥛", out: "🧀"},
            {in: "🥛", out: "🧈"},
        ]
    }

    function printTree(node, depth = 0) {
        // Create indentation based on depth
        const indent = '  '.repeat(depth);
        
        // Print current node
        console.log(`${indent}${node.value}`);

        // Recursively print children
        for (const child of node.children) {
            printTree(child, depth + 1);
        }
    }


    function buildTree(data) {
        // Create a map to store nodes for quick access
        const nodeMap = new Map();
        
        // Create TreeNode objects for each node
        data.nodes.forEach(nodeValue => {
            nodeMap.set(nodeValue, new TreeNode(nodeValue));
        });
        
        // Track which nodes are children (to identify the root)
        const childNodes = new Set();
        
        // Connect nodes based on edges
        data.edges.forEach(edge => {
            const parent = nodeMap.get(edge.in);
            const child = nodeMap.get(edge.out);
            
            if (parent && child) {
                parent.addChild(child);
                childNodes.add(edge.out);
            }
        });
        
        // Find root node (node that isn't a child of any other node)
        let root = null;
        for (const nodeValue of data.nodes) {
            if (!childNodes.has(nodeValue)) {
                root = nodeMap.get(nodeValue);
                break;
            }
        }
        
        return root;
    }

    function walkTree(node) {
        // Start with current node
        let elements = [node]

        // Recursively add children
        for (const child of node.children) {
            for (const el of walkTree(child)){
                elements.push(el)
            }
        }
        
        return elements;
    }

    function getTreeConnections(node) {
        let connections = [];
        
        // Add connections between this node and its children
        for (const child of node.children) {
            connections.push({
                from: { x: node.x.target, y: node.y.target },
                to: { x: child.x.target, y: child.y.target },
                parent: node,
                child: child
            });
            
            // Recursively get connections from children
            const childConnections = getTreeConnections(child);
            connections = connections.concat(childConnections);
        }
        
        return connections;
    }

    // Build the tree
    let root = $state(buildTree(sampleData))

    let step = $state(0)
    let story = $state({
        current: 0,
        finished: false,
        code: `
class TreeNode {
    constructor(value) {
        this.value = value;
        this.children = [];
        this.x = 0;  // x-coordinate for drawing
        this.y = 0;  // y-coordinate for drawing
        this.mod = 0; // modifier for shifting subtrees
    }

    addChild(child) {
        this.children.push(child);
        return child;
    }
}
`,
        text: "We start with our nodes all piled up on top of each other. The first step is to calculate *depth*.",
        steps: {
            0: () => {
                    assignDepth(root)
                    story.current++
                    story.text = story.finished 
                    ? "We add height for each level of the tree, but the levels are now less obvious since for instance 🫕 (fondue) has both 🥛 (depth 2) and 🧀 (depth 3) as parents."
                    : "We start with the root node and walk the tree, adding a bit of height for each level of the tree."

                    
                    story.code = `
// First pass: assign y-coordinates based on depth
const assignDepth = (node, depth = 0, levelHeight = 30) => {
    // Set vertical position based on depth
    node.y.target = depth * levelHeight;
    
    // Process all children recursively
    node.children.forEach(child => {
        assignDepth(child, child.y.target / levelHeight + depth + 1, levelHeight);
    });
};
`
            },
            1: () => {
                assignXPositions(root, 0, 20)
                story.current++
                story.text = "Then we walk the tree to space out the nodes in a naive way: every element goes a little bit further right than the last one."
                story.code = `
// Second pass: assign x-coordinates
const assignXPositions = (node, nextLeafPosition, leafHorizontalSpacing) => {
    node.x.target = nextLeafPosition
    nextLeafPosition += leafHorizontalSpacing
    
    // Process all children recursively first
    node.children.forEach((child, i) => {
        assignXPositions(child, nextLeafPosition*(i+1), leafHorizontalSpacing);
    });
};
`
            },
            2: () => {
                centerNodesBasedOnChildren(root)
                story.current++
                story.text = "Then we go back and put each node in the middle of its children, giving an orderly appearance to the layout."
                story.code = `
const centerNodesBasedOnChildren = (node) => {
    // First process all children recursively
    node.children.forEach(child => {
        centerNodesBasedOnChildren(child);
    });
    
    // Then position this node at the center of its children
    const firstChild = node.children[0];
    const lastChild = node.children[node.children.length - 1];
    
    if (firstChild) {
        node.x.target = (firstChild.x.target + lastChild.x.target) / 2;
    }
};
`
            },
            3: () => {
                story.current++
                story.text = story.finished ? "Drawing arrows is hard too." : "Add some arrows and voila, we have a reasonable simple layout."
                story.code = `
function getTreeConnections(node) {
    let connections = [];
    
    // Add connections between this node and its children
    for (const child of node.children) {
        connections.push({
            from: { x: node.x.target, y: node.y.target },
            to: { x: child.x.target, y: child.y.target },
            parent: node,
            child: child
        });
        
        // Recursively get connections from children
        const childConnections = getTreeConnections(child);
        connections = connections.concat(childConnections);
    }
    
    return connections;
}
`
            },
            4: () => {
                story.code = ""
                story.current++
                story.text = "Start over?"
            },
            5: () => {
                story.code = `
const sampleData2 = {
    nodes: ["🐄", "🥛", "🧀", "🧈", "🍦", "🍕", "🥞", "🎂", "🥪", "🌾", "🍞", "🫕"],
    edges: [
        {in: "🐄", out: "🥛"},
        {in: "🥛", out: "🧀"},
        {in: "🥛", out: "🧈"},
        {in: "🥛", out: "🍦"},
        {in: "🧀", out: "🍕"},
        {in: "🧈", out: "🥞"},
        {in: "🧈", out: "🎂"},
        {in: "🧀", out: "🥪"},
        {in: "🍦", out: "🎂"},
        {in: "🐄", out: "🧈"},
        {in: "🐄", out: "🧀"},
        {in: "🧀", out: "🎂"},
        {in: "🥛", out: "🥪"},
        {in: "🍦", out: "🥞"},
        {in: "🌾", out: "🍞"},
        {in: "🍞", out: "🍕"},
        {in: "🍞", out: "🥪"},
        {in: "🍞", out: "🎂"},
        {in: "🥛", out: "🫕"},
        {in: "🧀", out: "🫕"}
    ]
};
`
                root = story.finished ? buildTree(sampleData) : buildTree(sampleData2)
                story.text = story.finished ? "Back to the beginning" : "Let's make it a little harder"
                viewBoxXMax.target = viewBoxXMax.target == 400 ? 100 : 400
                story.current = 0
                story.finished = !story.finished
            }
            
        }
    })

    let codeHtml = $derived(codeToHtml(story.code, {
        lang: 'javascript',
        theme: 'nord'
    }))

    const sampleData2 = {
        nodes: ["🐄", "🥛", "🧀", "🧈", "🍦", "🍕", "🥞", "🎂", "🥪", "🌾", "🍞", "🫕"],
        edges: [
            {in: "🐄", out: "🥛"},
            {in: "🥛", out: "🧀"},
            {in: "🥛", out: "🧈"},
            {in: "🥛", out: "🍦"},
            {in: "🧀", out: "🍕"},
            {in: "🧈", out: "🥞"},
            {in: "🧈", out: "🎂"},
            {in: "🧀", out: "🥪"},
            {in: "🍦", out: "🎂"},
            {in: "🐄", out: "🧈"},
            {in: "🐄", out: "🧀"},
            {in: "🧀", out: "🎂"},
            {in: "🥛", out: "🥪"},
            {in: "🍦", out: "🥞"},
            {in: "🌾", out: "🍞"},
            {in: "🍞", out: "🍕"},
            {in: "🍞", out: "🥪"},
            {in: "🍞", out: "🎂"},
            {in: "🥛", out: "🫕"},
            {in: "🧀", out: "🫕"}
        ]
    };

    let viewBoxXMax = $state(new Tween(100))
    let viewBoxYMax = $state(new Tween(150))
</script>

A layout algorithm is a structured approach to rendering information: specifically it solves the problem of *where do things go*.

You're looking at a web page right now organized by layout algorithms that implement the [CSS Box Model](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Box_model). This page benefits from layout tree construction, box size calculation, flow layout algorithms and positioning algorithms.

I find layout algorithms really interesting. They drive so much of how we interact with the digital world, and when they work well they seem amost magical.

So I thought today I'd take a look at a class of layout algorithms called _hierarchical_ layout algorithms. These represent information that can be encoded in a graph, like a tree or diagram.

The problem is, given a set of nodes and edges:

```js
{
    nodes: ["🐄", "🥛", "🧀", "🧈"],
    edges: [
        {in: "🐄", out: "🥛"},
        {in: "🥛", out: "🧀"},
        {in: "🥛", out: "🧈"},
    ]
}
```

How do we generate something like this?


<svg class="w-1/2 mx-auto" viewBox="30 0 250 80">
    <defs>
        <marker id="arrowhead" markerWidth="6" markerHeight="7" 
                refX="4" refY="3.5" orient="auto">
        <polygon points="0 0, 6 3.5, 0 7" />
        </marker>
    </defs>
    <text x="50" y="50" font-size="20">🐄</text>
    <text x="150" y="50" font-size="20">🥛</text>
    <text x="250" y="20" font-size="20">🧀</text>
    <text x="250" y="80" font-size="20">🧈</text>
    <line x1="85" y1="45" x2="135" y2="45" style="stroke:rgb(0,0,0);stroke-width:2" marker-end="url(#arrowhead)"/>
    <line x1="185" y1="45" x2="235" y2="25" style="stroke:rgb(0,0,0);stroke-width:2" marker-end="url(#arrowhead)"/>
    <line x1="185" y1="45" x2="235" y2="65" style="stroke:rgb(0,0,0);stroke-width:2" marker-end="url(#arrowhead)"/>
</svg>

Drawing the diagram is easy enough in javascript if you know the coordinates-- but how do you know the right coordinates?

The industry standard is something called [Sugiyama](https://en.wikipedia.org/wiki/Layered_graph_drawing), but implementing it can be thousands of lines of code-- see the Javascript implementation, [Dagre](https://github.com/dagrejs/dagre), for more on that.

Because of space and brain constraints, we'll look at a common simpler option: the [Reingold-Tilford algorithm](https://reingold.co/tidier-drawings.pdf).

## Reingold-Tilford

Reingold-Tilford requires us to do four passes over the data:

1. Assign initial coordinates
2. Resolve conflicts between subtrees
3. Apply modifiers to the final coordinates
4. Normalize coordinates

Before we do the first step we need to construct a Tree structure:

Then assigning initial coordinates is as simple as walking through the tree recursively and 

1. Calculate the depth of each node
2. Calculate a position that is in the center of its children

Let's walk through the steps:

<span class="bg-gray-200"></span>
<div class="flex gap-6">
    <svg style="height: {story.finished ? 20 : 15}rem;" class="transition-all flex-grow" viewBox="0 -50 {viewBoxXMax.current} {viewBoxYMax.current}">
        {#each walkTree(root) as node}
            <text x={node.x.current} y={node.y.current}>{node.value}</text>
        {/each}

        {#if ([4,5].includes(story.current))}
            <defs>
                <marker id="arrowhead2" markerWidth="4" markerHeight="5" 
                    refX="3" refY="2.5" orient="auto">
                <polygon points="0 0, 4 2.5, 0 5" />
                </marker>
            </defs>

            {#each getTreeConnections(root) as connection}
                <line 
                    x1="{connection.from.x + 7.5}" 
                    y1="{connection.from.y + 2.5}" 
                    x2="{connection.to.x + 7.5}" 
                    y2="{connection.to.y - 15}" 
                    stroke="black" 
                    stroke-width=".75" 
                    marker-end="url(#arrowhead2)" 
                />
            {/each}
        {/if}
    </svg>

    <div class="w-1/2">
        <p class="text-yellow-400">{story.text}</p>

        <button onclick={story.steps[story.current]} class="px-2 py-1 text-white rounded bg-yellow-500" >
        click here</button>

    </div>
</div>

{#if story.code}
    <div transition:fade class="hidden md:flex w-full bg-[#2e3440ff] min-h-[20rem] rounded">
        {#await codeHtml}
            beep boop
        {:then code}
            {@html code}
        {/await}
    </div>
{/if}


{#if !story.finished}

If you click to try it again, we'll redo the same example but with 6 extra items and 10 additional edges. You'll see that because of items having parents at multiple depths, it can be tricky to get a pleasing layout.

{/if}

You'll notice the arrows aren't great-- here I'm skipping the conflict resolution part of the algorithm-- and also RT is known to not be great at optimally clear layouts (that's why the state of the art is Sugiyama).

In another post (or maybe just extending this one in the future) we'll look at the solution: resolving conflicts with modifiers and normalizing coordinates.
