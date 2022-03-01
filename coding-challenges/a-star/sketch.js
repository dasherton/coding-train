const numRows = 5;
const numCols = 5;

var openSet = []; // Stored nodes pending evaluation
var closedSet = []; // Stores all evaluated nodes

var grid = new Array(numCols);

var start;
var end;

function setup()
{
  createCanvas(500, 500);

  for (var col = 0; col < numCols; ++col)
  {
    grid[col] = new Array(numRows);
  }

  for (var col = 0; col < numCols; ++col)
  {
    for (var row = 0; row < numRows; ++row)
    {
      grid[col][row] = new Node();
    }
  }

  // Pick appropriate start and end nodes
  start = grid[0][0];
  end = grid[numCols-1][numRows-1];

  openSet.push(start);
}

function draw()
{
  background(0);
  translate((width/numCols)/2, (height/numRows)/2);
  
  for (var col = 0; col < numCols; ++col)
  {
    for (var row = 0; row < numRows; ++row)
    {
      fill(255, 0, 0);
      ellipse(col * (width/numCols), row * (height/numRows), 10, 10);
    }
  }
}
