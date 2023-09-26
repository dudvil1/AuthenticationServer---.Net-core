const fs = require("fs");
const path = require("path");

function findPortsInFolders(baseDir, targetPort) {
  const ports = [];

  function processFolder(folderPath) {
    const files = fs.readdirSync(folderPath);

    if (files.includes("package.json")) {
      const packageJsonPath = path.join(folderPath, "package.json");
      const packageJson = require(packageJsonPath); // You can use require to read package.json

      if (packageJson && packageJson.port) {
        ports.push(packageJson.port);
      }
    }

    // Recursively process subfolders
    for (const file of files) {
      const filePath = path.join(folderPath, file);
      if (fs.statSync(filePath).isDirectory()) {
        processFolder(filePath);
      }
    }
  }

  processFolder(baseDir);

  // Check if the targetPort is included in the collected ports
  const portExists = ports.includes(targetPort);

  return portExists;
}

// Example usage:
const baseDirectory = "/path/to/your/directory";
const targetPort = 3000; // Replace with the port you want to check
const result = findPortsInFolders(baseDirectory, targetPort);

if (result) {
  console.log(`Port ${targetPort} is found in the package.json files.`);
} else {
  console.log(`Port ${targetPort} is not found in the package.json files.`);
}
