let segments;
let states = [];

const SEGMENT_WIDTH = 30;

const DEFAULT_STATE = -1;
const PIVOT_INDEX_STATE = 0;
const CURRENT_PARTITION_STATE = 1;

async function sleep(ms)
{
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function swap(arr, a, b)
{
  await sleep(200);
  const tmp = arr[a];
  arr[a] = arr[b];
  arr[b] = tmp;
}

async function partition(arr, start, end)
{
  let pivotIndex = start;
  const pivotVal = arr[end];

  states[pivotIndex] = PIVOT_INDEX_STATE;
  for (let i = start; i < end; ++i) {
    states[i] = CURRENT_PARTITION_STATE;
  }

  for (let i = start; i < end; ++i) {
    if (arr[i] < pivotVal) {
      await swap(arr, i, pivotIndex);
      states[pivotIndex] = DEFAULT_STATE;
      ++pivotIndex;
      states[pivotIndex] = PIVOT_INDEX_STATE;
    }
  }
  await swap(arr, end, pivotIndex);
  
  for (let i = start; i < end; ++i) {
    if (i != pivotIndex) {
      states[i] = DEFAULT_STATE;
    }
  }  
  return pivotIndex;
}

async function quicksortHelper(arr, start, end)
{
  if (start >= end) {
    return;
  }
  const index = await partition(arr, start, end);
  states[index] = DEFAULT_STATE;
  await Promise.all([
      quicksortHelper(arr, start, index - 1),
      quicksortHelper(arr, index + 1, end)
  ]);
}

async function quicksort(arr)
{
  await quicksortHelper(arr, 0, arr.length-1);
}

function setup()
{
  createCanvas(800, 200);
  segments = new Array(floor(width/SEGMENT_WIDTH));
  for (let i = 0; i < segments.length; ++i) {
    segments[i] = random(height);
    states[i] = DEFAULT_STATE;
  }
  quicksort(segments);
}

function draw()
{
  background(0);
  for (let i = 0; i < segments.length; ++i) {
    stroke(0);
    if (states[i] == PIVOT_INDEX_STATE) {
      fill(color('red'));
    } else if (states[i] == CURRENT_PARTITION_STATE){
      fill(color('green'));
    } else {
      fill(255);
    }
    rect(i * SEGMENT_WIDTH, height-segments[i], SEGMENT_WIDTH, segments[i]);
  }
}
