<!DOCTYPE html>
<html>
<head>
    <title>Docker PS Table</title>
</head>
<body>
    <h1>Docker PS Table</h1>
    <table border="1">
        <thead>
            <tr>
                <th>CONTAINER ID</th>
                <th>IMAGE</th>
                <th>COMMAND</th>
                <th>CREATED</th>
                <th>STATUS</th>
                <th>PORTS</th>
                <th>NAMES</th>
            </tr>
        </thead>
        <tbody id="dockerTableBody">
            <!-- Data from Docker PS command will be inserted here -->
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

        // Iterate over the lines starting from the second line
        for (let i = 1; i < lines.length; i++) {
            const values = lines[i].split(/\s+/);

            // Create a new row for each container
            const row = document.createElement('tr');

            // Create cells for each column
            for (let j = 0; j < values.length; j++) {
                const cell = document.createElement(i === 1 ? 'th' : 'td'); // Use th for header row
                cell.textContent = values[j];
                row.appendChild(cell);
            }

            tableBody.appendChild(row);
        }
    </script>
</body>
</html>
