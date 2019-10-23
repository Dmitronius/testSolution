/* helper functions */

function _getAttribute(value) {
    return Xrm.Page.getAttribute(value);
};

function _getAttributeValue(value) {
    return _getAttribute(value) ? _getAttribute(value).getValue() : "";
};

function _forceSubmit(fieldName) {
    var value = fieldName;
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

if (typeof (cashflowItemMain) == "undefined")
    cashflowItemMain = new Object();

cashflowItemMain.IFRAME_irfame1_onload = function () {
    //debugger;
    try {
        // more custom code       
    }
    catch (e) {
        console.log(e.message);
    }
};

cashflowItemMain.OnLoadForm = function () {
   debugger;
    try {
        var CRM_FORM_TYPE_CREATE = 1;
        var CRM_FORM_TYPE_UPDATE = 2;
        var CRM_QUICK_CREATE_FORM = 5;
        var CRM_BULK_EDIT_FORM = 6;

        /* JQuery */
        var script = document.createElement('script');
        script.language = 'javascript';
        script.src = '/ISV/scripts/jquery-1.3.2.min.js';

        //script.onreadystatechange = function () {
        //    if (event.srcElement.readyState == "complete" || event.srcElement.readyState == "loaded")
        //        jQueryIsReady();
        //};

        document.getElementsByTagName('head')[0].appendChild(script);

        //function jQueryIsReady() {
            // hide Add Existing Budget Line
            // hide li with a title = 'Add existing Budget Line to this record'
            // $("ul").find("[data-slide='" + current + "']");
            var iframe = $('#new_new_cashflow_new_cashflowitem'); // get the iframe
        // $("li[title='Add existing Budget Line to this record']", iframe.contents()).hide();
            iframe.contents().hide();
      //  };
        // more custom code    
    }
    catch (e) {
        console.log(e.message);
    }
};

cashflowItemMain.OnSaveForm = function () {
    try {
       // debugger;
        var newCategory = _getAttribute('new_category');
        var newCategoryDisabled = Xrm.Page.getControl('new_category').getDisabled();

        var newIsRecurringValue = _getAttributeValue('new_isrecurring');
        var newRecurringPeriod = _getAttribute('new_recurringperiod');
        var newRecurringStart = _getAttribute('new_recurringstart');
        var newRecurringEnd = _getAttribute('new_recurringend');

        if (newCategoryDisabled) {
            newCategory.setValue(null);
            _forceSubmit('new_category');
        }

        if (newIsRecurringValue != true) {
            _setDisabled('new_recurringperiod', false);
            //crmForm.all.new_recurringperiod.className = "ms-crm-Number";

            newRecurringPeriod.setValue(null);
            _forceSubmit('new_recurringperiod');

            newRecurringStart.setValue(null);
            _forceSubmit('new_recurringstart');

            newRecurringEnd.setValue(null);
            _forceSubmit('new_recurringend');
        }
        // more custom code
    }
    catch (e) {
        console.log(e.message);
    }
};

cashflowItemMain.onChange_new_type = function () {
    //debugger;
    try {
        var tabs = Xrm.Page.ui.getTabs();

        /* Version 30.11.2016 */
        var categories = {
            "": 0,
            "L01 Materials and components": 1,
            "L02 Software and licenses": 12,
            "L03 Insurance, customs, freight": 5,
            "L05 Subcontractors": 2,
            "L06 Travel costs": 9,
            "L07 Royalties": 17,
            "L08 Installation Costs": 56,
            "L09 Certification": 14,
            "L10 Manuals and Documentation": 15,
            "L11 Consulting": 4,
            "L12 Other": 11,
            "L13 1 PMO Personnel Costs": 8,
            "L13 2 SW/DHW Personnel Costs": 10,
            "L13 3 Engineering Personnel Costs": 13,
            "L14 Warranty costs": 16,
            "L15 Delivery to customers": 55,
            "Deposit Bond": 6,
            "Deposit Bond Cost": 7
        };

        var payments = new Array(0, 1, 12, 5, 2, 9, 17, 56, 14, 15, 4, 11, 8, 10, 13, 16, 55, 6, 7);
        var receivables = new Array(0, 6);

        var newType = _getAttribute('new_type');
        var newDueDateTerm = _getAttribute('new_due_date_term');
        var newOverdueCategory = _getAttribute('new_overduecategory');
        var statusCodeValue = _getAttribute('statuscode').getText();

        // set options for categories
        var arr = newType.getText(); //== 'Payables' ? payments : receivables;
        //arr == 'Payables' ? payments : receivables;
        if (arr == "Payables") {
            var ar = payments;
        }
        else {
            var ar = receivables;
        }
        //var arr = $('#new_type option:selected').text() == 'Payables' ? payments : receivables;

        //window.status = $('#new_type option:selected').text();
        window.status = newType.getText();

        if (newType.getText() == 'Payables') {
            // PAYABLES
            _setDisabled('new_due_date_term', true);

            if (Xrm.Page.ui.tabs.get("Help on Overdue Categories"))
               Xrm.Page.ui.tabs.get("Help on Overdue Categories").setVisible(false);

            _setVisible('new_overduecategory', false);
           // strDateName = statusCodeValue != 'Paid' ? 'Est. payment date' : 'Act. payment date';
            if (statusCodeValue != "Paid") {
                steDateName = "Est. payment date";

            }
            else {
                steDateName = "Act. payment date";

            }
        } else {
            // RECEIVABLES
            _setDisabled('new_due_date_term', false);
            if (Xrm.Page.ui.tabs.get("Help on Overdue Categories"))
                
                Xrm.Page.ui.tabs.get("Help on Overdue Categories").setVisible(true);

            _setVisible('new_overduecategory', true);
            strDateName = statusCodeValue != 'Paid' ? 'Est. Funds Receipt date' : 'Act.  Funds Receipt date';
            //if (statusCodeValue != "Paid") {
            //    steDateName = "Est. Funds Receipt date";

            //}
            //else {
            //    steDateName = "Act.  Funds Receipt date";

            //}
        }

        // reset all categories
        //$('#new_category option').each(function () {
        //    $(this).remove();
        //});

        var newCategoryControl = Xrm.Page.getControl('new_category');
        newCategoryControl.clearOptions();

        // loop through categories check if they are in payments  or receivables;
        // key = Category name
        // value = integer
        var s = '';

        $.each(categories, function (key, valueNum) {
            var found = false;
            for (var i = 0; i < ar.length; i++) {
                if (valueNum == ar[i]) {
                    s = s + ' ' + valueNum;
                    found = true;
                    break;
                }
            }

            if (found) {
                var opt = {
                    text: key,
                    value: valueNum
                };
                newCategoryControl.addOption(opt)
            }
        });

        $('#new_date_cl').text(strDateName);

        // more custom code    
    }
    catch (e) {
        console.log(e.message);
    }
};

cashflowItemMain.onChange_statuscode = function () {
    try {
        //debugger;
        var strDateName = "";
        var newType = _getAttribute('new_type');
        var statusCode = _getAttribute('statuscode');

        if (newType.getText() != 'Payables') {
            strDateName = statusCode.getText() != 'Paid' ? 'Est. Funds Receipt date' : 'Act.  Funds Receipt date';
        } else {
            strDateName = statusCode.getText() != 'Paid' ? 'Est. payment date' : 'Act. payment date';
        }

        $('#new_date_cl').text(strDateName);

        // Alert regarding  empty Invoice Number
        var message = '';
        var newInvoiceNumberValue = _getAttributeValue('new_invoice_number');

        if (statusCode.getText() == 'Invoiced' && newInvoiceNumberValue == '')
            message += 'Please set correct Invoice Number before Saving\n';

        message += 'Please also change ' + strDateName + ' to a new value.';
        Xrm.Utility.alertDialog(message); //alert(message);
        // more custom code
    }
    catch (e) {
        console.log(e.message);
    }
};

cashflowItemMain.onChange_new_due_date_term = function () {
    debugger;
    try {
        var newInvoiceDateValue = _getAttributeValue('new_invoice_date');
        var newDueDateTermValue = _getAttributeValue('new_due_date_term');
        if (newInvoiceDateValue && newDueDateTermValue) {
            var offset = parseInt(newDueDateTermValue);
            var invoice_date = newInvoiceDateValue;
            var newCalculatedInvoiceDueDate = _getAttribute('new_calculated_invoice_due_date');
            newCalculatedInvoiceDueDate.setValue(new Date(
                invoice_date.getFullYear(),
                invoice_date.getMonth(),
                invoice_date.getDate() + offset,
                0, 0, 0, 0));
            _forceSubmit('new_calculated_invoice_due_date');
        }

        // more custom code
    }
    catch (e) {
        console.log(e.message);
    }
};

cashflowItemMain.onChange_new_invoice_date = function () {
    //debugger;
    try {
        var newInvoiceDateValue = _getAttributeValue('new_invoice_date');
        var newDueDateTermValue = _getAttributeValue('new_due_date_term');
        if (newInvoiceDateValue && newDueDateTermValue) {
            var offset = parseInt(newDueDateTermValue);
            var invoice_date = newDueDateTermValue;
            var newCalculatedInvoiceDueDate = _getAttribute('new_calculated_invoice_due_date');
            newCalculatedInvoiceDueDate.setValue(new Date(
                invoice_date.getFullYear(),
                invoice_date.getMonth(),
                invoice_date.getDate() + offset,
                0, 0, 0, 0));
            _forceSubmit('new_calculated_invoice_due_date');
        }

        // more custom code
    }
    catch (e) {
        console.log(e.message);
    }
};

cashflowItemMain.onChange_new_isrecurring = function () {
    //function SetDTState(fieldName, state) {
    //    var field = eval("crmForm.all." + fieldName);
    //    var img = eval("field.all." + fieldName + "img");
    //    field.disabled = !state;
    //    field.all.DateInput.disabled = !state;
    //    field.all.DateInput.contentEditable = (state == true);
    //    field.all.DateInput.className = (state ? "" : "ms-crm-ReadOnly");
    //    img.disabled = !state;
    //    img.src = "/_imgs/btn_" + (state ? "off" : "dis") + "_cal.gif";
    //}    
    //crmForm.all.new_recurringperiod.disabled = (crmForm.all.new_isrecurring.DataValue != true);
    //crmForm.all.new_recurringperiod.className = (crmForm.all.new_isrecurring.DataValue ? "ms-crm-Number" : "ms-crm-ReadOnly");
    //SetDTState("new_recurringstart", crmForm.all.new_isrecurring.DataValue);
    //SetDTState("new_recurringend", crmForm.all.new_isrecurring.DataValue);
    var newIsRecurring = _getAttributeValue('new_isrecurring');
    _setDisabled('new_recurringperiod', newIsRecurring);
    _setDisabled('new_recurringstart', newIsRecurring);
    _setDisabled('new_recurringend', newIsRecurring);
};