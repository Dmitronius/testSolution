function FillFromField() {
  //debugger;
  var regardingAttr = Xrm.Page.getAttribute("regardingobjectid");
  if (regardingAttr == null) return;

  var regarding = regardingAttr.getValue();

  if (regarding == null || regarding[0]["type"] != 112) return;

  var defaultContactId = getDefaultContactId();

  if (Xrm.Page.ui.getFormType() == 1 || Xrm.Page.ui.getFormType() == 2) {
    var incident = getCase(regarding[0]["id"]);

    //setFrom(userFromId);
    var cosUserId = findFrom(incident);

    checkToAndCc(defaultContactId, cosUserId);

    setTitle(incident["ticketnumber"]);
  }
}

function findFrom(incident) {
  if (incident.hasOwnProperty("_crm1st_centerofservice_value")) {
    var centerOfServiceId = incident["_crm1st_centerofservice_value"];

    if (centerOfServiceId == null)
      return "00000000-0000-0000-0000-000000000000";

    //request center of service
    var cos = getCenterOfService(centerOfServiceId);
    if (cos != null) {
      var customerName =
        cos[
          "_crm1st_serviceuser_value@OData.Community.Display.V1.FormattedValue"
        ];
      console.log("TRA: customerName: " + customerName);
      var customerId = cos["_crm1st_serviceuser_value"];
      console.log("TRA: customerId: " + customerId);
      setFromWithName(customerId, customerName);

      return customerId;
    }
  }
  return "00000000-0000-0000-0000-000000000000";
}

function setFromWithName(userId, userName) {
  Xrm.Page.getAttribute("from").setValue([
    { id: userId, name: userName, entityType: "systemuser" }
  ]);

  // console.log("TRA: crm1st from filled");
  // console.log("TRA: userId: " + userId);
  // console.log("TRA: userName: " + userName);
  // console.log("TRA: From Field:  ");
  // console.log(Xrm.Page.getAttribute("from").getValue());
  Xrm.Page.getAttribute("from").fireOnChange();
  // console.log("TRA: crm1st onchange");
  setSignatureName();
  // console.log("TRA: Fire setSignatureName");
}

function setFrom(userFromId) {
  var serverUrl = Xrm.Page.context.getClientUrl();
  if (userFromId != null) {
    userFromId = userFromId.replace("{", "");
    userFromId = userFromId.replace("}", "");
    serverUrl +=
      "/api/data/v8.2/systemusers(" + userFromId + ")?$select=fullname";
  }

  var req = new XMLHttpRequest();
  req.open("GET", serverUrl, false);
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
        var customerName = result["fullname"];
        setFromWithName(userFromId, customerName);
      }
    }
  };
  try {
    req.send();
  } catch (e) {
    alert(e);
  }
}
/* - deprecated
var voyageSupportEmail ="voyage.support@wartsila.com";
var dataSupportEmail ="data.support@wartsila.com";
var isailorSupportEmail = "isailor.support@wartsila.com";
var serviceSupportEmail = "service@transas.com";
var chartsSupportEmail = "charts@transas.com";
var oldIsailorSupportEmail = "support@isailor.us";
*/

