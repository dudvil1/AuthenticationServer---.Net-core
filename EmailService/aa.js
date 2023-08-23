const { Client } = require("ssh2");

function cloneGitRepository(params) {
  const client = new Client();

  client
    .on("ready", () => {
      client.shell((err, stream) => {
        if (err) throw err;

        stream
          .on("close", () => {
            console.log("Shell session closed");
            client.end();
          })
          .on("data", (data) => {
            const output = data.toString();
            console.log(output);

            // Check if Git is asking for credentials and respond with username and password
            if (output.includes("Username for")) {
              stream.stdin.write("your-git-username\n");
            } else if (output.includes("Password for")) {
              stream.stdin.write("your-git-password\n");
            }
          });

        // Check if the "test" folder exists, and then attempt to enter it
        const checkFolderCommand = `[ -d "test" ] && cd test || echo "Folder does not exist"\n`;
        const cloneCommand = `git clone https://github.com/username/repo.git "${params}"\n`;

        stream.end(`${checkFolderCommand}${cloneCommand}`);
      });
    })
    .connect({
      host: "example.com", // Replace with the remote host address
      port: 22,
      username: "your-username",
      password: "your-password",
    });
}

// Call the function with the desired parameter value (folder name)
const folderName = process.argv[2]; // Get the parameter from the command line
cloneGitRepository(folderName);
