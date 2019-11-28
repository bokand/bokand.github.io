
//Created / Generates the captcha function
var timer;
var roTimer;

function DrawCaptcha() {	
	$("#loadingImg").css("display", "");
	
	var params = {
			CSRFToken : document.getElementById("CSRFToken").value
	};
	$.ajax({
				type : "POST",
				url : "captcha-image.html", //url : "genCaptcha.html",
				data : params,
				beforeSend : function(xhr) {
					xhr.overrideMimeType("text/plain; charset=UTF-8");
					//xhr.setRequestHeader('CSRFToken', csrf_token);
				},
				success : function(data) {
					$("#loadingImg").css("display", "none");
					var imgData = data.toString();
				//	var result = data.toString();
				//	result = result.toString();
				//	if (result.length != "6") {
				//		showErrorMessage(result);						
				//	} else {
				//		document.getElementById("txtCaptcha").value = result.toLowerCase();
				//	}
				//	$('#txtCaptcha').html(data);
	//				data = "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"
					var result = new Array();
					result = imgData.split("CaptchaValue");
					document.getElementById("imgText").value = result[1];
					document.getElementById("imgCaptcha").src = "data:image/jpeg;base64," + result[0];
				}
			});	
}

function DrawROCaptcha() {
	
	$("#loadingImg").css("display", "");

	var params = {
			CSRFToken : document.getElementById("CSRFToken").value
	};
	$.ajax({
				type : "POST",
				url : "captcha-image.html", //url : "genROCaptcha.html",
				data : params,
				beforeSend : function(xhr) {
					xhr.overrideMimeType("text/plain; charset=UTF-8");
					//xhr.setRequestHeader('CSRFToken', csrf_token);
				},
				success : function(data) {
					$("#loadingImg").css("display", "none");
					var imgData = data.toString();
					/*var result = data.toString();
					result = result.toString();
					if (result.length != "6") {
						showErrorMessage(result);						
					} else {
						
					}*/
					var result = new Array();
					result = imgData.split("CaptchaValue");
					document.getElementById("imgText").value = result[1];
					document.getElementById("imgCaptcha").src = "data:image/jpeg;base64," + result[0];
				}
			});	
}
// Remove the spaces from the entered and generated code

function DrawCaptchaROHome() {	
	$("#loadingImg").css("display", "");
	
	var params = {
			CSRFToken : document.getElementById("CSRFToken").value
	};
	$.ajax({
				type : "POST",
				url : "captcha.html", //url : "genCaptcha.html",
				data : params,
				beforeSend : function(xhr) {
					xhr.overrideMimeType("text/plain; charset=UTF-8");
					//xhr.setRequestHeader('CSRFToken', csrf_token);
				},
				success : function(data) {
					if(data.indexOf("<!DOCTYPE")>-1){
						 window.location.href = "/eaadhaar/RO";
						 //showErrorMessage("Please enter correct One Time Password.");
				}
					else{
						$("#loadingImg").css("display", "none");
						var imgData = data.toString();
					//	var result = data.toString();
					//	result = result.toString();
					//	if (result.length != "6") {
					//		showErrorMessage(result);						
					//	} else {
					//		document.getElementById("txtCaptcha").value = result.toLowerCase();
					//	}
					//	$('#txtCaptcha').html(data);
		//				data = "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"
						var result = new Array();
						result = imgData.split("CaptchaValue");
						document.getElementById("imgText").value = result[1];
						document.getElementById("imgCaptcha").src = "data:image/jpeg;base64," + result[0];
					}	
				}
			});	
}

function removeSpaces(string) {
	return string.split(" ").join("");
}

function checkboxTotp(obj) {
	
	if(obj.checked) {
		
		$(".otpBottomBox").css("display", "none");
		$(".totpBottomBox").css("display", "block");       
		$("#noteDiv").css("display", "none");  
		$("#noteDiv1").css("display", "block");
		//$(".buttonSet").css("display", "none");		
		$(".otpButtonWrapper").css("display", "none");	
    }
	
	else {
		$(".otpBottomBox").css("display", "block");
		$(".totpBottomBox").css("display", "none");
		$("#noteDiv").css("display", "block");
		$("#noteDiv1").css("display", "none");
		//$(".buttonSet").css("display", "block");
		$(".otpButtonWrapper").css("display", "block");
		
	}
	
}



function validateEntryType(obj,type) {
	
/*	var val1 = "<%=request.getSession().getAttribute("userName")%>"; 
	alert(val1);
	var val2 = "<%=session().getAttribute("userName")%>"; 
	alert(val2);*/
	
	
	try {
	if(type=="ro"){
		DrawCaptchaROHome();
	}else{
		DrawCaptcha();
	}
	}
	catch(err) {
	}
	hideServerMessageBlock();
	
	if (obj.value == "eidRadio") {
		document.getElementById("eid").value = "";
		document.getElementById("dateTime").value = "";
		document.getElementById("txtInput").value = "";		
		$("#eid").unmask();
		$("#dateTime").unmask();
		$("#eid").mask("?9999/99999/99999");
		$("#dateTime").mask("?99/99/9999 99:99:99");
		$("#dateTimeDiv").css("display", "block");
		$("#mobileDiv").css("display", "none");
		$("#noteDiv").css("display", "");
		$("#eid_sugg").css("display", "");
		$("#uid_sugg").css("display", "none");
		//$("#eid").attr("placeholder", "1234/12345/12345");
		//$("#TOTP").attr('checked', false);
		$("#noteDiv").css("display", "block");
		$("#noteDiv1").css("display", "none");
		$("#vid_sugg").css("display", "none");
		$(".vidError").css("display" , "none");
		$(".uidError").css("display" , "none");
		$("#floatLeftDiv").addClass("floatLeft");
		$(".userNameError").css("display" , "none");
		$(".pinCodeError").css("display" , "none");
		$(".captchaError").css("display" , "none");
		$("#userName_sugg").css("display", "block");
		$("#pinCode_sugg").css("display", "block");
		$("#captcha_sugg").css("display", "block");	
		
	}
	
	if (obj.value == "uidRadio") {
		document.getElementById("eid").value = "";
		document.getElementById("dateTime").value = "";
		document.getElementById("txtInput").value = "";
		$("#eid").unmask();
		$("#dateTime").unmask();
		$("#eid").mask("?9999/9999/9999");
		$("#dateTimeDiv").css("display", "none");
		$("#mobileDiv").css("display", "none");
		$("#noteDiv").css("display", "");
		$("#eid_sugg").css("display", "none");
		$("#uid_sugg").css("display", "");
		//$("#eid").attr("placeholder", "1234/1234/1234");
		//$("#TOTP").attr('checked', false);
		$("#noteDiv").css("display", "block");
		$("#noteDiv1").css("display", "none");
		$("#vid_sugg").css("display", "none");
		$(".vidError").css("display" , "none");
		$(".eidError").css("display" , "none");
		$("#floatLeftDiv").addClass("floatLeft");
		$(".datetimeError").css("display" , "none");
		$(".userNameError").css("display" , "none");
		$(".pinCodeError").css("display" , "none");
		$(".captchaError").css("display" , "none");
		$("#userName_sugg").css("display", "block");
		$("#pinCode_sugg").css("display", "block");
		$("#captcha_sugg").css("display", "block");	
	}
	
	if (obj.value == "vidRadio") {
		document.getElementById("eid").value = "";
		document.getElementById("dateTime").value = "";
		document.getElementById("txtInput").value = "";
		$("#eid").unmask();
		$("#dateTime").unmask();
		$("#eid").mask("?9999/9999/9999/9999");
		$("#dateTimeDiv").css("display", "none");
		$("#mobileDiv").css("display", "none");
		$("#noteDiv").css("display", "");
		$("#eid_sugg").css("display", "none");
		$("#vid_sugg").css("display", "");
		$("#uid_sugg").css("display", "none");
		//$("#eid").attr("placeholder", "1234/1234/1234");
		//$("#TOTP").attr('checked', false);
		$("#noteDiv").css("display", "block");
		$("#noteDiv1").css("display", "none");
		$(".uidError").css("display" , "none");
		$(".eidError").css("display" , "none");
		$("#floatLeftDiv").removeClass("floatLeft");
		$(".datetimeError").css("display" , "none");
		$(".userNameError").css("display" , "none");
		$(".pinCodeError").css("display" , "none");
		$(".captchaError").css("display" , "none");
		$("#userName_sugg").css("display", "block");
		$("#pinCode_sugg").css("display", "block");
		$("#captcha_sugg").css("display", "block");	
	}
}

