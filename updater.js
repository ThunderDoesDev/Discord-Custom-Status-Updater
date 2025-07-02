const axios = require('axios');
const fs = require('fs');
const readline = require('readline');

let statuses = [
    "YOUR STATUS HERE",
    "YOUR STATUS HERE",
    "YOUR STATUS HERE"
];

function setStatuses(newStatuses) {
    if (Array.isArray(newStatuses)) {
        statuses = newStatuses;
        index = 0;
    }
}
const timeout = 10000;
const tokenFile = 'discord_token.txt';
const logFile = 'status_update_log.txt';
const errorLogFile = 'error_logs.txt';
let token = null;
let index = 0;

function log(type, message) {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] [${type}] ${message}`;
    console.log(logMessage);
    fs.appendFileSync(logFile, `${logMessage}\n`);
}

function logError(error) {
    const timestamp = new Date().toISOString();
    const errorMessage = `[${timestamp}] [ERROR] ${typeof error === 'string' ? error : error.message}`;
    fs.appendFileSync(errorLogFile, `${errorMessage}\n`);
}

function printBanner() {
    console.log(`
        █▀▀ █░█ █▀ ▀█▀ █▀█ █▀▄▀█   █▀ ▀█▀ ▄▀█ ▀█▀ █░█ █▀   █░█ █▀█ █▀▄ ▄▀█ ▀█▀ █▀▀ █▀█
        █▄▄ █▄█ ▄█ ░█░ █▄█ █░▀░█   ▄█ ░█░ █▀█ ░█░ █▄█ ▄█   █▄█ █▀▀ █▄▀ █▀█ ░█░ ██▄ █▀▄
                                  By ThunderDoesDev
    `);
}

function promptForToken() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.question('Enter your Discord token: ', (inputToken) => {
        token = inputToken.trim();
        if (!token) {
            console.log('No token entered. Exiting...');
            rl.close();
            return;
        }
        fs.writeFileSync(tokenFile, token);
        console.log(`Token saved to ${tokenFile}`);
        rl.close();
        startStatusUpdater();
    });
}

async function updateStatus() {
    const status = statuses[index];
    try {
        const response = await axios.patch(
            'https://discord.com/api/v9/users/@me/settings', {
                custom_status: {
                    text: status
                }
            }, {
                headers: {
                    Authorization: token,
                    'Content-Type': 'application/json'
                }
            }
        );

        if (response.status === 200) {
            log('SUCCESS', `Successfully updated status to: "${status}"`);
        } else {
            logError(`Unexpected response code: ${response.status}`);
        }
    } catch (error) {
        if (error.response) {
            logError(`HTTP ${error.response.status}: ${error.response.data.message || 'Unknown error'}`);
            if (error.response.status === 401) {
                logError('Unauthorized: Check if your token is valid or has expired.');
            }
        } else if (error.request) {
            logError('No response from server. Network issue or server downtime.');
        } else {
            logError(`Request setup error: ${error.message}`);
        }
    } finally {
        index = (index + 1) % statuses.length;
        setTimeout(updateStatus, timeout);
    }
}

function startStatusUpdater() {
    if (!Array.isArray(statuses) || statuses.length === 0) {
        logError('No statuses defined. Please add at least one status to the statuses array.');
        return;
    }
    log('INFO', 'Starting status updater...');
    updateStatus();
}

function main() {
    printBanner();
    if (fs.existsSync(tokenFile)) {
        token = fs.readFileSync(tokenFile, 'utf-8').trim();
        if (token) {
            log('INFO', `Loaded token from ${tokenFile}`);
            startStatusUpdater();
        } else {
            console.log('Saved token is empty. Please re-enter your token.');
            promptForToken();
        }
    } else {
        promptForToken();
    }
}

if (require.main === module) {
    main();
}

module.exports = {
    startStatusUpdater,
    updateStatus,
    log,
    logError,
    promptForToken,
    main,
    setStatuses,
    statuses
};
