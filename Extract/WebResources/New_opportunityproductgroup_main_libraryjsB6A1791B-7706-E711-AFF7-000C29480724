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
/* Deprecated start */
if (typeof (opportunityProductGroupMain) == "undefined")
    opportunityProductGroupMain = new Object();

opportunityProductGroupMain.setNewName = function () {
    try { /*new_productgroupid  new_percent  new_name*/
        var selectedProduct = _getAttributeValue('new_productgroupid');
        var newPercent = _getAttributeValue('new_percent');
        var newName = _getAttribute('new_name');

        if (selectedProduct != null)
            newName.setValue(selectedProduct[0].name + " " + newPercent + " %");
    }
    catch (e) {
        console.log(e.message);
    }
};

opportunityProductGroupMain.OnLoadForm = function () {
    //debugger;
    try {
        // more custom code
    }
    catch (e) {
        console.log(e.message);
    }
};

opportunityProductGroupMain.OnSaveForm = function () {
    try {
        opportunityProductGroupMain.setNewName();
        // more custom code
    }
    catch (e) {
        console.log(e.message);
    }
};

opportunityProductGroupMain.onChange_new_productgroupid = function () {
    try {
        // field "new_productgroupid" onchange
        opportunityProductGroupMain.setNewName();
        // more custom code
    }
    catch (e) {
        console.log(e.message);
    }
};

opportunityProductGroupMain.onChange_new_percent = function () {
    try {
        // field "new_percent" onchange
        opportunityProductGroupMain.setNewName();
        // more custom code
    }
    catch (e) {
        console.log(e.message);
    }
};
/* Deprecated end */

//3-07-2018 andnov CRM-355 in order to create Opporunity Product Line with correct products

function filterProductList() {

    addProductsPresearch();

}







//18-07-2018 andnov CRM-364
//Adding handler in order when subgrid updates (NEW item in subgrid created) - we can count items 
function addSubgridOnload() {
    Xrm.Page.getControl("Package_Items").addOnLoad(retrievePackageItems);
}

//retrieving amount off all items in productline
function retrievePackageItems() {
    var productLine = Xrm.Page.data.entity.getId();
    //console.error(productLine);
    if (productLine != null) {
        productLineID = productLine.replace('{', '').replace('}', '');
        //console.error(productLineID);
        //console.error(productLineSolution);
    }

    var req = new XMLHttpRequest();
    req.open("GET", Xrm.Page.context.getClientUrl() + "/api/data/v8.2/tra_productpackageitems?$filter=_tra_opportunityproductlineid_value eq " + productLineID + "", true);
    req.setRequestHeader("OData-MaxVersion", "4.0");
    req.setRequestHeader("OData-Version", "4.0");
    req.setRequestHeader("Accept", "application/json");
    req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    req.setRequestHeader("Prefer", "odata.include-annotations=\"*\"");
    var countPackageItems
    req.onreadystatechange = function () {
        if (this.readyState === 4) {
            req.onreadystatechange = null;
            if (this.status === 200) {
                var results = JSON.parse(this.response);
                countPackageItems = results.value.length;
                sumProductPackageItems(countPackageItems); //callback 
                //console.log(countPackageItems);
            } else {
                console.error(this.statusText);
            }
        }
    };
    try {
        req.send();
    }
    catch (e) {
        console.error(e);
    }
}



//3-07-2018 andnov CRM-355 in order to calculate Product Package Items in Opporunity Product Line subgrid
function sumProductPackageItems(countPackageItems) {
    try {
        //console.log (countPackageItems);
        if (countPackageItems) {
            Xrm.Page.getAttribute("tra_productpackageitemscount").setValue(countPackageItems); // set amount
            Xrm.Page.data.entity.save();
        } else {
            Xrm.Page.getAttribute("tra_productpackageitemscount").setValue(0); // set default value
            Xrm.Page.data.entity.save();
        }
    }
    catch (e) {
        console.error(e);
    }
}

//24-09-2018 andnov prerfiltration of products with removing  already selected products

function addProductsPresearch() {
    var opportunity = Xrm.Page.getAttribute("new_opportunityid").getValue();
    //console.error (opportunity);
    if (opportunity != null) {
        var oppID = opportunity[0].id;
        //console.error (opportunityTextValue);
        oppID = oppID.replace('{', '').replace('}', '');
        getProductsForSolution(oppID, getAlreadySelectedProducts);
    } else {
        console.error("TRA. No opportunity found");
    }
}

