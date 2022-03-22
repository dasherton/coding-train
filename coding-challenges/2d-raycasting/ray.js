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
}
