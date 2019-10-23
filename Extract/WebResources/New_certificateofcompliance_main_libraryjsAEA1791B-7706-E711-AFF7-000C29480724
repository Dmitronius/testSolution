/// <reference path="C:\DevDynamics\CRMFirst\Transas\Transas CRM Solution\WebResources\MSXRMTOOLS.Xrm.Page.2016.js" />
if (typeof (certArtMain) == "undefined")
    certArtMain = new Object();

function _getAttribute(value) {
    return Xrm.Page.getAttribute(value);
};

function _getAttributeValue(value) {
    return _getAttribute(value) ? _getAttribute(value).getValue() : "";
};

certArtMain.GetCode = function () {

    var isCreateForm = Xrm.Page.ui.getFormType() == 1;
    if (!isCreateForm)
        return;

    jQuery.get(
        "http://weita-crmfirst/ISV/APTCertificate/GetNextAPTCertificateId.aspx?r=" + Math.random(), function (data) {

            resultText = data;
            var newName = _getAttribute('new_name');
            var newNameValue = _getAttributeValue('new_name');

            if (newNameValue != "" && newNameValue != null && newNameValue != resultText)
                alert('Certificate number has been changed, because during the editing current number was occupied by another user. \nNew Certificate Number is \n\n ' + resultText);
            newName.setValue(resultText)

        }).fail(function (e) {
            //alert("Error:" + e.responseText);
            console.log(e.responseText);
            console.log("perhaps caused by /ISV/APTCertificate/GetNextAPTCertificateId.aspx?r=");
        });
};

certArtMain.OnLoadForm = function () {
    try {

        setTimeout(certArtMain.GetCode, 500);
        //var isCreateForm = Xrm.Page.ui.getFormType() == 1;
        //if (isCreateForm)
        //    return;

        //certArtMain.GetCode();

        //crmForm.new_name.onclick = getCode;
        //crmForm.new_name.style.background = 'white url(/_imgs/imagestrips/grid_ctrl_imgs.gif) right 4px no-repeat';    

        // more custom code
    }
    catch (e) {
        console.log(e.message);
    }
};

certArtMain.OnSaveForm = function () {
    try {
        certArtMain.GetCode();
        // more custom code
    }
    catch (e) {
        console.log(e.message);
    }
};

certArtMain.onChange_new_vesselid = function () {
    try {
        // more custom code
    }
    catch (e) {
        console.log(e.message);
    }
};

//function Form_onload() {
//    crmForm.new_name.onclick = getCode;
//    crmForm.new_name.style.background = 'white url(/_imgs/imagestrips/grid_ctrl_imgs.gif) right 4px no-repeat';

//    function getCode() {

//        if (crmForm.FormType != 1) return;
//        var xmlHttpRequest = new ActiveXObject("Msxml2.XMLHTTP");
//        xmlHttpRequest.Open("get", "/ISV/APTCertificate/GetId/Default.aspx?r=" + Math.random(), false);
//        xmlHttpRequest.send();

//        var resultText = xmlHttpRequest.responseText;

//        if (crmForm.new_name.value != "" && crmForm.new_name.value != resultText)
//            alert('Certificate number has been changed, because during the editing current number was occupied by another user. \nNew Certificate Number is \n\n ' + resultText);
//        crmForm.new_name.value = resultText;

//    }
//}
//function Form_onsave() {
//    getCode();

//    function getCode() {

//        if (crmForm.FormType != 1) return;
//        var xmlHttpRequest = new ActiveXObject("Msxml2.XMLHTTP");
//        xmlHttpRequest.Open("get", "/ISV/APTCertificate/GetId/Default.aspx?r=" + Math.random(), false);
//        xmlHttpRequest.send();

//        var resultText = xmlHttpRequest.responseText;

//        if (crmForm.new_name.value != "" && crmForm.new_name.value != resultText)
//            alert('Certificate number has been changed, because during the editing current number was occupied by another user. \nNew Certificate Number is \n\n ' + resultText);
//        crmForm.new_name.value = resultText;

//    }
//}
//function new_vesselid_onchange() {

//}
