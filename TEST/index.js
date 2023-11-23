const fs = require("fs");

const filePath = "C:/Users/Dudu/Desktop/ee/ab.cs";

// Read the content of the C# file
fs.readFile(filePath, "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  var lines = data.split("\r\n");
  var verb = "dudu";
  // Iterate through each line
  for (let i = 0; i < lines.length; i++) {
    // Check if the line starts with "dudu"
    if (lines[i].trim().startsWith("dudu")) {
      // Replace the enum value
      lines[i] = lines[i].replace(`/${verb}\s*=\s*1/, "${verb} = 10"`);
    }
  }

  // Join the updated lines back into a string
  const updatedData = lines.join("\r\n");

  // Write the updated content back to the file
  fs.writeFile(filePath, updatedData, "utf8", (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("C# file updated successfully.");
  });
});
