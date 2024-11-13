<script>
  import { lerp, circleCollision } from "./utils.js";
  let box = $state();
  let circles = $state([]);

  let collisionDetected = $state(false);
  let fill = $derived(collisionDetected ? 'red' : 'PaleVioletRed')
  function handler(e) {
    const b = box.getBoundingClientRect();

    let l = lerp(0.15, head, { x: e.x - b.x, y: e.y });
    head.x = l.x;
    head.y = l.y;
    collisionDetected = false;
    body.map((b, i) => {
      b.tick();

      if (i > 2 && circleCollision(head, b)) {
        collisionDetected = true;
      }
    });
  }

  import Circle from "./Circle.svelte.js";

  function circlesToHull(circles) {
    if (!circles[0].left) return;
    const [a, b] = circles.reduce(
      ([a, b], c) => {
        return [a.concat(c.left), b.concat(c.right)];
      },
      [[], []]
    );

    return [a, b.reverse()]
      .flat()
      .map(({ x, y }) => `L ${x} ${y}`)
      .join()
      .replace(/^L/, "M");
  }

  let head = new Circle(400, 200, 14);
  let body = [
    new Circle(0, 0, 10),
    new Circle(0, 0, 11),
    new Circle(0, 0, 13),
    new Circle(0, 0, 15),
    new Circle(0, 0, 13),
    new Circle(0, 0, 15),
    new Circle(0, 0, 14),
    new Circle(0, 0, 13),
    new Circle(0, 0, 12),
    new Circle(0, 0, 9),
    new Circle(0, 0, 7),
    new Circle(0, 0, 3),
    new Circle(0, 0, 1),
  ];
  for (let i = 0; i < body.length; i++) {
    if (i == 0) {
      body[i].setFollowing(head, 0);
    } else {
      body[i].setFollowing(body[i - 1], Math.min(body[i - 1].radius, 5));
    }
  }
  // makes the list reactive.. not really used
  circles = body;

  let hull = $derived.by(() => {
    return circlesToHull(circles);
  });
</script>

<svelte:body onmousemove={handler} />
<div class="w-full">
  {collisionDetected}
  <svg
    class="fixed top-0 left-0 h-full w-full"
    viewport="0 0 600 400"
    bind:this={box}
  >
    <circle
      cx={head.x}
      cy={head.y}
      r={head.radius}
      fill={fill}
    ></circle>

    {#each circles as circle}
      <!-- <circle cx={circle.x} cy={circle.y} r={circle.radius} fill="none" stroke="black"></circle> -->
      {#if circle.left}
        <!-- <circle cx={circle.left.x} cy={circle.left.y} r={5} fill="purple"></circle>
        <circle cx={circle.right.x} cy={circle.right.y} r={5} fill="purple"></circle> -->
        <path d={hull} fill={fill}></path>
      {/if}
    {/each}
  </svg>
</div>
