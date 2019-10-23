function mergeRecords() {
    var customerAttr = Xrm.Page.getAttribute("customerid");
    if (customerAttr == null) {
        alert("No customer.");
        return;
    }

    debugger;

    var customer = customerAttr.getValue()[0];

    var isAccount = customer["entityType"] === "account";
    var customerId = customer["id"].replace("{", "").replace("}", "");

    var caseId = Xrm.Page.data.entity.getId().replace("{", "").replace("}", "");

    var dlgMergeParams = "id=" + caseId + "&isAccount=" + isAccount + "&customerId=" + customerId;
    var customParameters = encodeURIComponent(dlgMergeParams);
    Xrm.Utility.openWebResource("crm1st_CaseMerge.html", customParameters, 800, 1000);

}