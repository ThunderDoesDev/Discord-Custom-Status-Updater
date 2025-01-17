# Discord Custom Status Updater

This is a Node.js script that automates the rotation of custom statuses on Discord. The script logs operational information to both the console and a text file while logging errors exclusively to a separate error log file.

## Features
- Automates the rotation of custom statuses.
- Logs informational messages and success events to both the console and a log file (`status_update_log.txt`).
- Logs errors to a dedicated error log file (`error_logs.txt`).
- Prompts the user to enter their Discord token if not already saved.
- Saves the Discord token securely to a file (`discord_token.txt`) for future use.
- Provides a clean and professional console output with an ASCII banner.

## Requirements
- Node.js (v14 or higher)

## Installation
1. Clone this repository or download the script.
2. Install the required dependencies:
   ```bash
   npm install axios fs readline
   ```
3. Ensure you have your Discord token ready.

## Usage
1. Run the script:
   ```bash
   node updater.js
   ```
2. If prompted, enter your Discord token. The token will be saved in `discord_token.txt` for future use.
3. Monitor the console for status updates. Informational logs and errors are saved to the respective log files:
   - `status_update_log.txt` for general logs.
   - `error_logs.txt` for error logs only.

## Files Created
- `discord_token.txt`: Stores your Discord token securely for future runs.
- `status_update_log.txt`: Tracks general logs and operational events.
- `error_logs.txt`: Tracks all errors encountered during execution.

## Configuration
You can modify the script to customize the following:
- **Statuses**: Edit the `statuses` array in the script to include your desired custom statuses.
  ```javascript
  const statuses = [
      "YOUR STATUS HERE",
      "YOUR STATUS HERE",
      "YOUR STATUS HERE"
  ];
  ```
- **Rotation Interval**: Change the `timeout` variable to set how often the statuses rotate (in milliseconds).
  ```javascript
  const timeout = 10000; // 10 seconds
  ```

## Example Output
### Console:
```plaintext
[2025-01-17T06:00:00.100Z] [INFO] Starting status updater...
[2025-01-17T06:00:10.200Z] [SUCCESS] Successfully updated status to: "YOUR STATUS HERE"
[2025-01-17T06:00:20.300Z] [SUCCESS] Successfully updated status to: "YOUR STATUS HERE"
```

### `status_update_log.txt`:
```plaintext
[2025-01-17T06:00:00.100Z] [INFO] Starting status updater...
[2025-01-17T06:00:10.200Z] [SUCCESS] Successfully updated status to: "YOUR STATUS HERE"
[2025-01-17T06:00:20.300Z] [SUCCESS] Successfully updated status to: "YOUR STATUS HERE"
```

### `error_logs.txt`:
```plaintext
[2025-01-17T06:01:00.400Z] [ERROR] HTTP 401: Unauthorized: Check if your token is valid or has expired.
```

## Notes
- **Selfbots are against Discord’s Terms of Service**. Use this tool responsibly and be aware of the potential consequences, such as your account being banned.
- This script uses **direct API calls** in selfbot mode, meaning it logs in as a user account rather than a bot account.
- **Unauthorized Errors (401)**: Double-check your token if you encounter `401 Unauthorized` errors. You may need to regenerate it from your Discord account.

## Support
For support, issues, or enhancements, please open an issue in this repository or join our discord support server.

[Join Support Server](https://discord.gg/thunderdoesdev)

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
