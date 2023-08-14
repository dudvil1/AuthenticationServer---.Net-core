const { NodeSSH } = require("node-ssh");
const ssh = new NodeSSH();
const dotenv = require("dotenv");
dotenv.config(); // Load environment variables from .env file

function executeSSHCommands(params) {
  const sshConfig = {
    host: "your_server_hostname_or_ip",
    port: 22,
    username: "your_username",
    password: "your_password", // OR privateKey: 'path/to/private/key'
  };

  ssh
    .connect(sshConfig)
    .then(() => {
      // Step 1: Run 'ls' command
      return ssh.execCommand("ls");
    })
    .then((lsResult) => {
      if (lsResult.code !== 0) {
        console.error("Error executing ls command:", lsResult.stderr);
        return;
      }

      const lsOutput = lsResult.stdout;

      // Step 2: Check if 'DcsEKS' folder exists in the ls output
      if (!lsOutput.includes("DcsEKS")) {
        console.log("'DcsEKS' folder not found.");
        ssh.dispose();
        return;
      }

      // Step 3: Check if folderName exists inside 'DcsEKS'
      const dcsEKSPath = `DcsEKS/${params}`;
      if (!lsOutput.includes(dcsEKSPath)) {
        // Step 4: Create folderName folder within 'DcsEKS'
        return ssh.execCommand(`mkdir ${dcsEKSPath}`).then((mkdirResult) => {
          if (mkdirResult.code !== 0) {
            console.error(
              `Error creating ${dcsEKSPath} folder:`,
              mkdirResult.stderr
            );
            return;
          }

          // Step 5: Clone repository using Git URL from environment variable
          const gitCloneUrl = `${process.env.GIT_URL}${params}.git`;
          return ssh.execCommand(
            `cd ${dcsEKSPath} && git clone ${gitCloneUrl}`
          );
        });
      } else {
        // Step 5: Run 'git pull' inside the existing folder
        return ssh.execCommand(`cd ${dcsEKSPath} && git pull`);
      }
    })
    .then((gitResult) => {
      if (gitResult && gitResult.code !== 0) {
        console.error("Error running Git command:", gitResult.stderr);
      }
    })
    .catch((err) => {
      console.error("SSH connection error:", err);
    })
    .finally(() => {
      ssh.dispose();
    });
}

// Call the function with the user input (params)
const userInput = "folder_name"; // Replace with the desired folder name
executeSSHCommands(userInput);
