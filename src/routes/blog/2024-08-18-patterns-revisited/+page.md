<script>
    import {onMount} from 'svelte'

    const size = 100

    const tickInterval = 150
    const maxGenerations = 100

    const a = [...Array(size).keys()]

	let grid = $state(a.map(_ => a.map(_ => 0)));

    function setWhite(x,y){
        set(x,y,1)
    }

    function set(x,y,z){
        let row = grid[y]
        row[x] = z
		grid[y] = row
    }

    function getNeighbors(x,y){
        let arr = []
        arr.push(grid?.[y-1]?.[x-1])
        arr.push(grid?.[y-1]?.[x])
        arr.push(grid?.[y-1]?.[x+1])

        arr.push(grid?.[y]?.[x-1])
        arr.push(grid?.[y]?.[x])
        arr.push(grid?.[y]?.[x+1])

        arr.push(grid?.[y+1]?.[x-1])
        arr.push(grid?.[y+1]?.[x])
        arr.push(grid?.[y+1]?.[x+1])

        return arr.filter(i => i >= 0)
    }

    function newState(x, y){
        const s = grid[y][x] // self
        const n = getNeighbors(x,y).reduce((p,v) => p+v) // # alive neighbors

        return s && n < 2 ? 0 : // Any live cell with fewer than two live neighbours dies, as if by underpopulation.
               s && n == 2 || n == 3 ? 1 : // Any live cell with two or three live neighbours lives on to the next generation.
               s && n > 3 ? 0 : // Any live cell with more than three live neighbours dies, as if by overpopulation.
               !s && n == 3 ? 1 : // Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
               s
    }

    let interval = $state()
    let ticks = $state(0)

    function tick(){
        grid = a.map((y) => {
            return a.map((x) => newState(x, y))
        })
        ticks++
        if (ticks >= maxGenerations){
            clearInterval(interval)
        }
    }

    

    onMount(() => {
        grid = a.map(() => {
            return a.map(() => 
                Math.random() > 0.2 ? 0 : 1
            )
        })

        interval = setInterval(tick, tickInterval)
    })
</script>

# plan: 
 - simple cellular automaton
 - js component to keep state
 - 

<pre class="text-white"> {ticks} </pre>
 <button onclick={tick} class="bg-white">TICK</button>
 <div class="flex flex-col w-full">
    {#each grid as row, y}
        <div class="flex justify-center">
            {#each row as cell, x}
                <div 
                    class="text-white {cell === 0 ? "bg-black" : "bg-gray-500"} min-w-1 min-h-1 content-center text-center"
                    onclick={() => setWhite(x,y)}
                    ></div>
            {/each}
        </div>
    {/each}
</div>