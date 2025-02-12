const fs = require('fs');
const path = require('path');

const logFilePath = path.join(__dirname, 'logs.txt');

const logAction = (message) => {
    const logMessage = `${new Date().toISOString()} - ${message}\n`;
    fs.appendFileSync(logFilePath, logMessage, 'utf8');
};

module.exports = logAction;
