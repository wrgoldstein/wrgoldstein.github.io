---
title: Canvas
summary: Am I wrong to use SVG so much?
date: 2025-03-29
---

<script>
    import { Tween, Spring } from "svelte/motion"
    import { center, left, right } from "$lib/components/rocket.js"
    import { cubicOut } from 'svelte/easing';

    let player = $state({
        x: new Spring(200, {
            duration: 1000,
            damping: 100,
		    easing: cubicOut
        }),
        y: new Spring(200, {
            duration: 1000,
		    easing: cubicOut
        }),
        width: 50,
        height: 50,
        speed: 5,
        color: 'red',
        rotation: 0,
        sprites: {}
    })

    const keys = {}
    let global = {
        ctx: null,
        canvas: null,
        playerSprite: null
    }


    function setup(){
        document.addEventListener('keydown', (e) => {
            e.preventDefault()
            keys[e.code] = true;
        });
        
        document.addEventListener('keyup', (e) => {
            e.preventDefault()
            keys[e.code] = false;
        });

        player.sprites.center = new Image();
        player.sprites.center.src = 'data:image/png;base64,' + center;

        player.sprites.left = new Image();
        player.sprites.left.src = 'data:image/png;base64,' + left;

        player.sprites.right = new Image();
        player.sprites.right.src = 'data:image/png;base64,' + right;

        global.canvas = document.getElementById('gameCanvas');
        global.ctx = global.canvas.getContext('2d');
        global.canvas.width = 600;
        global.canvas.height = 400;
        global.ctx.drawImage(player.sprites.center, player.x.current, player.y.current, player.width, player.height);
    }

    let paused = false

    function update() {
            // Clear canvas
            global.ctx.clearRect(0, 0, global.canvas.width, global.canvas.height);
            let sprite = player.sprites.center
            // Move player
            if (keys['ArrowLeft'] && player.x.current > 0) {
                player.x.target -= player.speed;
                sprite = player.sprites.left
            }
            if (keys['ArrowRight'] && player.x.current < global.canvas.width - player.width) {
                player.x.target += player.speed
                sprite = player.sprites.right
            }
            if (keys['ArrowUp'] && player.y.current > 0) player.y.target -= player.speed;
            if (keys['ArrowDown'] && player.y.current < global.canvas.width - player.width) player.y.target += player.speed;
            
            global.ctx.drawImage(sprite, player.x.current, player.y.current, player.width, player.height);

            requestAnimationFrame(update);
    }

    $effect.root(() => {
        setup()
        requestAnimationFrame(update)
    })
    
</script>
<canvas id="gameCanvas"></canvas>