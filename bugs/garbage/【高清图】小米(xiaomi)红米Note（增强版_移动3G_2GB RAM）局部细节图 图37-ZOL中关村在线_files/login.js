(function(c,g){var e=window.parent?window.parent:window;e.ZOL_LOGIN_CALLBACK=function(i){if(i){try{if(i.type=="change"||i.type=="bind"){var n="type="+i.type+"&userid="+encodeURIComponent(i.userid);n+="&token="+i.token+"&timestamp="+i.timestamp;n+="&email="+i.email+"&phone="+i.phone;n+="&backurl="+encodeURIComponent(i.backurl);var h=document.createElement("script");h.type="text/javascript";h.id="chgpwd_scriptChangePwd";h.src="http://icon.zol-img.com.cn/service/js/chgpwd.js?"+n;document.body.appendChild(h);return false}else{if(parent){parent.window.location.reload(true)}else{window.location.reload(true)}}}catch(m){}}};var f=[],j=false,a=false,d={loadJs:function(i){if(typeof i!=="string"){return false}var h=document.createElement("script");h.src=i;h.language="javascript";h.type="text/javascript";document.getElementsByTagName("head")[0].appendChild(h)}};if(f.length){for(var b=0,l=f.length;b<l;b++){d.loadJs(f[b])}}var k=function(t){var i=c.extend({width:368,height:429,hasCover:true,type:"big",loginUrl:"http://service.zol.com.cn/user/siteLogin.php?type=big",cssUrl:"http://icon.zol-img.com.cn/group/css/zLoginDialog.css",closeEvent:"",callback:"ZOL_LOGIN_CALLBACK"},t);var m=!-[1,]&&!window.XMLHttpRequest;var n,p=false;if(parent){var s=c(parent.window);var u=parent.document}else{var s=c(window);var u=document}if(j===false&&i.cssUrl!=""){j=true;var o='<link href="'+i.cssUrl+"?"+new Date().getTime()+'" rel="stylesheet">';if(parent){c(window.parent.document).find("head").append(o)}else{c("head").append(c(o))}}var v={getPosition:function(){var z,y;var A=s.width();var w=s.height();var x=s.scrollTop();z=(A-i.width)/2;if(m){y=(w-i.height)/2+x}else{y=(w-i.height)/2}return{x:z,y:y,clientH:w}},createHTML:function(){if(c("#J_dialogBox",u).size()){return true}var B=this.getPosition();var w=m?"absolute":"fixed";var y=m?' style="height:'+B.clientH+'px;"':"";var x='<div id="J_LoginOverlay"'+y+'><div class="login-dialog-overlay"></div><iframe'+y+' src=""></iframe></div>';var z='<div id="J_dialogBox" style="position:'+w+"; left:"+B.x+"px; top:"+B.y+"px; z-index:10000; width:"+i.width+"px; height:"+i.height+'px">'+'   <div class="login-dialog">'+'       <div class="login-dialog-inner">'+'           <div id="J_dialogClose" class="login-dialog-close">\u5173\u95ed</div>'+'           <div class="login-dialog-header"><h3>ZOL\u767b\u5f55</h3></div>'+'			<iframe src="'+i.loginUrl+"&callback="+i.callback+'" width="358" height="380" frameborder="0" scrolling="no" style="vertical-align:middle"></iframe>'+"       </div>"+"   </div>"+"</div>";var A=i.hasCover?x+z:z;if(parent){c(window.parent.document.body).append(A)}else{c(A).appendTo("body")}}};var r={stat:function(A){var y=null,x=this.getCookie("ip_ck"),C="http://pvtest.zol.com.cn/images/pvevents.gif",A=A||"tanceng";var B=window.location.href.split("#"),w=encodeURIComponent(B[0]);C+="?t="+(new Date().getTime())+"&event="+A+"&ip_ck="+x+"&url="+w;var z=new Image();z.src=C},getCookie:function(x){var w,y=new RegExp("(^| )"+x+"=([^;]*)(;|$)");if(w=document.cookie.match(y)){return unescape(w[2])}else{return""}}};var q=document.domain;var h=function(){v.createHTML();document.domain="zol.com.cn";var x=this,y=c("#J_dialogBox",u),w=c("#J_LoginOverlay",u);s.bind("resize scroll",function(){var z=v.getPosition();y.css({"left":z.x,"top":z.y});w.css({"height":z.clientH})});c("#J_dialogClose",u).on("click",function(){y.remove();w.remove();document.domain=q;i.closeEvent&&(function(){r.stat(i.closeEvent)}())});r.stat()};if(a===false){a=true;return function(){if(p===true){return false}p=true;c("body").on("click",'[data-role="user-login"]',function(w){w.preventDefault();h.call(c(this))})}}else{return this.each(function(){var w=null;c(this).on("click",w=function(x){x.preventDefault();h.call(c(this))});this["_zLogin"]=w})}};window.Zol_Login=k(g);c.fn.zLogin=k;c.fn.zRemoveLogin=function(){this.each(function(){typeof this["_zLogin"]!="undefined"&&c(this).off("click",this["_zLogin"])})};k=null}(jQuery,typeof ZLOGIN_CONFIG==="object"?ZLOGIN_CONFIG:{}));$(function(){Zol_Login()});