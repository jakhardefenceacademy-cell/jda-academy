JDA V38 - PASSWORD + GOOGLE DRIVE CONNECT

FLOW
1. Page 1: Admin password (default legacy login: admin / JDA@2026).
2. Page 2: Gmail + Google Apps Script Web App URL.
3. Tap Connect & Authorize Google Drive or Open Google Authorization.
4. Google authorization/Allow must be completed. Gmail alone does NOT grant Drive access.
5. After backend URL + token are configured, JDA automatic/manual cloud sync uploads app data.

IMPORTANT SECURITY
- Never put a Gmail password in JDA.
- The Gmail field is an account identifier; Google OAuth/Apps Script controls actual Drive permission.
- Set a strong JDA_SYNC_TOKEN in Apps Script Script Properties. Do not publish the token in source code.
- Deploy the Apps Script as a Web App over HTTPS.
- For owner-drive storage, deploy Execute as: Me. Google will authorize the Apps Script owner account.
- If you need the entered Gmail itself to authorize its own Drive, the backend must be deployed/configured to execute as the accessing user and Google Workspace policy must permit it.
- Client-side admin password is a convenience gate, not a substitute for server-side authentication.
