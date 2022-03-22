/* 
 * 2D Raycasting
 */

let boundary;
let particle;

const ANGLE_VELOCITY = 10;

function setup()
{
  createCanvas(500, 500);
  boundary = new Boundary(width*0.75, height*0.25, width*0.75, height*0.75);
  particle = new Particle(100, 100, ANGLE_VELOCITY);
}

function draw()
{
  background(0);

  particle.update(mouseX, mouseY);
  particle.look(boundary);

  boundary.draw();
  particle.draw();
}
