const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'src/pages');
const authFiles = ['Login.jsx', 'Register.jsx', 'ForgotPassword.jsx', 'ResetPassword.jsx'];

authFiles.forEach(file => {
    let filePath = path.join(directoryPath, file);
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        let originalContent = content;

        // Backgrounds
        content = content.replace(/bg-\[\#2D211A\]/g, 'bg-theme-bg');
        content = content.replace(/bg-\[\#1d1a19\]/g, 'bg-theme-dark');
        content = content.replace(/bg-\[\#92A760\]/g, 'bg-theme-accent');
        content = content.replace(/hover:bg-\[\#7d8f4a\]/g, 'hover:bg-theme-accentDark');
        content = content.replace(/bg-\[\#E1A162\]/g, 'bg-theme-accent');

        // Texts
        content = content.replace(/text-\[\#2D211A\]/g, 'text-theme-text');
        content = content.replace(/text-\[\#A69B92\]/g, 'text-theme-textMuted');
        content = content.replace(/text-\[\#4d4239\]/g, 'text-theme-text');
        content = content.replace(/text-\[\#92A760\]/g, 'text-theme-accent');
        content = content.replace(/hover:text-\[\#7d8f4a\]/g, 'hover:text-theme-accentDark');
        content = content.replace(/text-\[\#E1A162\]/g, 'text-theme-accent');
        content = content.replace(/hover:text-\[\#E1A162\]/g, 'hover:text-theme-accent');
        content = content.replace(/text-\[\#8C8279\]/g, 'text-theme-textMuted');
        content = content.replace(/placeholder:text-\[\#A69B92\]/g, 'placeholder:text-theme-textMuted');

        // Borders & Rings
        content = content.replace(/border-\[\#EBE5DF\]/g, 'border-theme-text/20');
        content = content.replace(/focus:border-\[\#92A760\]/g, 'focus:border-theme-accent');
        content = content.replace(/focus:ring-\[\#92A760\]/g, 'focus:ring-theme-accent');
        content = content.replace(/hover:border-\[\#7d8f4a\]/g, 'hover:border-theme-accentDark');

        // Selection
        content = content.replace(/selection:bg-\[\#E1A162\]/g, 'selection:bg-theme-accent');

        if (content !== originalContent) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Updated auth colors in ${filePath}`);
        }
    }
});
