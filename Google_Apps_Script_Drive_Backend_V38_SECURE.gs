const APP='JAKHAR_DEFENCE_ACADEMY';
const VERSION='38.0';
const FILE_NAME='JDA_Academy_Data_V38.json';
const FOLDER='JAKHAR DEFENCE ACADEMY';
// Set JDA_SYNC_TOKEN in Apps Script > Project Settings > Script Properties.
// Deploy as Web app. For simplest owner-drive setup use: Execute as Me, Who has access: Anyone.
function token_(){return PropertiesService.getScriptProperties().getProperty('JDA_SYNC_TOKEN')||'';}
function auth_(provided){const expected=token_();return !!expected && String(provided||'')===expected;}
function doGet(e){try{
  const p=(e&&e.parameter)||{};
  if(p.action==='authorize'){
    // Accessing DriveApp triggers Google's OAuth consent when this deployment needs it.
    const f=folder_();
    return json_({ok:true,authorized:true,app:APP,version:VERSION,folderName:FOLDER,folderId:f.getId(),googleAccount:p.googleAccount||'',message:'Google Drive is authorized for this Apps Script deployment.'});
  }
  if(p.action==='pull'){
    if(!auth_(p.token))return json_({ok:false,error:'Unauthorized'});
    return json_({ok:true,data:load_()});
  }
  return json_({ok:true,app:APP,version:VERSION,driveFolder:FOLDER});
}catch(err){return json_({ok:false,error:String(err)});}}
function doPost(e){try{
  const body=JSON.parse((e&&e.postData&&e.postData.contents)||'{}');
  if(!auth_(body.token))return json_({ok:false,error:'Unauthorized'});
  if(body.action==='initDrive'){
    const f=folder_(); return json_({ok:true,folderName:FOLDER,folderId:f.getId(),googleAccount:body.googleAccount||''});
  }
  if(body.action==='fetchVacancies'){
    const feed=String(body.feed||'').trim();
    if(!/^https:\/\//i.test(feed))return json_({ok:false,error:'Only HTTPS feed URLs are allowed'});
    const resp=UrlFetchApp.fetch(feed,{muteHttpExceptions:true,followRedirects:true});
    const code=resp.getResponseCode(); if(code<200||code>=300)return json_({ok:false,error:'Feed HTTP '+code});
    return json_({ok:true,items:parseFeed_(resp.getContentText())});
  }
  if(body.data){save_(body.data);return json_({ok:true,data:load_(),savedAt:new Date().toISOString()});}
  return json_({ok:true,data:load_()});
}catch(err){return json_({ok:false,error:String(err)});}}
function folder_(){const it=DriveApp.getFoldersByName(FOLDER);return it.hasNext()?it.next():DriveApp.createFolder(FOLDER);}
function file_(){const f=folder_(),it=f.getFilesByName(FILE_NAME);return it.hasNext()?it.next():f.createFile(FILE_NAME,'{}',MimeType.PLAIN_TEXT);}
function load_(){try{return JSON.parse(file_().getBlob().getDataAsString()||'{}');}catch(e){return {};}}
function save_(data){file_().setContent(JSON.stringify(data));}
function json_(o){return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);}
function parseFeed_(xml){const out=[],re=/<item\b[\s\S]*?<\/item>/gi;let m;while((m=re.exec(xml))!==null&&out.length<100){const item=m[0];const val=(tag)=>{const r=new RegExp('<'+tag+'[^>]*>([\\s\\S]*?)<\\/'+tag+'>','i').exec(item);return r?r[1].replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g,'$1').trim():''};const title=val('title'),link=val('link'),description=val('description'),date=val('pubDate')||val('published')||new Date().toISOString();if(title)out.push({title:title.replace(/<[^>]*>/g,''),link,details:description.replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').trim(),date});}return out;}
