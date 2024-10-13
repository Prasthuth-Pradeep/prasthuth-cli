#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function createProject(projectName) {
  const projectPath = path.join(process.cwd(), projectName);

  if (fs.existsSync(projectPath)) {
    console.error(`Project "${projectName}" already exists.`);
    process.exit(1);
  }

  fs.mkdirSync(projectPath, { recursive: true });

  const templateDir = path.join(__dirname, 'templates');
  fs.readdirSync(templateDir).forEach(file => {
    const src = path.join(templateDir, file);
    const dest = path.join(projectPath, file);
    fs.copyFileSync(src, dest);
  });

  console.log(`Project "${projectName}" created successfully.`);
}

const args = process.argv.slice(2);
if (args[0] === 'new' && args[1]) {
  createProject(args[1]);
} else {
  console.error('Usage: prp new <project-name>');
  process.exit(1);
}
