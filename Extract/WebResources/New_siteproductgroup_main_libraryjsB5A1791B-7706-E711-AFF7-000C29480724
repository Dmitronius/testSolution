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

if (typeof (siteProductGroupMain) == "undefined")
    siteProductGroupMain = new Object();

siteProductGroupMain.OnLoadForm = function () {
    //debugger;
    try {       
        // more custom code
    }
    catch (e) {
        console.log(e.message);
    }
};

siteProductGroupMain.OnSaveForm = function () {
    try {
        // more custom code
    }
    catch (e) {
        console.log(e.message);
    }
};

siteProductGroupMain.onChange_new_productgroup = function () {
    try {

        var newName = _getAttribute('new_name');
        var newIndustry = _getAttribute('new_industry');
        var newProductGroup = _getAttributeValue('new_productgroup');
        newName.setValue(newIndustry.getText() + ': ' + newProductGroup.getText());
        // more custom code
    }
    catch (e) {
        console.log(e.message);
    }
};

//function Form_onload() {
//}
//function new_productgroup_onchange() {
//    crmForm.all.new_name.DataValue = crmForm.all.new_industry.SelectedText + ': ' + crmForm.all.new_productgroup.SelectedText;
//}
//function new_name_onchange() {
//}
