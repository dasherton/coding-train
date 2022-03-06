class Node
{
	constructor(i, j)
	{
		this.i = i;
		this.j = j;

		this.f = 0; // Result of this.g + this.h
		this.g = 0; // Cost of the path from the start node to n
		this.h = 0; // Estimate cost of the cheapest path from n to the goal

		this.isWall = false;
		this.neighbours = [];
		this.previous = undefined; // The node from which this node came

		if (random(1) < 0.3)
		{
			this.isWall = true;
		}
	}

	show(col)
	{
		push();
			translate(this.i * nodeWidth, this.j * nodeHeight);

			if (this.isWall)
			{
				fill(0);
			}
			else
			{
				fill(col);
			}

			// Draw node border
			rect(0, 0, nodeWidth - 1, nodeHeight - 1);

			// Draw node member data
			fill(0);
			textSize(15);
			text(
				"g=" + this.g,
				(nodeWidth/2) - (textSize()/2),
				(nodeHeight/2)
			);
			text(
				"h=" + this.h,
				(nodeWidth/2) - (textSize()/2),
				(nodeHeight/2) + (textSize()) + 3
			);
			text(
				"f=" + this.f,
				(nodeWidth/2) - (textSize()/2),
				(nodeHeight/2) + (textSize() * 2) + 3
			);

		pop();
	}

	highlight(col)
	{
		push();
			translate(this.i * nodeWidth, this.j * nodeHeight);
			noFill();
			stroke(col);
			strokeWeight(10);
			rect(5, 5, nodeWidth-10, nodeHeight-10);
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
	}
}
