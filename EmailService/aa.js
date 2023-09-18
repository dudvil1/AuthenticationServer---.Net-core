function extractDockerBuildRunText(text) {
  // Split the text into an array of lines.
  const lines = text.split("\n");

  // Find the index of the first line that contains "docker build".
  const buildIndex = lines.findIndex((line) => line.includes("docker build"));

  // Find the index of the first line that contains "docker run" after the index of the "docker build" line.
  const runIndex = lines.findIndex(
    (line, index) => line.includes("docker run") && index > buildIndex
  );

  // Extract the lines from the array between the two indices.
  const extractedLines = lines.slice(buildIndex + 1, runIndex);

  // Return the extracted lines as a string.
  return extractedLines.join("\n");
}
