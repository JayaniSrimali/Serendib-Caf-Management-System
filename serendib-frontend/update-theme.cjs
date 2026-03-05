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

        // Colors
        content = content.replace(/bg-white/g, 'bg-theme-card');
        content = content.replace(/text-theme-dark/g, 'text-theme-text');
        content = content.replace(/border-theme-dark/g, 'border-theme-text/20');
        content = content.replace(/bg-\[\#FDFBF7\]/g, 'bg-theme-bg');
        content = content.replace(/bg-\[\#F8F1EB\]/g, 'bg-theme-card');
        content = content.replace(/text-\[\#D8C7B9\]/g, 'text-theme-textMuted');
        content = content.replace(/bg-[#F8F1EB]/g, 'bg-theme-card'); // Fallback regex
        content = content.replace(/shadow-sm/g, 'shadow-none border border-white/5');

        // Form inputs that had bg-white internally
        content = content.replace(/focus:bg-white/g, 'focus:bg-theme-bg');

        if (content !== originalContent) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Updated ${filePath}`);
        }
    }
});
