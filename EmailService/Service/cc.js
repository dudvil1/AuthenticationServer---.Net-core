const { exec } = require("child_process");
const path = require("path");

// Define the folder path
const folderPath = "path/to/your/folder";

// Function to execute a command
function executeCommand(command, callback) {
  exec(command, { cwd: folderPath }, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Stderr: ${stderr}`);
      return;
    }
    console.log(`Stdout: ${stdout}`);
    if (callback) callback();
  });
}

// Navigate to the specific folder, run git fetch, and then git pull
executeCommand("git fetch", () => {
  console.log("Git fetch completed.");
  executeCommand("git pull", () => {
    console.log("Git pull completed.");
  });
});
