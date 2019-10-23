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

if (typeof (productNotesMain) == "undefined")
    productNotesMain = new Object();

productNotesMain.OnLoadForm = function () {
    //debugger;
    try {
        // more custom code
    }
    catch (e) {
        console.log(e.message);
    }
};

productNotesMain.OnSaveForm = function () {
    try {        
        // more custom code
    }
    catch (e) {
        console.log(e.message);
    }
};

productNotesMain.onChange_new_type = function () {
    try {
        // field "new_type" onchange
        var newType = _getAttribute('new_type');
        _getAttribute('new_name').setValue(newType.getText());
        // more custom code
    }
    catch (e) {
        console.log(e.message);
    }
};

//function new_type_onchange() {
//    crmForm.all.new_name.DataValue = crmForm.all.new_type.SelectedText
//}
