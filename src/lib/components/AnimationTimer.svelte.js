export function AnimationTimer(loop_time) {
	let zero;
	let time = $state();

	function start() {
		time = 0;
		requestAnimationFrame(firstFrame);
	}

	function firstFrame(timestamp) {
		zero = timestamp;
		animate(timestamp);
	}

	function animate(timestamp) {
		time = timestamp - zero;
		if (time < loop_time) {
			requestAnimationFrame((t) => animate(t));
		} else {
			start();
		}
	}

	return {
		get time() {
			return time;
		},
		start
	};
}
