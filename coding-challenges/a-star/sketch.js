const numRows = 5;
const numCols = 5;

var nodeWidth;
var nodeHeight;

var openSet = []; // Stores nodes pending evaluation
var closedSet = []; // Stores evaluated nodes

var grid = new Array(numCols);

var startNode;
var endNode;

function setup()
{
  createCanvas(numCols * 100, numRows * 100);

  nodeWidth = width / numCols;
  nodeHeight = height / numRows;

  // Create column-wise 2D grid
  for (var col = 0; col < numCols; ++col)
  {
    grid[col] = new Array(numRows);
  }

  for (var col = 0; col < numCols; ++col)
  {
    for (var row = 0; row < numRows; ++row)
    {
      grid[col][row] = new Node(col, row);
    }
  }

  // Pick appropriate start and end nodes
  startNode = grid[0][0];
  endNode = grid[numCols-1][numRows-1];

  openSet.push(startNode);
}

function draw()
{
  background(255);

  for (var col = 0; col < numCols; ++col)
  {
    for (var row = 0; row < numRows; ++row)
    {
      grid[col][row].show(color(255));
    }
  }

  for (var i = 0; i < openSet.length; ++i)
  {
    console.log(i);
    openSet[i].show(color('green'));
  }

  // Draw end node in red
  fill(color('red'));
  rect(endNode.x * nodeWidth, endNode.y * nodeHeight, nodeWidth, nodeHeight);
}
