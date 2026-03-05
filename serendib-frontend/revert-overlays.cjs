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

        // Revert bg-theme-card/XX back to bg-white/XX since replacing bg-white replaced transparent overlays as well
        content = content.replace(/bg-theme-card\//g, 'bg-white/');

        // Also let's check text-white, in dark mode text-white is good, but maybe we want text-theme-text for softer look?
        // Let's leave text-white alone as it is good for dark mode.

        if (content !== originalContent) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Reverted transparent overlays in ${filePath}`);
        }
    }
});
