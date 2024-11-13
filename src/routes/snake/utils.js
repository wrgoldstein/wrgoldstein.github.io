/**
 * Detect collision between two circles.
 * @param {object} circle1 - First circle { x, y, radius }
 * @param {object} circle2 - Second circle { x, y, radius }
 * @returns {boolean} True if the circles collide, false otherwise
 */
export function circleCollision(circle1, circle2, grace = 0) {
	// Calculate the distance between the centers of the two circles
	const dx = circle1.x - circle2.x;
	const dy = circle1.y - circle2.y;
	const distance = Math.sqrt(dx * dx + dy * dy);

	// Check if the distance is less than the sum of the radii
	return distance < grace + circle1.radius + (circle2.radius || 5);
}

/**
 * Linearly interpolate between two points.
 * @param {number} t - Interpolation factor (0 to 1)
 * @param {object} p1 - First point { x, y }
 * @param {object} p2 - Second point { x, y }
 * @returns {object} Interpolated point { x, y }
 */
export function lerp(t, p1, p2) {
	return {
		x: (1 - t) * p1.x + t * p2.x,
		y: (1 - t) * p1.y + t * p2.y
	};
}

/**
 * Generate an array of random points.
 * @param {number} numPoints - The number of points to generate.
 * @param {number} [minX=0] - The minimum x coordinate.
 * @param {number} [maxX=100] - The maximum x coordinate.
 * @param {number} [minY=0] - The minimum y coordinate.
 * @param {number} [maxY=100] - The maximum y coordinate.
 * @returns {Array<{x: number, y: number}>} An array of random points.
 */
export function generateRandomPoints(numPoints, minX = 0, maxX = 100, minY = 0, maxY = 100) {
	const points = [];

	for (let i = 0; i < numPoints; i++) {
		const x = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
		const y = Math.floor(Math.random() * (maxY - minY + 1)) + minY;
		points.push({ x, y });
	}

	return points;
}
