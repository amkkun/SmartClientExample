
/*

  SmartClient Ajax RIA system
  Version v8.3p_2013-06-16/LGPL Development Only (2013-06-16)

  Copyright 2000 and beyond Isomorphic Software, Inc. All rights reserved.
  "SmartClient" is a trademark of Isomorphic Software, Inc.

  LICENSE NOTICE
     INSTALLATION OR USE OF THIS SOFTWARE INDICATES YOUR ACCEPTANCE OF
     ISOMORPHIC SOFTWARE LICENSE TERMS. If you have received this file
     without an accompanying Isomorphic Software license file, please
     contact licensing@isomorphic.com for details. Unauthorized copying and
     use of this software is a violation of international copyright law.

  DEVELOPMENT ONLY - DO NOT DEPLOY
     This software is provided for evaluation, training, and development
     purposes only. It may include supplementary components that are not
     licensed for deployment. The separate DEPLOY package for this release
     contains SmartClient components that are licensed for deployment.

  PROPRIETARY & PROTECTED MATERIAL
     This software contains proprietary materials that are protected by
     contract and intellectual property law. You are expressly prohibited
     from attempting to reverse engineer this software or modify this
     software for human readability.

  CONTACT ISOMORPHIC
     For more information regarding license rights and restrictions, or to
     report possible license violations, please contact Isomorphic Software
     by email (licensing@isomorphic.com) or web (www.isomorphic.com).

*/

