// Create a JavaScript file, e.g., createCSV.js

// Function to create the CSV file
function createCSV(dockerName) {
  const jsonData = [
    { EP: "duduUC", tran: ["aaaa", "bbbbb"] },
    { EP: "dudu2UC", tran: ["cccc", "dddd"] },
  ];

  let csvContent = "data:text/csv;charset=utf-8,";
  csvContent += "Docker Name\n";
  csvContent += dockerName + "\n\n";

  jsonData.forEach((item) => {
    csvContent += ",," + item.EP + ",\n";
    csvContent += ",," + item.tran[0] + ",\n";
    csvContent += ",," + item.tran[1] + ",\n\n";
  });

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "data.csv");
  document.body.appendChild(link); // Required for Firefox
  link.click();
}

// Function to create the button
function createButton() {
  const button = document.createElement("button");
  button.textContent = "Create CSV";
  button.addEventListener("click", () => createCSV("testDocker"));
  document.body.appendChild(button);
}

// Call the function to create the button when the script is loaded
createButton();
