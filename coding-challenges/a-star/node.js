class Node
{
	constructor(i, j, isWall)
	{
		this.i = i;
		this.j = j;

		this.f = 0; // Result of this.g + this.h
		this.g = 0; // Cost of the path from the start node to n
		this.h = 0; // Estimate cost of the cheapest path from n to the goal

		this.isWall = isWall;
		this.neighbours = [];
		this.previous = undefined; // The node from which this node came
	}

	show()
	{
		push();
			stroke(0);
			translate(this.i * nodeWidth, this.j * nodeHeight);
			if (this.isWall) {
				fill(0);
			} else {
				fill(255);
			}
			ellipse(nodeWidth/2, nodeHeight/2, nodeWidth*0.5, nodeHeight*0.5);
		pop();
	}

	highlight(col)
	{
		push();
			translate(this.i * nodeWidth, this.j * nodeHeight);
			fill(col);
			noStroke();
			ellipse(nodeWidth/2, nodeHeight/2, nodeWidth*0.5, nodeHeight*0.5);
		pop();
	}

	connectWalls(grid)
	{
		if (!this.isWall)
		{
			return;
		}

		push();
			strokeWeight(5);
			stroke(0);
			translate(this.i * nodeWidth + nodeWidth/2, this.j * nodeHeight + nodeHeight/2);

			if (this.i > 0 && grid[this.i-1][this.j].isWall) // Connect wall to the west
			{
				line(0, 0, -nodeWidth, 0);
			}
			if (this.j > 0 && grid[this.i][this.j-1].isWall) // Add node to the north
			{
				line(0, 0, 0, -nodeHeight);
			}
		pop();
	}

	addNeighbours(grid)
	{
		if (this.i > 0) // Add node to the west
		{
			this.neighbours.push(grid[this.i-1][this.j]);
		}
		if (this.i < numCols - 1) // Add node to the east
		{
			this.neighbours.push(grid[this.i + 1][this.j]);
		}
		if (this.j > 0) // Add node to the north
		{
			this.neighbours.push(grid[this.i][this.j-1]);
		}
		if (this.j < numRows - 1) // Add node to the south
		{
			this.neighbours.push(grid[this.i][this.j+1]);
		}
		if (this.i > 0 && this.j > 0) // Add node to north-west
		{
			this.neighbours.push(grid[this.i-1][this.j-1]);
		}
		if (this.i < numCols - 1 && this.j > 0) // Add node to north-east
		{
			this.neighbours.push(grid[this.i+1][this.j-1]);
		}
		if (this.i < 0 && this.j < numRows - 1) // Add node to south-west
		{
			this.neighbours.push(grid[this.i-1][this.j+1]);
		}
		if (this.i < numCols - 1 && this.j < numRows - 1) // Add node to south-east
		{
			this.neighbours.push(grid[this.i+1][this.j+1]);
		}
	}
}
