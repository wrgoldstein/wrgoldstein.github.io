<script>
	import { lerp, circleCollision, generateRandomPoints } from './utils.js';
	let box = $state();
	let m = $state({ x: 0, y: 0 });
	let head = $state(new Circle(400, 200, 14));
	let circles = $state([]);

	let collisionDetected = $state(false);
	let collisionGrace = 1;
	let score = $state(0);
	let topScores = $state([]);
	let sortedScores = $derived([...topScores].sort((a, b) => b - a));
	let fill = $derived(collisionDetected ? 'red' : 'PaleVioletRed');

	function handler(event) {
		m.x = event.clientX;
		m.y = event.clientY;
	}

	function step() {
		const b = box.getBoundingClientRect();
		let l = lerp(0.05, head, { x: m.x - b.x, y: m.y });
		head.x = l.x;
		head.y = l.y;
		collisionDetected = false;
		circles.forEach((b, i) => {
			b.tick();

			if (i > 7 && circleCollision(head, b)) {
				collisionDetected = true;
			}
		});

		const eaten = food.findIndex((f) => circleCollision(head, f, collisionGrace - 1));
		if (eaten != -1) {
			score++;
			food.splice(eaten, 1);
			const newCircle = new Circle(0, 0, 1);
			newCircle.setFollowing(circles[circles.length - 1], 10);
			newCircle.tick();
			circles.push(newCircle);
			head.radius += 0.15;
			circles.forEach((c, i) => {
				if (i == 0) {
					circles[i].radius += 0.25;
				} else if (i < circles.length / 2) {
					c.radius *= 1.02;
					c.setFollowAt(c.radius * 0.9);
				} else {
					c.radius += 1;
					c.setFollowAt(c.radius * 0.9);
				}
			});

			head.radius += 0.05;

			if (Math.random() > 0.75) {
				const l = circles.length - 2;
				circles.splice(l, 1);
				const c = circles[l];
				circles[l].setFollowing(circles[l - 1], circles[l - 1].radius);
				circles[l].radius *= 2;
			}
		}
		requestAnimationFrame(step);
	}

	import Circle from './Circle.svelte.js';

	function circlesToHull(circles) {
		if (!circles[0]?.left) return;
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
			.replace(/^L/, 'M');
	}

	function resetCircles() {
		let body = [
			new Circle(head.x, head.y, 14),
			new Circle(head.x, head.y, 16),
			new Circle(head.x, head.y, 17),
			new Circle(head.x, head.y, 18),
			new Circle(head.x, head.y, 19),
			new Circle(head.x, head.y, 18),
			new Circle(head.x, head.y, 17),
			new Circle(head.x, head.y, 14),
			new Circle(head.x, head.y, 12),
			new Circle(head.x, head.y, 9),
			new Circle(head.x, head.y, 7),
			new Circle(head.x, head.y, 3),
			new Circle(head.x, head.y, 1)
		];
		head = new Circle(head.x, head.y, 14);
		for (let i = 0; i < body.length; i++) {
			if (i == 0) {
				body[i].setFollowing(head, 0);
			} else {
				body[i].setFollowing(body[i - 1], Math.min(body[i - 1].radius, 12));
			}
		}
		circles = body;
	}

	let hull = $derived.by(() => {
		return circlesToHull(circles);
	});

	let food = $state(generateRandomPoints(10, 400, 1200, 100, 600));

	setInterval(() => {
		if (collisionDetected && score > 0) {
			food = [];
			topScores.push(score);
			score = 0;
			resetCircles();
		}
		if (food.length < 20) {
			const [f] = generateRandomPoints(1, 400, 1200, 100, 600);
			food.push(f);
		}
	}, 200);

	$effect.root(() => {
		resetCircles();
		requestAnimationFrame(step);
	});
</script>

<svelte:body onmousemove={handler} />
<div class="w-full">
	<div class="fixed right-[30rem] top-10">
		<span class="text-7xl">{score}</span>
		<div>
			{#if sortedScores.length > 0}
				Previous best:
				{#each sortedScores as s, i}
					<div style="opacity: {(10 - i) / 10}">{s}</div>
				{/each}
			{/if}
		</div>
	</div>

	<svg class="fixed top-0 left-0 h-full w-full" viewport="0 0 600 400" bind:this={box}>
		<circle cx={head.x} cy={head.y} r={head.radius} {fill}></circle>

		{#each circles as circle}
			{#if circle.left}
				<circle cx={circle.left.x} cy={circle.left.y} r={5} fill="purple"></circle>
				<circle cx={circle.right.x} cy={circle.right.y} r={5} fill="purple"></circle>
				<path d={hull} {fill} fill-opacity="0.1"></path>
			{/if}
			<!-- <circle
        cx={circle.x}
        cy={circle.y}
        r={circle.radius}
        fill="none"
        stroke="black"
      ></circle> -->
		{/each}

		{#each food as f}
			<rect x={f.x} y={f.y} width="10" height="10"></rect>
		{/each}
	</svg>
	<div style="z-index: 999;" class="relative">
		<a href="/">back</a>
	</div>
</div>
