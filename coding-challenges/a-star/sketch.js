const numRows = 5;
const numCols = 5;

var nodeWidth;
var nodeHeight;

var openSet = []; // Stores nodes pending evaluation
var closedSet = []; // Stores evaluated nodes

var grid = new Array(numCols);

var startNode;
var endNode;

function removeFromArray(arr, element)
{
  for (var i = arr.length - 1; i >= 0; i--)
  {
    if (element === arr[i])
    {
      arr.slice(i, 1);
    }
  }
}

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

  // Create nodes in the grid
  for (var col = 0; col < numCols; ++col)
  {
    for (var row = 0; row < numRows; ++row)
    {
      grid[col][row] = new Node(col, row);
    }
  }

  // Add neightbours to each spot in grid
  for (var col = 0; col < numCols; ++col)
  {
    for (var row = 0; row < numRows; ++row)
    {
      grid[col][row].addNeighbours(grid);
    }
  }

  // Pick appropriate start and end nodes
  startNode = grid[0][0];
  endNode = grid[numCols-1][numRows-1];

  openSet.push(startNode);
}

function draw()
{
  if (openSet.length > 0)
  {
    var lowestIndex = 0;
    for (var i = 0; i < openSet.length; ++i)
    {
      if (openSet[i].f < openSet[lowestIndex].f)
      {
        lowestIndex = i;
      }
    }
    var current = openSet[lowestIndex];

    if (current === endNode)
    {
      console.log("Reached target");
      noLoop();
    }

    removeFromArray(openSet, current);
    closedSet.push(current);
  }
  else
  {
    // No nodes left to consider
  }

  for (var col = 0; col < numCols; ++col)
  {
    for (var row = 0; row < numRows; ++row)
    {
      grid[col][row].show(color(255));
    }
  }

  for (var i = 0; i < openSet.length; ++i)
  {
    openSet[i].show(color(0, 255, 0, 100));
  }

  for (var i = 0; i < closedSet.length; ++i)
  {
    closedSet[i].show(color(255, 0, 0, 100));
  }
}
