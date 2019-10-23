/* helper functions */

function _getAttribute(value) {
  return Xrm.Page.getAttribute(value);
}

function _getAttributeValue(value) {
  return _getAttribute(value) ? _getAttribute(value).getValue() : "";
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
  if (elem.removeEventListener)
    elem.removeEventListener(eventType, handler, false);
  else if (elem.detachEvent) elem.detachEvent("on" + eventType, handler);
}

//for basic forms
function _setDefaultCenterOfService() {
  var defaultCoSName = "Service";
  var req = new XMLHttpRequest();
  req.open(
    "GET",
    Xrm.Page.context.getClientUrl() +
      "/api/data/v8.2/crm1st_centerofservices()?$select=*&$filter=crm1st_name eq '" +
      defaultCoSName +
      "'",
    false
  );
  req.setRequestHeader("OData-MaxVersion", "4.0");
  req.setRequestHeader("OData-Version", "4.0");
  req.setRequestHeader("Accept", "application/json");
  req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
  req.setRequestHeader(
    "Prefer",
    'odata.include-annotations="OData.Community.Display.V1.FormattedValue"'
  );

  req.onreadystatechange = function() {
    if (this.readyState === 4) {
      req.onreadystatechange = null;
      if (this.status === 200) {
        var result = JSON.parse(this.response);
        if (result.value.length > 0) {
          var cos = result.value[0];
          _getAttribute("crm1st_centerofservice").setValue([
            {
              id: cos["crm1st_centerofserviceid"],
              name: defaultCoSName,
              entityType: "crm1st_centerofservice"
            }
          ]);
        }
      }
    }
  };
  try {
    req.send();
  } catch (e) {
    alert(e);
  }
}

//for quick create form
function setDefaultCenterOfService(executionContext) {
  let formContext = executionContext.getFormContext();
  var defaultCoSName = "Service";
  var req = new XMLHttpRequest();
  req.open(
    "GET",
    Xrm.Page.context.getClientUrl() +
      "/api/data/v8.2/crm1st_centerofservices()?$select=*&$filter=crm1st_name eq '" +
      defaultCoSName +
      "'",
    false
  );
  req.setRequestHeader("OData-MaxVersion", "4.0");
  req.setRequestHeader("OData-Version", "4.0");
  req.setRequestHeader("Accept", "application/json");
  req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
  req.setRequestHeader(
    "Prefer",
    'odata.include-annotations="OData.Community.Display.V1.FormattedValue"'
  );

  req.onreadystatechange = function() {
    if (this.readyState === 4) {
      req.onreadystatechange = null;
      if (this.status === 200) {
        var result = JSON.parse(this.response);
        if (result.value.length > 0) {
          var cos = result.value[0];
          formContext.getAttribute("crm1st_centerofservice").setValue([
            {
              id: cos["crm1st_centerofserviceid"],
              name: defaultCoSName,
              entityType: "crm1st_centerofservice"
            }
          ]);
        }
      }
    }
  };
  try {
    req.send();
  } catch (e) {
    alert(e);
  }
}

/* helper functions */

if (typeof incidentMain == "undefined") incidentMain = new Object();

incidentMain.OnLoadForm = function() {
  //debugger;
  try {
    // Xrm.Page.getAttribute("customerid").setLookupTypes(["account"]); //commented due to IT-34669
    var isCreateForm = Xrm.Page.ui.getFormType() == 1;
    //var s = "Customer:\nPO number:\nSpares used, Item.nr/serial.nr/price:\n\n\nQuotation:\n\n\nAdditional info:";
    var s = ""; //andnov 20-08-2018 dont know who needs this default text, so will comment it for now
    // Only enable the dynamic picklist on a Create or Update form.  Disabled and
    // read-only forms are not editable and so do not require dynamic picklists.
    if (isCreateForm) _getAttribute("new_casehistory").setValue(s);

    //incidentMain.onChange_new_firsttimefix();
    // more custom code
    var cos = Xrm.Page.getAttribute("crm1st_centerofservice").getValue();
    if (cos === null) {
      _setDefaultCenterOfService();
    }
  } catch (e) {
    console.log(e.message);
  }
};