//retriving solution from opportunity in order to filter only products of proper solution
function getProductsForSolution(oppID, callback) {
    var req = new XMLHttpRequest();
    req.open("GET", Xrm.Page.context.getClientUrl() + "/api/data/v8.2/opportunities(" + oppID + ")?$select=tra_solutionglobalcode", true);
    req.setRequestHeader("OData-MaxVersion", "4.0");
    req.setRequestHeader("OData-Version", "4.0");
    req.setRequestHeader("Accept", "application/json");
    req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    req.setRequestHeader("Prefer", "odata.include-annotations=\"*\"");
    //var returnValue;
    let solutionID = 20; // 20 is not existing solution - filter will show nothing
    req.onreadystatechange = function () {
        if (this.readyState === 4) {
            req.onreadystatechange = null;
            if (this.status === 200) {
                var result = JSON.parse(this.response);
                var tra_solutionglobalcode = result["tra_solutionglobalcode"];
                //var tra_solutionglobalcode_formatted = result["tra_solutionglobalcode@OData.Community.Display.V1.FormattedValue"];
                if (tra_solutionglobalcode != null && tra_solutionglobalcode != undefined) {
                    solutionID = tra_solutionglobalcode;
                }
                console.log("TRA. solutionID:");
                console.log(solutionID);
                callback(oppID, solutionID, applyPresearch);
            } else {
                console.error(this.statusText);
            }
        }
    };
    try {
        req.send();
    }
    catch (e) {
        console.error(e);
    }
}

//retriveing guids of product already selected for product lines
function getAlreadySelectedProducts(oppID, solutionID, callback) {


    var req = new XMLHttpRequest();
    req.open("GET", Xrm.Page.context.getClientUrl() + "/api/data/v8.2/new_opportunityproductgroups?$select=_tra_productlineid_value&$filter=_new_opportunityid_value eq " + oppID + "", true);
    req.setRequestHeader("OData-MaxVersion", "4.0");
    req.setRequestHeader("OData-Version", "4.0");
    req.setRequestHeader("Accept", "application/json");
    req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    req.setRequestHeader("Prefer", "odata.include-annotations=\"*\"");
    var alreadySelectedProducts = [];
    req.onreadystatechange = function () {
        if (this.readyState === 4) {
            req.onreadystatechange = null;
            if (this.status === 200) {
                var results = JSON.parse(this.response);
                for (var i = 0; i < results.value.length; i++) {
                    var _tra_productlineid_value = results.value[i]["_tra_productlineid_value"];

                    console.log(_tra_productlineid_value);
                    console.log(results.value[i]["_tra_productlineid_value"]);
                    alreadySelectedProducts[i] = results.value[i]["_tra_productlineid_value"];


                }
                console.log("TRA. alreadySelectedProducts IDs:");
                console.log(alreadySelectedProducts);
                callback(solutionID, alreadySelectedProducts);
            } else {
                console.error(this.statusText);
            }
        }
    };
    req.send();



}



function applyPresearch(opportunitySolution, alreadySelectedProducts) {
    let alreadySelectedProductsFilter = "<value>00000000-0000-0000-0000-000000000000</value>"; // in case if no Opportunity Product Lines exist for that opportunity 
    const productNumberPrefix = "prdln";
    for (let i = 0; i < alreadySelectedProducts.length; i++) {
        if (alreadySelectedProducts[i] != null && alreadySelectedProducts[i] != undefined) {
            alreadySelectedProductsFilter = alreadySelectedProductsFilter + "<value>" + alreadySelectedProducts[i] + "</value>";
        }
    };
    console.log("alreadySelectedProductsFilter");
    console.log(alreadySelectedProductsFilter);
    Xrm.Page.getControl("tra_productlineid").addPreSearch(function () {
        // let product_filter = "<filter type='and' ><condition attribute='tra_solutioncode' operator='eq' value='" 
        // + opportunitySolution + "' /><condition attribute='statuscode' operator='eq' value='1' />" + "<condition attribute='productid' operator='not-in'>" 
        // + alreadySelectedProductsFilter + "</condition>" + "</filter>";
        let product_filter = '<filter type="and" >'
            + '<condition attribute="tra_solutioncode" operator="eq" value="' + opportunitySolution + '"/>'
            + '<condition attribute="productnumber" operator="begins-with" value="' + productNumberPrefix + '"/>'
            + '<condition attribute="wdt_productownercode" operator="in"><value>750610000</value><value>750610001</value></condition>'
            + '<condition attribute="statecode" operator="eq" value="0"/>'
            + '<condition attribute="productid" operator="not-in">'
            + alreadySelectedProductsFilter
            + '</condition>' + '</filter>'


        console.log("product_filter");
        console.log(product_filter);

        Xrm.Page.getControl("tra_productlineid").addCustomFilter(product_filter, "product");
        console.log("addCustomFilter");
        console.log(product_filter);
    })
    //console.error(data);
}