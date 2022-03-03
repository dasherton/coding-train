class Node
{
	constructor(x, y)
	{
		this.x = x;
		this.y = y;

		this.f = 0;
		this.g = 0;
		this.h = 0;
	}

	show(col)
	{
		fill(col);
		rect(this.x * nodeWidth, this.y * nodeHeight, nodeWidth - 1, nodeHeight - 1);
	}
}
