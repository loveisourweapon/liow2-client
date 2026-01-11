#!/usr/bin/env node

/**
 * Script to dynamically change the index file in .angular-cli.json
 * Usage: node scripts/config-index.js <index-file-path>
 * Example: node scripts/config-index.js index.prod.html
 * Or set INDEX_FILE environment variable: INDEX_FILE=index.prod.html node scripts/config-index.js
 */

const fs = require('fs');
const path = require('path');

// Get index file from command line argument or environment variable
const indexFile = process.argv[2] || process.env.INDEX_FILE;

if (!indexFile) {
  console.error('Error: Index file not specified.');
  console.error('Usage: node scripts/config-index.js <index-file-path>');
  console.error('Or set INDEX_FILE environment variable');
  process.exit(1);
}

const angularCliPath = path.join(__dirname, '..', '.angular-cli.json');

try {
  // Read .angular-cli.json
  const angularCli = JSON.parse(fs.readFileSync(angularCliPath, 'utf8'));

  // Update the index file in the first app configuration
  if (angularCli.apps && angularCli.apps.length > 0) {
    angularCli.apps[0].index = indexFile;

    // Write back to file with proper formatting
    fs.writeFileSync(angularCliPath, JSON.stringify(angularCli, null, 2) + '\n', 'utf8');

    console.log(`Successfully updated index file to: ${indexFile}`);
  } else {
    console.error('Error: No apps configuration found in .angular-cli.json');
    process.exit(1);
  }
} catch (error) {
  console.error(`Error updating .angular-cli.json: ${error.message}`);
  process.exit(1);
}
