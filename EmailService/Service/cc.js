const { exec } = require("child_process");

// Define the folder paths
const paths = [
  "path/to/your/first/folder",
  "path/to/your/second/folder",
  "path/to/your/third/folder",
];

// Function to execute a command in a given path
function executeCommand(command, path) {
  return new Promise((resolve, reject) => {
    exec(command, { cwd: path }, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error in ${path}: ${error.message}`);
        reject(error);
        return;
      }
      if (stderr) {
        console.error(`Stderr in ${path}: ${stderr}`);
      }
      console.log(`Stdout in ${path}: ${stdout}`);
      resolve();
    });
  });
}

// Function to run git fetch and pull for each path
async function fetchAndPullAll() {
  for (const path of paths) {
    try {
      console.log(`Running git fetch and pull in ${path}...`);
      await executeCommand("git fetch", path);
      console.log(`Git fetch completed in ${path}.`);
      await executeCommand("git pull", path);
      console.log(`Git pull completed in ${path}.`);
    } catch (error) {
      console.error(`Failed to run git commands in ${path}: ${error.message}`);
    }
  }
}

// Function to run fetchAndPullAll every 1 minute
function startPeriodicFetchAndPull(interval = 1 * 60 * 1000) {
  // Default interval of 1 minute
  // Run immediately
  fetchAndPullAll();

  // Set interval
  setInterval(() => {
    fetchAndPullAll();
  }, interval);
}

// Start periodic fetch and pull every 1 minute
startPeriodicFetchAndPull();
