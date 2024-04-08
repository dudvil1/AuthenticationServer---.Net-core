document
  .getElementById("createXLSButton")
  .addEventListener("click", function () {
    var dockerName = document.getElementById("dockerName").value.trim();
    var jsonData = [
      { EP: "duduUC", tran: "aaaa", apgee: "bbbbb" },
      { EP: "dudu2UC", tran: "cccc", apgee: "dddd" },
    ];

    var csvContent = "data:text/csv;charset=utf-8,";

    // Add Docker Name
    csvContent += dockerName + "\n";

    // Add EP and apgee from jsonData
    jsonData.forEach(function (item) {
      csvContent += item.EP + "," + item.apgee + "\n";
    });

    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "output.xls");
    document.body.appendChild(link); // Required for Firefox
    link.click();
  });