// incidentMain.OnSaveForm = function () {
//     try {
//         // more custom code
//     }
//     catch (e) {
//         console.log(e.message);
//     }
// };

incidentMain.onChange_subjectid = function() {
  /*
        //debugger;
        // try {
            // field "isalldayevent" onchange
    
            // Get the Industry Element, since this code is re-used by the form's onload event
            // we can not rely on the event.srcElement to have the approriate element.
            var oIndustry = _getAttributeValue('subjectid');
    
            // Initialize the Sub-Industry indexes
            var iStartIndex = -1;
            var iEndIndex = -1;
    
            // Depending on what the user selects in the Industry picklist, we will select
            // a range of options in the Sub-Industry picklist to display.
            //
            // For the purposes of this sample, it is assumed that the display text of each
            // Industry will be known and will not be localized.  We have also ordered the
            // options in the Sub-Industry picklist so that they are group sequentially per
            // Industry.  This allows the code to simply define start and stop Sub-Industry
            // indexes for each Industry.
            switch (oIndustry[0].name) {
                case "Navi-Trainer":
                    iStartIndex = 1;
                    iEndIndex = 3;
                    break;
            }
    
            // Get a reference to the Sub-Industry picklist element for later use        
            var oSubIndustry = _getAttribute('new_additionalsubject');
            // If the indexes where set, update the Sub-Industry picklist
            if (iStartIndex > -1 && iEndIndex > -1) {
                // Create a new array, which will hold the new picklist options
                var oTempArray = new Array();
    
                // Initialize the index for the temp array
                var iIndex = 0;
    
                // Now loop through the original Sub-Industry options, pull out the
                // requested options a copy them into the temporary array.
                for (var i = iStartIndex; i <= iEndIndex; i++) {
                    //oTempArray[iIndex] = oSubIndustry.originalPicklistOptions[i];
                    oTempArray[iIndex] = oSubIndustry.getOptions()[i];
                    iIndex++;
                }
    
                // Reset the Sub-Industry picklist with the new options
                oSubIndustry.clearOptions();
                for (var i = iStartIndex; i <= iEndIndex; i++)
                    oSubIndustry.addOption(oTempArray[i], i);
    
                // Enable the Sub-Industry picklist for the user
                //oSubIndustry.Disabled = false;
                _setDisabled('new_additionalsubject', false);
            }
            else {
                // The user has selected an unsupported Industry or no Industry
                //oSubIndustry.DataValue = null;
                //oSubIndustry.Disabled = true;
                oSubIndustry.setValue('');
                _setDisabled('new_additionalsubject', true);
            }
    
            // more custom code
        // }
        // catch (e) {
        //     console.log(e.message);
        // }
        */
};

/*
incidentMain.onChange_new_firsttimefix = function () {
    // try {
        // field "new_firsttimefix" onchange

        var newCause = _getAttribute('new_cause');
        var newFirstTimeFixValue = _getAttributeValue('new_firsttimefix');

        if (newFirstTimeFixValue) {
            //hide the lookup
            _setVisible('new_cause_c', false);
            _setVisible('new_cause_d', false);
            newCause.setRequiredLevel(false); //not Required
        }
        else {
            //show the lookup
            _setVisible('new_cause_c', true);
            _setVisible('new_cause_d', true);
            newCause.setRequiredLevel(true); //Required
        }

        // more custom code
    // }
    // catch (e) {
    //     console.log(e.message);
    // }
};
*/

incidentMain.onChange_new_servicelevel = function() {
  // try {
  //     // field "new_servicelevel" onchange
  //     // more custom code
  // }
  // catch (e) {
  //     console.log(e.message);
  // }
};
incidentMain.onChange_customerid = function() {
  if (Xrm.Page.getAttribute("customerid") != null) {
    if (Xrm.Page.getAttribute("customerid").getIsDirty()) {
      Xrm.Page.getAttribute("new_vessel").setValue(null);
    }
  }
};

