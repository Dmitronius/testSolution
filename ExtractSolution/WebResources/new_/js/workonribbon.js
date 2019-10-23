function enableWorkOnForm(){
    var req = new XMLHttpRequest();
    req.open("GET", Xrm.Page.context.getClientUrl() + "/api/data/v8.2/queueitems?$filter=_objectid_value eq " + Xrm.Page.data.entity.getId().replace(/[{}]/g, ""), false);
    req.setRequestHeader("OData-MaxVersion", "4.0");
    req.setRequestHeader("OData-Version", "4.0");
    req.setRequestHeader("Accept", "application/json");
    req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    req.setRequestHeader("Prefer", "odata.include-annotations=\"*\"");
    req.send();

    if (req.status === 200) {
        var results = JSON.parse(req.responseText);
        if (results.value.length > 0) {
            return true;
        }
    } 

    return false;
}

function enableWorkOnGrid(selectedItems){
    var selectedItem = selectedItems[0];
    console.log("Id=" + selectedItem.Id + "\nName=" + selectedItem.Name + "\nTypeCode=" + selectedItem.TypeCode.toString() + "\nTypeName=" + selectedItem.TypeName);

    var req = new XMLHttpRequest();
    req.open("GET", Xrm.Page.context.getClientUrl() + "/api/data/v8.2/queueitems?$filter=_objectid_value eq " + selectedItem.Id.replace(/[{}]/g, ""), false);
    req.setRequestHeader("OData-MaxVersion", "4.0");
    req.setRequestHeader("OData-Version", "4.0");
    req.setRequestHeader("Accept", "application/json");
    req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    req.setRequestHeader("Prefer", "odata.include-annotations=\"*\"");
    req.send();

    if (req.status === 200) {
        var results = JSON.parse(req.responseText);
        if (results.value.length > 0) {
            return true;
        }
    } 

    return false;
}