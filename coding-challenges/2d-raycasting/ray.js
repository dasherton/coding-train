/* A ray encapsulates a position and a direction
 */

class Ray {
  constructor(x, y, dx, dy, len) {
    this.pos = createVector(x, y);
    this.dir = createVector(dx, dy);
    this.length = len;
  }

  draw() {
    stroke(255);
    push();
    translate(this.pos.x, this.pos.y);
      ellipse(0, 0, 5, 5);
      line(0, 0, this.dir.x * this.length, this.dir.y * this.length);
    pop();
  }

  lookAt(x, y)
	{
		this.dir.x = x - this.pos.x;
		this.dir.y = y - this.pos.y;
		this.dir.normalize();
	}

  cast(wall) {
    const x1 = wall.start.x;
		const y1 = wall.start.y;
		const x2 = wall.end.x;
		const y2 = wall.end.y;

		const x3 = this.pos.x;
		const y3 = this.pos.y;
		const x4 = this.pos.x + this.dir.x;
		const y4 = this.pos.y + this.dir.y

		const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);

		if (den == 0) {
			return;
		}

		const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
		const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;

		if (t >= 0 && t <= 1 && u >= 0) {
			const pt = createVector();
			pt.x = x1 + t * (x2 - x1);
			pt.y = y1 + t * (y2 - y1);
			return pt;
		}
  }
}
