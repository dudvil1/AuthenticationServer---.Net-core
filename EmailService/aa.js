const { Client } = require("ssh2");

const connSettings = {
  host: "your_machine_ip",
  port: 22,
  username: "your_username",
  password: "your_password",
};

const executeCommands = async () => {
  const conn = new Client();

  try {
    await new Promise((resolve, reject) => {
      conn.on("ready", () => {
        console.log("Connected");

        conn.shell((err, stream) => {
          if (err) reject(err);

          let commandIndex = 0;

          const commands = [
            { pattern: /[$#>] $/, command: "cd test" },
            {
              pattern: /[$#>] $/,
              command: `git clone your_git_repository_url`,
            },
            { pattern: /Username for .*: $/, command: "user123" },
            { pattern: /Password for .*: $/, command: "pass123" },
            // Add more commands as needed
          ];

          stream.on("data", (data) => {
            const output = data.toString();
            console.log(output);

            const currentCommand = commands[commandIndex];
            if (currentCommand && currentCommand.pattern.test(output)) {
              stream.write(currentCommand.command + "\n");
              commandIndex++;
            } else if (commandIndex >= commands.length) {
              console.log("All commands sent");
              stream.end("exit\n");
            }
          });

          stream.on("close", () => {
            console.log("Stream closed");
            conn.end();
            resolve(); // Resolve the promise when the stream is closed
          });
        });
      });

      conn.connect(connSettings);

      conn.on("error", (err) => {
        reject(err);
      });
    });
  } catch (error) {
    console.error("Error:", error.message);
  }
};

executeCommands();
