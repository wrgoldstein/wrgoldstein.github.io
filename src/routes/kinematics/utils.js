/**
 * Detect collision between two circles.
 * @param {object} circle1 - First circle { x, y, radius }
 * @param {object} circle2 - Second circle { x, y, radius }
 * @returns {boolean} True if the circles collide, false otherwise
 */
export function circleCollision(circle1, circle2) {
  // Calculate the distance between the centers of the two circles
  const dx = circle1.x - circle2.x;
  const dy = circle1.y - circle2.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  // Check if the distance is less than the sum of the radii
  return distance < circle1.radius + circle2.radius;
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
    y: (1 - t) * p1.y + t * p2.y,
  };
}
