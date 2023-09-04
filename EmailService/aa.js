const Client = require("ssh2").Client;

function executeDockerPsOverSSH(sshConfig) {
  return new Promise(async (resolve, reject) => {
    const conn = new Client();

    try {
      await conn
        .on("ready", function () {
          conn.exec("docker ps", function (err, stream) {
            if (err) {
              conn.end();
              reject(err);
              return;
            }

            let output = "";

            stream
              .on("data", function (data) {
                output += data.toString();
              })
              .on("end", function () {
                conn.end();
                resolve(output);
              })
              .stderr.on("data", function (data) {
                conn.end();
                reject(new Error(data.toString()));
              });
          });
        })
        .connect(sshConfig);
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = executeDockerPsOverSSH;

const result = await executeDockerPsOverSSH(sshConfig);
console.log("Docker PS Output:", result);
