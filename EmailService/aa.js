const fs = require("fs");

// Define the input file path
const inputFilePath = "your_input.txt";

// Read the contents of the file
fs.readFile(inputFilePath, "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  // Use regular expressions to extract text between "docker build" and "docker run"
  const regex = /docker build([\s\S]*?)docker run/g;
  const matches = [...data.matchAll(regex)];

  // Extracted text will be stored in this array
  const extractedText = [];

  // Iterate over the matches and extract the content
  for (const match of matches) {
    extractedText.push(match[1].trim());
  }

  // Join the extracted text into a single string (if needed)
  const finalText = extractedText.join("\n");

  // Print or process the final text
  console.log(finalText);
});
