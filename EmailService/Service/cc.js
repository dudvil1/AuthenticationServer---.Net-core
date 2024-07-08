const { exec } = require("child_process");

class GitAutomation {
  constructor(paths) {
    this.paths = paths;
  }

  // Function to execute a command in a given path
  executeCommand(command, path) {
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
  async fetchAndPullAll() {
    for (let path of this.paths) {
      try {
        console.log(`Running git fetch and pull in ${path}...`);
        await this.executeCommand("git fetch", path);
        console.log(`Git fetch completed in ${path}.`);
        await this.executeCommand("git pull", path);
        console.log(`Git pull completed in ${path}.`);
      } catch (error) {
        console.error(
          `Failed to run git commands in ${path}: ${error.message}`
        );
      }
    }
  }

  // Function to run fetchAndPullAll every 12 minutes
  startPeriodicFetchAndPull(interval = 12 * 60 * 1000) {
    // Default interval of 12 minutes
    // Run immediately
    this.fetchAndPullAll();

    // Set interval
    setInterval(() => {
      this.fetchAndPullAll();
    }, interval);
  }
}

// Usage
const paths = [
  "path/to/your/first/folder",
  "path/to/your/second/folder",
  "path/to/your/third/folder",
];

const gitAutomation = new GitAutomation(paths);

// Run fetch and pull for all paths immediately
gitAutomation.fetchAndPullAll();

// Start periodic fetch and pull every 12 minutes
gitAutomation.startPeriodicFetchAndPull();
