let segments;
let segmentWidth = 10;

async function sleep(ms)
{
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function swap(arr, a, b)
{
  await sleep(100);
  const tmp = arr[a];
  arr[a] = arr[b];
  arr[b] = tmp;
}

async function partition(arr, start, end)
{
  let pivotIndex = start;
  const pivotVal = arr[end];
  for (let i = start; i < end; ++i) {
    if (arr[i] < pivotVal) {
      await swap(arr, i, pivotIndex++);
    }
  }
  await swap(arr, end, pivotIndex);
  return pivotIndex;
}

async function quicksortHelper(arr, start, end)
{
  if (start >= end) {
    return;
  }
  const index = await partition(arr, start, end);
  await quicksortHelper(arr, start, index - 1);
  await quicksortHelper(arr, index + 1, end);
}

async function quicksort(arr)
{
  await quicksortHelper(arr, 0, arr.length-1);
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
