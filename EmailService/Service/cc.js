function modifyString(input) {
  let b = input.charAt(0).toUpperCase() + input.slice(1); // Uppercase first letter
  let c = input.charAt(0).toLowerCase() + input.slice(1); // Lowercase first letter
  return { b, c };
}

// Example usage:
let inputString = "hello"; // Example input string

let { b, c } = modifyString(inputString);
console.log(b); // Output: "Hello"
console.log(c); // Output: "hello"
s;
