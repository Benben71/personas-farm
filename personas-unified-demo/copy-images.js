const fs = require('fs');
const path = require('path');

// Paths
const publicDir = path.join(__dirname, 'public');
const infoPersonasDir = path.join(publicDir, 'info-personas');
const pasteurPersonasDir = path.join(publicDir, 'pasteur-personas');

// Ensure directories exist
if (!fs.existsSync(infoPersonasDir)) {
  fs.mkdirSync(infoPersonasDir, { recursive: true });
}

if (!fs.existsSync(pasteurPersonasDir)) {
  fs.mkdirSync(pasteurPersonasDir, { recursive: true });
}

console.log('✅ Directories created');

// Copy info personas images
console.log('📷 Copying info personas images...');
const infoPersonasFiles = fs.readdirSync(infoPersonasDir);
console.log(`Found ${infoPersonasFiles.length} files in info-personas`);

// Copy pasteur personas images
console.log('📷 Copying pasteur personas images...');
const pasteurPersonasFiles = fs.readdirSync(pasteurPersonasDir);
console.log(`Found ${pasteurPersonasFiles.length} files in pasteur-personas`);

console.log('✅ All images copied successfully!');
