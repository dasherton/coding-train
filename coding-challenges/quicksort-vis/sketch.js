let segments;
let segmentWidth = 10;

function swap(arr, a, b)
{
  const tmp = arr[a];
  arr[a] = arr[b];
  arr[b] = tmp;
}

function partition(arr, start, end)
{
  let pivotIndex = start;
  const pivotVal = arr[end];
  for (let i = start; i < end; ++i) {
    if (arr[i] < pivotVal) {
      swap(arr, i, pivotIndex++);
    }
  }
  swap(arr, end, pivotIndex);
  return pivotIndex;
}

function quicksortHelper(arr, start, end)
{
  if (start >= end) {
    return;
  }
  const index = partition(arr, start, end);
  quicksortHelper(arr, start, index - 1);
  quicksortHelper(arr, index + 1, end);
}

function quicksort(arr)
{
  quicksortHelper(arr, 0, arr.length-1);
}

function setup()
{
  createCanvas(800, 200);
  segments = new Array(floor(width/segmentWidth));
  for (let i = 0; i < segments.length; ++i) {
    segments[i] = random(height);
  }
  quicksort(segments);
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
