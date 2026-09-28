JDA V36 FINAL — AUTOMATIC + MANUAL + VACANCY + PWA

इस final package में JDA Academy के existing modules को रखते हुए Vacancy Updates और security/sync fixes जोड़े गए हैं।

नए मुख्य functions:
• 💼 Vacancy Updates — Online Automatic + Office Manual
• Online Now button से vacancy feed update
• Internet आने पर automatic vacancy refresh; page खुले रहने पर periodic refresh
• Office staff manual vacancy add/edit/delete कर सकते हैं
• Department, post, last date, official link और details fields
• Vacancy search/filter
• Cloud pull में security token forwarding fix
• Offline local data save + configured cloud endpoint पर automatic/manual sync
• PWA Install App support

DEPLOY STEPS:
1. ZIP extract करके GitHub Pages root में सभी files upload/replace करें.
2. CNAME = jakhardefenceacademy.in रखें.
3. GitHub Pages में HTTPS enabled रखें.
4. Google Apps Script में Google_Apps_Script_Drive_Backend_V35_SECURE.gs deploy करें.
5. Apps Script > Project Settings > Script Properties में:
   Key: JDA_SYNC_TOKEN
   Value: strong random secret
6. Web App का /exec URL JDA Settings में Cloud Sync Endpoint में डालें.
7. वही token Cloud Sync Security Token में डालें.
8. Vacancy Updates > Online Feed URLs खाली छोड़ने पर built-in India government recruitment/news feed इस्तेमाल होगा; जरूरत हो तो HTTPS RSS/API feed URLs one-per-line डाल सकते हैं.
9. Mobile में पुराने JDA PWA को uninstall करके domain खोलें और Install App करें.

SECURITY:
• Gmail password website में कभी न डालें.
• Sync token को GitHub source में publish न करें.
• Student documents/photos public GitHub repository में upload न करें.
• Online vacancy feed automatic है, लेकिन हर internet vacancy की 100% guarantee नहीं है.
• किसी भी vacancy के लिए official recruitment notification जरूर verify करें.