if(window.isc&&window.isc.module_Core&&!window.isc.module_FileBrowser){isc.module_FileBrowser=1;isc._moduleStart=isc._FileBrowser_start=(isc.timestamp?isc.timestamp():new Date().getTime());if(isc._moduleEnd&&(!isc.Log||(isc.Log&&isc.Log.logIsDebugEnabled('loadTime')))){isc._pTM={message:'FileBrowser load/parse time: '+(isc._moduleStart-isc._moduleEnd)+'ms',category:'loadTime'};if(isc.Log&&isc.Log.logDebug)isc.Log.logDebug(isc._pTM.message,'loadTime');else if(isc._preLog)isc._preLog[isc._preLog.length]=isc._pTM;else isc._preLog=[isc._pTM]}isc.definingFramework=true;isc.DataSource.create({allowAdvancedCriteria:true,ID:"Filesystem",criteriaPolicy:"dropOnChange",fields:[{title:"Path",primaryKey:true,name:"path",length:2000,type:"text",required:true},{hidden:true,rootValue:"/",name:"parentID",type:"text",required:true,foreignKey:"Filesystem.path"},{name:"name",type:"text"},{name:"isFolder",type:"boolean"},{name:"size",type:"long"},{name:"lastModified",type:"lastModified"},{name:"mimeType",type:"text"},{name:"contents",type:"text",size:"1000000"},{name:"webrootOnly",type:"boolean"}]})
isc.defineClass("FileBrowser","Window");isc.A=isc.FileBrowser;isc.A.dsDir="/shared/ds";isc.A.appDir="/shared/app";isc.A.uiDir="/shared/ui";isc.A.$98q=[];isc.A=isc.FileBrowser.getPrototype();isc.B=isc._allFuncs;isc.C=isc.B._maxIndex;isc.D=isc._funcClasses;isc.D[isc.C]=isc.A.Class;isc.A.autoCenter=true;isc.A.modal=true;isc.A.width=460;isc.A.height=300;isc.A.canDragResize=true;isc.A.webrootOnly=true;isc.A.actionStripConstructor="ToolStrip";isc.A.actionStripDefaults={height:24,autoParent:"body"};isc.A.actionStripControls=["spacer:10","pathLabel","previousFolderButton","spacer:10","upOneLevelButton","spacer:10","createNewFolderButton","spacer:10","refreshButton","spacer:2"];isc.A.$98x="padding-left: 1px; padding-right: 1px; color: #0000EE; color: -webkit-link; text-decoration: underline;";isc.A.pathLabelConstructor="Label";isc.A.pathLabelDefaults={width:"*",autoParent:"actionStrip",useEventParts:true,$98r:"path",$98s:[],pathClick:function(_1){var _2=this.$98t(_1);if(_2!=null){this.creator.setDir(_2)}},$98t:function(_1){var _2=parseInt(this.getElementPart(_1).ID);if(!isNaN(_2)){return"/"+this.$98s.getRange(0,_2+1).join("/")}else{return null}},$98u:function(_1){var _2=isc.StringBuffer.newInstance();var _3=this.$98s=_1.split("/");if(_3[0]==isc.emptyString){_3.shift()}
this.$98s=[];var _4=0;var _5=this.creator.$98x;for(var i=0,_7=_3.getLength();i<_7;++i){var _8=i-_4;if(_3[_8]==isc.emptyString){++_4;continue}
var _9=_3[_8];this.$98s.push(_9);_2.append("/<SPAN STYLE=\"");_2.append(_5);_2.append("\" ");_2.append(this.$pk);_2.append("=");_2.append(this.$98r);_2.append(" id=");_2.append(this.getID());_2.append("_");_2.append(this.$98r);_2.append("_");_2.append(_8);_2.append(">");_2.append(_9);_2.append("</SPAN>")}
_2.append("/");this.setContents(_2.toString())}};isc.A.previousFolderButtonConstructor="ImgButton";isc.A.previousFolderButtonDefaults={size:16,layoutAlign:"center",src:"[SKIN]/previousFolder.png",showRollOver:false,showDown:false,prompt:"Go To Last Folder Visited",click:"this.creator.previousFolder()"};isc.A.upOneLevelButtonConstructor="ImgButton";isc.A.upOneLevelButtonDefaults={autoParent:"actionStrip",size:16,layoutAlign:"center",src:"[SKIN]/upOneLevel.png",showRollOver:false,showDown:false,prompt:"Up One Level",click:"this.creator.upOneLevel()"};isc.A.createNewFolderButtonConstructor="ImgButton";isc.A.createNewFolderButtonDefaults={autoParent:"actionStrip",size:16,layoutAlign:"center",src:"[SKIN]/createNewFolder.png",showRollOver:false,showDown:false,prompt:"Create New Folder",click:"this.creator.createNewFolder()"};isc.A.refreshButtonConstructor="ImgButton";isc.A.refreshButtonDefaults={autoParent:"actionStrip",size:16,layoutAlign:"center",src:"[SKIN]/refresh.png",showRollOver:false,showDown:false,prompt:"Refresh",click:"this.creator.refresh()"};isc.A.directoryListingConstructor="ListGrid";isc.A.directoryListingDefaults={dataSource:"Filesystem",sortFieldNum:1,canEdit:true,folderIcon:"[SKIN]/FileBrowser/folder.png",fileIcon:"[SKIN]/FileBrowser/file.png",loadingDataMessage:"&nbsp;",emptyMessage:"&nbsp;",fileBrowser:this,showHeader:false,selectionStyle:"single",canMultiSort:true,initialSort:[{property:"isFolder",direction:"descending"},{property:"name",direction:"ascending"}],recordClick:function(_1,_2,_3){_2._canEdit=false;if(!_2.isFolder){this.creator.actionForm.setValue("fileName",_2.name)}
if(_2==this.$48r){delete _2._canEdit;if(this.canEdit)this.startEditing(_3,1);return}
this.$48r=_2;return false},recordDoubleClick:function(_1,_2){if(_2.isFolder){this.creator.setDir(_2.path)}else{this.creator.fileSelected(_2.name)}
return false},rowContextClick:function(_1){this.$48s=_1;if(!this.$48t)this.$48t=this.getMenuConstructor().create({grid:this,deleteFile:function(){this.grid.creator.confirmRemoveFile(this.grid.$48s.path)},newFolder:function(){this.grid.creator.createNewFolder()},data:[{title:"Delete file (recursive)",click:"menu.deleteFile()"}]});this.$48t.showContextMenu();return false},fields:[{name:"isFolder",canEdit:false,formatCellValue:function(_1,_2,_3,_4,_5){var _6=_1?_5.folderIcon:_5.fileIcon
return _5.$30s(_6,this,_5,_2,_3,_4)},width:20},{name:"name",width:"*"}]};isc.A.showDirectoryShortcuts=false;isc.A.directoryShortcutsConstructor="VLayout";isc.A.directoryShortcutsDefaults={width:60};isc.A.actionFormConstructor="DynamicForm";isc.A.skinImgDir="images/FileBrowser/";isc.A.rootDir="/";isc.A.initialDir="/";isc.A.allFilesFilterText="All Files";isc.B.push(isc.A.initWidget=function isc_FileBrowser_initWidget(){this.actionFormDefaults=this.$98j();var _1=this;this.directoryListingDefaults.dataProperties={transformData:function(_2,_3){return _1.$98k.apply(_1,arguments)}};this.Super("initWidget",arguments)},isc.A.$98k=function isc_FileBrowser__transformData(_1,_2){var _3=this.$98l,_4=_2.startRow,_5=_2.endRow,_6=_5-_4,_7=_3&&_3.getLength(),_8=0;for(var i=0;i<_6;++i){var j=i-_8,_11=_1[j],_12=_11.path,_13=false;if(_11.isFolder){continue}
if(_3!=null){for(var k=0;k<_7;++k){var _15=_3[k];if(isc.isA.String(_15)){if(_12.contains(_15)){break}}else if(isc.isA.RegularExpression(_15)){if(_12.match(_15)!=null){break}}}
if(k==_7){_13=true}}
if(_13){++_8;_1.splice(j,1)}}
_2.totalRows-=_8;_2.endRow-=_8},isc.A.$98j=function isc_FileBrowser__getActionFormDefaults(){var _1={overflow:"hidden",autoParent:"body",numCols:3,height:45,colWidths:[100,"*",120],browserSpellCheck:false,process:function(){if(this.validate()){this.creator.$98v();this.creator.fileSelected(this.getValue("fileName"))}},fields:[{name:"fileName",type:"text",width:"*",title:"File name",keyPress:"if (keyName == 'Enter') form.process()",validators:[{type:"lengthRange",max:255,min:1},{type:"regexp",expression:"([^:\\*\\?<>\\|\\/\"'])+",errorMessage:"Can't contain \\/:*?\"'<>|"}]},{name:"button",type:"button",startRow:false,click:"form.process()"}]};if(isc.isAn.Array(this.fileFilters)&&!this.fileFilters.isEmpty()){var _2;if(isc.isA.Number(this.selectedFileFilter)){_2=this.fileFilters[this.selectedFileFilter]}else if(this.fileFilters.contains(this.selectedFileFilter)){_2=this.selectedFileFilter}else{_2=this.fileFilters[0]}
var _3=_1.fields;_3.addAt(this.$98m(_2),1);_3.addAt({type:"spacer",colSpan:2},2);_1.height+=26}
return _1},isc.A.$98m=function isc_FileBrowser__createFileFiltersSelect(_1){var _2=this;var _3=this.fileFilters.getProperty("filterName");_3.add(this.allFilesFilterText);var _4=_1.filterName;this.$98n(_4);return{type:"select",showTitle:false,valueMap:_3,defaultValue:_4,changed:function(_5,_6,_7){_2.$98n(_7);_2.$98o()}}},isc.A.$98n=function isc_FileBrowser__setFilterExpressions(_1){if(_1==this.allFilesFilterText){this.$98l=null}else{var _2=this.fileFilters.find("filterName",_1).filterExpressions;if(_2!=null){if(isc.isAn.Array(_2)&&!_2.isEmpty()&&!_2.contains(null)){this.$98l=_2}else if(isc.isA.String(_2)||isc.isA.RegularExpression(_2)){this.$98l=[_2]}else{this.$98l=null}}else{this.$98l=null}}},isc.A.draw=function isc_FileBrowser_draw(){this.Super("draw",arguments);if(this.$48u)return;this.addAutoChild("actionStrip");if(this.actionStripControls){for(var i=0;i<this.actionStripControls.length;i++){var _2=this.actionStripControls[i];if(_2.startsWith("spacer:")){this.actionStrip.addMember(isc.LayoutSpacer.create({width:_2.substring(_2.indexOf(":")+1)}))}else if(_2=="separator"){}else{if(isc.isA.String(_2)){this.addAutoChild(_2,{skinImgDir:this.skinImgDir},null,this.actionStrip)}else{this.actionStrip.addMember(_2)}}}}
if(this.showDirectoryShortcuts!==false){this.directoryLayout=isc.HLayout.create();this.addItem(this.directoryLayout);this.addAutoChild("directoryShortcuts",null,null,this.directoryLayout);this.addAutoChild("directoryListing",null,null,this.directoryLayout)}else{this.addAutoChild("directoryListing",null,null,this.body)}
this.addItem(isc.LayoutSpacer.create({height:10}));this.addAutoChild("actionForm");this.actionForm.getField("button").setTitle(this.actionButtonTitle);if(this.initialDir)this.setDir(this.initialDir);this.$48u=true},isc.A.$48v=function isc_FileBrowser__makePath(_1,_2){if(!_1.endsWith("/"))_1+="/";return _1+_2},isc.A.setFileName=function isc_FileBrowser_setFileName(_1){this.actionForm.setValue("fileName",_1)},isc.A.setDir=function isc_FileBrowser_setDir(_1,_2){if(!_1)return;if(_1!=this.rootDir&&!_1.endsWith(":/")&&_1.endsWith("/"))_1=_1.substring(0,_1.length-1);if(_1.length<this.rootDir.length&&!this.rootDir.contains("[")&&!_1.contains("[")){isc.say("You cannot go up any further.");return}
if(!_2){if(!this.folderHistory){this.folderHistory=isc.FileBrowser.$98q.duplicate()}
if(this.currentDir)this.folderHistory.add(this.currentDir)}
this.currentDir=_1;this.$98w(this.currentDir);this.$98o(_1)},isc.A.$98w=function isc_FileBrowser__setPathLabelContents(_1){this.pathLabel.$98u(_1)},isc.A.$98o=function isc_FileBrowser__filterDirectoryListing(_1){_1=_1||this.currentDir;var _2=this,_3={fileFilter:this.fileFilter,parentID:_1,webrootOnly:this.webrootOnly};this.directoryListing.setCriteria(null);this.directoryListing.filterData(_3,function(_4,_5,_6){if(_4.path!=_2.currentDir){_2.currentDir=_4.path;_2.$98w(_4.path)}
if(_4.status!=isc.RPCResponse.STATUS_SUCCESS){_2.upOneLevel()}},{promptStyle:"cursor"})},isc.A.upOneLevel=function isc_FileBrowser_upOneLevel(){if(!this.currentDir){this.logWarn("upOneLevel() called without currentDir");return}
if(this.currentDir=="/"){this.logWarn("upOneLevel() called on rootDir");return}
var _1=this.currentDir.lastIndexOf("/");var _2=this.currentDir.substring(0,_1);if(_2==isc.emptyString)_2="/";if(this.currentDir.endsWith(":/"))_2="/";if(_2.endsWith(":"))_2+="/";this.setDir(_2)},isc.A.previousFolder=function isc_FileBrowser_previousFolder(){if(!this.folderHistory||this.folderHistory.length==0)return;this.setDir(this.folderHistory.pop(),true)},isc.A.refresh=function isc_FileBrowser_refresh(){if(this.directoryListing.data)this.directoryListing.data.invalidateCache();this.setDir(this.currentDir)},isc.A.createNewFolder=function isc_FileBrowser_createNewFolder(){this.directoryListing.startEditingNew({path:this.currentDir,isFolder:true})},isc.A.confirmRemoveFile=function isc_FileBrowser_confirmRemoveFile(_1){isc.confirm("Are you sure you want to recursively delete "+_1+"?","value ?"+this.getID()+".removeFile('"+_1+"'):false")},isc.A.removeFile=function isc_FileBrowser_removeFile(_1){this.directoryListing.removeData({path:_1})},isc.A.$98v=function isc_FileBrowser__updateGlobalFolderHistory(){if(this.folderHistory!=null){isc.FileBrowser.$98q=this.folderHistory}
if(!isc.FileBrowser.$98q.isEmpty()&&isc.FileBrowser.$98q.last()!=this.currentDir)
{isc.FileBrowser.$98q.push(this.currentDir)}},isc.A.closeClick=function isc_FileBrowser_closeClick(){this.$98v();return this.Super("closeClick",arguments)});isc.B._maxIndex=isc.C+19;isc.FileBrowser.registerStringMethods({fileSelected:"fileName"});isc.defineClass("SaveFileDialog","FileBrowser");isc.A=isc.SaveFileDialog.getPrototype();isc.B=isc._allFuncs;isc.C=isc.B._maxIndex;isc.D=isc._funcClasses;isc.D[isc.C]=isc.A.Class;isc.A.title="Save File";isc.A.actionButtonTitle="Save";isc.B.push(isc.A.getFileName=function isc_SaveFileDialog_getFileName(_1){return _1},isc.A.fileSelected=function isc_SaveFileDialog_fileSelected(_1){var _1=this.getFileName(_1);if(_1===false||_1==null)return;this.confirmAction(_1)},isc.A.confirmAction=function isc_SaveFileDialog_confirmAction(_1){if(this.directoryListing.data.find("name",_1)!=null){isc.confirm(this.$48v(this.currentDir,_1)+" already exists.  Do you want to replace it?","value ? "+this.getID()+".saveFile('"+_1+"'):false")}else{this.saveFile(_1)}},isc.A.getFileContents=function isc_SaveFileDialog_getFileContents(_1){return this.fileContents},isc.A.saveFile=function isc_SaveFileDialog_saveFile(_1){this.fileName=_1;this.fileContents=this.getFileContents(_1);if(this.fileContents==null){this.logWarn("attempt to save with null fileContents");return}
isc.DMI.callBuiltin({methodName:"saveFile",arguments:[this.$48v(this.currentDir,_1),this.fileContents],callback:this.getID()+".saveFileCallback(rpcResponse)"})},isc.A.saveFileCallback=function isc_SaveFileDialog_saveFileCallback(_1){delete this.fileContents;this.saveComplete(this.fileName)},isc.A.saveComplete=function isc_SaveFileDialog_saveComplete(_1){isc.say("File saved.",this.getID()+".hide()")},isc.A.show=function isc_SaveFileDialog_show(_1,_2){if(_1!=null)this.fileContents=_1;if(_2!=null)this.setFileName(_2);this.Super("show",arguments);this.actionForm.delayCall("focusInItem",["fileName"])});isc.B._maxIndex=isc.C+8;isc.defineClass("LoadFileDialog","FileBrowser");isc.A=isc.LoadFileDialog.getPrototype();isc.B=isc._allFuncs;isc.C=isc.B._maxIndex;isc.D=isc._funcClasses;isc.D[isc.C]=isc.A.Class;isc.A.title="Load File";isc.A.actionButtonTitle="Load";isc.B.push(isc.A.fileSelected=function isc_LoadFileDialog_fileSelected(_1){if(_1==null)return;this.loadFile(_1)},isc.A.loadFile=function isc_LoadFileDialog_loadFile(_1){this.fileName=_1;isc.DMI.callBuiltin({methodName:"loadFile",arguments:[this.$48v(this.currentDir,_1)],callback:this.getID()+".loadFileCallback(data)"})},isc.A.loadFileCallback=function isc_LoadFileDialog_loadFileCallback(_1){this.fireCallback("fileLoaded","fileContents,fileName",[_1,this.fileName])});isc.B._maxIndex=isc.C+3;isc.LoadFileDialog.registerStringMethods({fileLoaded:"fileContents,fileName"});isc._moduleEnd=isc._FileBrowser_end=(isc.timestamp?isc.timestamp():new Date().getTime());if(isc.Log&&isc.Log.logIsInfoEnabled('loadTime'))isc.Log.logInfo('FileBrowser module init time: '+(isc._moduleEnd-isc._moduleStart)+'ms','loadTime');delete isc.definingFramework;}else{if(window.isc&&isc.Log&&isc.Log.logWarn)isc.Log.logWarn("Duplicate load of module 'FileBrowser'.");}

