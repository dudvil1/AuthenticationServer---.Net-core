const fs = require("fs");

// Read the text file
const fileContents = fs.readFileSync("your_file.txt", "utf8");

const startPhrase = "docker build";
const endPhrase = "docker run";

const startIndex = fileContents.indexOf(startPhrase);
const endIndex = fileContents.indexOf(endPhrase);

if (startIndex !== -1 && endIndex !== -1) {
  const extractedText = fileContents
    .substring(startIndex + startPhrase.length, endIndex)
    .trim();
  console.log(extractedText);
} else {
  console.log("Start and/or end phrases not found in the file.");
}
