const ssh2 = require("ssh2");
const dotenv = require("dotenv");
const fs = require("fs");

dotenv.config(); // Load environment variables from .env file

function executeSSHCommands(params) {
  const conn = new ssh2.Client();

  conn.on("ready", () => {
    // Step 1: Run 'ls' command
    conn.exec("ls -l", (lsErr, lsStream) => {
      if (lsErr) {
        console.error("Error executing ls command:", lsErr);
        conn.end();
        return;
      }

      let lsOutput = "";

      lsStream
        .on("close", (lsCode, lsSignal) => {
          console.log(`ls Command exited with code ${lsCode}`);

          // Step 2: Check if 'DcsEKS' folder exists in the ls output
          if (lsOutput.includes("DcsEKS")) {
            // Step 3: Check if folderName (param) folder exists within 'DcsEKS'
            if (!lsOutput.includes(`DcsEKS/${params}`)) {
              // Step 4: Create folderName folder within 'DcsEKS'
              conn.exec(`mkdir DcsEKS/${params}`, (mkdirErr, mkdirStream) => {
                if (mkdirErr) {
                  console.error(`Error creating ${params} folder:`, mkdirErr);
                  conn.end();
                  return;
                }

                mkdirStream
                  .on("close", (mkdirCode, mkdirSignal) => {
                    console.log(`mkdir Command exited with code ${mkdirCode}`);
                    gitClone(params); // After creating folder, call gitClone
                  })
                  .on("data", (mkdirData) => {
                    console.log(`mkdir Output: ${mkdirData}`);
                  })
                  .stderr.on("data", (mkdirErrData) => {
                    console.log(`mkdir Error: ${mkdirErrData}`);
                  });
              });
            } else {
              gitPull(params); // If folder exists, call gitPull
            }
          } else {
            console.log("DcsEKS folder not found.");
            conn.end();
          }
        })
        .on("data", (lsData) => {
          lsOutput += lsData;
          console.log(`ls Output: ${lsData}`);
        })
        .stderr.on("data", (lsErrData) => {
          console.log(`ls Error: ${lsErrData}`);
        });
    });
  });

  conn.on("error", (err) => {
    console.error("SSH connection error:", err);
    conn.end();
  });

  conn.on("end", () => {
    console.log("SSH connection closed.");
  });

  conn.connect({
    host: "your_server_hostname_or_ip",
    port: 22,
    username: "your_username",
    password: "your_password", // OR privateKey: require('fs').readFileSync('path/to/private/key')
  });
}

function gitClone(params) {
  const envGitUrl = process.env.GIT_URL + params;

  const cloneCommand = `git clone ${envGitUrl} DcsEKS/${params}`;

  conn.exec(cloneCommand, (cloneErr, cloneStream) => {
    if (cloneErr) {
      console.error(`Error cloning repository:`, cloneErr);
      conn.end();
      return;
    }

    cloneStream
      .on("close", (cloneCode, cloneSignal) => {
        console.log(`git clone Command exited with code ${cloneCode}`);
        conn.end();
      })
      .on("data", (cloneData) => {
        console.log(`git clone Output: ${cloneData}`);
      })
      .stderr.on("data", (cloneErrData) => {
        console.log(`git clone Error: ${cloneErrData}`);
      });
  });
}

function gitPull(params) {
  const pullCommand = `cd DcsEKS/${params} && git pull`;

  conn.exec(pullCommand, (pullErr, pullStream) => {
    if (pullErr) {
      console.error(`Error pulling repository:`, pullErr);
      conn.end();
      return;
    }

    pullStream
      .on("close", (pullCode, pullSignal) => {
        console.log(`git pull Command exited with code ${pullCode}`);
        conn.end();
      })
      .on("data", (pullData) => {
        console.log(`git pull Output: ${pullData}`);
      })
      .stderr.on("data", (pullErrData) => {
        console.log(`git pull Error: ${pullErrData}`);
      });
  });
}

const userInput = "your_user_input"; // Replace with actual user input
executeSSHCommands(userInput);
