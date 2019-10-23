/* helper functions */


function _getAttribute(value) {
    return Xrm.Page.getAttribute(value);
};

function _getAttributeValue(value) {
    return _getAttribute(value) ? _getAttribute(value).getValue() : "";
};

function _setDisabled(fieldName, disabledValue) {
    try {
        Xrm.Page.getControl(fieldName).setDisabled(disabledValue);
    }
    catch (e) {
        console.log(e.message);
    }
};

function _setVisible(fieldName, visible) {
    try {
        Xrm.Page.getControl(fieldName).setVisible(visible);
    }
    catch (e) {
        console.log(e.message);
    }
};

function _toRequirementLevel(boolValue) {
    try {
        return boolValue ? "required" : "none";
    }
    catch (e) {
        console.log(e.message);
    }
};

function _addEventHandler(elem, eventType, handler) {
    if (elem.addEventListener)
        elem.addEventListener(eventType, handler, false);
    else if (elem.attachEvent)
        elem.attachEvent('on' + eventType, handler);
}

function _removeEventHandler(elem, eventType, handler) {
    if (elem.removeEventListener)
        elem.removeEventListener(eventType, handler, false);
    else if (elem.detachEvent)
        elem.detachEvent('on' + eventType, handler);
}

/* helper functions */

if (typeof (newRequestMain) == "undefined")
    newRequestMain = new Object();

newRequestMain.GetCode = function () {
    try {
        var isCreateForm = Xrm.Page.ui.getFormType() == 1;
        if (isCreateForm)
            return;

        var requestNo = Xrm.Page.getAttribute('new_requestno');
        requestNo.setValue("1");
        /* TODO: reference /ISV/getRequestId/Default.aspx?r= could cause an error */
       // var xmlHttpRequest = new ActiveXObject("Msxml2.XMLHTTP");
       // xmlHttpRequest.Open("get", "/ISV/getRequestId/Default.aspx?r=" + Math.random(), false);
        //xmlHttpRequest.send();

       // var resultText = xmlHttpRequest.responseText;
        //requestNo.setValue(resultText);

        //crmForm.new_requestno.style.background = 'white url(/_imgs/imagestrips/grid_ctrl_imgs.gif) right 4px no-repeat';
        // more custom code
    }
    catch (e) {
        console.log(e.message);
    }
};

newRequestMain.OnLoadForm = function () {
    debugger;
    try {
        newRequestMain.GetCode();
        var requestNo = _getAttribute('new_requestno');
        requestNo.addOnChange(newRequestMain.GetCode);

        // more custom code
    }
    catch (e) {
        console.log(e.message);
    }
};
requestNo.addOnChange(newRequestMain.GetCode)
{

}


newRequestMain.OnSaveForm = function () {
    try {
       // debugger;
        var objId;
        var objType;
        var customUrl;
        if((crmForm.all.new_urllink.DataValue == null) || (crmForm.all.new_urllink.DataValue == ""))
        {
             if(crmForm.FormType == 2)
             {
                  var embedUrl;
                  customUrl = "http://crm.transas.com/TransasLimited/userdefined/edit.aspx";
                  objId = crmForm.ObjectId;    //Gets the ID of the current record
                  objType = crmForm.ObjectTypeCode;  //Gets the type code of the custom entity
                  embedUrl = customUrl + "?id=" + objId + "&etc=" + objType;  //pieces together the Url
                  crmForm.all.new_urllink.DataValue = embedUrl;
             }
        }

        //alert(document.location.href + "&" + crmForm.ObjectId);
        var id = Xrm.Page.data.entity.getId();
        Xrm.Utility.alertDialog(document.location.href + "&" + id);

        // more custom code
    }
    catch (e) {
        console.log(e.message);
    }
};

//function new_type_onchange() {
//    crmForm.all.new_name.DataValue = crmForm.all.new_type.SelectedText
//}


//function Form_onsave() {
//    /*
//    var objId;
//    var objType;
//    var customUrl;
//    if((crmForm.all.new_urllink.DataValue == null) || (crmForm.all.new_urllink.DataValue == ""))
//    {
//         if(crmForm.FormType == 2)
//         {
//              var embedUrl;
//              customUrl = "http://crm.transas.com/TransasLimited/userdefined/edit.aspx";
//              objId = crmForm.ObjectId;    //Gets the ID of the current record
//              objType = crmForm.ObjectTypeCode;  //Gets the type code of the custom entity
//              embedUrl = customUrl + "?id=" + objId + "&etc=" + objType;  //pieces together the Url
//              crmForm.all.new_urllink.DataValue = embedUrl;
//         }
//    }*/
//    alert(document.location.href + "&" + crmForm.ObjectId);
//}
//function Form_onload() {
//    getCode();
//    function getCode() {
//        debugger;
//        var formType = Xrm.Page.ui.getFormType();
//        if (formType != 1) return;
//        var xmlHttpRequest = new ActiveXObject("Msxml2.XMLHTTP");
      /* var xhr = new XMLHttpRequest(); Hajira code*/

       
        
       //xmlHttpRequest.Open("get", "/ISV/getRequestId/Default.aspx?r=" + Math.random(), false);
       // xmlHttpRequest.Open("get", "www.crmfirst.de", false);
       // xmlHttpRequest.send();
        /* Hajira Code below

        $(document).ready(function () {
            $.ajax({
                type: "GET",
                url: "/ISV/getRequestId/Default.aspx?r=" + Math.random(),
                dataType: "text",
                success: function (xhr) {
                    var resultText = xhr.responseText;
                    Xrm.Page.data.entity.attributes.getValue("new_requestno").setValue("resultText");
                    alert("success");
                },
                error: function (xhr) {
                    alert(xhr.responseText);
                    //alert("Fail");
                }
            });
        });
      */

        //var resultText = xmlHttpRequest.responseText;
       // Xrm.Page.data.entity.attributes.getValue("new_requestno").setValue("resultText");
        // crmForm.new_requestno.value = resultText;
       /* var i = Xrm.Page.ui.controls.get("new_requestno");
        if (i != null) {
           i._control.get_element().firstChild.style.color = 'red';
        } */
      //  Xrm.Page.ui.controls.get("new_requestno").style.backgroundColor = 'white url(/_imgs/imagestrips/grid_ctrl_imgs.gif) right 4px no-repeat ';
        // crmForm.new_requestno.style.background = 'white url(/_imgs/imagestrips/grid_ctrl_imgs.gif) right 4px no-repeat';
       // Xrm.Page.getControl("new_requestno").onClick = getCode();
//        //crmForm.new_requestno.onclick = getCode;
//    }
//}


