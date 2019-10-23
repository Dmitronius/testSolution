/* helper functions */

function _getAttribute(value) {
    return Xrm.Page.getAttribute(value);
};

function _getAttributeValue(value) {
    return _getAttribute(value) ? _getAttribute(value).getValue() : "";
};

function _forceSubmit(fieldName) {
    var forcedField = _getAttribute(value);
    if (forcedField)
        forcedField.setSubmitMode("always");
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

if (typeof (serviceAppointmentMain) == "undefined")
    serviceAppointmentMain = new Object();

serviceAppointmentMain.GetServiceInDays = function () {
    //debugger;
    try {
        if (serviceDays == -1) {
            var actualDurationMinutesField = _getAttribute('scheduleddurationminutes');
            var actualDurationMinutes = (actualDurationMinutesField == null && actualDurationMinutesField.getValue() == null)
                ? 1 : parseFloat(actualDurationMinutesField.getValue());
            var minInDay = 1440;
            var totalDays = actualDurationMinutes / minInDay;
            serviceDays = (totalDays < 1 ? 1 : totalDays);
        }
        return serviceDays;
    }
    catch (e) {
        console.log('serviceAppointmentMain.GetServiceInDays');
        console.log(e.message);
    }
};

serviceAppointmentMain.SyncDayField = function () {
    //debugger;
    try {
        //Xrm.Utility.alertDialog("updating service days with value: " + serviceAppointmentMain.GetServiceInDays());
        var newScheduledDurationDays = _getAttribute('new_scheduleddurationdays')
        newScheduledDurationDays.setValue(serviceAppointmentMain.GetServiceInDays());
        _forceSubmit('new_scheduleddurationdays');

        // more custom code
    }
    catch (e) {
        console.log('serviceAppointmentMain.SyncDayField');
        console.log(e.message);
    }
};

serviceAppointmentMain.ScheduledDurationChanged = function () {
    try {
        serviceDays = -1;
        serviceAppointmentMain.SyncDayField();
    }
    catch (e) {
        console.log('serviceAppointmentMain.ScheduledDurationChanged');
        console.log(e.message);
    }
};

serviceAppointmentMain.OnLoadForm = function () {
    debugger;
    try {
        var serviceDays = -1;
        var newScheduledDurationDays = _getAttributeValue('new_scheduleddurationdays')
        if (newScheduledDurationDays != GetServiceInDays()) {
            SyncDayField();
        }

        var scheduledDurationMinutes = _getAttribute('scheduleddurationminutes');
        scheduledDurationMinutes.addOnChange(serviceAppointmentMain.ScheduledDurationChanged);

        // more custom code
    }
    catch (e) {
        console.log('serviceAppointmentMain.OnLoadForm');
        console.log(e.message);
    }
};

serviceAppointmentMain.OnSaveForm = function () {
    //debugger;
    try {
        var actualDurationMinutesField = _getAttribute('scheduleddurationminutes');
        var actualDurationMinutes = (actualDurationMinutesField.getValue() == null)
            ? 15 : parseFloat(actualDurationMinutesField.getValue());

        var minInDay = 1440;
        var totalDays = actualDurationMinutes / minInDay;
        var days = totalDays < 1 ? 1 : totalDays;
        var newScheduledDurationDaysField = _getAttribute('new_scheduleddurationdays')
        newScheduledDurationDaysField.setValue(days);

        // more custom code
    }
    catch (e) {
        console.log('serviceAppointmentMain.OnSaveForm');
        console.log(e.message);
    }
};