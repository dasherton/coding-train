/* 
 * 2D Raycasting
 */

let boundary;

function setup()
{
  createCanvas(500, 500);
  boundary = new Boundary(0, 0, width, height);
}

function draw()
{
  background(0);
  boundary.draw();
}