function checkToAndCc(defaultContactId, cosUserId) {
  defaultContactId = defaultContactId.toLowerCase();
  cosUserId = cosUserId.toLowerCase();
  //need to move that to CoS settings
  let emailsToIgnore = [];
  emailsToIgnore = [
    "fleet.support@wartsila.com",
    "wv.product.orders@wartsila.com",
    "wv.product.purchasing@wartsila.com",
    "wv.product.rma@wartsila.com",
    "data.support@wartsila.com",
    "voyage.support@wartsila.com",
    "isailor.support@wartsila.com",
    "pilotpro.support@wartsila.com",
    "service@transas.com",
    "charts@transas.com",
    "support@isailor.us",
    "wdt.inetsite.services@wartsila.com",
    "# crm.eti.wv.data.support",
    "# crm.eti.wv.support"
  ];
  console.log("TRA: emailsToIgnore: " + emailsToIgnore);
  //console.log(emailsToIgnore);

  //"To" part
  var currentTo = Xrm.Page.getAttribute("to").getValue();

  if (currentTo != null && currentTo != undefined) {
    var to = [];

    for (let i = 0; i < currentTo.length; i++) {
      var currentToId = currentTo[i]["id"]
        .replace("{", "")
        .replace("}", "")
        .toLowerCase();
      var currentToName = currentTo[i]["name"].toLowerCase();
      console.log("TRA. currentToName: " + currentToName);
      var isForbiddenEmail = false;

      if (emailsToIgnore.indexOf(currentToName) != -1) {
        console.log(
          "TRA: Email Address: " + currentToName + " is in emailsToIgnore list"
        );
        isForbiddenEmail = true;
      } else {
        console.log(
          "TRA: Email Address: " +
            currentToName +
            " is NOT in emailsToIgnore list"
        );
        isForbiddenEmail = false;
      }

      if (
        currentToId !== defaultContactId &&
        currentToId !== cosUserId &&
        isForbiddenEmail !== true
      ) {
        to.push(currentTo[i]);
        console.log("TRA. filling To with: " + currentToName);
      }
    }
    if (to.length === 0) Xrm.Page.getAttribute("to").setValue("");
    else Xrm.Page.getAttribute("to").setValue(to);
  }
  //endof "To" part

  //"Cc" Part
  var currentCc = Xrm.Page.getAttribute("cc").getValue();
  if (currentCc != null && currentCc != undefined) {
    var cc = [];
    for (let i = 0; i < currentCc.length; i++) {
      var currentCcId = currentCc[i]["id"]
        .replace("{", "")
        .replace("}", "")
        .toLowerCase();

      var currentCcName = currentCc[i]["name"].toLowerCase();
      console.log("TRA. currentCcName: " + currentCcName);
      var isForbiddenEmail = false;

      if (emailsToIgnore.indexOf(currentCcName) != -1) {
        console.log(
          "TRA: Email Address: " + currentCcName + " is in emailsToIgnore list"
        );
        isForbiddenEmail = true;
      } else {
        console.log(
          "TRA: Email Address: " +
            currentCcName +
            " is NOT in emailsToIgnore list"
        );
        isForbiddenEmail = false;
      }

      if (
        currentCcId !== defaultContactId &&
        currentCcId !== cosUserId &&
        isForbiddenEmail !== true
      ) {
        cc.push(currentCc[i]);
      }
    }

    if (cc.length == 0) Xrm.Page.getAttribute("cc").setValue("");
    else Xrm.Page.getAttribute("cc").setValue(cc);
  }
  //endof "Cc" part
}

function setTitle(caseNumber) {
  var maxTitleLength = 150;
  try {
    var subject = Xrm.Page.getAttribute("subject").getValue();

    if (subject == null) {
      //subject = "Regarding case: " + caseNumber; //26-04-2017 andnov
      subject = "Ticket: " + caseNumber + " ";
    } else {
      //cut the previous case number(s) from subject
      var regex = /CAS-\d{4,6}-[A-Z0-9]{4}/gi;
      var regex2 = /Regarding case: CAS-\d{4,6}-[A-Z0-9]{4}/gi;
      var regex3 = /Ticket Number: CAS-\d{4,6}-[A-Z0-9]{4}/gi;
      var regex4 = /Ticket: CAS-\d{4,6}-[A-Z0-9]{4} /gi; //26-04-2017 andnov
      var regex5 = /RE: /gi; //26-04-2017 andnov
      const regex6 = /Ticket:/gi;
      const regex7 = /\s\s+/g;
      if (subject.match(regex6))
        //26-04-2017 andnov
        subject = subject.replace(regex6, ""); //26-04-2017 andnov
      if (subject.match(regex5))
        //26-04-2017 andnov
        subject = subject.replace(regex5, ""); //26-04-2017 andnov
      if (subject.match(regex4))
        //26-04-2017 andnov
        subject = subject.replace(regex4, ""); //26-04-2017 andnov
      if (subject.match(regex3)) subject = subject.replace(regex3, " ");
      if (subject.match(regex2)) subject = subject.replace(regex2, " ");
      if (subject.match(regex)) subject = subject.replace(regex, " ");
      subject = subject.replace(regex7, " ");

      //set the actual case number
      subject = subject.substr(0, maxTitleLength);
      //subject = subject + " Regarding case: " + caseNumber; //26-04-2017 andnov
      subject = "RE: " + "Ticket: " + caseNumber + " " + subject; //26-04-2017 andnov
      subject = subject.trim();
    }

    Xrm.Page.getAttribute("subject").setValue(subject);
  } catch (e) {
    alert(e);
  }
}