function validateEntryTypeErr(obj,type) {
	try {
		if(type=="ro"){
			DrawCaptchaROHome();
		}else{
			DrawCaptcha();
		}
		}
		catch(err) {
		}
	
	if (obj.value == "eidRadio") {
		document.getElementById("eid").value = "";
		document.getElementById("dateTime").value = "";
		document.getElementById("txtInput").value = "";		
		$("#eid").unmask();
		$("#dateTime").unmask();
		$("#eid").mask("?9999/99999/99999");
		$("#dateTime").mask("?99/99/9999 99:99:99");
		$("#dateTimeDiv").css("display", "inline");
		$("#mobileDiv").css("display", "");
		$("#noteDiv").css("display", "none");
	}
	
	if (obj.value == "uidRadio") {
		/*document.getElementById("eid").value = "";
		document.getElementById("dateTime").value = "";
		document.getElementById("txtInput").value = "";*/
		$("#eid").unmask();
		$("#dateTime").unmask();
		$("#eid").mask("?9999/9999/9999");
		$("#dateTimeDiv").css("display", "none");
		$("#mobileDiv").css("display", "none");
		$("#noteDiv").css("display", "");
	}
}



function downloadLetter() {
	/*var eidUidValue 	= document.getElementById("eid").value;
	var dateTimeValue 	= document.getElementById("dateTime").value;
	var userName 		= document.getElementById("name").value;
	var userPincode 	= document.getElementById("pinCode").value;
	var captchaImg 		= removeSpaces(document.getElementById("txtCaptcha").value);
	var captcha 		= removeSpaces(document.getElementById("txtInput").value);
	var mobileNum 		= document.getElementById("mobileNum").value;*/
	var otpField 		= document.getElementById("otpField").value;
	hideServerMessageBlock();
	
/*	if (document.getElementById("eidRadio").checked) {
		if (eidUidValue.indexOf("_") > -1 || eidUidValue.length < 16) {
			showErrorMessage("Please enter 14 digits of EID number in correct format.");
			return false;	
		} else if (dateTimeValue.indexOf("_") > -1 || dateTimeValue.length < 19) {
			showErrorMessage("Please enter valid date in (yyyy/mm/dd hh:mm:ss) format.");
			return false;
		}
	}
	if (document.getElementById("uidRadio").checked) {
		if (eidUidValue.indexOf("_") > -1 || eidUidValue.length < 14) {
			showErrorMessage("Please enter 12 digits of Aadhaar number in correct format.");
			return false;
		}
	}
	if (userName.trim() == "") {
		showErrorMessage("Please enter your correct Name.");
		return false;
	}
	if (userPincode.indexOf("_") > -1 || userPincode.length < 6) {
		showErrorMessage("Please enter your correct Pin Code.");
		return false;
	}
	if(captcha == ""){
		showErrorMessage("Please enter Captcha text.");		
		return false;
	}
	if (captchaImg != captcha) {
		showErrorMessage("Entered Captcha text does not matched.");
		DrawCaptcha();
		return false;
	}
	if (mobileNum.indexOf("_") > -1 || mobileNum.length < 10) {
		showErrorMessage("Please enter correct mobile number.");
		return false;
	}*/
	
	if (otpField.indexOf("_") > -1 || otpField.length < 6 ) {
		showErrorMessage("Please enter correct One Time Password.");
		return false;
	}

	document.getElementById("saveBut").disabled = true;
	$("#saveBut").removeClass("greenButton");
	$("#saveBut").addClass("grayButtonDisable");
	
	//showErrorMessage("Please do not press browser's back button or refresh page.Kindly use your pincode as password to open the PDF.");
	clearTimeout(timer);
    $('#resendOtpBut_wrapper').hide();
	//document.getElementById("resendOtpBut").disabled = true;
	document.forms["aadharForm"].submit();
}


function roLogin(){
	var otpField 		= document.getElementById("otpField").value;
	var userName        = document.getElementById("userName").value;
	if (otpField.indexOf("_") > -1 || otpField.length < 6 ) {
		showErrorMessage("Please enter correct One Time Password.");
		return false;
	}

	document.getElementById("loginbutton").disabled = true;	
	document.forms["userAuthenticateForm"].submit();
	}





/*====================================================================*/
/*======================Tooltip JS Starts ============================*/
/*====================================================================*/

function showToolTipForhelpbox1(e) {
	if (!e) {
		var e = window.event;
	}
	var linkID = e.srcElement ? e.srcElement.id : this.id;
	var helpbox = document.getElementById("helpbox1");
	helpbox.innerHTML = "<b>"
			+ "<h3>Please select Aadhaar, Enrolment ID or VID.</h3>"
			+ "</b>";
	helpbox.style.display = "block";
	var posx = (typeof e.pageX != "undefined") ? e.pageX : e.clientX
			+ (document.documentElement ? document.documentElement.scrollLeft
					: document.body.scrollLeft);
	var posy = (typeof e.pageY != "undefined") ? e.pageY : e.clientY
			+ (document.documentElement ? document.documentElement.scrollTop
					: document.body.scrollTop);
	helpbox.style.top = posy - 20 + "px";
	helpbox.style.left = posx + 10 + "px";
}

function hideToolTipForhelpbox1() {
	document.getElementById("helpbox1").style.display = "none";
}


function showToolTipForhelpbox2(e) {
	if (!e) {
		var e = window.event;
	}
	var linkID = e.srcElement ? e.srcElement.id : this.id;
	var helpbox = document.getElementById("helpbox2");
	helpbox.innerHTML = "<b>"
			+ "<h3>Please Enter 14 Digit ENO i.e.(1234/12345/12345) with 14 digit Date Time stamp as printed on the acknowledgement slip.</h3>"
			+ "</b>";
	helpbox.style.display = "block";
	var posx = (typeof e.pageX != "undefined") ? e.pageX : e.clientX
			+ (document.documentElement ? document.documentElement.scrollLeft
					: document.body.scrollLeft);
	var posy = (typeof e.pageY != "undefined") ? e.pageY : e.clientY
			+ (document.documentElement ? document.documentElement.scrollTop
					: document.body.scrollTop);
	helpbox.style.top = posy - 20 + "px";
	helpbox.style.left = posx + 10 + "px";
}

function hideToolTipForhelpbox2() {
	document.getElementById("helpbox2").style.display = "none";
}


function showToolTipForhelpbox3(e) {
	if (!e) {
		var e = window.event;
	}
	var linkID = e.srcElement ? e.srcElement.id : this.id;
	var helpbox = document.getElementById("helpbox3");
	helpbox.innerHTML = "<b>"
			+ "<h3>Please enter the exact name as shown in your Acknowledgement Slip.</h3>"
			+ "</b>";
	helpbox.style.display = "block";
	var posx = (typeof e.pageX != "undefined") ? e.pageX : e.clientX
			+ (document.documentElement ? document.documentElement.scrollLeft
					: document.body.scrollLeft);
	var posy = (typeof e.pageY != "undefined") ? e.pageY : e.clientY
			+ (document.documentElement ? document.documentElement.scrollTop
					: document.body.scrollTop);
	helpbox.style.top = posy - 20 + "px";
	helpbox.style.left = posx + 10 + "px";
}

function hideToolTipForhelpbox3() {
	document.getElementById("helpbox3").style.display = "none";
}


function showToolTipForhelpbox4(e) {
	if (!e) {
		var e = window.event;
	}
	var linkID = e.srcElement ? e.srcElement.id : this.id;
	var helpbox = document.getElementById("helpbox4");
	helpbox.innerHTML = "<b>"
			+ "<h3>Please enter 6 digit Pincode.</h3>"
			+ "</b>";
	helpbox.style.display = "block";
	var posx = (typeof e.pageX != "undefined") ? e.pageX : e.clientX
			+ (document.documentElement ? document.documentElement.scrollLeft
					: document.body.scrollLeft);
	var posy = (typeof e.pageY != "undefined") ? e.pageY : e.clientY
			+ (document.documentElement ? document.documentElement.scrollTop
					: document.body.scrollTop);
	helpbox.style.top = posy - 20 + "px";
	helpbox.style.left = posx + 10 + "px";
}

function hideToolTipForhelpbox4() {
	document.getElementById("helpbox4").style.display = "none";
}


function showToolTipForhelpbox5(e) {
	if (!e) {
		var e = window.event;
	}
	var linkID = e.srcElement ? e.srcElement.id : this.id;
	var helpbox = document.getElementById("helpbox5");
	helpbox.innerHTML = "<b>"
			+ "<h3>Please select Checkbox to enter 8 digit TOTP.</h3>"
			+ "</b>";
	helpbox.style.display = "block";
	var posx = (typeof e.pageX != "undefined") ? e.pageX : e.clientX
			+ (document.documentElement ? document.documentElement.scrollLeft
					: document.body.scrollLeft);
	var posy = (typeof e.pageY != "undefined") ? e.pageY : e.clientY
			+ (document.documentElement ? document.documentElement.scrollTop
					: document.body.scrollTop);
	helpbox.style.top = posy - 20 + "px";
	helpbox.style.left = posx + 10 + "px";
}

