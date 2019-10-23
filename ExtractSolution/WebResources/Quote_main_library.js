if (typeof (quoteMain) == "undefined")
    quoteMain = new Object();

quoteMain.OnLoadForm = function () {
    debugger;
    try {
        debugger;
        var tabs = Xrm.Page.ui.getTabs();
        if (tabs.get(1))
            tabs.get(1).setVisible(false);
        if (tabs.get(2))
            tabs.get(2).setVisible(false);

        // TODO: Check what exact have to be hided
        var el = window.document.getElementById("navExistingProducts");
        if (el)
            el.style.display = "none";
        el = window.document.getElementById("navWriteInProducts");
        if (el)
            el.style.display = "none";

        // more custom code
    }
    catch (e) {
        console.log(e.message);
    }
};

quoteMain.OnSaveForm = function () {
    try {
        // more custom code
    }
    catch (e) {
        console.log(e.message);
    }
};

//function Form_onload() {
    
//    var crmForm = window.document.getElementById("crmForm");
//    if (crmForm == null) return;
//    {
//        if (crmForm.all.tab1Tab) crmForm.all.tab1Tab.style.display = "none";
//        if (crmForm.all.tab2Tab) crmForm.all.tab2Tab.style.display = "none";
//    }
//    var el = window.document.getElementById("navExistingProducts");
//    if (el) el.style.display = "none";
//    el = window.document.getElementById("navWriteInProducts");
//    if (el) el.style.display = "none";
//}
