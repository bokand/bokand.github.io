var application = null;
function SAPWD_AbstractApplication() { }
SAPWD_AbstractApplication.prototype.init = function() {
this.windowId                = "";
this.window                  = window;
;
this.lightspeed              = new UCF_LS();
this.commands                = new SAPWD_OPCode(this);
this.mainApplication         = null;
this.listeners               = [];
this.pendingRequest          = null;
this.pendingRequestListeners = 0;
this.focus                   = "";
this.environment             = document.getElementById("_environment_").value;
UCF_DomUtil.attachEvent(window, "unload", wdaOnUnload);
};
SAPWD_AbstractApplication.prototype.exec = function(commandName, parameters){
if (!this.commands[commandName]){
SAPWD_pluginLoader.oGetPlugin( parameters.pluginId );
}
this.commands[commandName](parameters);
};
SAPWD_AbstractApplication.prototype.exit = function () {
this.exitApplication();
UCF_DomUtil.detachEvent(window, "unload", wdaOnUnload);
UCF_DomUtil.detachEvent(window, "load", wdaOnMainLoad);
for(var i=0; i<this.listeners.length; i++){
if(this.listeners[i].destroy && typeof(this.listeners[i].destroy)=="function"){
this.listeners[i].destroy();
}
}
this.listeners = null;
this.lightspeed.destroy();
this.window                  = null;
this.lightspeed              = null;
this.commands                = null;
this.mainApplication         = null;
this.pendingRequest          = null;
this.pendingRequestListeners = null;
this.environment             = null;
};
SAPWD_AbstractApplication.prototype.exitApplication = function() {
}; 
SAPWD_AbstractApplication.prototype.onSubmit = function(oPendingRequest) {
this.pendingRequest = oPendingRequest;
this.focus = this.lightspeed.sGetFocusedElementId();
;
this.pendingRequestListeners = 0;
for(var i=0; i<this.listeners.length; i++){
if(this.listeners[i].onSubmit && typeof(this.listeners[i].onSubmit)=="function"){
++this.pendingRequestListeners;
}
}
if(0==this.pendingRequestListeners){
this.pendingRequest = null;
return;
}
oPendingRequest.suspend("SAPWD");
for(var i=0; i<this.listeners.length; i++){
if(this.listeners[i].onSubmit && typeof(this.listeners[i].onSubmit)=="function"){
this.listeners[i].onSubmit(this);
}
}
};
SAPWD_AbstractApplication.prototype.registerListener = function(listener) {
;
this.listeners[this.listeners.length] = listener;
};
SAPWD_AbstractApplication.prototype.unregisterListener = function(listener){
;
for (var i = 0; i < this.listeners.length; i++ ) {
if ( this.listeners[i] == listener ){
this.listeners.splice(i, 1);
return;
}
}
};
SAPWD_AbstractApplication.prototype.addToPendingRequest = function(oEvent){
this.pendingRequest.addSemanticEvent( oEvent );
};
SAPWD_AbstractApplication.prototype.resume = function(){
if (0 == --this.pendingRequestListeners){
;
this.pendingRequest.resume("SAPWD");
this.pendingRequest = null;
}
};
SAPWD_AbstractApplication.prototype.setFocus = function(controlId,portalNavigation){
if ( controlId ){
var tokens = controlId.split("@iFbA:");
;
this.lightspeed.focusElement( tokens[0] );
if(tokens[1]){
SAPWD_zciWrapper.setFocus(tokens[0], tokens[1]);
}
}
else if ( this.focus ){
;
this.lightspeed.focusElement( this.focus );
}
};
SAPWD_AbstractApplication.prototype.unlock = function(){
for(var i=0; i<this.listeners.length; i++){
if(this.listeners[i].onUnlock && typeof(this.listeners[i].onUnlock)=="function"){
this.listeners[i].onUnlock();
}
}
};
SAPWD_AbstractApplication.prototype.setPadding = function(windowId, padding){
};
function SAPWD_PopupApplication() {
;
this.init();
this.mainApplication = this.lightspeed.oGetPopupManager().oGetOpenerWindow(this.window).application.mainApplication;
this.windowId        = this.lightspeed.oGetPopupManager().sGetPopupIdByWindow(this.window);
this.mainApplication.registerPopup(this);
}
SAPWD_PopupApplication.prototype = new SAPWD_AbstractApplication();
SAPWD_PopupApplication.prototype.setPadding = function(windowId, padding){
var controlId = windowId + '_root_';
this.lightspeed.oGetControlById( controlId );
};
function SAPWD_MainApplication() {
;
this.init();
this.windowId             = document.getElementById("_main_window_id_").value;
this.targetURL            = document.getElementById( "sap.client.SsrClient.form" ).action;
this.popupURL             = document.getElementById("_popup_url_").value;
this.mainApplication      = this;
this.applicationStack     = [this];
this.lightspeed.setMainWindowId(this.windowId);
this.lightspeed.setPendingRequestHandler(this, "onLightspeedSubmit");
this.lightspeed.setApplicationExitHandler(this, "onLightspeedExit"); 
try {
__debugger__;
this.lightspeed.addDebugHandler( UCF_KeyCodes.B, this, "Turn on/off js debugger" );
} catch( ex ) {}
}
SAPWD_MainApplication.prototype = new SAPWD_AbstractApplication();
SAPWD_MainApplication.prototype.registerPopup = function(popupApplication){
;
this.applicationStack.push(popupApplication);
}
SAPWD_MainApplication.prototype.unregisterPopup = function(windowId){
;
for ( var i = 0; i < this.applicationStack.length; ++i )
if ( this.applicationStack[i].windowId == windowId ) {
this.applicationStack.splice(i,1);
return;
}
;
}
SAPWD_MainApplication.prototype.onLightspeedExit = function(){
UCF_DomUtil.detachEvent(window, "unload", wdaOnUnload);
UCF_DomUtil.detachEvent(window, "load", wdaOnMainLoad);
}
SAPWD_MainApplication.prototype.onLightspeedSubmit = function ( oPendingRequest ) {
;
this.applicationStack[this.applicationStack.length-1].onSubmit(oPendingRequest);
};
SAPWD_AbstractApplication.prototype.trigger = function () {
__debugger__ = !__debugger__;
};
SAPWD_MainApplication.prototype.exitApplication = function() {
;
if (this.environment != "2" ){
var targetUrl;
if ( this.targetURL.search("\\?") >= 0 )
targetUrl = this.targetURL + "&sap-sessioncmd=USR_LOGOFF";
else
targetUrl = this.targetURL + "?sap-sessioncmd=USR_LOGOFF";
UCF_RequestUtil.sendSyncRequest( targetUrl, 'GET', null );
}
for ( var i = this.applicationStack.length-1; i > 0; --i ){
this.applicationStack[i].exitApplication();
this.applicationStack[i] = null;
}
this.targetURL            = null;
this.popupURL             = null;
this.applicationStack     = null;
};
SAPWD_MainApplication.prototype.setPadding = function(windowId, padding){
var controlId = windowId + "_root_";
var cont = this.lightspeed.oGetControlById(controlId);
if (cont)
cont.setHasMargin(padding);
}
function  SAPWD_AcfApi() {
this.isServiceEvent  = false;
this.eventCommand    = "";
this.eventParameters = {};
}
SAPWD_AcfApi.prototype.notifyLoad = function(id) {
;
setTimeout("SAPWD_acfWrapper.initializeComponent(\"" + id + "\");", 0);
};
SAPWD_AcfApi.prototype.notifyHooked = function(id) {
;
};
SAPWD_AcfApi.prototype.createEvent = function(id, command) {
;
this.isServiceEvent = false;
this.eventCommand = command;
this.eventParameters = {};
};
SAPWD_AcfApi.prototype.createServiceEvent = function(id, command) {
;
this.isServiceEvent = true;
this.eventCommand = command;
this.eventParameters = {};
};
SAPWD_AcfApi.prototype.addEventParameter = function(id, name, value) {
;
this.eventParameters[name] = value;
};
SAPWD_AcfApi.prototype.fireEvent = function(id) {
;
var parameters = {};
parameters["Id"] = id;
parameters["Command"] = this.eventCommand;
for (var i in this.eventParameters) if (i.charCodeAt(0) != 95) {
parameters["Param." + i] = this.eventParameters[i];
}
var urEventName = this.isServiceEvent ? "ACFFIRESERVICEEVENT" : "ACFFIREEVENT";
var oEvent = application.lightspeed.oCreateSemanticEvent(             urEventName,
parameters,
{} );
oEvent.setClientAction( "submit" );
oEvent.setResponseData( "delta" );
application.lightspeed.fireSemanticEvent( oEvent );
};
SAPWD_AcfApi.prototype.setAttribute = function(id, name, value) {
;
var parameters = {};
parameters["Id"] = id;
parameters["Name"] = name;
parameters["Value"] = value;
var oEvent = application.lightspeed.oCreateSemanticEvent(             "ACFSETATTRIBUTE",
parameters,
{} );
oEvent.setClientAction( "enqueue" );
oEvent.setResponseData( "delta" );
if(SAPWD_AcfWrapper.pendingRequestHandler){
SAPWD_AcfWrapper.pendingRequestHandler.addToPendingRequest(oEvent);
}else{
application.lightspeed.fireSemanticEvent( oEvent );
}
};
SAPWD_AcfApi.prototype.trace = function(id, className, methodName, severity, description) {
var compInstance = SAPWD_acfWrapper.getComponentInstance(id);
if (compInstance) {
;
} else {
;
}
};
SAPWD_AcfApi.prototype.lock = function(id) {
;
};
SAPWD_AcfApi.prototype.unLock = function(id) {
;
};
SAPWD_AcfApi.prototype.gotFocus = function(id) {
;
};
SAPWD_AcfApi.prototype.lostFocus = function(id) {
;
};
SAPWD_AcfApi.prototype.tabToNext = function(id) {
;
};
SAPWD_AcfApi.prototype.tabToPrevious = function(id) {
;
};
SAPWD_AcfApi.prototype.getPagePointer = function() {
;
return "";
};
var SAPWD_acfApi = new SAPWD_AcfApi();
function  SAPWD_AcfWrapper() {
this.id = "acfWrapper";
this.currentObjects = {};
this.alreadyLoaded  = {};
}
SAPWD_AcfWrapper.prototype.currentObjects        = null;
SAPWD_AcfWrapper.prototype.alreadyLoaded         = null;
SAPWD_AcfWrapper.prototype.pendingRequestHandler = null;
SAPWD_AcfWrapper.prototype.name = "AcfWrapper";
SAPWD_AcfWrapper.prototype.isReady = function(id) {
var obj = this.currentObjects[id];
return obj && obj.readyState;
};
SAPWD_AcfWrapper.prototype.callFunction = function(id, methodName, params) {
if (this.isReady(id)) this.executeCall(id, methodName, params);
else this.addToCallQueue(id, methodName, params);
};
SAPWD_AcfWrapper.prototype.executeCall = function(id, methodName, params) {
;
var instance = this.getComponentInstance(id);
var returnValue;
if (instance) {
var cancelWaitingAnimation = false; 
if ( methodName == 'invoke' ) { 
if ( instance.getAttribute('classid') && instance.getAttribute('classid').toUpperCase() == "CLSID:D27CDB6E-AE6D-11CF-96B8-444553540000" ||
instance.getAttribute('type') == "application/x-shockwave-flash" )
methodName = 'invokeData';
var paramTags = instance.getElementsByTagName('param');
for (var i = 0; i < paramTags.length; i++) {
if (paramTags[i].name == 'archive' && paramTags[i].value == '/sap/public/bc/webdynpro/ssr/uuielibs/active_component/com_sap_acf_updown.jar') {
application.lightspeed.oGetControlById("ur-loading").show();
cancelWaitingAnimation = true;
break;
}
}
}
if (instance.getAttribute('type') == "application/x-silverlight-2" ) instance = instance.Content.WDIsland;
if (params) {
switch(params.length) {
case 0: returnValue = instance[methodName](); break;
case 1: returnValue = instance[methodName](params[0]); break;
case 2: returnValue = instance[methodName](params[0], params[1]); break;
case 3: returnValue = instance[methodName](params[0], params[1], params[2]); break;
case 4: returnValue = instance[methodName](params[0], params[1], params[2], params[3]); break;
case 5: returnValue = instance[methodName](params[0], params[1], params[2], params[3], params[4]); break;
}
} else returnValue = instance[methodName]();
if (methodName == "invoke") { 
if ( cancelWaitingAnimation == true ) {
application.lightspeed.oGetControlById("ur-loading").cancel();
}
var parameters = {};
parameters["Id"] = id;
parameters["returnValue"] = "" + returnValue; 
var oEvent = application.lightspeed.oCreateSemanticEvent(             "ACFRETURNVALUE",
parameters,
{} );
oEvent.setClientAction( "enqueue" );
oEvent.setResponseData( "delta" );
application.lightspeed.fireSemanticEvent( oEvent );
}
}
};
SAPWD_AcfWrapper.prototype.addToCallQueue = function(id, methodName, params) {
;
var callQueue = this.currentObjects[id].callQueue;
callQueue.push({"methodName":methodName, "params":params});
};
SAPWD_AcfWrapper.prototype.initializeComponent = function(id) {
;
if (this.currentObjects[id]) {
this.flushCallQueue(id);
}  else {
this.alreadyLoaded[id] = true;
}
if (window.attachEvent) {
var instance = this.getComponentInstance(id);
if( instance != null ) {
instance.attachEvent("onactivate", this.focusForwarder);
instance.attachEvent("ondeactivate", this.blurForwarder);
}
}
};
SAPWD_AcfWrapper.prototype.unregisterComponent = function (id) {
if (this.currentObjects && this.currentObjects[id]) {
delete this.currentObjects[id];
}
};
SAPWD_AcfWrapper.prototype.flushCallQueue = function(id) {
;
var obj = this.currentObjects[id];
obj.readyState = true;
for (var i=0; i < obj.callQueue.length; i++) {
with (obj.callQueue[i]) {
this.executeCall(id, methodName, params);
}
}
obj.callQueue = [];
};
SAPWD_AcfWrapper.prototype.getComponentInstance = function(id) {
var domObject = document.getElementById(id);
return domObject;
};
SAPWD_AcfWrapper.prototype.registerComponent = function(id) {
var firstAcfApi = true;
for(var i in this.currentObjects)
firstAcfApi=false;
if(firstAcfApi) {
;
application.registerListener( this );
}
this.currentObjects[id] = {callQueue:[], readyState:false};
this.callFunction(id, "freeze", []);
this.callFunction(id, "setBaseUrl", [this.getBaseUrl()]);
if (this.alreadyLoaded[id]) {
this.flushCallQueue(id);
this.alreadyLoaded[id] = null;
}
};
SAPWD_AcfWrapper.prototype.onSubmit = function(pendingRequestHandler) {
;
SAPWD_AcfWrapper.pendingRequestHandler = pendingRequestHandler;
this.freeze();
this.saveChanges();
SAPWD_AcfWrapper.pendingRequestHandler.resume();
SAPWD_AcfWrapper.pendingRequestHandler = null;
}
SAPWD_AcfWrapper.prototype.destroy = function() {
application.unregisterListener( this );
}
SAPWD_AcfWrapper.prototype.saveChanges = function() {
;
for (var i in this.currentObjects) if (i.charCodeAt(0) != 95) {
if (!this.getComponentInstance(i)) {
this.currentObjects[i] = null;
} else {
this.callFunction(i, "saveChanges");
}
}
};
SAPWD_AcfWrapper.prototype.setInvocationXml = function(id, invocationXml) {
this.callFunction(id, "invoke", [invocationXml]);
};
SAPWD_AcfWrapper.prototype.getBaseUrl = function() {
var baseUrl = location.href,
questionMarkPos = baseUrl.indexOf("?");
if (questionMarkPos > 0) baseUrl = baseUrl.substr(0, questionMarkPos);
return baseUrl;
};
SAPWD_AcfWrapper.prototype.freeze = function() {
;
for (var i in this.currentObjects) if (i.charCodeAt(0) != 95) {
if (this.getComponentInstance(i)) {
this.callFunction(i, "freeze");
}
}
};
SAPWD_AcfWrapper.prototype.onUnlock = function() {
for (var i in this.currentObjects) if (i.charCodeAt(0) != 95) {
if (this.getComponentInstance(i)) {
this.callFunction(i, "unfreeze");
}
}
};
SAPWD_AcfWrapper.prototype.onFocus = function(id) {
this.callFunction(id, "onFocus");
};
SAPWD_AcfWrapper.prototype.onBlur = function(id) {
this.callFunction(id, "onBlur");
};
SAPWD_AcfWrapper.prototype.focusForwarder = function(e) {
if (!e) e = event;
var instance = e.srcElement || e.target;
SAPWD_acfWrapper.onFocus(instance.id);
};
SAPWD_AcfWrapper.prototype.blurForwarder = function(e) {
if (!e) e = event;
var instance = e.srcElement || e.target;
SAPWD_acfWrapper.onBlur(instance.id);
};
var SAPWD_acfWrapper = new SAPWD_AcfWrapper ();
function SAPWD_OPCode( application ) {
this.application = application;
}
SAPWD_OPCode.prototype.openPopup = function( param ) {
;
var mainApplication = this.application.mainApplication;
var topWindow       = mainApplication.applicationStack[mainApplication.applicationStack.length-1].window;
var popupManager    = mainApplication.lightspeed.oGetPopupManager();
popupManager.createPopupWindow( topWindow, mainApplication.popupURL + param.childWindowId, param.childWindowId );
var popupWindow = popupManager.oGetWindowByPopupId(param.childWindowId);
if (!popupWindow)
;
};
SAPWD_OPCode.prototype.closePopup = function ( param ) {
;
if(param.childWindowId=="close_all"){
this.application.mainApplication.lightspeed.oGetPopupManager().closeAllPopups();
var l_length = this.application.applicationStack.length-1;
var l_index  = -(this.application.applicationStack.length-1);
this.application.applicationStack.splice(l_index,l_length);
}
else{
this.application.mainApplication.lightspeed.oGetPopupManager().closePopup(param.childWindowId);
this.application.mainApplication.unregisterPopup(param.childWindowId);
}
};
SAPWD_OPCode.prototype.openPopupMenu = function( param ) {
;
this.application.lightspeed.oGetControlById(param.controlId).openAtPosition(parseInt(param.posx), parseInt(param.posy));
};
SAPWD_OPCode.prototype.openPopupTrigger = function( param ) {
;
this.application.lightspeed.oGetControlById(param.controlId).openOnRequest(param.popupMenuId, param.withKeyboard);
};
SAPWD_OPCode.prototype.openComboBox = function( param ) {
this.application.lightspeed.oGetControlById( param.controlId ).open();
};
SAPWD_OPCode.prototype.setFocus = function ( param ) {
;
this.application.setFocus(param.controlId,param.portalNavigation);
};
SAPWD_OPCode.prototype.scrollIntoView = function ( param ) {
;
this.application.lightspeed.scrollIntoView(param.controlId, param.alignToTop);
};
SAPWD_OPCode.prototype.unlock = function ( param ) {
;
this.application.unlock();
};
SAPWD_OPCode.prototype.addHiddenControl = function ( param ){
;
var hiddenArea = this.application.mainApplication.document.getElementById("hiddenArea");
if (hiddenArea){
hiddenArea.innerHTML = hiddenArea.innerHTML+param.hiddenControlHTML;
}
};
SAPWD_OPCode.prototype.attachFile = function ( param ) {
;
var mainDocument = this.application.mainApplication.window.document;
var pathLen      = mainDocument.location.pathname.length - 1;
var url = "";
if (param.target == "_self" ){
url = UCF_JsUtil.sGetResolvedUrl(param.url,document.location.href);
if (param.attachedFileMethod == "location"){
document.location.href = url;
}
else {
UCF_JsUtil.downloadFile(url);
}
}
else{
param["attachedFileId"] = "";
param["attachedFileMethod"] = "";
param["menubar"] = "yes";
param["scrollbars"] = "yes";
param["location"] = "yes";
param["resizable"] = "yes";
param["status"] = "yes";
param["toolbar"] = "yes";
this.openExternalWindow(param);
}
};
SAPWD_OPCode.prototype.openExternalWindow = function ( param ){
application.lightspeed.oGetPage().oLS.lockByNavigation();    
UCF_JsUtil.delayedCall(1500, application.lightspeed.oGetPage().oLS, "unlockByNavigation", []);  
;
var optParameters = "";
for ( var para in param ) {
if ( para == "windowId" || para == "url" || para == "target" || param[para] == "" )
continue;
if ( optParameters != "" )
optParameters += ", ";
optParameters += para + "=" + param[para];
}
try{
this.application.mainApplication.window.open( param.url, param.target, optParameters );
} catch(ex){ }
};
SAPWD_OPCode.prototype.redirect = function ( param ){
;
param["target"] = "";
var aParameters,
mParameters = {},
aParameter,
sName,
sValue;
if (param.postParameters) {
aParameters = param.postParameters.split("&");
for (var i = 0; i < aParameters.length; i++) {
aParameter = aParameters[i].split("=");
sName = decodeURIComponent(aParameter[0]);
sValue = decodeURIComponent(aParameter[1]);
if (sName) {
mParameters[sName] = "";
if (sValue) {
mParameters[sName] = sValue;
}
}
}
}
if (param.method == "GET" && !param.postParameters && !param.target) {
document.location.href = param.url;
return;
}
else{
var oForm = document.createElement("form"),
oInput;
oForm.setAttribute("action", param.url);
oForm.setAttribute("target", param.target);
oForm.setAttribute("method", param.method);
for (var i in mParameters) {
oInput = document.createElement("input");
oInput.setAttribute("type", "hidden");
oInput.setAttribute("name", i);
oInput.setAttribute("value", mParameters[i]);
oForm.appendChild(oInput);
}
document.body.appendChild(oForm);
oForm.submit();
document.body.removeChild(oForm);
}
this.application.onLightspeedExit();
};
SAPWD_OPCode.prototype.fireSemanticEvent = function ( param ){
var parameters = {};
parameters["Id"] = param.Id;
for (var para in param) {
if (para == "Id" || para == "eventName" || para == "action" )
continue;
parameters[para] = param[para];
}
var oEvent = application.lightspeed.oCreateSemanticEvent(             param.eventName,
parameters,
{} );
oEvent.setClientAction( param.action );
oEvent.setResponseData( "delta" );
application.lightspeed.fireSemanticEvent( oEvent );
};
SAPWD_OPCode.prototype.addDebugHandler = function ( param ){
var handler = new Object();
handler.trigger = new Function(param.script);
application.lightspeed.addDebugHandler( UCF_KeyCodes[param.keyCode],
handler,
param.description );
};
SAPWD_OPCode.prototype.closeWindow = function ( param ){
top.close();
};
SAPWD_OPCode.prototype.setTitle = function (param){
this.application.lightspeed.oGetPage( ).setTitle(param.title);
}
SAPWD_OPCode.prototype.setPadding = function( param ){
if ( param.windowId == this.application.mainApplication.windowId )
this.application.mainApplication.setPadding( param.windowId, param.padding );
else {
var win = this.application.lightspeed.oGetPopupManager().oGetWindowByPopupId(param.windowId);
win.application.setPadding(param.windowId,param.padding);
}
}
SAPWD_OPCode.sGetInstalledJavaVersion = function() {
if (window.ActiveXObject) {
try {
new ActiveXObject("JavaWebStart.isInstalled");
} catch(e) {
return "NOT_INSTALLED";
};
for(var iVersion=9; iVersion>=4; iVersion--) {
try {
new ActiveXObject("JavaWebStart.isInstalled.1." + iVersion + ".0.0");
return "1." + iVersion;
} catch(e) {};
}
return "UNKNOWN";
} else {
for (var i = 0; navigator.plugins[i]; i++) {
var sName = navigator.plugins[i].name.toLowerCase();
if(/java\(tm\)/.test(sName)) {
var aMatch = sName.match(/.*\s(\d)\s/);
if(aMatch && aMatch.length > 1) return "1." + aMatch[1];
else return "UNKNOWN";
}
}
return "NOT_INSTALLED";
}
};
SAPWD_OPCode.prototype.getClientInfos = function ( param ){
var parameters = {};
parameters["Id"]                 = param.Id;
try {
parameters["WindowOpenerExists"] = window.top.opener ? "true" : "false";
} catch (e) {
parameters["WindowOpenerExists"] = window.opener ? "true" : "false";
}
parameters["ClientURL"]          = document.location.href;
if (UCF_JsUtil.sGetInstalledJavaVersion) 
parameters["PluginVersion"] = UCF_JsUtil.sGetInstalledJavaVersion();
else
parameters["PluginVersion"] = SAPWD_OPCode.sGetInstalledJavaVersion();
var oEvent = application.lightspeed.oCreateSemanticEvent(             "ClientInfos",
parameters,
{} );
oEvent.setClientAction( "enqueue" );
oEvent.setResponseData( "delta" );
application.lightspeed.fireSemanticEvent( oEvent );
}
SAPWD_OPCode.prototype.ACF_create = function( param ) {
;
SAPWD_acfWrapper.registerComponent( param.controlId );
SAPWD_acfWrapper.setInvocationXml( param.controlId, param.invocationXML );
};
SAPWD_OPCode.prototype.ACF_update = function( param ) {
;
SAPWD_acfWrapper.setInvocationXml( param.controlId, param.invocationXML );
};
SAPWD_OPCode.prototype.ACF_delete = function( param ) {
SAPWD_acfWrapper.unregisterComponent( param.controlId );
;
};
function SAPWD_PluginLoader(){ }
SAPWD_PluginLoader.sBaseUrl   = null;
SAPWD_PluginLoader.sVersion   = null;
SAPWD_PluginLoader.bDebugLibs = false;
SAPWD_PluginLoader.prototype.createBaseUrl = function() {
var aScriptTags = document.getElementsByTagName("script"),
sScriptUrl, iFilePos, iQueryPos;
for (var i = 0; i < aScriptTags.length; i++) {
sScriptUrl = aScriptTags[i].getAttribute("src");
if (!sScriptUrl) continue;
iFilePos = sScriptUrl.indexOf("/wda_ls_main.js");
iQueryPos = sScriptUrl.lastIndexOf("?");
if (iFilePos >= 0) break;
}
;
this.sBaseUrl = sScriptUrl.substr(0, iFilePos);
if (iQueryPos > 0) {
this.sVersion = sScriptUrl.substr(iQueryPos + 1);
}
this.bDebugLibs = this.sBaseUrl.indexOf("/js/dbg") > 0;
};
SAPWD_PluginLoader.prototype.loadPlugin = function(sPluginName) {
;
;
;
if (!this.sBaseUrl) this.createBaseUrl();
var sFileName = "wda_ls_" + sPluginName + "_plugin.js", 
sUrl = this.sBaseUrl + "/" + sFileName;
if (this.sVersion) {
sUrl += "?" + this.sVersion;
}
var oResponse = UCF_RequestUtil.sendSyncRequest(sUrl);
;
if (window.execScript) {
window.execScript(oResponse.sText);
window[sPluginName] = true;
} else {
window.eval(oResponse.sText);
}
};
SAPWD_PluginLoader.prototype.oGetPlugin = function(sPluginName) {
var oPlugin = window[sPluginName];
if ( !oPlugin ) {
this.loadPlugin(sPluginName);
oPlugin = window[sPluginName];
;
}
};
SAPWD_pluginLoader = new SAPWD_PluginLoader();
function SAPWD_ClassLoader(){}
SAPWD_ClassLoader.sBaseUrl = null;
SAPWD_ClassLoader.sVersion = null;
SAPWD_ClassLoader.bDebugLibs = false;
SAPWD_classLoader = new SAPWD_ClassLoader();
SAPWD_ClassLoader.prototype.createBaseUrl = function() {
var aScriptTags = document.getElementsByTagName("script"),
sScriptUrl, iFilePos, iQueryPos;
for (var i = 0; i < aScriptTags.length; i++) {
sScriptUrl = aScriptTags[i].getAttribute("src");
if (!sScriptUrl) continue;
iFilePos = sScriptUrl.indexOf("/wda_ls_main.js");
iQueryPos = sScriptUrl.lastIndexOf("?");
if (iFilePos >= 0) break;
}
;
this.sBaseUrl = sScriptUrl.substr(0, iFilePos);
if (iQueryPos > 0) {
this.sVersion = sScriptUrl.substr(iQueryPos + 1);
}
this.bDebugLibs = this.sBaseUrl.indexOf("/js/dbg") > 0;
};
SAPWD_ClassLoader.prototype.loadClass = function(sClassName) {
;
;
;
;
if (!this.sBaseUrl) this.createBaseUrl();
var sFileName = "wda_ls_" + sClassName.substr(6) + ".js",
sUrl = this.sBaseUrl + "/" + sFileName;
if (this.sVersion) {
sUrl += "?" + this.sVersion;
}
var oResponse = UCF_RequestUtil.sendSyncRequest(sUrl);
;
if (window.execScript) {
window.execScript(oResponse.sText);
} else {
window.eval(oResponse.sText);
}
if (!window[sClassName]) {
window[sClassName] = eval(sClassName);
}
};
SAPWD_ClassLoader.prototype.oGetClass = function(sClassName) {
try {window} catch(e) {return Object;}
;
;
;
var oClass = window[sClassName];
if (!oClass || typeof(oClass) != "function") {
this.loadClass(sClassName);
oClass = window[sClassName];
}
;
return oClass;
};
var wdaOnMainLoad  = function () { application = new SAPWD_MainApplication(""); };
var wdaOnPopupLoad = function () { application = new SAPWD_PopupApplication(""); };
var wdaOnUnload    = function () { application.exit(); application = null; };