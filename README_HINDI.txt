JDA FINAL STABLE V35

इस package में सभी existing JDA modules के साथ security और update fixes जोड़े गए हैं।

मुख्य fixes:
• Service Worker अब नया HTML network से लेता है, इसलिए पुराना cached software अटका नहीं रहेगा।
• Automatic + Manual local/cloud sync structure.
• Cloud endpoint में hard-coded public URL/secret हटाया गया।
• Secure Apps Script backend: JDA_SYNC_TOKEN Script Properties में रखना होगा।
• CNAME, security.txt, SECURITY.md, robots.txt, sitemap.xml, 404.html जोड़े गए।
• Existing student, fees, attendance, tests, materials, gallery, news/GK, selected, reports, portal, ID/QR, documents, papers, PT, notices, backup/restore और PWA functions preserved.

DEPLOY:
1. ZIP extract करें और files GitHub Pages root में रखें.
2. CNAME = jakhardefenceacademy.in.
3. GitHub Pages HTTPS ON रखें.
4. पुराने installed JDA app को uninstall करें, फिर site खोलकर नया Install App करें.
5. Secure Apps Script file Google Apps Script में deploy करें.
6. Project Settings > Script Properties में JDA_SYNC_TOKEN बनाएं और strong random value डालें.
7. Web app deploy करें; मिले /exec URL को JDA Settings में Cloud Sync Endpoint में डालें और वही token Cloud Sync Security Token में डालें.

NOTE: GitHub Pages public static hosting है; sensitive student documents को public repository में upload न करें.
