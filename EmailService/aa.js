function getSliceByIndex(arr, index) {
  const arrayLength = arr.length;
  const endIndex = arrayLength - (index - 1) * 10;
  const startIndex = Math.max(0, endIndex - 10); // Ensure the start index is within bounds

  return arr.slice(startIndex, endIndex);
}
