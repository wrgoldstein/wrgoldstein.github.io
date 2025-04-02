---
title: Pixel art
summary: The weird thing about 2025
date: 2025-03-31
---

<script>
    import { onMount } from "svelte"

    let pixelSize = $state(8)
    let currentTool = $state("pencil")
    let undoStack = $state([]);
    let saveSize = $state(64)
    let maxUndoSteps = 50; // Limit the number of undo steps to prevent memory issues

    let toggleSymmetry = $state(false)

    function saveCanvasState() {
        const canvas = document.getElementById('pixelCanvas');
        const state = canvas.toDataURL();
        
        // Add new state to the stack
        undoStack = [...undoStack, state];
        
        // Keep stack size limited
        if (undoStack.length > maxUndoSteps) {
            undoStack = undoStack.slice(undoStack.length - maxUndoSteps);
        }
    }

    function undoLastAction() {
        if (undoStack.length <= 1) return; // Nothing to undo
        
        const canvas = document.getElementById('pixelCanvas');
        const ctx = canvas.getContext('2d');
        
        // Remove current state
        undoStack = undoStack.slice(0, undoStack.length - 1);
        
        // Get previous state
        const previousState = undoStack[undoStack.length - 1];
        
        // Load previous state
        const img = new Image();
        img.onload = function() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);
        };
        img.src = previousState;
    }

    onMount(() => {
        const canvas = document.getElementById('pixelCanvas');
        const ctx = canvas.getContext('2d');
        const colorPicker = document.getElementById('colorPicker');

        saveCanvasState();
        
        // Fill canvas with white initially
        ctx.fillStyle = '#FFFFFF';
        
    
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Variables to track if mouse is pressed
        let isDrawing = false;
        
        // Drawing functions
        function drawPixel(x, y) {
            ctx.fillStyle = colorPicker.value;
            // Calculate the proper grid position (snap to grid)
            const gridX = Math.floor(x / pixelSize) * pixelSize;
            const gridY = Math.floor(y / pixelSize) * pixelSize;
            ctx.fillRect(gridX, gridY, pixelSize, pixelSize);

                if (toggleSymmetry) {
                // Calculate the mirrored X position (assumes central vertical line at canvas.width/2)
                const mirroredX = canvas.width - gridX - pixelSize;
                
                // Draw the mirrored pixel
                ctx.fillRect(mirroredX, gridY, pixelSize, pixelSize);
            }
        }

        function floodFill(startX, startY, fillColor) {
            // Get image data to work with
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;
            
            // Convert to grid coordinates
            const gridX = Math.floor(startX / 1) * 1;
            const gridY = Math.floor(startY / 1) * 1;
            
            // Get the color we're replacing at the starting position
            const startPos = (gridY * canvas.width + gridX) * 4;
            const startR = data[startPos];
            const startG = data[startPos + 1];
            const startB = data[startPos + 2];
            const startA = data[startPos + 3];
            
            // Parse the fill color
            const tempCanvas = document.createElement('canvas');
            const tempCtx = tempCanvas.getContext('2d');
            tempCtx.fillStyle = fillColor;
            tempCtx.fillRect(0, 0, 1, 1);
            const fillColorData = tempCtx.getImageData(0, 0, 1, 1).data;
            
            // If target color is the same as fill color, return (nothing to do)
            if (startR === fillColorData[0] && 
                startG === fillColorData[1] && 
                startB === fillColorData[2] && 
                startA === fillColorData[3]) {
                return;
            }
            
            // Queue for pixels to check - using art pixel coordinates
            const queue = [];
            queue.push([gridX, gridY]);
            
            // Set to keep track of visited pixels
            const visited = new Set();
            
            // Process the queue
            while (queue.length > 0) {
                const [x, y] = queue.shift();
                
                // Skip if already visited
                const key = `${x},${y}`;
                if (visited.has(key)) continue;
                visited.add(key);
                
                // Check if this pixel matches the start color
                const pos = (y * canvas.width + x) * 4;
                if (data[pos] === startR && 
                    data[pos + 1] === startG && 
                    data[pos + 2] === startB && 
                    data[pos + 3] === startA) {
                    
                    // Fill this entire pixel block (1 × 1)
                    for (let py = 0; py < 1; py++) {
                        for (let px = 0; px < 1; px++) {
                            const pixelPos = ((y + py) * canvas.width + (x + px)) * 4;
                            data[pixelPos] = fillColorData[0];
                            data[pixelPos + 1] = fillColorData[1];
                            data[pixelPos + 2] = fillColorData[2];
                            data[pixelPos + 3] = fillColorData[3];
                        }
                    }
                    
                    // Add neighbors to queue (using art pixel grid)
                    if (x >= 1) queue.push([x - 1, y]);
                    if (x + 1 < canvas.width) queue.push([x + 1, y]);
                    if (y >= 1) queue.push([x, y - 1]);
                    if (y + 1 < canvas.height) queue.push([x, y + 1]);
                }
            }
            
            // Update the canvas with our modified pixel data
            ctx.putImageData(imageData, 0, 0);
            
            // Handle symmetry if enabled
            if (toggleSymmetry) {
                const mirroredX = canvas.width - gridX - 1;
                floodFill(mirroredX, gridY, fillColor);
            }
        }

        function clearCanvas() {
            ctx.fillStyle = '#FFFFFF'; // White background
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
        
        // Event listeners
        canvas.addEventListener('mousedown', (e) => {
            isDrawing = true;
            const rect = canvas.getBoundingClientRect();
            const x = Math.floor((e.clientX - rect.left) * (canvas.width / canvas.offsetWidth));
            const y = Math.floor((e.clientY - rect.top) * (canvas.height / canvas.offsetHeight));
            if (currentTool === 'pencil') {
                drawPixel(x, y);
            } else if (currentTool === 'fill') {
                floodFill(x, y, colorPicker.value);
            }
        });
        
        canvas.addEventListener('mousemove', (e) => {
        if (!isDrawing) return;
            const rect = canvas.getBoundingClientRect();
            const x = Math.floor((e.clientX - rect.left) * (canvas.width / canvas.offsetWidth));
            const y = Math.floor((e.clientY - rect.top) * (canvas.height / canvas.offsetHeight));
            drawPixel(x, y);
        });
        
        canvas.addEventListener('mouseup', () => {
            isDrawing = false;
            saveCanvasState();
        });
        
        canvas.addEventListener('mouseleave', () => {
            isDrawing = false;
        });

        document.getElementById('clearButton').addEventListener('click', clearCanvas);
        document.getElementById('copyButton').addEventListener('click', copyCanvasAsPNG);
        document.getElementById('undoButton').addEventListener('click', undoLastAction);


        function copyCanvasAsPNG() {
            // Create a temporary canvas at the smaller size
            const tempCanvas = document.createElement('canvas');
            tempCanvas.width = saveSize;
            tempCanvas.height = saveSize;
            
            // Get context and draw the original canvas (resized)
            const ctx = tempCanvas.getContext('2d');
            console.log(canvas)
            ctx.drawImage(canvas, 0, 0, saveSize, saveSize);
            
            // Get data URL from the smaller canvas
            const dataURL = tempCanvas.toDataURL('image/png');
            
            // Copy to clipboard
            const tempElement = document.createElement('textarea');
            tempElement.value = dataURL;
            document.body.appendChild(tempElement);
            tempElement.select();
            document.execCommand('copy');
            document.body.removeChild(tempElement);
        }
    })
</script>


For a project of mine I need to create some pixel art.

I downloaded a couple of apps and visited a website or two and all of the options have ads and pretty unfriendly interfaces.

But as a coder in 2025 you're not really at the mercy of anyone else's tool design. In two chat messages I can have the basic grid for my own pixel art generator, and add whatever features I want.

This basic pixel art drawer that took 15 minutes to make and supports the advanced features I need: 

* Symmetry drawing
* Copying the image to clipboard
* Resizing
* Fill tool

<input type="color" id="colorPicker" value="#000000">
<button onclick={() => currentTool = currentTool == 'pencil' ? 'fill' : 'pencil'} class="bg-red-200 min-w-16 rounded px-2 py-1">{currentTool}</button>
{pixelSize}
<input bind:value={pixelSize} type="range" min="4" max="16" step="4">
<button class="{toggleSymmetry ? 'bg-yellow-300' : 'bg-gray-200'} rounded px-2 py-1" onclick={() => toggleSymmetry = !toggleSymmetry}>toggle symmetry</button>
<button id="clearButton" class="bg-blue-200 rounded px-2 py-1">clear canvas</button>
<button id="copyButton" class="bg-green-200 rounded px-2 py-1">Copy as PNG</button>
<button id="undoButton" class="bg-purple-200 rounded px-2 py-1">Undo</button>
<div class="p-4 bg-gray-200 mt-4">
    <canvas id="pixelCanvas" class="bg-white place-self-center" width="448" height="448"></canvas>
</div>

My favorite feature is the symmetry drawing toggle, which makes it easy to do what I set out to do: little pixel spaceships:

<div class="flex justify-around">
    <img src="data:image/png;base64,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">

    <img src="data:image/png;base64,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">
    </div>