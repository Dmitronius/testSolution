function recalculateUnitCount(executionContext) {
  console.log("Connected");

  let formContext = executionContext.getFormContext();
  let accountProductConfigurationID = formContext
    .getAttribute("wdt_accountproductconfigurationid")
    .getValue()[0]
    .id.replace("{", "")
    .replace("}", "");

  console.log(accountProductConfigurationID);

  setTimeout(executeRecalculate, 1000, accountProductConfigurationID);
}

function executeRecalculate(accountProductConfigurationID) {
  var parameters = {};
  var target = {};
  target.wdt_accountproductconfigurationid = accountProductConfigurationID; //Delete if creating new record
  target["@odata.type"] =
    "Microsoft.Dynamics.CRM.wdt_accountproductconfiguration";
  parameters.Target = target;
  parameters.FieldName = "wdt_numberofunitsincludedrollup";

  let calculateRollupFieldRequest = {
    Target: parameters.Target,
    FieldName: parameters.FieldName,

    getMetadata: function() {
      return {
        boundParameter: null,
        parameterTypes: {
          Target: {
            typeName: "mscrm.crmbaseentity",
            structuralProperty: 5
          },
          FieldName: {
            typeName: "Edm.String",
            structuralProperty: 1
          }
        },
        operationType: 1,
        operationName: "CalculateRollupField"
      };
    }
  };

  Xrm.WebApi.online.execute(calculateRollupFieldRequest).then(
    function success(result) {
      if (result.ok) {
        var results = JSON.parse(result.responseText);
        console.log(results);
      }
    },
    function(error) {
      console.log(error);
      console.log(error.message);
      //Xrm.Utility.alertDialog(error.message);
    }
  );
}

function addTrainingClassApplicationProductPreSearch(executionContext) {
  console.timeStamp("test");
  console.log("!!!!Connected");
  console.time("Connected");

  let formContext = executionContext.getFormContext();
  let apConfigurationID = "00000000-0000-0000-0000-000000000000";
  if (formContext.getControl("wdt_accountproductconfigurationid")) {
    apConfigurationID = formContext
      .getAttribute("wdt_accountproductconfigurationid")
      .getValue()[0]
      .id.replace("{", "")
      .replace("}", "");
  }

  console.log(apConfigurationID);
  getAccountProductIDfromAPConfiguration(apConfigurationID, function(
    accountProductID
  ) {
    console.log(accountProductID);
    getSelectedProductFromAP(accountProductID, function(apProductID) {
      console.log(apProductID);
      getRelatedProductsForAPProduct(apProductID, function(
        relatedProductsIDArr
      ) {
        console.log(relatedProductsIDArr);
        formContext.getControl("wdt_productid").addPreSearch(function() {
          applyFilterForProduct(executionContext, relatedProductsIDArr);
        });
      });
    });
  });

  console.timeEnd("Connected");
}

function getAccountProductIDfromAPConfiguration(apConfigurationID, callback) {
  let req = new XMLHttpRequest();
  req.open(
    "GET",
    Xrm.Page.context.getClientUrl() +
      "/api/data/v9.1/wdt_accountproductconfigurations(" +
      apConfigurationID +
      ")?$select=_wdt_accountproductid_value",
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
        let result = JSON.parse(this.response);
        let _wdt_accountproductid_value = result["_wdt_accountproductid_value"];
        callback(_wdt_accountproductid_value);
      } else {
        //Xrm.Utility.alertDialog(this.statusText);
      }
    }
  };
  req.send();
}

function applyFilterForProduct(executionContext, productIDsArr) {
  let formContext = executionContext.getFormContext();
  let entityName = "product";
  let filterProductIDValues = "";
  productIDsArr.forEach(element => {
    filterProductIDValues += "<value>" + element + "</value>";
  });
  console.log(filterProductIDValues);
  //let filter = '<filter><condition attribute="name" operator="eq" value="ecdis"/></filter>';
  let filter =
    '<filter><condition attribute="productid" operator="in">' +
    filterProductIDValues +
    "</condition></filter>";

  console.log(filter);
  console.log(formContext.getControl("wdt_productid"));
  Xrm.Page.getControl("wdt_productid").addCustomFilter(filter, entityName);
}

function getSelectedProductFromAP(accountProductID, callback) {
  let req = new XMLHttpRequest();
  let result = {};
  let apProductID = "00000000-0000-0000-0000-000000000000";
  req.open(
    "GET",
    Xrm.Page.context.getClientUrl() +
      "/api/data/v8.2/new_accountproducts(" +
      accountProductID +
      ")?$select=_new_productid_value",
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
        result = JSON.parse(this.response);
        apProductID = result["_new_productid_value"];
      } else {
        //Xrm.Utility.alertDialog(this.statusText);
      }
      callback(apProductID);
    }
  };
  req.send();
}

function getRelatedProductsForAPProduct(apProductID, callback) {
//this function is replaced with WFs: 
//AP Aplication. Trigger Recalculation of number of applications on AP Configuration
//AP Configuration.Recalculate Number of Applications

  let req = new XMLHttpRequest();
  let productsubstituteid = ["00000000-0000-0000-0000-000000000000"];
  let productSubstituteTypes = "['750610002']"; // 750610002 - Application, 3- substitute; change to Ctg and Product package\item;
  req.open(
    "GET",
    Xrm.Page.context.getClientUrl() +
      "/api/data/v8.2/productsubstitutes?$select=_substitutedproductid_value&$filter=statecode eq 0 and  _productid_value eq " +
      apProductID +
      " and statecode eq 0 and Microsoft.Dynamics.CRM.In(PropertyName='salesrelationshiptype',PropertyValues=" +
      productSubstituteTypes +
      ") eq true",
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
        for (let i = 0; i < results.value.length; i++) {
          productsubstituteid[i] =
            results.value[i]["_substitutedproductid_value"];
        }
      } else {
        //Xrm.Utility.alertDialog(this.statusText);
      }
      callback(productsubstituteid);
    }
  };
  req.send();
}