function hideToolTipForhelpbox5() {
	document.getElementById("helpbox5").style.display = "none";
}




function initToolTip() {
	var hrefs1 = document.getElementById("helpText1");
	var hrefs2 = document.getElementById("helpText2");
	var hrefs3 = document.getElementById("helpText3");
	var hrefs4 = document.getElementById("helpText4");
	var hrefs5 = document.getElementById("helpText5");
	if (hrefs1.attachEvent) {
		hrefs1.attachEvent("onmouseover", showToolTipForhelpbox1);
		hrefs1.attachEvent("onmouseout", hideToolTipForhelpbox1);
	} else {
		if (hrefs1.addEventListener) {
			hrefs1.addEventListener("mouseover", showToolTipForhelpbox1, false);
			hrefs1.addEventListener("mouseout", hideToolTipForhelpbox1, false);
		}
	}
	
	
	if (hrefs2.attachEvent) {
		hrefs2.attachEvent("onmouseover", showToolTipForhelpbox2);
		hrefs2.attachEvent("onmouseout", hideToolTipForhelpbox2);
	} else {
		if (hrefs2.addEventListener) {
			hrefs2.addEventListener("mouseover", showToolTipForhelpbox2, false);
			hrefs2.addEventListener("mouseout", hideToolTipForhelpbox2, false);
		}
	}
	
	
	if (hrefs3.attachEvent) {
		hrefs3.attachEvent("onmouseover", showToolTipForhelpbox3);
		hrefs3.attachEvent("onmouseout", hideToolTipForhelpbox3)
		;
	} else {
		if (hrefs3.addEventListener) {
			hrefs3.addEventListener("mouseover", showToolTipForhelpbox3, false);
			hrefs3.addEventListener("mouseout", hideToolTipForhelpbox3, false);
		}
	}
	
	
	if (hrefs4.attachEvent) {
		hrefs4.attachEvent("onmouseover", showToolTipForhelpbox4);
		hrefs4.attachEvent("onmouseout", hideToolTipForhelpbox4);
	} else {
		if (hrefs4.addEventListener) {
			hrefs4.addEventListener("mouseover", showToolTipForhelpbox4, false);
			hrefs4.addEventListener("mouseout", hideToolTipForhelpbox4, false);
		}
	}
	
	
	if (hrefs5.attachEvent) {
		hrefs5.attachEvent("onmouseover", showToolTipForhelpbox5);
		hrefs5.attachEvent("onmouseout", hideToolTipForhelpbox5);
	} else {
		if (hrefs5.addEventListener) {
			hrefs5.addEventListener("mouseover", showToolTipForhelpbox5, false);
			hrefs5.addEventListener("mouseout", hideToolTipForhelpbox5, false);
		}
	}
	
	/*if(hrefsTOTP)
		{
	if (hrefsTOTP.attachEvent) {
		hrefsTOTP.attachEvent("onmouseover", showToolTipA3);
		hrefsTOTP.attachEvent("onmouseout", hideToolTipA3);
	} else {
			if (hrefsTOTP.addEventListener) {
			hrefsTOTP.addEventListener("mouseover", showToolTipForTOTP, false);
			hrefsTOTP.addEventListener("mouseout", hideToolTipForTOTP, false);
		}
	}
		}*/
}

