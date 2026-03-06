const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'src');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

walkDir(directoryPath, function (filePath) {
    if (filePath.endsWith('.jsx')) {
        let content = fs.readFileSync(filePath, 'utf8');
        let originalContent = content;

        // Clean up some hardcoded light browns to more professional colors
        content = content.replace(/bg-\[\#EADDCD\]/g, 'bg-white');
        content = content.replace(/bg-\[\#EADDCD\]/g, 'bg-theme-bg'); // Double check
        content = content.replace(/bg-\[\#D3B497\]/g, 'bg-theme-accent/5'); // Subtle background for banners

        // Ensure shadows look good on light bg
        content = content.replace(/shadow-none border border-white\/5/g, 'shadow-sm border border-black/5');
        content = content.replace(/border-white\/10/g, 'border-black/5');

        if (content !== originalContent) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Refined professional look in ${filePath}`);
        }
    }
});
