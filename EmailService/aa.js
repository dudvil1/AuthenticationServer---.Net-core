<!DOCTYPE html>
<html>
<head>
    <title>Docker Containers Dropdown</title>
</head>
<body>
    <h1>Docker Containers Dropdown</h1>

    <div id="containerCount">
        <!-- Docker container count will be inserted here -->
    </div>

    <label for="dockerDropdown">Select a Docker Container:</label>
    <select id="dockerDropdown">
        <!-- Docker container options will be inserted here -->
    </select>

    <script>
        // Assuming you have the Docker PS output as a string
        const dockerPsOutput = `
            CONTAINER ID   IMAGE                COMMAND                  CREATED         STATUS         PORTS                    NAMES
            4b99863e9a6a   nginx:latest         "nginx -g 'daemon of…"   2 hours ago     Up 2 hours     0.0.0.0:80->80/tcp       webserver
            2b24e1c1f0e4   mysql:5.7            "docker-entrypoint.s…"   3 days ago      Up 3 days      3306/tcp                 mysql-db
            f96f8bd4c4d2   redis:latest         "docker-entrypoint.s…"   5 days ago      Up 5 days      6379/tcp                 redis-server
        `;

        // Split the output into lines
        const lines = dockerPsOutput.trim().split('\n');

        // Initialize the container count element
        const containerCountElement = document.getElementById('containerCount');
        containerCountElement.textContent = `Total Docker Containers: ${lines.length - 1}`; // Subtract 1 for the header row

        // Initialize the dropdown element
        const dockerDropdown = document.getElementById('dockerDropdown');

        // Create options for the dropdown
        for (let i = 1; i < lines.length; i++) {
            const values = lines[i].split(/\s+/);

            // Extract the image and ports values
            const image = values[1];
            const ports = values[6];

            // Create an option element for each Docker container
            const option = document.createElement('option');
            option.textContent = image;
            option.value = ports;

            dockerDropdown.appendChild(option);
        }
    </script>
</body>
</html>
