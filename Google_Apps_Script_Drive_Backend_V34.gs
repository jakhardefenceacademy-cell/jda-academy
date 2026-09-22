const APP='JAKHAR_DEFENCE_ACADEMY';
const FILE_NAME='JDA_Academy_Data_V34.json';
const FOLDER='JAKHAR DEFENCE ACADEMY';
function doGet(e){try{const p=(e&&e.parameter)||{};if(p.action==='pull')return json_({ok:true,data:load_()});return json_({ok:true,app:APP,version:'34.0'});}catch(err){return json_({ok:false,error:String(err)});}}
function doPost(e){try{const body=JSON.parse((e&&e.postData&&e.postData.contents)||'{}');if(body.data){save_(body.data);return json_({ok:true,data:load_(),savedAt:new Date().toISOString()});}return json_({ok:true,data:load_()});}catch(err){return json_({ok:false,error:String(err)});}}
function folder_(){const it=DriveApp.getFoldersByName(FOLDER);return it.hasNext()?it.next():DriveApp.createFolder(FOLDER);}
function file_(){const f=folder_(),it=f.getFilesByName(FILE_NAME);return it.hasNext()?it.next():f.createFile(FILE_NAME,'{}',MimeType.PLAIN_TEXT);}
function load_(){try{return JSON.parse(file_().getBlob().getDataAsString()||'{}');}catch(e){return {};}}
function save_(data){file_().setContent(JSON.stringify(data));}
function json_(o){return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);}
