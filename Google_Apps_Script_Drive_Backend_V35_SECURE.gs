const APP='JAKHAR_DEFENCE_ACADEMY';
const VERSION='35.0';
const FILE_NAME='JDA_Academy_Data_V35.json';
const FOLDER='JAKHAR DEFENCE ACADEMY';
// SECURITY: set a strong token once in Apps Script > Project Settings > Script Properties:
// Key: JDA_SYNC_TOKEN  Value: a long random secret. Never put the secret in public source files.
function token_(){return PropertiesService.getScriptProperties().getProperty('JDA_SYNC_TOKEN')||'';}
function auth_(provided){const expected=token_();return !!expected && String(provided||'')===expected;}
function doGet(e){try{const p=(e&&e.parameter)||{};if(p.action==='pull'){if(!auth_(p.token))return json_({ok:false,error:'Unauthorized'});return json_({ok:true,data:load_()});}return json_({ok:true,app:APP,version:VERSION});}catch(err){return json_({ok:false,error:String(err)});}}
function doPost(e){try{const body=JSON.parse((e&&e.postData&&e.postData.contents)||'{}');if(!auth_(body.token))return json_({ok:false,error:'Unauthorized'});if(body.action==='initDrive'){const f=folder_();return json_({ok:true,folderName:FOLDER,folderId:f.getId(),googleAccount:body.googleAccount||''});}if(body.data){save_(body.data);return json_({ok:true,data:load_(),savedAt:new Date().toISOString()});}return json_({ok:true,data:load_()});}catch(err){return json_({ok:false,error:String(err)});}}
function folder_(){const it=DriveApp.getFoldersByName(FOLDER);return it.hasNext()?it.next():DriveApp.createFolder(FOLDER);}
function file_(){const f=folder_(),it=f.getFilesByName(FILE_NAME);return it.hasNext()?it.next():f.createFile(FILE_NAME,'{}',MimeType.PLAIN_TEXT);}
function load_(){try{return JSON.parse(file_().getBlob().getDataAsString()||'{}');}catch(e){return {};}}
function save_(data){file_().setContent(JSON.stringify(data));}
function json_(o){return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);}
