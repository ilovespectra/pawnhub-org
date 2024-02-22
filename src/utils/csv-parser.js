const fs = require('fs');
const readline = require('readline');

// Create interface for reading input from terminal
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Prompt user to enter the filename of the CSV
rl.question('Enter the filename of the CSV: ', (filename) => {
  // Read the CSV file
  fs.readFile(filename, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      rl.close();
      return;
    }
    // Split CSV data into lines
    const lines = data.trim().split('\n');
    const result = {};

    // Parse each line and create key-value pairs
    lines.forEach(line => {
      const [address, amount] = line.trim().split(',');
      result[address.replace(/"/g, '')] = amount.replace(/"/g, '');
    });

    // Print the result
    console.log(JSON.stringify(result, null, 2));
    rl.close();
  });
});
