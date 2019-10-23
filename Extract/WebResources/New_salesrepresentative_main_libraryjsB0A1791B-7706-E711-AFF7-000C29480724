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
if (typeof (salesRepresentativeMain) == "undefined")
    salesRepresentativeMain = new Object();

salesRepresentativeMain.OnLoadForm = function () {
    //debugger;
    try {
        var newName = _getAttribute('new_name');
        var newPositionValue = _getAttributeValue('new_position');
        var newStartdateValue = _getAttributeValue('new_startdate');
        newName.setValue(newPositionValue + ' - ' + newStartdateValue);
        // more custom code
    }
    catch (e) {
        console.log(e.message);
    }
};

salesRepresentativeMain.OnSaveForm = function () {
    try {
        // more custom code
    }
    catch (e) {
        console.log(e.message);
    }
};

//function Form_onsave() {
//    crmForm.all.new_name.DataValue =
//    crmForm.all.new_position.DataValue + " - " + crmForm.new_startdate.DataValue
//    crmForm.new_startdate.EndValue;
//}
//function Form_onload() {
//}
