const fs = require("fs");
const { exec } = require("child_process");

const csFilePath = "path/to/your/file.cs";
const outputJsFilePath = "path/to/your/output.js";

// Read C# file content
const csFileContent = fs.readFileSync(csFilePath, "utf-8");

// Create a temporary file with a .js extension
const tempJsFilePath = "path/to/your/temp.js";
fs.writeFileSync(tempJsFilePath, csFileContent, "utf-8");

// Define your transformation logic using jscodeshift
function transform(fileInfo, api) {
  const j = api.jscodeshift;
  // Modify the AST as needed
  // For example, you can change property names or values here
  // The example below just adds a comment to each property
  return j(fileInfo.source)
    .find(j.Property)
    .forEach((path) => {
      path.value.leadingComments = [
        {
          type: "CommentBlock",
          value: "Modified by the transformation script",
        },
      ];
    })
    .toSource();
}

// Run the jscodeshift transformation
exec(
  `jscodeshift -t ${__dirname}/transformCsToJs.js ${tempJsFilePath}`,
  (error, stdout, stderr) => {
    if (error) {
      console.error(`Error during transformation: ${stderr || error.message}`);
      return;
    }

    // Read the modified JavaScript content
    const modifiedJsCode = fs.readFileSync(tempJsFilePath, "utf-8");

    // Write the modified code back to the output file
    fs.writeFileSync(outputJsFilePath, modifiedJsCode, "utf-8");

    console.log("Conversion completed.");

    // Optionally, remove the temporary file
    fs.unlinkSync(tempJsFilePath);
  }
);
