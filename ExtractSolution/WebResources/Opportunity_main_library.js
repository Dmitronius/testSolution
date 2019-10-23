// <reference path="c:\Dev\Transas\TransasCRMSolution\MSXRMTOOLS.Xrm.Page.2016.js " />
/* helper functions */

function _getAttribute(value) {
  return Xrm.Page.getAttribute(value);
}

function _getAttributeValue(value) {
  return _getAttribute(value) ? _getAttribute(value).getValue() : "";
}

function _forceSubmit(fieldName) {
  var forcedField = _getAttribute(value);
  if (forcedField) forcedField.setSubmitMode("always");
}

function _setDisabled(fieldName, disabledValue) {
  try {
    Xrm.Page.getControl(fieldName).setDisabled(disabledValue);
  } catch (e) {
    console.log(e.message);
  }
}

function _setVisible(fieldName, visible) {
  try {
    Xrm.Page.getControl(fieldName).setVisible(visible);
  } catch (e) {
    console.log(e.message);
  }
}

function _toRequirementLevel(boolValue) {
  try {
    return boolValue ? "required" : "none";
  } catch (e) {
    console.log(e.message);
  }
}

function _addEventHandler(elem, eventType, handler) {
  if (elem.addEventListener) elem.addEventListener(eventType, handler, false);
  else if (elem.attachEvent) elem.attachEvent("on" + eventType, handler);
}

function _removeEventHandler(elem, eventType, handler) {
  if (elem.removeEventListener) elem.removeEventListener(eventType, handler, false);
  else if (elem.detachEvent) elem.detachEvent("on" + eventType, handler);
}

/* helper functions */

if (typeof opportunityMain == "undefined") opportunityMain = new Object();

function changeIFrameUrl() {
  if (newUrlSet) return;
  var IFrame = Xrm.Page.ui.controls.get("IFRAME_JetProjectFoldersV5");
  //hack! wait until the original "about:blank" is loaded and then change it
  var inter = setInterval(function() {
    if (IFrame.getSrc() !== "") {
      clearInterval(inter);
      onloadIframe();
    }
  }, 100);
}

var newUrlSet = false;

function onloadIframe() {
  //do not set updated url if already set
  if (newUrlSet) return;

  //Get the default URL for the IFRAME, which includes the
  // query string parameters
  var IFrame = Xrm.Page.ui.controls.get("IFRAME_JetProjectFoldersV5");
  var Url = IFrame.getSrc();
  // Capture the parameters
  var paramsOriginal = Url.substr(Url.indexOf("?"));
  var params;
  if (paramsOriginal !== undefined && paramsOriginal !== "") params = paramsOriginal;
  else {
    //do nothing if original url contains no params
    return;
  }
  var prefix = getTargetUrlPrefix();
  var suffix = "/ProjectFolders";
  var newTarget = getTargetUrlFolder();

  newTarget = prefix + newTarget + suffix;

  //Append the parameters to the new page URL
  var newUrl = newTarget + params;

  // Use the setSrc method so that the IFRAME uses the
  // new page with the existing parameters
  if (newUrlSet) return;

  IFrame.setSrc(newUrl);
  newUrlSet = true;
}

function getInstanceType() {
  let instanceName = Xrm.Utility.getGlobalContext().organizationSettings.uniqueName;
  let instanceType = "dev";
  switch (instanceName) {
    case "transas2":
      instanceType = "prod";
      break;
    case "orga5a7fa35":
      instanceType = "uat";
      break;
    case "orgbe46661f":
      instanceType = "dev";
      break;
  }
  console.log("instanceType 2: " + instanceType);
  return instanceType;
}

