/* 
 * 2D Raycasting
 */

let boundary;
let ray;

function setup()
{
  createCanvas(500, 500);
  boundary = new Boundary(width*0.75, height*0.25, width*0.75, height*0.75);
  ray = new Ray(width*0.25, height*0.5, 1, 0, 25);
}

function draw()
{
  background(0);
  boundary.draw();
  ray.draw();
}