//andnov 31-05-2018 Collapse business process bar on case when opening a case on small resolution screen
function collapseProcessBar(executionContext, heightValue) {
  let formContext = executionContext.getFormContext();
  let activeProcess = formContext.data.process.getActiveProcess();
  if (activeProcess) {
    if (
      screen.height < heightValue &&
      formContext.context.client.getClient() == "Web"
    ) {
      formContext.ui.process.setDisplayState("collapsed");
    }
  }
}

//for some broken Case forms that cant be imported correctly
incidentMain.collapseProcessBar = function() {};

//andnov 07-06-2018 to collapse tab that was opened by BR - attach on form onload
incidentMain.collapseTab = function(tabName) {
  try {
    window.parent.Xrm.Page.ui.tabs.get(tabName).setDisplayState("collapsed");
    console.log("TRA: tab with name: " + tabName + " - was closed");
  } catch (e) {
    console.log(e.message);
  }
};

//andnov 07-09-2018 Hide-show Kpi timers on form if no corresponding SLA KPI Instance found
function enableKPITimer(timerArr) {
  if (timerArr == undefined) {
    console.error("TRA. Error: timerArr should be filled in form properties");
  } else {
    for (var i = 0; i < timerArr.length; i++) {
      Xrm.Page.getControl(timerArr[i].timerName).setVisible(false);
      console.log("Hiding: ", timerArr[i].timerName);
    }

    var caseID = Xrm.Page.data.entity
      .getId()
      .replace("{", "")
      .replace("}", "");

    getSLAKPIInstance(caseID, function(results) {
      for (var i = 0; i < results.value.length; i++) {
        for (var j = 0; j < timerArr.length; j++) {
          if (
            results.value[i]["name"] == timerArr[j].kpiName &&
            results.value[i]["name"] != undefined
          ) {
            //console.log ("Bingo "+j);
            if (
              results.value[i]["status"] != 5 &&
              results.value[i]["status"] != undefined &&
              results.value[i]["status"] != null
            ) {
              Xrm.Page.getControl(timerArr[j].timerName).setVisible(true);
              console.log("Showing: ", timerArr[j].timerName);
            }
          }
        }
      }
    });
  }
}

function getSLAKPIInstance(caseID, callback) {
  var req = new XMLHttpRequest();
  req.open(
    "GET",
    Xrm.Page.context.getClientUrl() +
      "/api/data/v8.2/slakpiinstances?$select=name,status&$filter=_regarding_value eq " +
      caseID +
      "",
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
        //console.log(results);
        callback(results);
      } else {
        console.error(this.statusText);
      }
    }
  };
  req.send();
}

//andnov 17-10-2018 to check if customer\contact has FOS Gold Vessels etc
function checkPriorityClient(params) {
  if (
    Xrm.Page.ui.getFormType() == 2 &&
    Xrm.Page.getControl("customerid") != undefined
  ) {
    var customerObj = Xrm.Page.getAttribute("customerid").getValue();
    console.log(customerObj[0].entityType);
    console.log(customerObj[0].id.replace("{", "").replace("}", ""));
    var customerType = customerObj[0].entityType;
    var customerID = customerObj[0].id.replace("{", "").replace("}", "");
    if (customerType == "account" && customerType != undefined) {
      console.log("TRA. customer is Account");
      //try to find FOS Vessels
      getAccountFosVessels(customerID, function(fosTypeCount) {
        if (fosTypeCount > 0 && fosTypeCount != undefined) {
          Xrm.Page.ui.setFormNotification(
            "This customer has Vessels with FOS Gold",
            "WARNING",
            "fosTypeVessels"
          );
        }
      });

      //Try to find Level1 Entitlements
      getAccountFosEntitlements(customerID, function(fosEntitlementCount) {
        if (fosEntitlementCount > 0 && fosEntitlementCount != undefined) {
          Xrm.Page.ui.setFormNotification(
            "This customer has Entitlements with FOS Gold and Level 1 SLA",
            "WARNING",
            "fosEntitlements"
          );
        }
      });
    } else if (customerType == "contact" && customerType != undefined) {
      console.log("TRA. customer is Contact");
      getContactFosVessels(customerID, function(fosTypeCount) {
        if (fosTypeCount > 0 && fosTypeCount != undefined) {
          Xrm.Page.ui.setFormNotification(
            "This customer has Vessels with FOS Gold",
            "WARNING",
            "fosTypeVessels"
          );
        }
      });

      getContactAccountFosVessels(customerID, function(fosTypeCount) {
        if (fosTypeCount > 0 && fosTypeCount != undefined) {
          Xrm.Page.ui.setFormNotification(
            "This customer has Vessels with FOS Gold",
            "WARNING",
            "fosTypeVessels"
          );
        }
      });

      getContactAccountFosEntitlements(customerID, function(
        fosEntitlementCount
      ) {
        if (fosEntitlementCount > 0 && fosEntitlementCount != undefined) {
          Xrm.Page.ui.setFormNotification(
            "This customer has Entitlements with FOS Gold",
            "WARNING",
            "fosEntitlements"
          );
        }
      });
    }
  }
}

