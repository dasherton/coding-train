/* A ray has a position and owns a direction vector. 
 * The position of the ray is the same as its "parent"
 * and is modified over time, therefore the Ray does not
 * own its own copy of the position. It just references
 * one.
 */

class Ray {
  constructor(pos, angle, len) {
    this.pos = pos;
    this.dir = p5.Vector.fromAngle(angle);
    this.length = len;
  }
  
  draw() {
    push();
      translate(this.pos.x, this.pos.y);
      stroke(255);
      ellipse(0, 0, 5, 5);
      line(0, 0, this.dir.x * this.length, this.dir.y * this.length);
    pop();
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
