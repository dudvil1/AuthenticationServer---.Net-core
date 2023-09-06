<!DOCTYPE html>
<html>
<head>
    <title>Docker Containers Count</title>
</head>
<body>
    <h1>Docker Containers Count</h1>

    <div id="containerCount">
        <!-- Docker container count will be inserted here -->
    </div>

    <table border="1">
        <thead>
            <tr>
                <th>IMAGE</th>
                <th>PORTS</th>
            </tr>
        </thead>
        <tbody id="dockerTableBody">
            <!-- Data for Docker images and ports will be inserted here -->
        </tbody>
    </table>

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

        // Initialize the table body element
        const tableBody = document.getElementById('dockerTableBody');

        // Initialize the container count element
        const containerCountElement = document.getElementById('containerCount');

        // Set the container count
        containerCountElement.textContent = `Total Docker Containers: ${lines.length - 1}`; // Subtract 1 for the header row

        // Iterate over the lines starting from the second line
        for (let i = 1; i < lines.length; i++) {
            const values = lines[i].split(/\s+/);

            // Extract the image and ports values
            const image = values[1];
            const ports = values[6];

            // Create a new row for each Docker container
            const row = document.createElement('tr');

            // Create cells for the image and ports columns
            const imageCell = document.createElement('td');
            imageCell.textContent = image;
            row.appendChild(imageCell);

            const portsCell = document.createElement('td');
            portsCell.textContent = ports;
            row.appendChild(portsCell);

            tableBody.appendChild(row);
        }
    </script>
</body>
</html>
