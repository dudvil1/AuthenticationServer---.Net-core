const { Client } = require("ssh2");
const expect = require("expect");

// SSH connection information
const connSettings = {
  host: "your_machine_ip",
  port: 22,
  username: "your_username",
  password: "your_password",
};

// Git repository URL
const gitUrl = "your_git_repository_url";

// Create an SSH client
const conn = new Client();

conn
  .on("ready", () => {
    console.log("Connected");
    conn.shell((err, stream) => {
      if (err) throw err;

      const session = expect(stream)
        .expect(/[$#>] $/) // Regular shell prompt
        .send("cd test\n")
        .expect(/[$#>] $/)
        .send(`git clone ${gitUrl}\n`)
        .expect(/Username for .*: $/)
        .send("user123\n")
        .expect(/Password for .*: $/)
        .send("pass123\n")
        .wait(/[$#>] $/)
        .send("exit\n")
        .run();

      session.on("output", (data) => {
        console.log("Shell Output:", data);
      });

      session.on("error", (err) => {
        console.error("Error:", err);
      });

      stream.on("close", () => {
        console.log("Stream closed");
        conn.end();
      });
    });
  })
  .connect(connSettings);

conn.on("error", (err) => {
  console.error("Error:", err.message);
});
