const numRows = 5;
const numCols = 5;

var nodeWidth;
var nodeHeight;

var openSet = []; // Stores nodes pending evaluation
var closedSet = []; // Stores evaluated nodes

var grid = new Array(numCols);

var startNode;
var endNode;

var path; // The final node path

var finished = false;

function keyPressed()
{
  if (!finished && keyCode === RIGHT_ARROW)
  {
    draw();
  }
}

function removeFromArray(arr, element)
{
  for (var i = arr.length - 1; i >= 0; i--)
  {
    if (arr[i] === element)
    {
      arr.splice(i, 1);
    }
  }
}

function evaluatePath(startingNode)
{
  path = [];
  var tmp = startingNode;
  path.push(tmp);
  while (tmp.previous)
  {
    path.push(tmp.previous);
    tmp = tmp.previous;
  }
}

function getNodeWithLowestFScore(set)
{
  var lowestIndex = 0;
  for (var i = 0; i < set.length; ++i)
  {
    if (set[i].f < set[lowestIndex].f)
    {
      lowestIndex = i;
    }
  }
  return set[lowestIndex];
}

function isValidMove(node)
{
  return !closedSet.includes(node) && !node.isWall;
}

function setup()
{
  createCanvas(500, 500);
  noLoop();

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

  // Add neighbours to each spot in grid
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

  startNode.isWall = false;
  endNode.isWall = false;

  openSet.push(startNode);
}

function heuristic(node1, node2)
{
  //return dist(node1.i, node1.j, node2.i, node2.j); // Euclidian distance
  return abs(node1.i-node2.i) + abs(node1.j-node2.j); // Manhattan distance
}

function draw()
{
  if (openSet.length > 0)
  {
    var current = getNodeWithLowestFScore(openSet);

    if (current === endNode)
    {
      console.log("Reached target");
      noLoop();
      finished = true;
    }

    removeFromArray(openSet, current);
    closedSet.push(current);

    var neighbours = current.neighbours;
    for (var i = 0; i < neighbours.length; ++i)
    {
      var neighbour = neighbours[i];

      if (isValidMove(neighbour))
      {
        var tempG = current.g + 1; // Each neighbour is considered only 1 space away
        var newPath = false;

        if (openSet.includes(neighbour))
        {
          if (tempG < neighbour.g)
          {
            neighbour.g = tempG;
            newPath = true;
          }
        }
        else
        {
          neighbour.g = tempG;
          openSet.push(neighbour);
        }

        if (newPath)
        {
          neighbour.h = heuristic(neighbour, endNode);
          neighbour.f = neighbour.g + neighbour.h;
          neighbour.previous = current;
        }
      }
    }

    evaluatePath(current);
  }
  else
  {
    console.log("No solution");
    noLoop();
    finished = true;
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

  for (var i = 0; i < path.length; ++i)
  {
    path[i].show(color(0, 0, 255));
  }

  startNode.highlight(color('green'));
  endNode.highlight(color('yellow'));
}
