---
title: Game sketching
summary: Is it still blogging if you just make games
date: 2025-03-29
---

<script>
    import { onMount } from "svelte"
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
    let bullets = [];

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
        global.ctx = global.canvas.getContext('2d', { willReadFrequently: true });
        global.canvas.width = 600;
        global.canvas.height = 400;
        global.ctx.drawImage(player.sprites.center, player.x.current, player.y.current, player.width, player.height);
    }

    let paused = false

    function update() {
        // Clear canvas
        global.ctx.clearRect(0, 0, global.canvas.width, global.canvas.height);
        let sprite = player.sprites.center
        
        // Move player - supporting both arrow keys and WASD
        if ((keys['ArrowLeft'] || keys['KeyA']) && player.x.current > 0) {
            player.x.target -= player.speed;
            sprite = player.sprites.left
        }
        if ((keys['ArrowRight'] || keys['KeyD']) && player.x.current < global.canvas.width - player.width) {
            player.x.target += player.speed
            sprite = player.sprites.right
        }
        if ((keys['ArrowUp'] || keys["KeyW"]) && player.y.current > 0) {
            player.y.target -= player.speed;
        }
        if ((keys['ArrowDown'] || keys["KeyS"]) && player.y.current < global.canvas.width - player.width) {
            player.y.target += player.speed;
        }
         if (keys['Space']) {
            bullets.push({
                x: player.x.current + player.width/2 - 5, // Center the bullet
                y: player.y.current - 10, // Position above player
                width: 10,
                height: 10,
                speed: 7,
                color: 'red'
            });
        }
        // Update and draw bullets
        for (let i = bullets.length - 1; i >= 0; i--) {
            bullets[i].y -= bullets[i].speed;
            
            // Remove bullets that go off screen
            if (bullets[i].y < 0) {
                bullets.splice(i, 1);
                continue;
            }
            
            // Draw bullet
            global.ctx.fillStyle = bullets[i].color;
            global.ctx.fillRect(bullets[i].x, bullets[i].y, bullets[i].width, bullets[i].height);
        }
        // Draw player
        global.ctx.drawImage(sprite, player.x.current, player.y.current, player.width, player.height);

        requestAnimationFrame(update);
    }

    onMount(() => {
        setup()
        requestAnimationFrame(update)
    })
    
</script>

This is a bit of a post stub, but its fun that it's so easy to do little game dev sketches inside this blog. This is a (poorly drawn) spaceship that tilts when you drive left or right and has somewhat nice feeling easing in how it accelerates and slows down. It's crude, but it didn't take much time. I'd like to explore more game design stuff here when I have a chance. I'll revisit this post soon.

Move with ⬆️ ⬇️ ⬅️ ➡️ or ASWD. Shoot 🔴 with spacebar.

<canvas id="gameCanvas"></canvas>