function getTargetUrlFolder() {
  var newTarget;

  var orgName = Xrm.Page.context.getOrgUniqueName();

  if (orgName === "transas2") {
    newTarget = "ISV";
  } else if (orgName === "orgbe46661f") {
    newTarget = "ISVDev";
  } else {
    newTarget = "ISVUat";
  }
  return newTarget;
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

function addVesselEventHandler() {
  Xrm.Page.getControl("tra_vesselid").addPreSearch(addVesselFilter);
}

function addVesselFilter(executionContext) {
  let formContext = executionContext.getFormContext();
  let id = formContext.getAttribute("parentaccountid").getValue()[0].id;
  let filter =
    "<filter type='or'>" +
    "<condition attribute='new_parentaccount' operator='eq' value='" +
    id +
    "' />" +
    "<condition attribute='tra_shipmanager' operator='eq' value='" +
    id +
    "' />" +
    "</filter>" +
    "<filter>" +
    "<condition attribute='statecode' operator='eq' value='0'/>" +
    "</filter>";
  formContext.getControl("tra_vesselid").addCustomFilter(filter);
}

opportunityMain.OnLoadForm = function() {};

//rensha 22.06.2018
//get Navision Id and IDS Id from MDM
function tra_navisioncustomerid_onchange() {
  if (Xrm.Page.getAttribute("parentaccountid") != null) {
    var CustomerId = Xrm.Page.getAttribute("parentaccountid").getValue()[0].id;
    var CustomerName = Xrm.Page.getAttribute("parentaccountid").getValue()[0].name;
    var CustomerType = Xrm.Page.getAttribute("parentaccountid").getValue()[0].entityType;

    var data = {};

    CustomerId = CustomerId.replace("{", "");
    CustomerId = CustomerId.replace("}", "");
    data.guid = CustomerId;

    url = getTargetUrlPrefix() + getTargetUrlFolder() + "/CustomerMdmAddService/Customer.aspx/GetCustomers_NAV_IDS";

    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
    xhr.onload = function() {
      var fromMDM = JSON.parse(xhr.responseText);
      if (xhr.readyState == 4 && xhr.status == "200") {
        var MDMCollection = JSON.parse(xhr.responseText);

        if (MDMCollection.d.length == 0) {
          Xrm.Page.getAttribute("tra_navisioncustomerid").setValue("");
          Xrm.Page.getAttribute("tra_idscustomerid").setValue("");
        } else {
          var NAV = "";
          var IDS = "";
          for (var i = 0; i < MDMCollection.d.length; i++) {
            var sys = MDMCollection.d[i];
            if (sys.split("|")[0] == "NAV") {
              NAV = sys.split("|")[1];
            } else if (sys.split("|")[0] == "IDS") {
              IDS = sys.split("|")[1];
            }
          }
          Xrm.Page.getAttribute("tra_navisioncustomerid").setValue(NAV);
          Xrm.Page.getAttribute("tra_idscustomerid").setValue(IDS);
        }
      } else {
        console.error("Error:" + xhr.responseText);
      }
    };
    //test
    //xhr.send(JSON.stringify({"guid":"bf2c753c-90c0-e711-80f8-3863bb341a18"}));
    xhr.send(JSON.stringify(data));
  }
}

//andnov 05-07-2018 to collapse tab that was opened by BR - attach on form onload
opportunityMain.collapseTab = function(tabName) {
  try {
    window.parent.Xrm.Page.ui.tabs.get(tabName).setDisplayState("collapsed");
    //console.log("TRA: tab with name: " + tabName + " - was closed");
  } catch (e) {
    console.log(e.message);
  }
};

//05-02-2019 andnov CRM-442
//Adding handler in order when subgrid updates (NEW item in subgrid created) - we can check if needed Product is selected in Product_lines
function addProductLineCheck(executionContext, productNumber) {
  //var productNumber = 'prdln0039'; // remove later
  let formContext = executionContext.getFormContext(); // get the form context
  let gridContext = formContext.getControl("Product_Lines"); // get the grid context
  var checkIfProductExistOnload = function(etcs) {
    //console.log(etcs);
    //console.log("ARTS TRIGGERED: " + productNumber);
    checkIfARTSProductExist(executionContext, productNumber);
    getProductLines(true);
  };
  gridContext.addOnLoad(checkIfProductExistOnload);

  getProductLines(true); //in order to calculate product lines and check their amounts when form loads, i dont remember for what TRUE is passed
  checkIfARTSProductExist(executionContext, productNumber); //in order to check budgets when form loads
}

function checkIfARTSProductExist(executionContext, productNumber) {
  let formContext = executionContext.getFormContext();

  let artsTabObj = formContext.ui.tabs.get("wdt_general");
  let artsSectionObj = artsTabObj.sections.get("wdt_artsdetails");
  //console.log("ARTS checkIfProductExist started with productNumber: " + productNumber);
  //var productNumber = 'prdln0039';
  //console.log("ARTS getting product code ID");
  let oppID =
    formContext.data.entity
      .getId()
      .replace("{", "")
      .replace("}", "") || "00000000-0000-0000-0000-000000000000";

  fillProductDetailsInfo(executionContext);
  //console.log("oppID = " + oppID);
  //var productID = "00000000-0000-0000-0000-000000000000";
  getProductID(productNumber, oppID, function(oppID, productIDARTS) {
    getOpportunityProducts(oppID, productIDARTS, function(recordCount) {
      if (recordCount >= 1) {
        //console.log("TRA: it is ARTS");
        artsSectionObj.setVisible(true);

        formContext.getAttribute("tra_artsemailaddress").setRequiredLevel("required");
        formContext.getAttribute("tra_artsinvoicingperiods").setRequiredLevel("required");
        formContext.getAttribute("tra_artsdiscount").setRequiredLevel("required");
        formContext.getAttribute("wdt_artsfirstname").setRequiredLevel("required");
        formContext.getAttribute("wdt_artslastname").setRequiredLevel("required");
        formContext.getAttribute("originatingleadid").setRequiredLevel("required");
        //console.log("TRA: Set required fields");

        if (formContext.getControl("tra_artsinvoicingperiods") != undefined && formContext.getAttribute("tra_artsinvoicingperiods").getValue() == null) {
          formContext.getAttribute("tra_artsinvoicingperiods").setValue("167490002");
        }

        if (formContext.getControl("tra_artsdiscount") != undefined && formContext.getAttribute("tra_artsdiscount").getValue() == null) {
          formContext.getAttribute("tra_artsdiscount").setValue(0);
        }

        if (
          formContext.getAttribute("tra_artsemailaddress").getValue() == null ||
          formContext.getAttribute("wdt_artsfirstname").getValue() == null ||
          formContext.getAttribute("wdt_artslastname").getValue() == null
        ) {
          let currencyCode = "EUR";
          let currencyEntityType = "transactioncurrency";
          let currentCurrency = formContext.getAttribute("transactioncurrencyid").getValue();
          getCurrencyAttributes(currencyCode, function(currencyID, currencyName) {
            //let instanceType = getInstanceType();
            if (currencyID != undefined && currencyName != undefined && currentCurrency[0].id.toLowerCase() != currencyID) {
              formContext.getAttribute("transactioncurrencyid").setValue([
                {
                  id: currencyID,
                  name: currencyName,
                  entityType: currencyEntityType
                }
              ]);
              formContext.getAttribute("pricelevelid").setValue(null);
              //console.log("TRA: Finished changing currencies")
            }
          });
        }

        //CRM-449 automatically fill  value of $ 1 in the field "Est. revenue" in opportunity for ARTS-product
        if (formContext.getControl("estimatedvalue") != undefined && formContext.getAttribute("estimatedvalue").getValue() != 1) {
          formContext.getAttribute("estimatedvalue").setValue(1);
        }

        recordCount = undefined;
      } else if (recordCount == 0) {
        //console.log("TRA: it is NOT ARTS");
        artsSectionObj.setVisible(false);

        formContext.getAttribute("tra_artsemailaddress").setRequiredLevel("none");
        formContext.getAttribute("tra_artsinvoicingperiods").setRequiredLevel("none");
        formContext.getAttribute("tra_artsdiscount").setRequiredLevel("none");
        formContext.getAttribute("wdt_artsfirstname").setRequiredLevel("none");
        formContext.getAttribute("wdt_artslastname").setRequiredLevel("none");
        formContext.getAttribute("originatingleadid").setRequiredLevel("none");
        recordCount = undefined;
      }
    });
  });
}

function getCurrencyAttributes(currencyCode, callback) {
  let req = new XMLHttpRequest();
  req.open(
    "GET",
    Xrm.Page.context.getClientUrl() + "/api/data/v8.2/transactioncurrencies?$select=currencyname,transactioncurrencyid&$filter=isocurrencycode eq '" + currencyCode + "'",
    true
  );
  req.setRequestHeader("OData-MaxVersion", "4.0");
  req.setRequestHeader("OData-Version", "4.0");
  req.setRequestHeader("Accept", "application/json");
  req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
  req.setRequestHeader("Prefer", 'odata.include-annotations="*"');
  req.onreadystatechange = function() {
    if (this.readyState === 4) {
      req.onreadystatechange = null;
      if (this.status === 200) {
        let results = JSON.parse(this.response);

        let currencyname = results.value[0]["currencyname"];
        let transactioncurrencyid = results.value[0]["transactioncurrencyid"];
        //console.log('currencyCode: ' + currencyCode + ' , currencyname: ' + currencyname + ' , transactioncurrencyid: ' +transactioncurrencyid);
        callback(transactioncurrencyid, currencyname);
      } else {
        console.error(this.statusText);
      }
    }
  };
  req.send();
}

function getProductID(productNumber, oppID, callback) {
  var productid = "00000000-0000-0000-0000-000000000000";
  var req = new XMLHttpRequest();
  req.open("GET", Xrm.Page.context.getClientUrl() + "/api/data/v8.2/products?$select=productid&$filter=productnumber eq '" + productNumber + "'", true);
  req.setRequestHeader("OData-MaxVersion", "4.0");
  req.setRequestHeader("OData-Version", "4.0");
  req.setRequestHeader("Accept", "application/json");
  req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
  req.setRequestHeader("Prefer", 'odata.include-annotations="*"');
  req.onreadystatechange = function() {
    if (this.readyState === 4) {
      req.onreadystatechange = null;
      if (this.status === 200) {
        var results = JSON.parse(this.response);
        for (var i = 0; i < results.value.length; i++) {
          var productid = results.value[i]["productid"];
          //console.log("ARTS productID from XMLHttpRequest: " + productid + "OppID = " + oppID);
          callback(oppID, productid);
        }
      } else {
        console.error(this.statusText);
      }
    }
  };
  req.send();
}

function getOpportunityProducts(oppID, productIDARTS, callback) {
  //productIDARTS = productIDARTS.replace('{', '').replace('}', '');
  //console.log("ARTS getOpportunityProducts oppID = " + oppID);
  //console.log("ARTS getOpportunityProducts productIDARTS = " + productIDARTS);
  var req = new XMLHttpRequest();
  req.open(
    "GET",
    Xrm.Page.context.getClientUrl() +
      "/api/data/v8.2/new_opportunityproductgroups?$select=new_name,_tra_productlineid_value&$filter=_new_opportunityid_value eq " +
      oppID +
      " and  statecode eq 0 and  _tra_productlineid_value eq " +
      productIDARTS +
      "&$count=true",
    true
  );
  req.setRequestHeader("OData-MaxVersion", "4.0");
  req.setRequestHeader("OData-Version", "4.0");
  req.setRequestHeader("Accept", "application/json");
  req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
  req.setRequestHeader("Prefer", 'odata.include-annotations="*"');
  req.onreadystatechange = function() {
    if (this.readyState === 4) {
      req.onreadystatechange = null;
      if (this.status === 200) {
        var results = JSON.parse(this.response);
        var recordCount = results["@odata.count"];
        /*
                for (var i = 0; i < results.value.length; i++) {
                    var new_name = results.value[i]["new_name"];
                    var _tra_productlineid_value = results.value[i]["_tra_productlineid_value"];
                    var _tra_productlineid_value_formatted = results.value[i]["_tra_productlineid_value@OData.Community.Display.V1.FormattedValue"];
                    var _tra_productlineid_value_lookuplogicalname = results.value[i]["_tra_productlineid_value@Microsoft.Dynamics.CRM.lookuplogicalname"];
                } 
                */
        callback(recordCount);
      } else {
        console.error(this.statusText);
      }
    }
  };
  req.send();
}

//getting active product lines of OPP and returning their number
function getProductLines(ExecutionContextObj) {
  oppID = Xrm.Page.data.entity
    .getId()
    .replace("{", "")
    .replace("}", "");
  console.log(oppID);
  var req = new XMLHttpRequest();
  req.open("GET", Xrm.Page.context.getClientUrl() + "/api/data/v8.2/new_opportunityproductgroups?$filter=_new_opportunityid_value eq " + oppID + " and  statecode eq 0", true);
  req.setRequestHeader("OData-MaxVersion", "4.0");
  req.setRequestHeader("OData-Version", "4.0");
  req.setRequestHeader("Accept", "application/json");
  req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
  req.setRequestHeader("Prefer", 'odata.include-annotations="*"');
  var countProductLines = 0;
  req.onreadystatechange = function() {
    if (this.readyState === 4) {
      req.onreadystatechange = null;
      if (this.status === 200) {
        var results = JSON.parse(this.response);
        countProductLines = results.value.length;
        checkProductLinesCount(countProductLines, ExecutionContextObj);
      } else {
        console.log("TRA. getProductLines request failed with:" + this.statusText);
      }
    }
  };
  try {
    req.send();
  } catch (e) {
    console.log(e.message);
  }
}

//check count of Product Lines and display-hide notification - only for specified new_solution
function checkProductLinesCount(countProductLines, ExecutionContextObj) {
  try {
    Xrm.Page.getControl("header_process_tra_isproductlineadded").setDisabled(true);
    //console.log(countProductLines);
    var solutionsToCheck = [1, 2, 4, 5]; //acd=4, fos=5, stc=2, shs=1
    var solutionOfOpportunity = Xrm.Page.getAttribute("new_solutions").getValue(); //get solution on opportunity
    if (countProductLines == 0 && solutionsToCheck.indexOf(solutionOfOpportunity) != -1) {
      Xrm.Page.ui.setFormNotification("Add Products Being Offered", "ERROR", "noproductline");
      //console.log("NOproductline");
      Xrm.Page.getAttribute("tra_isproductlineadded").setValue(false);
    } else {
      //console.log("YESproductline");
      Xrm.Page.ui.clearFormNotification("noproductline");
      Xrm.Page.getAttribute("tra_isproductlineadded").setValue(true);
    }
    if (solutionsToCheck.indexOf(solutionOfOpportunity) == -1) {
      Xrm.Page.getControl("header_process_tra_isproductlineadded").setVisible(false); //hide the step if solution dont require it
    }
  } catch (e) {
    console.error(e);
  }
}

function fillProductDetailsInfo(executionContext) {
  let formContext = executionContext.getFormContext();
  let productDetailsInfoAttribute = formContext.getAttribute("wdt_productdetailsinfo");
  let productDiscount = parseInt(formContext.getAttribute("tra_artsdiscount").getValue(), 10);
  let opportunityID = formContext.data.entity
    .getEntityReference()
    .id.replace("{", "")
    .replace("}", "");
  productDetailsInfoAttribute.setValue("Price for one training, $: " + "\n" + "Price for one training with discount, $: ");
  getTotalPriceOfOfferedProducts(executionContext, opportunityID, function(totalPriceOfOfferedProducts) {
    let discountedPriceOfOfferedProducts = (totalPriceOfOfferedProducts / 100) * (100 - productDiscount);
    productDetailsInfoAttribute.setValue(
      "Price for one training, €: " + totalPriceOfOfferedProducts + "\n" + "Price for one training with discount, €: " + discountedPriceOfOfferedProducts.toFixed(1)
    );
  });
}

function getTotalPriceOfOfferedProducts(executionContext, opportunityID, callback) {
  let listOfOfferedProducts = ["00000000-0000-0000-0000-000000000000"];
  let listOfOfferedProductsString = "";
  let listOfPricesOfOfferedProducts = ["0"];
  let totalPriceOfOfferedProducts = 0;

  Xrm.WebApi.online.retrieveMultipleRecords("new_opportunityproductgroup", "?$select=_tra_productlineid_value&$filter=_new_opportunityid_value eq " + opportunityID + "").then(
    function success(results) {
      for (let i = 0; i < results.entities.length; i++) {
        listOfOfferedProducts[i] = results.entities[i]["_tra_productlineid_value"];
      }
      listOfOfferedProductsString = "['" + listOfOfferedProducts.join("','") + "']";
      Xrm.WebApi.online
        .retrieveMultipleRecords(
          "product",
          "?$select=price&$filter=Microsoft.Dynamics.CRM.In(PropertyName='productid',PropertyValues= " + listOfOfferedProductsString + ") eq true "
        )
        .then(
          function success(results) {
            for (let i = 0; i < results.entities.length; i++) {
              listOfPricesOfOfferedProducts[i] = results.entities[i]["price"];
              totalPriceOfOfferedProducts += listOfPricesOfOfferedProducts[i];
              //var price_formatted = results.entities[i]["price@OData.Community.Display.V1.FormattedValue"];
            }
            callback(totalPriceOfOfferedProducts);
          },
          function(error) {
            console.error(error.message);
          }
        );
    },
    function(error) {
      console.error(error.message);
    }
  );
}

function addBidContractApprovalTabHandler() {
  //check client type
  var clientContext = Xrm.Utility.getGlobalContext().client;
  let isUCIclient = Xrm.Internal.isUci();

  if (clientContext.getClient() == "Web" && !isUCIclient) {
    addEventOpenWindow("wdt_approvalprocesshistorylog", "Approval Process History");
    addEventOpenWindow("wdt_currentapproversnames", "Current Approvers");

    addEventOpenWindow("crm1st_decisionmakercomment_bid", "Decision Maker comment (Bid)");
    addEventOpenWindow("crm1st_financecomment_bid", "Finance Comment (Bid)");
    addEventOpenWindow("crm1st_legalcomment_bid", "Legal Comment (Bid)");
    addEventOpenWindow("crm1st_pmocomment_bid", "PMO Comment (Bid)");

    addEventOpenWindow("crm1st_vpsalescomment_bid", "Sales Executive Comment (Bid)");
    addEventOpenWindow("crm1st_cfocomment_bid", "Fin&Biz Control Comment (Bid)");
    addEventOpenWindow("crm1st_vplegalcomment_bid", "VP Legal Comment (Bid)");
    addEventOpenWindow("tra_vpoperationscomment_bid", "Operational Director Comment (Bid)");

    addEventOpenWindow("crm1st_decisionmakercomment_contract", "Decision Maker Comment (Contract)");
    addEventOpenWindow("crm1st_financecomment_contract", "Finance Comment (Contract)");
    addEventOpenWindow("crm1st_legalcomment_contract", "Legal Comment (Contract)");
    addEventOpenWindow("crm1st_pmocomment_contract", "PMO Comment (Contract)");

    addEventOpenWindow("crm1st_vpsalescomment_contract", "Sales Executive Comment (Contract)");
    addEventOpenWindow("crm1st_cfocomment_contract", "Fin&Biz Control Comment (Contract)");
    addEventOpenWindow("crm1st_vplegalcomment_contract", "VP Legal Comment (Contract)");
    addEventOpenWindow("tra_vpopscomment_contract", "Operational Director Comment (Contract)");
  }
}

function addEventOpenWindow(fieldName, windowName) {
  var elem = document.getElementById(fieldName);

  if (elem == null) elem = parent.document.getElementById(fieldName);

  elem.onclick = function() {
    if (elem != null) {
      var elements = elem.getElementsByTagName("label");
      for (var i = 0; i < elements.length; i++) {
        var label = elements[i];
        var cWindow = window.open("", windowName, "location,width=300,height=300,top=20");
        cWindow.focus();
        cWindow.document.write(label.innerHTML.replace(/\n/g, "<br />"));
      }
    }
  };
}

//25-4-2019 Primary onload
function opportunity_onload(executionContext) {
  let formContext = executionContext.getFormContext();

  statuscode_onchange(executionContext);
  formContext.getAttribute("statuscode").addOnChange(statuscode_onchange);

  disableControlsForBudgetDefinedParameters(executionContext);

  if (formContext.ui.getFormType() === 2 || formContext.ui.getFormType() === 3 || formContext.ui.getFormType() === 4) {
    setVisibilityOfApprovalTab(executionContext);
    addRemoveNotficationOfApprovalRequired(executionContext);
    setVisibilityOfSeviceContractTab(executionContext);
    applyForecastingDependencies(executionContext);

    formContext.getAttribute("new_projecttype").addOnChange(setVisibilityOfSeviceContractTab);
    formContext.getAttribute("new_solutions").addOnChange(setVisibilityOfSeviceContractTab);
  }

  if (formContext.ui.getFormType() === 1 || formContext.ui.getFormType() === 2 || formContext.ui.getFormType() === 3 || formContext.ui.getFormType() === 4) {
    applyForecastingDependencies(executionContext);
    formContext.getAttribute("new_solutions").addOnChange(applyForecastingDependencies);
    formContext.getAttribute("new_projecttype").addOnChange(applyForecastingDependencies);
    formContext.getAttribute("tra_workstationcategory").addOnChange(applyForecastingDependencies);
    formContext.getAttribute("new_actualorderdate").addOnChange(applyForecastingDependencies);
  }

  collapseTab(executionContext, "wdt_administration");
}
//endof Primary onload

//startof Primary onsave
function opportunity_onsave(executionContext) {
  let formContext = executionContext.getFormContext();

  statuscode_onchange(executionContext);
  disableControlsForBudgetDefinedParameters(executionContext);
  if (formContext.ui.getFormType() === 2 || formContext.ui.getFormType() === 3) {
    setTimeout(setVisibilityOfApprovalTab, 500, executionContext);

    addRemoveNotficationOfApprovalRequired(executionContext);
    setVisibilityOfSeviceContractTab(executionContext);
  }

  if (formContext.ui.getFormType() === 1 || formContext.ui.getFormType() === 2 || formContext.ui.getFormType() === 3) {
    applyForecastingDependencies(executionContext);
  }

  collapseTab(executionContext, "wdt_administration");
}

//endof Primary onsave

function statuscode_onchange(executionContext) {
  let formContext = executionContext.getFormContext();
  let orderInformationSection = formContext.ui.tabs.get("wdt_administration").sections.get("Order Information");
  let orderedValueCode = 20;
  let statuscodeSelectedOption = formContext.getAttribute("statuscode").getSelectedOption();
  if (statuscodeSelectedOption != null)  {
  if ( statuscodeSelectedOption.value === orderedValueCode) {
    //formContext.getAttribute("statuscode").getOption(value)
    orderInformationSection.setVisible(true);
  } else {
    orderInformationSection.setVisible(false);
  } }
}

function disableControlsForBudgetDefinedParameters(executionContext) {
  let formContext = executionContext.getFormContext();
  if (formContext.ui.getFormType() == 2) {
    let definedInBudget;
    let oppID = formContext.data.entity
      .getId()
      .replace("{", "")
      .replace("}", "");

    Xrm.WebApi.online.retrieveRecord("opportunity", oppID, "?$select=new_autogenerate_estimatedvalue").then(
      function success(result) {
        definedInBudget = result["new_autogenerate_estimatedvalue@OData.Community.Display.V1.FormattedValue"];
        console.log(definedInBudget);
        if (definedInBudget === "Yes") {
          formContext.getControl("estimatedvalue").setDisabled(true);
          formContext.getControl("header_estimatedvalue").setDisabled(true);
        }
      },

      function(error) {
        Xrm.Utility.alertDialog(error.message);
      }
    );
  }
}

function setVisibilityOfApprovalTab(executionContext) {
  let formContext = executionContext.getFormContext();
  let oppID = formContext.data.entity
    .getId()
    .replace("{", "")
    .replace("}", "");

  /*
contextObj.setDisplayState(state);
Specify "expanded" or "collapsed".

tabObj.getDisplayState();
tabObj.setVisible(bool);
tabObj.getVisible();
formContext.ui.process.setDisplayState('collapsed');

*/

  Xrm.WebApi.online.retrieveRecord("opportunity", oppID, "?$select=tra_isbidapprovalrequired,tra_iscontractapprovalrequired").then(
    function success(result) {
      let tra_isbidapprovalrequired = result["tra_isbidapprovalrequired"];
      let tra_iscontractapprovalrequired = result["tra_iscontractapprovalrequired"];
      let approvalTabObj = formContext.ui.tabs.get("wdt_approvals");
      let approvalTabDisplayState = approvalTabObj.getDisplayState();
      let approvalTabVisibleState = approvalTabObj.getVisible();

      if ((tra_isbidapprovalrequired === 167490001 || tra_iscontractapprovalrequired === 167490001) && "approvalTabVisibleState === false") {
        approvalTabObj.setVisible(true);
        approvalTabObj.setDisplayState("collapsed");
        formContext.getAttribute("wdt_financialsecurityrequiredcode").setRequiredLevel("required");
      } else if ("approvalTabVisibleState === true") {
        approvalTabObj.setVisible(false);
      }
    },
    function(error) {
      Xrm.Utility.alertDialog(error.message);
    }
  );
}

function setVisibilityOfSeviceContractTab(executionContext) {
  let formContext = executionContext.getFormContext();
  let oppID = formContext.data.entity
    .getId()
    .replace("{", "")
    .replace("}", "");

  let serviceContractTabObj = formContext.ui.tabs.get("wdt_servicecontract");
  let serviceContractTabDisplayState = serviceContractTabObj.getDisplayState();
  let serviceContractTabVisibleState = serviceContractTabObj.getVisible();

  Xrm.WebApi.online.retrieveRecord("opportunity", oppID, "?$select=new_projecttype,new_solutions").then(
    function success(result) {
      let new_projecttype = result["new_projecttype"];
      let new_solutions = result["new_solutions"];
      console.log("new_projecttype: " + new_projecttype + "; new_solutions: " + new_solutions);
      /*
        Value: 750610000, Label: TRANSERV
        Value: 750610003, Label: Annual Service Agreement
        Value: 4, Label: SIM
        Value: 5, Label: FOS
        Value: 1, Label: SHS
        Value: 2, Label: STC
*/

      if ([1].includes(new_solutions) && [750610003].includes(new_projecttype)) {
        console.log("Service Contract");
        if (serviceContractTabVisibleState === false) {
          serviceContractTabObj.setVisible(true);
          serviceContractTabObj.setDisplayState("collapsed");
        }
      } else {
        console.log("not Service Contract");
        if (serviceContractTabVisibleState === true) {
          serviceContractTabObj.setVisible(false);
        }
      }
    },
    function(error) {
      Xrm.Utility.alertDialog(error.message);
    }
  );
}

function collapseTab(executionContext, tabName) {
  let formContext = executionContext.getFormContext();

  let tabObj = formContext.ui.tabs.get(tabName);
  let tabDisplayState = tabObj.getDisplayState();
  setTimeout(function() {
    if (tabDisplayState === "expanded") {
      tabObj.setDisplayState("collapsed");
      console.log("WDT: Collapsed tab: " + tabName);
    }
  }, 3000);
}

function addRemoveNotficationOfApprovalRequired(executionContext) {
  let formContext = executionContext.getFormContext();
  let amountToBeApproved = 100000;
  let oppID = formContext.data.entity
    .getId()
    .replace("{", "")
    .replace("}", "");
  Xrm.WebApi.online
    .retrieveRecord("opportunity", oppID, "?$select=estimatedvalue_base,_new_projectmanagerid_value,tra_isbidapprovalrequired,tra_iscontractapprovalrequired,tra_rnd_required")
    .then(
      function success(result) {
        let estimatedvalue_base = result["estimatedvalue_base"];
        let _new_projectmanagerid_value = result["_new_projectmanagerid_value"];
        let tra_isbidapprovalrequired = result["tra_isbidapprovalrequired"];
        let tra_iscontractapprovalrequired = result["tra_iscontractapprovalrequired"];
        let tra_rnd_required = result["tra_rnd_required"];
        if (
          (estimatedvalue_base >= amountToBeApproved || _new_projectmanagerid_value !== null || tra_rnd_required === true) &&
          (tra_isbidapprovalrequired !== 167490001 || tra_iscontractapprovalrequired !== 167490001)
        ) {
          formContext.ui.setFormNotification("Approval may require for this kind of opportunity", "INFO", "approvalmayrequire");
        } else {
          formContext.ui.clearFormNotification("approvalmayrequire");
        }
      },
      function(error) {
        Xrm.Utility.alertDialog(error.message);
      }
    );

  /*
{
    "@odata.context": "https://transasdev.crm4.dynamics.com/api/data/v9.0/$metadata#opportunities(estimatedvalue_base,_new_projectmanagerid_value,tra_isbidapprovalrequired,tra_iscontractapprovalrequired,tra_rnd_required)/$entity",
    "@odata.etag": "W/\"25815783\"",
    "estimatedvalue_base": 100001,
    "_new_projectmanagerid_value": null,
    "tra_isbidapprovalrequired@OData.Community.Display.V1.FormattedValue": "Yes",
    "tra_isbidapprovalrequired": 167490001,
    "tra_iscontractapprovalrequired@OData.Community.Display.V1.FormattedValue": "Yes",
    "tra_iscontractapprovalrequired": 167490001,
    "tra_rnd_required@OData.Community.Display.V1.FormattedValue": "No",
    "tra_rnd_required": false,
    "opportunityid": "8b018781-b1da-e911-a970-000d3ab5a3d0"
}
*/
}

function applyForecastingDependencies(executionContext) {
  console.log("Starting applyForecastingDependencies2");
  console.log(executionContext);
  let formContext = executionContext.getFormContext();

  //input values
  let opportunitySolutionValue = formContext.getAttribute("new_solutions").getValue();
  let opportunityProjectTypeValue = formContext.getAttribute("new_projecttype").getValue();
  let opportunityWorkstationCategoryValue = formContext.getAttribute("tra_workstationcategory").getValue();

  console.log(opportunitySolutionValue + " , " + opportunityProjectTypeValue + " , " + opportunityWorkstationCategoryValue);

  let fosConfig = [];
  let shsConfig = [];
  let defaultConfig = [];

  //affected fields
  let tra_workstationcategoryControl = formContext.getControl("tra_workstationcategory");
  let tra_workstationcategoryAttribute = formContext.getAttribute("tra_workstationcategory");

  let tra_workstationtypeControl = formContext.getControl("tra_workstationtype");
  let tra_workstationtypeAttribute = formContext.getAttribute("tra_workstationtype");

  let new_ecdiswsqtyControl = formContext.getControl("new_ecdiswsqty");
  let new_ecdiswsqtyAttribute = formContext.getAttribute("new_ecdiswsqty");

  let wdt_vesselquantityControl = formContext.getControl("wdt_vesselquantity");
  let wdt_vesselquantityAttribute = formContext.getAttribute("wdt_vesselquantity");

  let wdt_numberofvesselsrollupControl = formContext.getControl("wdt_numberofvesselsrollup");
  let wdt_numberofvesselsrollupAttribute = formContext.getAttribute("wdt_numberofvesselsrollup");

  let tra_asatpackageControl = formContext.getControl("tra_asatpackage");
  let tra_asatpackageAttribute = formContext.getAttribute("tra_asatpackage");

  let tra_subscriptionperiodControl = formContext.getControl("tra_subscriptionperiod");
  let tra_subscriptionperiodAttribute = formContext.getAttribute("tra_subscriptionperiod");

  let wdt_isproofofconceptControl = formContext.getControl("wdt_isproofofconcept");
  let wdt_isproofofconceptAttribute = formContext.getAttribute("wdt_isproofofconcept");

  let new_actualorderdateAttribute = formContext.getAttribute("new_actualorderdate");

  let wdt_firstmonthofrolloutdateControl = formContext.getControl("wdt_firstmonthofrolloutdate");
  let wdt_firstmonthofrolloutdateAttribute = formContext.getAttribute("wdt_firstmonthofrolloutdate");

  let wdt_lastmonthofrolloutdateControl = formContext.getControl("wdt_lastmonthofrolloutdate");
  let wdt_lastmonthofrolloutdateAttribute = formContext.getAttribute("wdt_lastmonthofrolloutdate");

  /*
Solutions
  Value: 4, Label: SIM
  Value: 5, Label: FOS
  Value: 1, Label: SHS
  Value: 2, Label: STC
  Value: 6, Label: RUS
  Value: 8, Label: ADM
  Value: 3, Label: ITS
  Value: 7, Label: OPS
*/
  /*
Project Type
Value: 750610003, Label: Annual Support Agreement
*/
  /*
tra_workstationcategory
tra_workstationtype
new_ecdiswsqty
wdt_vesselquantity
wdt_numberofvesselsrollup - for ASA
tra_asatpackage
tra_subscriptionperiod
*/
  /*
tra_workstationcategory
Value: 167490000, Label: FOS Gold
Value: 167490001, Label: FOS Silver
Value: 167490002, Label: FOS Bronze
Value: 167490003, Label: RADAR
Value: 167490004, Label: ECS
Value: 167490005, Label: WECDIS
Value: 167490020, Label: None
*/

  //FOS
  if (opportunitySolutionValue === 5) {
    console.log("FOS decision tree");

    wdt_isproofofconceptControl.setVisible(true);
    wdt_firstmonthofrolloutdateControl.setVisible(true);
    wdt_firstmonthofrolloutdateAttribute.setRequiredLevel("required");
    wdt_lastmonthofrolloutdateControl.setVisible(true);
    wdt_lastmonthofrolloutdateAttribute.setRequiredLevel("required");
    wdt_vesselquantityControl.setVisible(true);
    wdt_vesselquantityAttribute.setRequiredLevel("required");

    //console.log(wdt_firstmonthofrolloutdateAttribute.getValue());

    if (wdt_firstmonthofrolloutdateAttribute.getValue() === null && new_actualorderdateAttribute.getValue() !== null) {
      let estOrderDateValue = new_actualorderdateAttribute.getValue();
      wdt_firstmonthofrolloutdateAttribute.setValue(estOrderDateValue.setMonth(estOrderDateValue.getMonth() + 3));
    }

    if (opportunityWorkstationCategoryValue === 167490000) {
      tra_workstationcategoryControl.setVisible(true);
      tra_workstationcategoryAttribute.setRequiredLevel("required");
      tra_workstationcategoryControl.setDisabled(false);

      tra_workstationtypeControl.setVisible(true);
      tra_workstationtypeAttribute.setRequiredLevel("required");

      new_ecdiswsqtyControl.setVisible(true);
      new_ecdiswsqtyAttribute.setRequiredLevel("required");

      tra_asatpackageControl.setVisible(true);
      tra_asatpackageAttribute.setRequiredLevel("required");

      tra_subscriptionperiodControl.setVisible(true);
      tra_subscriptionperiodAttribute.setRequiredLevel("required");

      console.log("Finished FOS decision tree in 'FOS Gold' branch");
    } else if (opportunityWorkstationCategoryValue !== 167490000 && opportunityWorkstationCategoryValue !== 167490020) {
      tra_workstationcategoryControl.setVisible(true);
      tra_workstationcategoryAttribute.setRequiredLevel("required");
      tra_workstationcategoryControl.setDisabled(false);

      tra_workstationtypeControl.setVisible(true);
      tra_workstationtypeAttribute.setRequiredLevel("required");

      new_ecdiswsqtyControl.setVisible(true);
      new_ecdiswsqtyAttribute.setRequiredLevel("none");

      tra_asatpackageControl.setVisible(false);
      tra_asatpackageAttribute.setRequiredLevel("none");

      tra_subscriptionperiodControl.setVisible(true);
      tra_subscriptionperiodAttribute.setRequiredLevel("none");

      console.log("Finished FOS decision tree in not 'FOS Gold' OR  'None' branch");
    } else {
      tra_workstationcategoryControl.setVisible(true);
      tra_workstationcategoryAttribute.setRequiredLevel("required");
      tra_workstationcategoryControl.setDisabled(false);

      tra_workstationtypeControl.setVisible(false);
      tra_workstationtypeAttribute.setRequiredLevel("none");

      new_ecdiswsqtyControl.setVisible(false);
      new_ecdiswsqtyAttribute.setRequiredLevel("none");

      tra_asatpackageControl.setVisible(false);
      tra_asatpackageAttribute.setRequiredLevel("none");

      tra_subscriptionperiodControl.setVisible(false);
      tra_subscriptionperiodAttribute.setRequiredLevel("none");

      console.log("Finished FOS decision tree in 'None' branch");
    }
  }

  //SHS
  else if (opportunitySolutionValue === 1) {
    console.log("SHS decision tree");
    wdt_isproofofconceptControl.setVisible(false);

    wdt_firstmonthofrolloutdateControl.setVisible(true);
    wdt_firstmonthofrolloutdateAttribute.setRequiredLevel("required");
    wdt_lastmonthofrolloutdateControl.setVisible(true);
    wdt_lastmonthofrolloutdateAttribute.setRequiredLevel("required");
    wdt_vesselquantityControl.setVisible(true);
    wdt_vesselquantityAttribute.setRequiredLevel("required");

    if (wdt_firstmonthofrolloutdateAttribute.getValue() === null && new_actualorderdateAttribute.getValue() !== null) {
      let estOrderDateValue = new_actualorderdateAttribute.getValue();
      wdt_firstmonthofrolloutdateAttribute.setValue(estOrderDateValue.setMonth(estOrderDateValue.getMonth() + 3));
    }

    //ASA project
    if (opportunityProjectTypeValue === 750610003) {
      tra_workstationcategoryControl.setVisible(true);
      tra_workstationcategoryAttribute.setValue(167490020);
      tra_workstationcategoryAttribute.setRequiredLevel("none");
      tra_workstationcategoryControl.setDisabled(true);

      wdt_vesselquantityAttribute.setRequiredLevel("none");
      wdt_vesselquantityControl.setVisible(false); //Hide default field
      wdt_numberofvesselsrollupControl.setVisible(true); //replace it with rolled up from Opportunity Vessel entity

      tra_workstationtypeControl.setVisible(false);
      tra_workstationtypeAttribute.setRequiredLevel("none");

      new_ecdiswsqtyControl.setVisible(false);
      new_ecdiswsqtyAttribute.setRequiredLevel("none");

      tra_asatpackageControl.setVisible(false);
      tra_asatpackageAttribute.setRequiredLevel("none");

      tra_subscriptionperiodControl.setVisible(false);
      tra_subscriptionperiodAttribute.setRequiredLevel("none");
      console.log("ASA project");
    }
    //Non ASA project
    if (opportunityWorkstationCategoryValue !== 167490020 && opportunityProjectTypeValue !== 750610003) {
      tra_workstationcategoryControl.setVisible(true);
      tra_workstationcategoryControl.setDisabled(false);
      tra_workstationcategoryAttribute.setRequiredLevel("required");

      tra_workstationtypeControl.setVisible(true);
      tra_workstationtypeAttribute.setRequiredLevel("required");

      new_ecdiswsqtyControl.setVisible(true);
      new_ecdiswsqtyAttribute.setRequiredLevel("none");

      tra_asatpackageControl.setVisible(false);
      tra_asatpackageAttribute.setRequiredLevel("none");

      tra_subscriptionperiodControl.setVisible(false);
      tra_subscriptionperiodAttribute.setRequiredLevel("none");
      console.log("Non-ASA project");
    } else if (opportunityWorkstationCategoryValue === 167490020 && opportunityProjectTypeValue !== 750610003) {
      tra_workstationcategoryControl.setVisible(true);
      tra_workstationcategoryControl.setDisabled(false);
      tra_workstationcategoryAttribute.setRequiredLevel("required");

      tra_workstationtypeControl.setVisible(false);
      tra_workstationtypeAttribute.setRequiredLevel("none");

      new_ecdiswsqtyControl.setVisible(false);
      new_ecdiswsqtyAttribute.setRequiredLevel("none");

      tra_asatpackageControl.setVisible(false);
      tra_asatpackageAttribute.setRequiredLevel("none");

      tra_subscriptionperiodControl.setVisible(false);
      tra_subscriptionperiodAttribute.setRequiredLevel("none");
      console.log("else SHS project");
    }
  }

  //Other Solutions
  else {
    //hide disable
    console.log("Default decision tree");

    wdt_firstmonthofrolloutdateControl.setVisible(false);
    wdt_lastmonthofrolloutdateControl.setVisible(false);

    wdt_isproofofconceptControl.setVisible(false);

    tra_workstationcategoryControl.setVisible(false);
    tra_workstationcategoryAttribute.setRequiredLevel("none");

    tra_workstationtypeControl.setVisible(false);
    tra_workstationtypeAttribute.setRequiredLevel("none");

    new_ecdiswsqtyControl.setVisible(false);
    new_ecdiswsqtyAttribute.setRequiredLevel("none");

    wdt_vesselquantityControl.setVisible(false);
    wdt_vesselquantityAttribute.setRequiredLevel("none");

    tra_asatpackageControl.setVisible(false);
    tra_asatpackageAttribute.setRequiredLevel("none");

    tra_subscriptionperiodControl.setVisible(false);
    tra_subscriptionperiodAttribute.setRequiredLevel("none");

    console.log("Hidden: tra_workstationcategory, tra_workstationtype, new_ecdiswsqty, wdt_vesselquantity, tra_asatpackage, tra_subscriptionperiod");
  }
  //formContext = {};
}
