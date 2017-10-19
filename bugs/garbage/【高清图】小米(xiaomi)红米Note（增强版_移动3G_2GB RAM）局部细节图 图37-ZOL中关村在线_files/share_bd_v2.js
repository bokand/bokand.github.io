
var uid = "14034";
if (!window.wbUid) { wbUid = "1747383115";}
window._bd_share_config={ 
    "common":{
        "bdSnsKey":{"douban":"038da04052b48ba40aa8e0c0f81da2ec","kaixin001":"8538101596364666108354ecf774d44f","baidu":"S8mu6XF2eyofbNPHkpUZwy79","qzone":"99d207b90670adceaaa416b63528d92c","tsina":"4028615622","tqq":"99d207b90670adceaaa416b63528d92c","renren":"632d9fb0e8594d74aee32a2f51e65a9a"},
        "bdText": shareDbText,	
        "bdDesc": shareDbText,	
        "bdUrl": shareDbUrl, 	
        "bdPic": shareDbPic,	
        "bdMini":"2",
        "bdPic":"",
        "bdStyle":"0",
        "bdSize":"16",
        "onBeforeClick":function(cmd, config){
            if (typeof(pageKey) == 'undefined') {
                var pageKey = '';
            }
            if (pageKey) {
                if (pageKey == 'picDetail') {
                    var curDomain   = document.domain;
                    shareDbUrl      = window.location.href.replace(curDomain, 'wap.zol.com.cn');
                    shareDbUrl      = shareDbUrl.replace('shtml', 'html');
                }
            }

            //只有微信能链接到wap的链接到
            if ('weixin' != cmd) {
                shareDbUrl = '';
            }

			if(cmd=="tsina"){
                if (shareDbText) {
                    var sinaDbText = shareDbText +'【（分享自 @ZOL中关村在线）】';
                } else {
                    var sinaDbText = '';
                }

				return {
					bdText: sinaDbText,
					bdDesc: sinaDbText,
					bdUrl : shareDbUrl,
					bdPic : shareDbPic
				}
			} else {
				return{
					bdText: shareDbText, 
					bdDesc: shareDbText, 
					bdUrl : shareDbUrl, 
					bdPic : shareDbPic
				}
			}
		}
    },
    "share":[{
			"tag" : "share_1",
			"bdSize" : 24
	}]
};

with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion='+~(-new Date()/36e5)];