function setSignatureName() {
  if (Xrm.Page.getControl("description")) {
    var emailBody = Xrm.Page.getAttribute("description").getValue();
    var regex = /{transas_username}/i;
    var userName = Xrm.Page.context.getUserName();
    if (emailBody && emailBody.match(regex)) {
      Xrm.Page.data.entity.save();
      emailBody = Xrm.Page.getAttribute("description").getValue();
      console.log("TRA: Tag found ", userName);
      emailBody = emailBody.replace(regex, userName);
      Xrm.Page.getAttribute("description").setValue(emailBody);
      Xrm.Page.data.entity.save();
      console.log("TRA: From Field:  ");
      console.log(Xrm.Page.getAttribute("from").getValue());
    } else {
      console.log("TRA: No {transas_username} tag found ");
      console.log("TRA: From Field:  ");
      console.log(Xrm.Page.getAttribute("from").getValue());
    }
  }
}

function getCase(caseId) {
  var serverUrl = Xrm.Page.context.getClientUrl();
  if (caseId != null) {
    caseId = caseId.replace("{", "");
    caseId = caseId.replace("}", "");
    serverUrl += "/api/data/v8.2/incidents(" + caseId + ")?$select=*";
  }

  var req = new XMLHttpRequest();
  req.open("GET", serverUrl, false);
  req.setRequestHeader("OData-MaxVersion", "4.0");
  req.setRequestHeader("OData-Version", "4.0");
  req.setRequestHeader("Accept", "application/json");
  req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
  req.setRequestHeader(
    "Prefer",
    'odata.include-annotations="OData.Community.Display.V1.FormattedValue"'
  );

  var returnValue;
  req.onreadystatechange = function() {
    if (this.readyState === 4) {
      req.onreadystatechange = null;
      if (this.status === 200) {
        var result = JSON.parse(this.response);
        returnValue = result;
      }
    }
  };
  try {
    req.send();
  } catch (e) {
    alert(e);
  }

  return returnValue;
}

function getCenterOfService(centerOfServiceId) {
  var req = new XMLHttpRequest();
  req.open(
    "GET",
    Xrm.Page.context.getClientUrl() +
      "/api/data/v8.2/crm1st_centerofservices(" +
      centerOfServiceId +
      ")?$select=*",
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

  var returnValue = null;
  req.onreadystatechange = function() {
    if (this.readyState === 4) {
      req.onreadystatechange = null;
      if (this.status === 200) {
        var result = JSON.parse(this.response);
        returnValue = result;
      }
    }
  };
  try {
    req.send();
  } catch (e) {
    alert(e);
  }

  return returnValue;
}

function getDefaultContactId() {
  var defaultContactName = "Default SupportContact";
  var req = new XMLHttpRequest();
  req.open(
    "GET",
    Xrm.Page.context.getClientUrl() +
      "/api/data/v8.2/contacts()?$select=contactid&$filter=fullname eq '" +
      defaultContactName +
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

  var returnValue = "00000000-0000-0000-0000-000000000000";
  req.onreadystatechange = function() {
    if (this.readyState === 4) {
      req.onreadystatechange = null;
      if (this.status === 200) {
        var result = JSON.parse(this.response);
        if (result != null && result.value != null && result.value.length > 0)
          returnValue = result.value[0]["contactid"];
      }
    }
  };
  try {
    req.send();
  } catch (e) {
    alert(e);
  }

  return returnValue;
}

function updateCaseNumberInSubject(executionContext) {
  let formContext = executionContext.getFormContext();
  if (formContext.ui.getFormType() == 1 || formContext.ui.getFormType() == 2) {
    let regardingAttribute = formContext.getAttribute("regardingobjectid");
    if (regardingAttribute == null) {
      return;
    }

    let regardingValue = regardingAttribute.getValue();
    if (regardingValue == null || regardingValue[0]["type"] != 112) {
      return;
    }

    let incident = getCase(regardingValue[0]["id"]);
    let incidentNumber = incident["ticketnumber"];

    let isIncludeCaseNumber = formContext
      .getAttribute("wdt_isincludecasenumber")
      .getValue();
    console.log(isIncludeCaseNumber);
    if (isIncludeCaseNumber) {
      setTitle(incidentNumber);
    } else if (!isIncludeCaseNumber) {
      setTitle("");
    }
  }
}