//searching Vessels with Fostype=Gold of this customer
function getAccountFosVessels(accountID, callback) {
  var req = new XMLHttpRequest();
  req.open(
    "GET",
    Xrm.Page.context.getClientUrl() +
      "/api/data/v8.2/new_vesselses?$select=new_imo,new_name,tra_fostypecode&$filter=tra_fostypecode eq 167490000 and ( _tra_shipmanager_value eq " +
      accountID +
      " or  _new_parentaccount_value eq " +
      accountID +
      ") and  statecode eq 0&$count=true",
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
                    var new_imo = results.value[i]["new_imo"];
                    var new_name = results.value[i]["new_name"];
                    var tra_fostypecode = results.value[i]["tra_fostypecode"];
                    var tra_fostypecode_formatted = results.value[i]["tra_fostypecode@OData.Community.Display.V1.FormattedValue"];
                }
                */
        console.log("TRA. getAccountFosVessels record count = " + recordCount);
        callback(recordCount);
      } else {
        console.error(
          "TRA.getAccountFosVessels failed with error: " + this.statusText
        );
      }
    }
  };
  req.send();
}

//searching Active Entitlements of Customer with Level1 SLA: 2512C2E3-294A-E811-8121-5065F38B74A1
function getAccountFosEntitlements(accountID, callback) {
  var req = new XMLHttpRequest();
  req.open(
    "GET",
    Xrm.Page.context.getClientUrl() +
      "/api/data/v8.2/entitlements?$select=_customerid_value,_slaid_value,_tra_vesselid_value&$filter=_customerid_value eq " +
      accountID +
      " and  statecode eq 1 and  _slaid_value eq 2512C2E3-294A-E811-8121-5065F38B74A1&$count=true",
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
                    var _customerid_value = results.value[i]["_customerid_value"];
                    var _customerid_value_formatted = results.value[i]["_customerid_value@OData.Community.Display.V1.FormattedValue"];
                    var _customerid_value_lookuplogicalname = results.value[i]["_customerid_value@Microsoft.Dynamics.CRM.lookuplogicalname"];
                    var _slaid_value = results.value[i]["_slaid_value"];
                    var _slaid_value_formatted = results.value[i]["_slaid_value@OData.Community.Display.V1.FormattedValue"];
                    var _slaid_value_lookuplogicalname = results.value[i]["_slaid_value@Microsoft.Dynamics.CRM.lookuplogicalname"];
                    var _tra_vesselid_value = results.value[i]["_tra_vesselid_value"];
                    var _tra_vesselid_value_formatted = results.value[i]["_tra_vesselid_value@OData.Community.Display.V1.FormattedValue"];
                    var _tra_vesselid_value_lookuplogicalname = results.value[i]["_tra_vesselid_value@Microsoft.Dynamics.CRM.lookuplogicalname"];
                }
                */
        callback(recordCount);
      } else {
        console.error(
          "TRA.getAccountFosEntitlements failed with error: " + this.statusText
        );
      }
    }
  };
  req.send();
}