/*====================================================================*/
/*======================Tooltip JS Ends ==============================*/
/*====================================================================*/



	
function authenticateUser(){
	var userName		= document.getElementById("userName").value;
	var userPassword= document.getElementById("password").value;
	//var captchaImg = removeSpaces(document.getElementById("txtCaptcha").value);
	var captcha = removeSpaces(document.getElementById("txtInput").value);
	hideServerMessageBlock();
	if (userName=="") {
		showErrorMessage("Please enter User Name.");
		return false;
	}if (userPassword=="") {
		showErrorMessage("Please enter Password.");
		return false;
	}
	if(captcha == ""){
		showErrorMessage("Please enter Captcha text.");		
		return false;
	}
	/*if (captchaImg != captcha) {
		showErrorMessage("Entered Captcha text does not matched.");
		DrawROCaptcha();
		return false;
	}*/
	
	document.getElementById("otpPassBut").disabled = true;
	roTimer= setTimeout(function() {
		if(document.getElementById("otpPassBut").disabled){			//BugID:28641 Desctiption: "ReSend OTP" button should not be visible on home screen before invisible of "Get OTP" button.
		    //$('#resendOtpBut').show();
    	    $('#resendOtpBut_wrapper').show();
			//document.getElementById('resendOtpBut').disabled = false;
		}
	}, 140000);
	
	generateOTPForROLogin(userName,userPassword,captcha,false);
}
function authenticateUserForResendOTP(){
	var userName		= document.getElementById("userName").value;
	var userPassword= document.getElementById("password").value;
	//var captchaImg = removeSpaces(document.getElementById("txtCaptcha").value);
	var captcha = removeSpaces(document.getElementById("txtInput").value);
	hideServerMessageBlock();
	if (userName=="") {
		showErrorMessage("Please enter User Name.");
		return false;
	}if (userPassword=="") {
		showErrorMessage("Please enter Password.");
		return false;
	}
	if(captcha == ""){
		showErrorMessage("Please enter Captcha text.");		
		return false;
	}
	/*if (captchaImg != captcha) {
		showErrorMessage("Entered Captcha text does not matched.");
		DrawROCaptcha();
		return false;
	}*/
	
	document.getElementById("otpPassBut").disabled = true;
	//document.getElementById("resendOtpBut").disabled = true;
	generateOTPForROLogin(userName,userPassword,captcha,true);
}
function validateAndSubmitProfilePage(){
	var currentPassword	= document.getElementById("currPassword").value;
	var newPassword		= document.getElementById("newPassword").value;
	var reNewPassword	= document.getElementById("reNewPassword").value;
	
	var pattern = new RegExp("/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%])([a-zA-Z0-9!@#$%]{8,})$/");	
	
	hideServerMessageBlock();
	if(currentPassword == ""){
		showErrorMessage("Current Password cannot be left blank.");
		return false;
	}
	if(newPassword == ""){
		showErrorMessage("New Password cannot be left blank.");
		return false;
	} 
	if(reNewPassword==""){
		showErrorMessage("Re-Type New Password cannot be left blank.");
		return false;
	}
	if(!newPassword.match(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%])([a-zA-Z0-9!@#$%]{8,})$/) || !reNewPassword.match(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%])([a-zA-Z0-9!@#$%]{8,})$/)){
		showErrorMessage("New Password must contain atleast one UpperCase, one special character (!,@,#,$,%), one numeric and should be 8 to 16 characters long.");
		return false;
	}
	if(newPassword!=reNewPassword){
		showErrorMessage("New Password did not match with 'Re-Type New Password'.");
		return false;
	}
	document.forms["myProfilePageForm"].submit();
}

function validatePersonalDetails_TOTP() {
	
hideServerMessageBlock();
if (document.getElementById("uidRadio").checked) {
	var eidUidValue = document.getElementById("eid").value;
	//var dateTimeValue = document.getElementById("dateTime").value;
	var userName = document.getElementById("name").value;
	var userPincode = document.getElementById("pinCode").value;
	//var captchaImg = removeSpaces(document.getElementById("txtCaptcha").value);
	var captcha = removeSpaces(document.getElementById("txtInput").value);
	var mobileNum = document.getElementById("mobileNum").value;
	var otpFieldValue = document.getElementById("otpField1").value;
	
	
	var flag=false;
	
	 if (eidUidValue.indexOf("_") > -1 || eidUidValue.length < 14) {
			//showErrorMessage("Please enter 14 digits of EID number in correct format.");
			//$("#eid").addClass("failure");
		 $(".uidError").css("display" , "block");
			$("#uid_sugg").css("display" , "none");
			//$("#eid").removeClass("failure");
			DrawCaptcha();
			//return false;
			flag=true;
		} 
	 
	 else {
			$(".uidError").css("display" , "none");
			$("#uid_sugg").css("display" , "block");
		}
	
if (userName.trim() == "") {
	//showErrorMessage("Please enter your correct Name.");
	$(".userNameError").css("display" , "block");
	$("#userName_sugg").css("display" , "none");
	DrawCaptcha();
	//return false;
	flag=true;
} else {
	$(".userNameError").css("display" , "none");
	$("#userName_sugg").css("display" , "block");
}
if (userPincode.indexOf("_") > -1 || userPincode.length < 6) {
	//showErrorMessage("Please enter your correct Pin Code.");
	$(".pinCodeError").css("display" , "block");
	$("#pinCode_sugg").css("display" , "none");
	DrawCaptcha();
	//return false;
	flag=true;
} else {
	$(".pinCodeError").css("display" , "none");
	$("#pinCode_sugg").css("display" , "block");
}
if(captcha == ""){
	//showErrorMessage("Please enter Captcha text.");	
	$(".captchaError").css("display" , "block");
	$("#captcha_sugg").css("display" , "none");
	DrawCaptcha();
	//return false;
	flag=true;
} else {
	$(".captchaError").css("display" , "none");
	$("#captcha_sugg").css("display" , "block");
}

if (otpFieldValue.indexOf("_") > -1 || otpFieldValue.length < 8) {
	//showErrorMessage("Please enter 8 digits of TOTP in correct format.");
	$(".totpError").css("display" , "block");
	$("#totp_sugg").css("display" , "none");
	DrawCaptcha();
	//return false;
	flag=true;
}
else {
	$(".totpError").css("display" , "none");
	$("#totp_sugg").css("display" , "block");
}

if(flag){
	return false;
}



	
	if(jQuery('#saveButTotp').click) {
        $( "#dialog" ).dialog({
        	
                 modal: true,
                 draggable: true,
                 resizable: true,
                 show: 'blind',
                 hide: 'blind',
                 width: 400,
                 dialogClass: 'ui-dialog-osx',
                 buttons: {
                    "I Agree": function() {
                     $(this).dialog("close");
                     hideServerMessageBlock();
                     document.getElementById("saveButTotp").disabled = true;
                     $("#saveButTotp").removeClass("greenButton");
                     $("#saveButTotp").addClass("grayButtonDisable");                     
                     document.forms["aadharForm"].submit();                 },
                 "Cancel": function() {
                    $(this).dialog("close");
                    document.getElementById("saveButTotp").disabled = false;
                    $("#saveButTotp").removeClass("grayButtonDisable");
                    $("#saveButTotp").addClass("greenButton");
                    //$("saveButTotp").disabled = false;
                 }       
                      
                 }
             });
    
}
	
}
if (document.getElementById("eidRadio").checked) {
	
	var eidUidValue = document.getElementById("eid").value;
	var dateTimeValue = document.getElementById("dateTime").value;
	var userName = document.getElementById("name").value;
	var userPincode = document.getElementById("pinCode").value;
	//var captchaImg = removeSpaces(document.getElementById("txtCaptcha").value);
	var captcha = removeSpaces(document.getElementById("txtInput").value);
	var mobileNum = document.getElementById("mobileNum").value;
	var otpFieldValue = document.getElementById("otpField1").value;
	
	var flag=false;
	
	if (eidUidValue.indexOf("_") > -1 || eidUidValue.length < 16) {
		//showErrorMessage("Please enter 14 digits of EID number in correct format.");
		$(".eidError").css("display" , "block");
		$("#eid_sugg").css("display" , "none");		
		DrawCaptcha();
		flag=true;
	} else if (dateTimeValue.indexOf("_") > -1 || dateTimeValue.length < 19) {
		//showErrorMessage("Please enter valid date in (dd/mm/yyyy hh:mm:ss) format."); 
		$(".datetimeError").css("display" , "block");
		$("#eid_sugg").css("display" , "none");
		$(".eidError").css("display" , "none");
		DrawCaptcha();
		flag=true;
	}
	else if (!validateDateTime(dateTimeValue)) {
		//alert(dateTimeValue);
		//showErrorMessage("Please enter valid date."); 
		$(".invalidDatetimeError").css("display" , "block");
		$(".eidError").css("display" , "none");
		$(".datetimeError").css("display" , "none");
		$("#eid_sugg").css("display" , "none");
		DrawCaptcha();
		flag=true;
	}
	 else {
			$(".eidError").css("display" , "none");
			$("#eid_sugg").css("display" , "block");
			$(".datetimeError").css("display" , "none");
			$(".invalidDatetimeError").css("display" , "none");
		}
	
	
	if (userName.trim() == "") {
		//showErrorMessage("Please enter your correct Name.");
		$(".userNameError").css("display" , "block");
		$("#userName_sugg").css("display" , "none");
		DrawCaptcha();
		//return false;
		flag=true;
	} else {
		$(".userNameError").css("display" , "none");
		$("#userName_sugg").css("display" , "block");
	}
	if (userPincode.indexOf("_") > -1 || userPincode.length < 6) {
		//showErrorMessage("Please enter your correct Pin Code.");
		$(".pinCodeError").css("display" , "block");
		$("#pinCode_sugg").css("display" , "none");
		DrawCaptcha();
		//return false;
		flag=true;
	} else {
		$(".pinCodeError").css("display" , "none");
		$("#pinCode_sugg").css("display" , "block");
	}
	if(captcha == ""){
		//showErrorMessage("Please enter Captcha text.");	
		$(".captchaError").css("display" , "block");
		$("#captcha_sugg").css("display" , "none");
		DrawCaptcha();
		//return false;
		flag=true;
	} else {
		$(".captchaError").css("display" , "none");
		$("#captcha_sugg").css("display" , "block");
	}
	
	if (otpFieldValue.indexOf("_") > -1 || otpFieldValue.length < 8) {
		//showErrorMessage("Please enter 8 digits of TOTP in correct format.");
		$(".totpError").css("display" , "block");
		$("#totp_sugg").css("display" , "none");
		DrawCaptcha();
		//return false;
		flag=true;
	}
	else {
		$(".totpError").css("display" , "none");
		$("#totp_sugg").css("display" , "block");
	}
	
	if(flag){
		return false;
	}
	
	if(jQuery('#saveButTotp').click) {
        
        $( "#dialog" ).dialog({
                 modal: true,
                 draggable: true,
                 resizable: true,
                 show: 'blind',
                 hide: 'blind',
                 width: 400,
                 dialogClass: 'ui-dialog-osx',
                 buttons: {
                    "I Agree": function() {
                     $(this).dialog("close");
                     hideServerMessageBlock();
                     document.getElementById("saveButTotp").disabled = true;
                     $("#saveButTotp").removeClass("greenButton");
                     $("#saveButTotp").addClass("grayButtonDisable");                     

                     document.forms["aadharForm"].submit();
                 },
                 "Cancel": function() {
                    $(this).dialog("close");
                    document.getElementById("saveButTotp").disabled = false;
                    $("#saveButTotp").removeClass("grayButtonDisable");
                    $("#saveButTotp").addClass("greenButton");
                    
                 }       
                      
                 }
             });
}
}

if (document.getElementById("vidRadio").checked) {
	var eidUidValue = document.getElementById("eid").value;
	//var dateTimeValue = document.getElementById("dateTime").value;
	var userName = document.getElementById("name").value;
	var userPincode = document.getElementById("pinCode").value;
	//var captchaImg = removeSpaces(document.getElementById("txtCaptcha").value);
	var captcha = removeSpaces(document.getElementById("txtInput").value);
	var mobileNum = document.getElementById("mobileNum").value;
	var otpFieldValue = document.getElementById("otpField1").value;
	
	
	var flag=false;
	
	 if (eidUidValue.indexOf("_") > -1 || eidUidValue.length < 19) {
			//showErrorMessage("Please enter 14 digits of EID number in correct format.");
			//$("#eid").addClass("failure");
		 $(".vidError").css("display" , "block");
			$("#vid_sugg").css("display" , "none");
			//$("#eid").removeClass("failure");
			DrawCaptcha();
			//return false;
			flag=true;
		} 
	 
	 else {
			$(".vidError").css("display" , "none");
			$("#vid_sugg").css("display" , "block");
		}
	
if (userName.trim() == "") {
	//showErrorMessage("Please enter your correct Name.");
	$(".userNameError").css("display" , "block");
	$("#userName_sugg").css("display" , "none");
	DrawCaptcha();
	//return false;
	flag=true;
} else {
	$(".userNameError").css("display" , "none");
	$("#userName_sugg").css("display" , "block");
}
if (userPincode.indexOf("_") > -1 || userPincode.length < 6) {
	//showErrorMessage("Please enter your correct Pin Code.");
	$(".pinCodeError").css("display" , "block");
	$("#pinCode_sugg").css("display" , "none");
	DrawCaptcha();
	//return false;
	flag=true;
} else {
	$(".pinCodeError").css("display" , "none");
	$("#pinCode_sugg").css("display" , "block");
}
if(captcha == ""){
	//showErrorMessage("Please enter Captcha text.");	
	$(".captchaError").css("display" , "block");
	$("#captcha_sugg").css("display" , "none");
	DrawCaptcha();
	//return false;
	flag=true;
} else {
	$(".captchaError").css("display" , "none");
	$("#captcha_sugg").css("display" , "block");
}

if (otpFieldValue.indexOf("_") > -1 || otpFieldValue.length < 8) {
	//showErrorMessage("Please enter 8 digits of TOTP in correct format.");
	$(".totpError").css("display" , "block");
	$("#totp_sugg").css("display" , "none");
	DrawCaptcha();
	//return false;
	flag=true;
}
else {
	$(".totpError").css("display" , "none");
	$("#totp_sugg").css("display" , "block");
}

if(flag){
	return false;
}



	
	if(jQuery('#saveButTotp').click) {
        
        $( "#dialog" ).dialog({
        	
                 modal: true,
                 draggable: true,
                 resizable: true,
                 show: 'blind',
                 hide: 'blind',
                 width: 400,
                 dialogClass: 'ui-dialog-osx',
                 buttons: {
                    "I Agree": function() {
                     $(this).dialog("close");
                     hideServerMessageBlock();
                     document.getElementById("saveButTotp").disabled = true;
                     $("#saveButTotp").removeClass("greenButton");
                     $("#saveButTotp").addClass("grayButtonDisable");
                     document.forms["aadharForm"].submit();                 },
                 "Cancel": function() {
                    $(this).dialog("close");
                    document.getElementById("saveButTotp").disabled = false;
                    $("#saveButTotp").removeClass("grayButtonDisable");
                    $("#saveButTotp").addClass("greenButton");
                 }       
                      
                 }
             });
    
}
	
}

	
}



function validatePersonalDetails() {
    var eidUidValue = document.getElementById("eid").value;
    var dateTimeValue = document.getElementById("dateTime").value;
    var userName = document.getElementById("name").value;
    var userPincode = document.getElementById("pinCode").value;
    //var captchaImg = removeSpaces(document.getElementById("txtCaptcha").value);
    var captcha = removeSpaces(document.getElementById("txtInput").value);
    var mobileNum = document.getElementById("mobileNum").value;
    hideServerMessageBlock();
 

	if (document.getElementById("eidRadio").checked) {
		
		var flag=false;
		
		if (eidUidValue.indexOf("_") > -1 || eidUidValue.length < 16) {
			//showErrorMessage("Please enter 14 digits of EID number in correct format.");
			$(".eidError").css("display" , "block");
			$("#eid_sugg").css("display" , "none");		
			DrawCaptcha();
			flag=true;
		} else if (dateTimeValue.indexOf("_") > -1 || dateTimeValue.length < 19) {
			//showErrorMessage("Please enter valid date in (dd/mm/yyyy hh:mm:ss) format."); 
			$(".datetimeError").css("display" , "block");
			$("#eid_sugg").css("display" , "none");
			$(".eidError").css("display" , "none");
			DrawCaptcha();
			flag=true;
		}
		else if (!validateDateTime(dateTimeValue)) {
			//alert(dateTimeValue);
			//showErrorMessage("Please enter valid date."); 
			$(".invalidDatetimeError").css("display" , "block");
			$(".eidError").css("display" , "none");
			$(".datetimeError").css("display" , "none");
			$("#eid_sugg").css("display" , "none");
			DrawCaptcha();
			flag=true;
		}
		 else {
				$(".eidError").css("display" , "none");
				$("#eid_sugg").css("display" , "block");
				$(".datetimeError").css("display" , "none");
				$(".invalidDatetimeError").css("display" , "none");
			}
		
		
		if (userName.trim() == "") {
			//showErrorMessage("Please enter your correct Name.");
			$(".userNameError").css("display" , "block");
			$("#userName_sugg").css("display" , "none");
			DrawCaptcha();
			//return false;
			flag=true;
		} else {
			$(".userNameError").css("display" , "none");
			$("#userName_sugg").css("display" , "block");
		}
		if (userPincode.indexOf("_") > -1 || userPincode.length < 6) {
			//showErrorMessage("Please enter your correct Pin Code.");
			$(".pinCodeError").css("display" , "block");
			$("#pinCode_sugg").css("display" , "none");
			DrawCaptcha();
			//return false;
			flag=true;
		} else {
			$(".pinCodeError").css("display" , "none");
			$("#pinCode_sugg").css("display" , "block");
		}
		if(captcha == ""){
			//showErrorMessage("Please enter Captcha text.");	
			$(".captchaError").css("display" , "block");
			$("#captcha_sugg").css("display" , "none");
			DrawCaptcha();
			//return false;
			flag=true;
		} else {
			$(".captchaError").css("display" , "none");
			$("#captcha_sugg").css("display" , "block");
		}
		
		if(flag){
			return false;
		}
		
		/*if (captchaImg != captcha) {
			showErrorMessage("Entered Captcha text does not matched.");
			DrawCaptcha();
			return false;
		}*/
		/*if (mobileNum.indexOf("_") > -1 || mobileNum.length < 10) {
			showErrorMessage("Please enter correct mobile number.");
			DrawCaptcha();
			return false;
		}*/
		
		if(jQuery('#otpBut').click) {
            
            $( "#dialog" ).dialog({
                     modal: true,
                     draggable: true,
                     resizable: true,
                     show: 'blind',
                     hide: 'blind',
                     width: 400,
                     dialogClass: 'ui-dialog-osx',
                     buttons: {
                        "I Agree": function() {
                         $(this).dialog("close");
                         hideServerMessageBlock();
                     	//document.getElementById("otpBut").disabled = true;
                     	$(".otpButtonWrapper").hide();
                         timer=setTimeout(function() {
                     	    $('#resendOtpBut_wrapper').show();
                     		//if(document.getElementById("otpBut").disabled){				//BugID:28641 Desctiption: "ReSend OTP" button should not be visible on home screen before invisible of "Get OTP" button.
                     			//document.getElementById('resendOtpBut').disabled = false;
                     		//}
                     	}, 140000);
                         
                     	generateOTP(eidUidValue, dateTimeValue, userName, userPincode, mobileNum, captcha,false);
                     },
                     "Cancel": function() {
                        $(this).dialog("close");
                     }       
                          
                     }
                 });
        
    }
		
	}
	if (document.getElementById("uidRadio").checked) {
		
	
		var flag=false;
		
			 if (eidUidValue.indexOf("_") > -1 || eidUidValue.length < 14) {
					//showErrorMessage("Please enter 14 digits of EID number in correct format.");
					//$("#eid").addClass("failure");
				 $(".uidError").css("display" , "block");
					$("#uid_sugg").css("display" , "none");
					//$("#eid").removeClass("failure");
					DrawCaptcha();
					//return false;
					flag=true;
				} 
			 
			 else {
					$(".uidError").css("display" , "none");
					$("#uid_sugg").css("display" , "block");
				}
		   
		
			
		if (userName.trim() == "") {
			//showErrorMessage("Please enter your correct Name.");
			$(".userNameError").css("display" , "block");
			$("#userName_sugg").css("display" , "none");
			DrawCaptcha();
			//return false;
			flag=true;
		} else {
			$(".userNameError").css("display" , "none");
			$("#userName_sugg").css("display" , "block");
		}
		if (userPincode.indexOf("_") > -1 || userPincode.length < 6) {
			//showErrorMessage("Please enter your correct Pin Code.");
			$(".pinCodeError").css("display" , "block");
			$("#pinCode_sugg").css("display" , "none");
			DrawCaptcha();
			//return false;
			flag=true;
		} else {
			$(".pinCodeError").css("display" , "none");
			$("#pinCode_sugg").css("display" , "block");
		}
		if(captcha == ""){
			//showErrorMessage("Please enter Captcha text.");	
			$(".captchaError").css("display" , "block");
			$("#captcha_sugg").css("display" , "none");
			DrawCaptcha();
			//return false;
			flag=true;
		} else {
			$(".captchaError").css("display" , "none");
			$("#captcha_sugg").css("display" , "block");
		}
		if(flag){
			return false;
		}
		/*if (captchaImg != captcha) {
			showErrorMessage("Entered Captcha text does not matched.");
			DrawCaptcha();
			return false;
		}	*/	
		
		if(jQuery('#otpBut').click) {
            
            $( "#dialog" ).dialog({
                     modal: true,
                     draggable: true,
                     resizable: true,
                     show: 'blind',
                     hide: 'blind',
                     width: 400,
                     dialogClass: 'ui-dialog-osx',
                     buttons: {
                        "I Agree": function() {
                         $(this).dialog("close");
                         hideServerMessageBlock();
                     	//document.getElementById("otpBut").disabled = true;
                        $(".otpButtonWrapper").hide();
                         
                         timer=setTimeout(function() {
                     	    $('#resendOtpBut_wrapper').show();
                     		//if(document.getElementById("otpBut").disabled){				//BugID:28641 Desctiption: "ReSend OTP" button should not be visible on home screen before invisible of "Get OTP" button.
                     			//document.getElementById('resendOtpBut').disabled = false;
                     		//}
                     	}, 140000);
                     	generateOTP(eidUidValue, dateTimeValue, userName, userPincode, mobileNum, captcha,false);
                         
                     },
                     "Cancel": function() {
                        $(this).dialog("close");
                        return false;
                     }       
                          
                     }
                 });
        
    }

	}
	
	
	if (document.getElementById("vidRadio").checked) {
		
		
		var flag=false;
		
			 if (eidUidValue.indexOf("_") > -1 || eidUidValue.length < 19) {
					//showErrorMessage("Please enter 14 digits of EID number in correct format.");
					//$("#eid").addClass("failure");
				 $(".vidError").css("display" , "block");
					$("#vid_sugg").css("display" , "none");
					//$("#eid").removeClass("failure");
					DrawCaptcha();
					//return false;
					flag=true;
				} 
			 
			 else {
					$(".vidError").css("display" , "none");
					$("#vid_sugg").css("display" , "block");
				}
		   
		
			
		if (userName.trim() == "") {
			//showErrorMessage("Please enter your correct Name.");
			$(".userNameError").css("display" , "block");
			$("#userName_sugg").css("display" , "none");
			DrawCaptcha();
			//return false;
			flag=true;
		} else {
			$(".userNameError").css("display" , "none");
			$("#userName_sugg").css("display" , "block");
		}
		if (userPincode.indexOf("_") > -1 || userPincode.length < 6) {
			//showErrorMessage("Please enter your correct Pin Code.");
			$(".pinCodeError").css("display" , "block");
			$("#pinCode_sugg").css("display" , "none");
			DrawCaptcha();
			//return false;
			flag=true;
		} else {
			$(".pinCodeError").css("display" , "none");
			$("#pinCode_sugg").css("display" , "block");
		}
		if(captcha == ""){
			//showErrorMessage("Please enter Captcha text.");	
			$(".captchaError").css("display" , "block");
			$("#captcha_sugg").css("display" , "none");
			DrawCaptcha();
			//return false;
			flag=true;
		} else {
			$(".captchaError").css("display" , "none");
			$("#captcha_sugg").css("display" , "block");
		}
		if(flag){
			return false;
		}
		/*if (captchaImg != captcha) {
			showErrorMessage("Entered Captcha text does not matched.");
			DrawCaptcha();
			return false;
		}	*/	
		
		if(jQuery('#otpBut').click) {
            
            $( "#dialog" ).dialog({
                     modal: true,
                     draggable: true,
                     resizable: true,
                     show: 'blind',
                     hide: 'blind',
                     width: 400,
                     dialogClass: 'ui-dialog-osx',
                     buttons: {
                        "I Agree": function() {
                         $(this).dialog("close");
                         hideServerMessageBlock();
                     	//document.getElementById("otpBut").disabled = true;
                        $(".otpButtonWrapper").hide();
                         
                         timer=setTimeout(function() {
                     	    $('#resendOtpBut_wrapper').show();
                     		//if(document.getElementById("otpBut").disabled){				//BugID:28641 Desctiption: "ReSend OTP" button should not be visible on home screen before invisible of "Get OTP" button.
                     			//document.getElementById('resendOtpBut').disabled = false;
                     		//}
                     	}, 140000);
                     	generateOTP(eidUidValue, dateTimeValue, userName, userPincode, mobileNum, captcha,false);
                         
                     },
                     "Cancel": function() {
                        $(this).dialog("close");
                        return false;
                     }       
                          
                     }
                 });
        
    }

	}


	
}

function validateAndDownloadForRO() {
	var eidUidValue = document.getElementById("eid").value;
	var dateTimeValue = document.getElementById("dateTime").value;	
	//var captchaImg = document.getElementById("imgText").value;
	var captcha = removeSpaces(document.getElementById("txtInput").value);	
	
	hideServerMessageBlock();
	
	if (document.getElementById("eidRadio").checked) {
		if (eidUidValue.indexOf("_") > -1 || eidUidValue.length < 16) {
			showErrorMessage("Please enter 14 digits of EID number in correct format.");
			return false;
		} else if (dateTimeValue.indexOf("_") > -1 || dateTimeValue.length < 19) {
			showErrorMessage("Please enter valid date in (dd/mm/yyyy hh:mm:ss) format.");
			return false;
		}
	}
	if (document.getElementById("uidRadio").checked) {
		if (eidUidValue.indexOf("_") > -1 || eidUidValue.length < 14) {
			showErrorMessage("Please enter 12 digits of Aadhaar number in correct format.");
			return false;
		}
	}	
	if(captcha == ""){
		showErrorMessage("Please enter Captcha text.");		
		return false;
	}
	/*if (captchaImg != captcha) {
		showErrorMessage("Entered Captcha text does not matched.");
		DrawROCaptcha();
		return false;
	}*/
	document.getElementById("validateNDownBut").disabled = false;	
	
	document.forms["roAadharForm"].submit();
	/*document.getElementById("regular").disabled = true;	
	document.getElementById("masked").disabled = true;*/
	//document.getElementById("eidRadio").checked = true;
	//document.getElementById("txtInput").value = "";
}

function generateOTPForROLogin(userName,userPassword,captcha,resendOTP) {
	$("#loadingImg").css("display", "");
	
	var params = {
		NAME	: userName,
		PASSWORD: userPassword,		
		CAPTCHA	: captcha,
		RESENDOTP: resendOTP,
		CSRFToken : document.getElementById("CSRFToken").value
	};
	
	$.ajax({
		type : "POST",
		url : "genOTPByValidatingRODetails.html",
		data : params,
		beforeSend : function(xhr) {
			xhr.overrideMimeType("text/plain; charset=UTF-8");
			//xhr.setRequestHeader('CSRFToken', csrf_token);
		},
		success : function(data) {
			$("#loadingImg").css("display", "none");
			var result = data.toString();
			result = result.toString();
			if(result.indexOf("One Time Password")<0){
				showErrorMessage(result);
				enableROTopFields();
				DrawROCaptcha();
			}else{
				showSuccessMessage(result);
				disableROTopFields();
			}		
		}
	});
}

function generateOTP (eidUidValue, dateTimeValue, userName, userPincode, mobileNum, captcha,resendOTP) {
	$("#loadingImg").css("display", "");
	
	var params = {
		EID 	: eidUidValue,
		DATETIME: dateTimeValue,
		NAME	: userName,
		PINCODE	: userPincode,
		MOBILE 	: mobileNum,
		CAPTCHA	: captcha,
		RESENDOTP: resendOTP,
		CSRFToken : document.getElementById("CSRFToken").value
	};
	$.ajax({
		type : "POST",
		url : "genOTPByValidatingDetails.html",
		data : params,
		beforeSend : function(xhr) {
			xhr.overrideMimeType("text/plain; charset=UTF-8");
			//alert("1032");
			//xhr.setRequestHeader('CSRFToken', csrf_token);
		},
		success : function(data) {
			$("#loadingImg").css("display", "none");
			var result = data.toString();
			result = result.toString();
			if(result.indexOf("success")<0){
				showErrorMessage(result);
				if(resendOTP!=true){			//** Bug ID: 27605  Desctiption: Resend OTP Functionality in eAadhaar **//* 	
					enableTopFields();
					 timer=setTimeout(function() {
                  	    $('#resendOtpBut_wrapper').hide();
        
                  	}, 140000);
				}else{
					disableTopFields();
				}
				DrawCaptcha();
			}else{
				//alert("1049"+result);
				//if(eidUidValue.length==14){
					if(result.substring(0,1)=="8"){
						if(resendOTP!=true	){   
							document.getElementById("otpMessage").innerHTML = "This Aadhaar number has been termporarily inactived. " +
									"Please visit out enrolment center to update your biometrics and activate the Aadhaar number." +
									"Your One Time Password would be sent to your registered mobile number i.e. "+result.replace("8success",""); 
							$('#overlay').fadeIn('fast',function(){
		                        $('#otpBox').animate({'top':'90px'},500);
		                    });
						}else{
							document.getElementById("resendOTPMessage").innerHTML = "This Aadhaar number has been termporarily inactived. " +			/** Bug ID: 27605  Desctiption: Resend OTP Functionality in eAadhaar **/ 	
									"Please visit out enrolment center to update your biometrics and activate the Aadhaar number." +
									"Your One Time Password would be sent to your registered mobile number i.e. "+result.replace("8success",""); 
							$('#overlay').fadeIn('fast',function(){
							$('#resendOtpBox').animate({'top':'90px'},500);
                    });
						}
					}else{
						if(resendOTP!=true	){
							document.getElementById("otpMessage").innerHTML = "Your One Time Password would be sent to your registered mobile number i.e. "+result.replace("1success",""); 
							$('#overlay').fadeIn('fast',function(){
								$('#otpBox').animate({'top':'90px'},500);
							});
						}else{
							document.getElementById("resendOTPMessage").innerHTML = "Your One Time Password would be sent to your registered mobile number i.e. "+result.replace("1success",""); 
							$('#overlay').fadeIn('fast',function(){																																		/** Bug ID: 27605  Desctiption: Resend OTP Functionality in eAadhaar **/ 	
								$('#resendOtpBox').animate({'top':'90px'},500);
							});
						}
					}
										
				/*}else{
					if(result.substring(0,1)=="8"){
						showSuccessMessage("This Aadhaar number has been termporarily inactived. " +
								"Please visit out enrolment center to update your biometrics and activate the Aadhaar number." +
								"One time password has been sent to mobile no. "+ mobileNum);
						$('#overlay').fadeIn('fast',function(){
	                        $('#otpBox').animate({'top':'90px'},500);
	                    });
					}else{
						showSuccessMessage("One time password has been sent to mobile no. "+ mobileNum);
						$('#overlay').fadeIn('fast',function(){
	                        $('#otpBox').animate({'top':'90px'},500);
	                    });
					}
					
					disableTopFields();
				}*/
				
			}		
		}
	});
}

function sendOTPtoRegisteredMobile(){
	$('#otpBox').animate({'top':'-700px'},500,function(){
        $('#overlay').fadeOut('fast');
    });	
	
	$("#loadingImg").css("display", "");
	
	var params = {
			RESENDOTP: false,
			CSRFToken : document.getElementById("CSRFToken").value
		};
	$.ajax({
		type : "POST",
		url : "sendOTPtoRegisteredMobile.html",	
		data : params,
		beforeSend : function(xhr) {
			xhr.overrideMimeType("text/plain; charset=UTF-8");
			//xhr.setRequestHeader('CSRFToken', csrf_token);
		},
		success : function(data) {
			$("#loadingImg").css("display", "none");
			var result = data.toString();
			result = result.toString();
			if(result.indexOf("success")<0){
				showErrorMessage(result);
				timer=setTimeout(function() {
              	    $('#resendOtpBut_wrapper').hide();
              	    
              	}, 140000);
				enableTopFields();
			}else{				
					showSuccessMessage("One time password has been sent to mobile no. "+ result.replace("success",""));
					disableTopFields();
			}		
		}
	});
}

/**	Bug ID: 27605
* Desctiption: Resend OTP Functionality in eAadhaar **/
function resendOTPtoRegisteredMobile(){
	$('#resendOtpBox').animate({'top':'-700px'},500,function(){
        $('#overlay').fadeOut('fast');
    });	
	
	$("#loadingImg").css("display", "");
	
	var params = {
			RESENDOTP: true,
			CSRFToken : document.getElementById("CSRFToken").value
		};
	$.ajax({
		type : "POST",
		url : "sendOTPtoRegisteredMobile.html",	
		data : params,
		beforeSend : function(xhr) {
			xhr.overrideMimeType("text/plain; charset=UTF-8");
			//xhr.setRequestHeader('CSRFToken', csrf_token);
		},
		success : function(data) {
			$("#loadingImg").css("display", "none");
			var result = data.toString();
			result = result.toString();
			if(result.indexOf("success")<0){
				showErrorMessage(result);
				enableTopFields();
				disableTopFields();
            	$('#resendOtpBut_wrapper').hide();
				//document.getElementById("resendOtpBut").disabled = true;
			}else{				
					showSuccessMessage("One time password has been sent to mobile no. "+ result.replace("success",""));
					disableTopFields();
			}		
		}
	});
}


function reloadSession(){

	document.forms['aadharForm'].action="reloadSession.html";
	document.forms['aadharForm'].submit();	
}

function reloadROSession(){

	document.forms['roAadharForm'].action="reloadROSession.html";
	document.forms['roAadharForm'].submit();	
}

function goToRoHome(){

	document.forms['myProfilePageForm'].action="goToROHome.html";
	document.forms['myProfilePageForm'].submit();	
}

function enableTopFields() {
	document.getElementById("eid").disabled = false;
	document.getElementById("name").disabled = false;
	document.getElementById("pinCode").disabled = false;
	document.getElementById("dateTime").disabled = false;
	document.getElementById("txtInput").disabled = false;
	document.getElementById("mobileNum").disabled = false;
	$(".otpButtonWrapper").show();
	//document.getElementById("otpBut").disabled = false;	
	document.getElementById("eidRadio").disabled = false;
	document.getElementById("uidRadio").disabled = false;	
	//document.getElementById("otpField").disabled=true; //remove	
	document.getElementById("saveBut").disabled=true;
	$("#saveBut").removeClass("greenButton");
	$("#saveBut").addClass("grayButtonDisable");
	if(document.getElementById("TOTP"))
    	document.getElementById("TOTP").disabled = false;
}

function enableROTopFields(){
	document.getElementById("userName").disabled = false;
	document.getElementById("password").disabled = false;
	document.getElementById("txtInput").disabled = false;
	document.getElementById("otpPassBut").disabled = false;
	
	document.getElementById("otpField").disabled=true;
	document.getElementById("loginbutton").disabled=true;
}

function disableTopFields() {
	document.getElementById("eid").disabled = true;
	document.getElementById("name").disabled = true;
	document.getElementById("pinCode").disabled = true;
	document.getElementById("dateTime").disabled = true;
	document.getElementById("txtInput").disabled = true;
	document.getElementById("mobileNum").disabled = true;
	$(".otpButtonWrapper").hide();
	//document.getElementById("otpBut").disabled = true;
	
	document.getElementById("eidRadio").disabled = true;
	document.getElementById("vidRadio").disabled = true;
	document.getElementById("uidRadio").disabled = true;
	document.getElementById("otpField").disabled=false;
	document.getElementById("saveBut").disabled=false;
	$("#saveBut").removeClass("grayButtonDisable");
	$("#saveBut").addClass("greenButton");
	document.getElementById("TOTP").disabled = true;
}

function disableROTopFields(){
	document.getElementById("userName").disabled = true;
	document.getElementById("password").disabled = true;
	document.getElementById("txtInput").disabled = true;
	document.getElementById("otpPassBut").disabled = true;
	
	document.getElementById("otpField").disabled=false;
	document.getElementById("loginbutton").disabled=false;
}

function showErrorMessage(message) {
	$("#serverMessage").text(message);
	$("div#serverMessage").removeClass("hideDisplay");
	$("div#serverMessage").removeClass("success");
	$("div#serverMessage").addClass("failure");
}

function showSuccessMessage(message) {
	$("#serverMessage").text(message);
	$("div#serverMessage").removeClass("hideDisplay");
	$("div#serverMessage").removeClass("failure");
	$("div#serverMessage").addClass("success");
}

function hideServerMessageBlock() {
	document.getElementById("serverErrorMsg").style.display = "none";
	$("#serverMessage").text("");
	$("div#serverMessage").removeClass("failure");
	$("div#serverMessage").removeClass("success");
	$("div#serverMessage").addClass("hideDisplay");
}

function validateDateTime(date) {    
	   var valid  = true;  
	   var spaceIndex = date.indexOf(" ");  
	   var onlyDate = date.substring(0,spaceIndex);  
	   var dateData = onlyDate.split("/");   
	   var onlyTime = date.substring(spaceIndex);   
	   var timeData = onlyTime.split(":");    
	   var day  = (dateData[0]);    
	   var month  = (dateData[1]); 
	   var year  = (dateData[2]);   
	   var hour  = (timeData[0]);   
	   var min  = (timeData[1]);   
	   var sec  = (timeData[2]); 
	   var regForDate = new RegExp("\\d{1,2}\/\\d{1,2}\/\\d{4}$");  
	   var regForTime = new RegExp("\\d{1,2}:\\d{1,2}:\\d{1,2}$");  
	   if(!regForDate.test(onlyDate)) valid =false;  
	   else if(!regForTime.test(onlyTime)) valid =false;  
	   else if((month < 1) || (month > 12)) valid = false;  
	   else if((day < 1) || (day > 31)) valid = false;  
	   else if(((month == 4) || (month == 6) || (month == 9) || (month == 11)) && (day > 30)) valid = false;  
	   else if((month == 2) && (((year % 400) == 0) || ((year % 4) == 0)) && ((year % 100) != 0) && (day > 29)) valid = false;  
	   else if((month == 2) && ((year % 100) == 0) && (day > 29)) valid = false;  
	   else if((hour < 0) || (hour > 24)) valid = false;  
	   else if((min < 0) || (min > 59)) valid = false;  
	   else if((sec < 0) || (sec > 59)) valid = false;     
	  return valid;  
	 }  


/**Bug ID: 27605 
 Desctiption: Resend OTP Functionality in eAadhaar **/  

function validatePersonalDetailsForResendOTP() {
	var eidUidValue = document.getElementById("eid").value;
	var eidUidValue = document.getElementById("eid").value;
	var dateTimeValue = document.getElementById("dateTime").value;
	var userName = document.getElementById("name").value;
	var userPincode = document.getElementById("pinCode").value;
	//var captchaImg = removeSpaces(document.getElementById("txtCaptcha").value);
	var captcha = removeSpaces(document.getElementById("txtInput").value);
	var mobileNum = document.getElementById("mobileNum").value;
	hideServerMessageBlock();
	/*if (document.getElementById("regular").checked) {
		 preferenceValue = document.getElementById("regular").value;
	}
    if (document.getElementById("masked").checked) {
    	 preferenceValue = document.getElementById("masked").value;
	}*/
	if (document.getElementById("eidRadio").checked) {
		if (eidUidValue.indexOf("_") > -1 || eidUidValue.length < 16) {
			showErrorMessage("Please enter 14 digits of EID number in correct format.");
			DrawCaptcha();
			return false;
		} else if (dateTimeValue.indexOf("_") > -1 || dateTimeValue.length < 19) {
			showErrorMessage("Please enter valid date in (dd/mm/yyyy hh:mm:ss) format.");
			DrawCaptcha();
			return false;
		}
		else if (!validateDateTime(dateTimeValue)) {
			//alert(dateTimeValue);
			showErrorMessage("Please enter valid date.");
			DrawCaptcha();
			return false;
		}	
		if (userName.trim() == "") {
			showErrorMessage("Please enter your correct Name.");
			DrawCaptcha();
			return false;
		}
		if (userPincode.indexOf("_") > -1 || userPincode.length < 6) {
			showErrorMessage("Please enter your correct Pin Code.");
			DrawCaptcha();
			return false;
		}
		if(captcha == ""){
			showErrorMessage("Please enter Captcha text.");	
			DrawCaptcha();
			return false;
		}
		/*if (captchaImg != captcha) {
			showErrorMessage("Entered Captcha text does not matched.");
			DrawCaptcha();
			return false;
		}*/
/*		if (mobileNum.indexOf("_") > -1 || mobileNum.length < 10) {
			showErrorMessage("Please enter correct mobile number.");
			DrawCaptcha();
			return false;
		}*/
	}
	if (document.getElementById("uidRadio").checked) {
		
		if (eidUidValue.indexOf("_") > -1 || eidUidValue.length < 14) {
			showErrorMessage("Please enter 12 digits of Aadhaar number in correct format.");
			DrawCaptcha();
			return false;
		}
		if (userName.trim() == "") {
			showErrorMessage("Please enter your correct Name.");
			DrawCaptcha();
			return false;
		}
		if (userPincode.indexOf("_") > -1 || userPincode.length < 6) {
			showErrorMessage("Please enter your correct Pin Code.");
			DrawCaptcha();
			return false;
		}
		if(captcha == ""){
			showErrorMessage("Please enter Captcha text.");		
			DrawCaptcha();
			return false;
		}
		/*if (captchaImg != captcha) {
			showErrorMessage("Entered Captcha text does not matched.");
			DrawCaptcha();
			return false;
		}	*/
		
	}
	
        if (document.getElementById("vidRadio").checked) {
		
		if (eidUidValue.indexOf("_") > -1 || eidUidValue.length < 19) {
			showErrorMessage("Please enter 16 digits of VID in correct format.");
			DrawCaptcha();
			return false;
		}
		if (userName.trim() == "") {
			showErrorMessage("Please enter your correct Name.");
			DrawCaptcha();
			return false;
		}
		if (userPincode.indexOf("_") > -1 || userPincode.length < 6) {
			showErrorMessage("Please enter your correct Pin Code.");
			DrawCaptcha();
			return false;
		}
		if(captcha == ""){
			showErrorMessage("Please enter Captcha text.");		
			DrawCaptcha();
			return false;
		}
		/*if (captchaImg != captcha) {
			showErrorMessage("Entered Captcha text does not matched.");
			DrawCaptcha();
			return false;
		}	*/
		
	}
	hideServerMessageBlock();
	$(".otpButtonWrapper").hide();
    $('#resendOtpBut_wrapper').hide();
	generateOTP(eidUidValue, dateTimeValue, userName, userPincode, mobileNum, captcha,true);
}

function isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    	showErrorMessage("Please enter numeric values only");
        return false;
    }
    //return true;
}



