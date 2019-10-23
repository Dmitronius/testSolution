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

if (typeof (cashflowMain) == "undefined")
    cashflowMain = new Object();

function changeIFrameBudgetUrl() {
    if (newBudgetUrlSet.val)
        return;
    var IFrame = Xrm.Page.ui.controls.get("IFRAME_budget");
    //hack! wait until the original "about:blank" is loaded and then change it
    var inter = setInterval(function () {
        if (IFrame.getSrc() !== "") {
            clearInterval(inter);
            onloadIframe("IFRAME_budget", "/Cashflow/Revenue.aspx", newBudgetUrlSet);
        }
    }, 100);
}

function changeIFrameChartUrl() {
    if (newChartUrlSet.val)
        return;
    var IFrame = Xrm.Page.ui.controls.get("IFRAME_CF_CHART");
    //hack! wait until the original "about:blank" is loaded and then change it
    var inter = setInterval(function () {
        if (IFrame.getSrc() !== "") {
            clearInterval(inter);
            onloadIframe("IFRAME_CF_CHART", "/Cashflow/", newChartUrlSet);
        }
    }, 100);
}

var newBudgetUrlSet = { val: false };
var newChartUrlSet = { val: false };

function onLoadChart() {
    onloadIframe("IFRAME_CF_CHART", "/Cashflow/", newChartUrlSet);
}

function onLoadBudget() {
    onloadIframe("IFRAME_budget", "/Cashflow/Revenue.aspx", newBudgetUrlSet);
}

function getTargetUrlPrefix() {

    var prefixDev = "https://weita-crmfirst.transas.com/";
    var prefixProd = "https://weita-crmfirst2.transas.com/";

    var orgName = Xrm.Page.context.getOrgUniqueName();
    if (orgName === "transas2") {
        return prefixProd;
    }

    return prefixDev;
}

function getTargetUrlFolder() {
    var newTarget;

    var orgName = Xrm.Page.context.getOrgUniqueName();

    if (orgName === "transas2") {
        newTarget = "ISV";
    }
    else if (orgName === "orgbe46661f") {
        newTarget = "ISVDev";
    } else {
        newTarget = "ISVUat";
    }
    return newTarget;
}

function onloadIframe(iFrameName, suffix, newUrlSet) {
    debugger;
    //do not set updated url if already set
    if (newUrlSet.val)
        return;

    //Get the default URL for the IFRAME, which includes the 
    // query string parameters
    var IFrame = Xrm.Page.ui.controls.get(iFrameName);
    var Url = IFrame.getSrc();
    // Capture the parameters
    var paramsOriginal = Url.substr(Url.indexOf("?"));
    var params = "";
    if (paramsOriginal !== undefined && paramsOriginal !== "")
        params = paramsOriginal;
    else {
        //do nothing if original url contains no params
        return;
    }
    var newTarget = getTargetUrlFolder();
    var prefix = getTargetUrlPrefix();
    
    newTarget = prefix + newTarget + suffix;

    //Append the parameters to the new page URL
    var newUrl = newTarget + params;

    // Use the setSrc method so that the IFRAME uses the
    // new page with the existing parameters
    IFrame.setSrc(newUrl);
    newUrlSet.val = true;
}

cashflowMain.OnLoadForm = function () {
    debugger;
    try {
        var isCreateForm = Xrm.Page.ui.getFormType() == 1;
        var isUpdateForm = Xrm.Page.ui.getFormType() == 2;
        var isBulkEdit = Xrm.Page.ui.getFormType() == 6;
       // var tabs = Xrm.Page.ui.getTabs();

        if (isCreateForm || isBulkEdit) {            
            if (Xrm.Page.ui.tabs.get("Project Financial Profile") != null)
                Xrm.Page.ui.tabs.get("Project Financial Profile").setVisible(false);
            //crmForm.all.tab1Tab.click();
        }

        ///////////////////////////////////////
        ConfigreToolbarDisplay();
        document.body.onresize = function () {
            ConfigreToolbarDisplay();
        }

        function ConfigreToolbarDisplay() {
            HideAssociatedViewButtons('new_new_cashflow_new_cashflowitem', ['Add existing Budget Line to this record']);
        }

        function HideAssociatedViewButtons(loadAreaId, buttonTitles) {
            //var navElement = document.getElementById('nav_' + loadAreaId);
            var navElement =_getAttribute('nav_' + loadAreaId);
            if (navElement != null) {
                navElement.onclick = function LoadAreaOverride() {
                    // Call the original CRM method to launch the navigation link and create area iFrame
                    loadArea(loadAreaId);
                    HideViewButtons(document.getElementById(loadAreaId + 'Frame'), buttonTitles);
                }
            }
        }

        function HideViewButtons(Iframe, buttonTitles) {
            if (Iframe != null) {
                Iframe.onreadystatechange = function HideTitledButtons() {
                    if (Iframe.readyState == 'complete') {
                        var iFrame = frames[window.event.srcElement.id];
                        var liElements = iFrame.document.getElementsByTagName('li');

                        for (var j = 0; j < buttonTitles.length; j++) {
                            for (var i = 0; i < liElements.length; i++) {
                                if (liElements[i].getAttribute('title') == buttonTitles[j]) {
                                    liElements[i].style.display = 'none';
                                    break;
                                }
                            }
                        }
                    }
                }
            }
        }

        // more custom code
    }
    catch (e) {
        console.log(e.message);
    }
};
if (typeof (incidentMain) == "undefined")
    incidentMain = new Object();
incidentMain.OnSaveForm = function () {
   // debugger;
    try {

        //alert("Form is saved");
        var mainWnd = window.parent;
        for (var iCnt = 0; iCnt < mainWnd.frames.length; iCnt++) {
            if (mainWnd.frames[iCnt].save) {
                mainWnd.frames[iCnt].save();
            }
        }
        // more custom code
    }
    catch (e) {
        console.log(e.message);
    }
};

function IFRAME_CF_CHART_onload() {

}
function IFRAME_budget_onload() {

}
function IFRAME_editor_onload() {

}

//crm-82 andnov 9/5/2017 https://jira.transas.com/browse/CRM-82 "Need check of Category field on Budget:Budget_line editable grid."
//need to set onchange event on ediatble grid for type and category 
//Helper
function _clearFormNotification(value) {
Xrm.Page.ui.clearFormNotification(value);
} 
//End of Helper
function categoryValidate()
{
    debugger;
    // Name of the editable grid of CRM home page is crmGrid
    var accountsGrid = Xrm.Page.getControl("BudgetLines").getGrid();

    //accountsGrid.getSelectedRows() will give you multiple selected rows
    var budgetLineCategoryText = accountsGrid.getSelectedRows().get(0).getData().getEntity().getAttributes().get("new_category").getText();
    var budgetLineType = accountsGrid.getSelectedRows().get(0).getData().getEntity().getAttributes().get("new_type").getText();
    if(budgetLineType=="Receivables" && budgetLineCategoryText!="Deposit Bond" && budgetLineCategoryText!=""){
        Xrm.Page.ui.setFormNotification("For Recievables you should select Deposit Bond category or leave it Empty", "WARNING", "budgetLineNotfication");
        accountsGrid.getSelectedRows().get(0).getData().getEntity().getAttributes().get("new_category").setValue(null); //nulls category
        setTimeout(_clearFormNotification, 10000,"budgetLineNotfication"); //removes formnotification via helper
    } 
}

//crm-82 end