function getContactFosVessels() {}

function getContactAccountFosVessels() {}

function getContactAccountFosEntitlements() {}

function showNotificationForSpecialInstallation(executionContext) {
  let formContext = executionContext.getFormContext();
  let messageText =
    'Selected vessel is marked as "Special Installation" - for more information see Vessel\'s document section';
  let messageID = "isSpecialInstallation";

  let vessel = formContext.getAttribute("new_vessel").getValue();
  if (vessel != undefined && formContext.ui.getFormType() == 2) {
    let vesselID = vessel[0].id.replace("{", "").replace("}", "");
    getVesselisSpecialInstallationAttribute(vesselID, function(
      isSpecialInstallation
    ) {
      if (isSpecialInstallation) {
        formContext.ui.setFormNotification(messageText, "WARNING", messageID);
      } else {
        formContext.ui.clearFormNotification(messageID);
      }
    });
  } else {
    formContext.ui.clearFormNotification(messageID);
  }
}

function getVesselisSpecialInstallationAttribute(vesselID, callback) {
  let isSpecialInstallation = false;
  var req = new XMLHttpRequest();
  req.open(
    "GET",
    Xrm.Page.context.getClientUrl() +
      "/api/data/v8.2/new_vesselses(" +
      vesselID +
      ")?$select=wdt_isspecialinstallation",
    true
  );
  req.setRequestHeader("OData-MaxVersion", "4.0");
  req.setRequestHeader("OData-Version", "4.0");
  req.setRequestHeader("Accept", "application/json");
  req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
  req.onreadystatechange = function() {
    if (this.readyState === 4) {
      req.onreadystatechange = null;
      if (this.status === 200) {
        let result = JSON.parse(this.response);
        isSpecialInstallation = result["wdt_isspecialinstallation"];
      } else {
        console.error(
          "TRA. getVesselisSpecialInstallationAttribute request failed with:" +
            this.statusText
        );
      }
      callback(isSpecialInstallation);
    }
  };
  req.send();
}

function getIsWorkedByFilledInQueueItems(executionContext) {
  // let formContext = executionContext.getFormContext();
  // let caseId = formContext.data.entity
  //   .getId()
  //   .replace("{", "")
  //   .replace("}", "");
  // Xrm.WebApi.online
  //   .retrieveMultipleRecords(
  //     "queueitem",
  //     "?$filter=_objectid_value eq " +
  //       caseId +
  //       " and  _workerid_value ne null and  statecode eq 0"
  //   )
  //   .then(
  //     function success(results) {
  //       if (results.entities.length > 0) {
  //         formContext.getControl("header_statuscode").setDisabled(false);
  //       } else if (
  //         formContext.getAttribute("crm1st_queue").getValue()[0].name ===
  //           "Digital Data Support Specialists" ||
  //         formContext.getAttribute("crm1st_queue").getValue()[0].name ===
  //           "Digital Data Support 24/7"
  //       ) {
  //         formContext.getControl("header_statuscode").setDisabled(true); // switched of by request of Florian Hoffman \ Violetta Blatz 22-05-2019
  //       }
  //     },
  //     function(error) {
  //       Xrm.Utility.alertDialog(error.message);
  //     }
  //   );
}

function incidentOnLoadMain(executionContext) {
  let formContext = executionContext.getFormContext();
  resetUnreadFlag(executionContext);
}

function resetUnreadFlag(executionContext) {
  let formContext = executionContext.getFormContext();
  if (formContext.ui.getFormType() == 2) {
    let caseID = formContext.data.entity
      .getId()
      .replace("{", "")
      .replace("}", "");
    var entity = {};
    entity.wdt_isunreadupdates = false;

    Xrm.WebApi.online.updateRecord("incident", caseID, entity).then(
      function success(result) {
        console.log("Unread Flag dropped");
      },
      function(error) {
        Xrm.Utility.alertDialog(error.message);
      }
    );
  }
}