function validateEntryTypeAfter(obj,type) {
	
		
		if (obj.value == "eidRadio") {
			$("#eid").unmask();
			$("#dateTime").unmask();
			$("#eid").mask("?9999/99999/99999");
			$("#dateTime").mask("?99/99/9999 99:99:99");
			$("#dateTimeDiv").css("display", "block");
			$("#mobileDiv").css("display", "none");
			$("#noteDiv").css("display", "");
			$("#eid_sugg").css("display", "");
			$("#uid_sugg").css("display", "none");
			$("#noteDiv").css("display", "block");
			$("#noteDiv1").css("display", "none");
			$("#vid_sugg").css("display", "none");
			$(".vidError").css("display" , "none");
			$(".uidError").css("display" , "none");
			$("#floatLeftDiv").addClass("floatLeft");
			$(".userNameError").css("display" , "none");
			$(".pinCodeError").css("display" , "none");
			$(".captchaError").css("display" , "none");
			$("#userName_sugg").css("display", "block");
			$("#pinCode_sugg").css("display", "block");
			$("#captcha_sugg").css("display", "block");	
			
		}
		
		if (obj.value == "uidRadio") {
			$("#eid").unmask();
			$("#dateTime").unmask();
			$("#eid").mask("?9999/9999/9999");
			$("#dateTimeDiv").css("display", "none");
			$("#mobileDiv").css("display", "none");
			$("#noteDiv").css("display", "");
			$("#eid_sugg").css("display", "none");
			$("#uid_sugg").css("display", "");
			//$("#eid").attr("placeholder", "1234/1234/1234");
			//$("#TOTP").attr('checked', false);
			$("#noteDiv").css("display", "block");
			$("#noteDiv1").css("display", "none");
			$("#vid_sugg").css("display", "none");
			$(".vidError").css("display" , "none");
			$(".eidError").css("display" , "none");
			$("#floatLeftDiv").addClass("floatLeft");
			$(".datetimeError").css("display" , "none");
			$(".userNameError").css("display" , "none");
			$(".pinCodeError").css("display" , "none");
			$(".captchaError").css("display" , "none");
			$("#userName_sugg").css("display", "block");
			$("#pinCode_sugg").css("display", "block");
			$("#captcha_sugg").css("display", "block");	
		}
		
		if (obj.value == "vidRadio") {
			$("#eid").unmask();
			$("#dateTime").unmask();
			$("#eid").mask("?9999/9999/9999/9999");
			$("#dateTimeDiv").css("display", "none");
			$("#mobileDiv").css("display", "none");
			$("#noteDiv").css("display", "");
			$("#eid_sugg").css("display", "none");
			$("#vid_sugg").css("display", "");
			$("#uid_sugg").css("display", "none");
			//$("#eid").attr("placeholder", "1234/1234/1234");
			//$("#TOTP").attr('checked', false);
			$("#noteDiv").css("display", "block");
			$("#noteDiv1").css("display", "none");
			$(".uidError").css("display" , "none");
			$(".eidError").css("display" , "none");
			$("#floatLeftDiv").removeClass("floatLeft");
			$(".datetimeError").css("display" , "none");
			$(".userNameError").css("display" , "none");
			$(".pinCodeError").css("display" , "none");
			$(".captchaError").css("display" , "none");
			$("#userName_sugg").css("display", "block");
			$("#pinCode_sugg").css("display", "block");
			$("#captcha_sugg").css("display", "block");	
		}
	}
