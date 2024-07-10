<!DOCTYPE html>
<html>
<head>
    <title>Autocomplete Example</title>
</head>
<body>

<input list="suggestions" id="autocomplete" placeholder="Start typing...">
<datalist id="suggestions"></datalist>

<script src="autocomplete.js"></script>
</body>
</html>

// Array of suggestions
const suggestions = [
  "Apple",
  "Banana",
  "Cherry",
  "Date",
  "Fig",
  "Grape",
  "Kiwi",
  "Lemon",
  "Mango",
  "Orange",
  "Peach",
  "Quince",
  "Raspberry",
  "Strawberry",
  "Tomato",
  "Ugli Fruit",
  "Watermelon",
];

// Get the datalist element
const dataList = document.getElementById("suggestions");

// Populate the datalist with options
suggestions.forEach(function (item) {
  let option = document.createElement("option");
  option.value = item;
  dataList.appendChild(option);
});
