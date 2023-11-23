const fs = require('fs');

const filePath = 'path/to/your/file.cs';

fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }

  // Define the enum name and value to modify
  const enumName = 'ppEnum';
  const enumValue = 'num1';
  const newIndex = '3';

  // Create a regular expression to find and replace the enum value
  const regex = new RegExp(`(?<=enum\\s+${enumName}\\s*{[^}]*${enumValue}[^}]*=\\s*)\\d+`, 'g');

  // Replace the old enum value with the new one
  const modifiedCode = data.replace(regex, newIndex);

  // Log the modified code
  console.log('Modified code:', modifiedCode);
});
