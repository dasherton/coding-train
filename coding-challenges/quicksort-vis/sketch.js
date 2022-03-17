let segments;
let segmentWidth = 10;

function setup()
{
  createCanvas(800, 200);
  segments = new Array(floor(width/segmentWidth));
  for (let i = 0; i < segments.length; ++i) {
    segments[i] = random(height);
  }
}

function draw()
{
  background(0);
  for (let i = 0; i < segments.length; ++i) {
    stroke(0);
    fill(255);
    rect(i * segmentWidth, height-segments[i], segmentWidth, segments[i]);
  }
}