/*

  SmartClient Ajax RIA system
  Version v8.3p_2013-06-16/LGPL Development Only (2013-06-16)

  Copyright 2000 and beyond Isomorphic Software, Inc. All rights reserved.
  "SmartClient" is a trademark of Isomorphic Software, Inc.

  LICENSE NOTICE
     INSTALLATION OR USE OF THIS SOFTWARE INDICATES YOUR ACCEPTANCE OF
     ISOMORPHIC SOFTWARE LICENSE TERMS. If you have received this file
     without an accompanying Isomorphic Software license file, please
     contact licensing@isomorphic.com for details. Unauthorized copying and
     use of this software is a violation of international copyright law.

  DEVELOPMENT ONLY - DO NOT DEPLOY
     This software is provided for evaluation, training, and development
     purposes only. It may include supplementary components that are not
     licensed for deployment. The separate DEPLOY package for this release
     contains SmartClient components that are licensed for deployment.

  PROPRIETARY & PROTECTED MATERIAL
     This software contains proprietary materials that are protected by
     contract and intellectual property law. You are expressly prohibited
     from attempting to reverse engineer this software or modify this
     software for human readability.

  CONTACT ISOMORPHIC
     For more information regarding license rights and restrictions, or to
     report possible license violations, please contact Isomorphic Software
     by email (licensing@isomorphic.com) or web (www.isomorphic.com).

*/

