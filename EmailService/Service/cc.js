const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");

function processFilesInFolder(directory, inputName) {
  try {
    const files = fs
      .readdirSync(directory)
      .filter((file) => file.endsWith(".yaml"));
    const differentFile = files.find((file) => file !== inputName);

    if (differentFile) {
      const filePath = path.join(directory, differentFile);
      const fileContent = fs.readFileSync(filePath, "utf8");
      const yamlData = yaml.safeLoad(fileContent);
      // Do whatever you need to do with the YAML data
      console.log(`Processing file: ${differentFile}`);
      console.log(yamlData);
    } else {
      console.log("No file with a different name found.");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

// Usage
const directory = "/path/to/your/folder";
const inputFileName = "your_input_file_name.yaml";
processFilesInFolder(directory, inputFileName);
