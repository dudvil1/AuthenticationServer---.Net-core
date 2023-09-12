function getSliceOfArray(arr, index) {
  const sliceSize = 10;
  const startIndex = Math.max(arr.length - index * sliceSize, 0);
  const endIndex = Math.min(startIndex + sliceSize, arr.length);

  return arr.slice(startIndex, endIndex);
}
