class Node
{
	constructor(i, j)
	{
		this.i = i;
		this.j = j;

		this.f = 0;
		this.g = 0;
		this.h = 0;

		this.neighbours = [];
	}

	show(col)
	{
		fill(col);
		rect(this.i * nodeWidth, this.j * nodeHeight, nodeWidth - 1, nodeHeight - 1);
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
