/* A particle has a position and many rays pointing outwards
 */

class Particle {
  constructor(x, y, angleVelocity) {
    this.pos = createVector(x, y);
	this.rays = [];

	for (let a = 0; a < 360; a += angleVelocity) {
	  this.rays.push(new Ray(this.pos, radians(a), 25));
	}
  }

  update(x, y) {
	  this.pos.x = x;
	  this.pos.y = y;
  }

  look(wall) {
	for (let i = 0; i < this.rays.length; ++i) {
		let pt = this.rays[i].cast(wall);
		if (pt) {
		  line(this.pos.x, this.pos.y, pt.x, pt.y);
		}
	}
  }

  draw() {
	  ellipse(this.pos.x, this.pos.y, 5, 5);
  }
}
