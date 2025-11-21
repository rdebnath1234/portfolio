const fs = require('fs');
const path = require('path');

// Folders to skip
const skipFolders = ['node_modules', 'build', 'dist', '.git'];

// Important files to highlight
const importantFiles = ['package.json', '.env', 'server.js'];

function generateTree(dirPath, prefix = '', depth = 3) {
  if (depth < 0) return '';

  const entries = fs.readdirSync(dirPath).filter(e => !skipFolders.includes(e));
  let tree = '';

  entries.forEach((entry, index) => {
    const fullPath = path.join(dirPath, entry);
    const stats = fs.lstatSync(fullPath);
    const isLast = index === entries.length - 1;
    const pointer = isLast ? '└── ' : '├── ';

    // Highlight important files
    if (importantFiles.includes(entry)) {
      tree += `${prefix}${pointer}**${entry}**\n`;
    } else {
      tree += `${prefix}${pointer}${entry}\n`;
    }

    // Recurse into folders
    if (stats.isDirectory()) {
      const newPrefix = prefix + (isLast ? '    ' : '│   ');
      tree += generateTree(fullPath, newPrefix, depth - 1);
    }
  });

  return tree;
}

// Set project root and depth
const projectRoot = './';
const maxDepth = 3;

const treeStr = generateTree(projectRoot, '', maxDepth);

// Save to file
fs.writeFileSync('folder-structure.txt', treeStr);

console.log('React + Node.js + MongoDB folder structure saved to folder-structure.txt');
