function createAccountProductFromOpportunity(primaryControl) {
  console.log(primaryControl);
  let formContext;
  let isUCIclient = Xrm.Internal.isUci();

  if (isUCIclient) {
    formContext = primaryControl;
  } else if (!isUCIclient) {
    formContext = primaryControl.getFormContext();
  } else {
    console.error("WDT: Couldnt get UCI Client Type");
  }

  let customerObject = formContext
    .getControl("parentaccountid")
    .getAttribute()
    .getValue()[0];
  console.log(
    "Customer: " +
      customerObject.id +
      " " +
      customerObject.entityType +
      " " +
      customerObject.name
  );

  let opportunityObject = formContext.data.entity.getEntityReference();
  console.log(
    "Opportunity: " +
      opportunityObject.id +
      " " +
      opportunityObject.entityType +
      " " +
      opportunityObject.name
  );
  //formContext.data.entity.getEntityName();
  let solutionCode = formContext
    .getAttribute("tra_solutionglobalcode")
    .getSelectedOption()["value"];

  let vesselObject = {};
  if (
    formContext.getControl("tra_vesselid") &&
    formContext.getAttribute("tra_vesselid").getValue()
  ) {
    vesselObject = formContext
      .getControl("tra_vesselid")
      .getAttribute()
      .getValue()[0];
    console.log(
      "Vessel: " +
        vesselObject.id +
        " " +
        vesselObject.entityType +
        " " +
        vesselObject.name
    );
  }

  // Define form to open
  let entityFormOptions = {};
  entityFormOptions["entityName"] = "new_accountproduct";
  //entityFormOptions["formId"] = "%FORM_GUID%";
  entityFormOptions["useQuickCreateForm"] = true;

  //Define prefilled parameters
  let parameters = {};

  //Solution
  parameters["tra_solutioncode"] = solutionCode;

  //Account
  if (customerObject.entityType === "account") {
  parameters["new_accountid"] = customerObject.id;
  parameters["new_accountidname"] = customerObject.name;
  }

  //Opportunity
  parameters["new_opportunityid"] = opportunityObject.id;
  parameters["new_opportunityidname"] = opportunityObject.name;

  //Vessel
  if (vesselObject.id && vesselObject.name) {
    parameters["new_vesselid"] = vesselObject.id;
    parameters["new_vesselidname"] = vesselObject.name;
  }

  // Open the form
  Xrm.Navigation.openForm(entityFormOptions, parameters).then(
    function(success) {
      console.log(success);
    },
    function(error) {
      console.log(error);
    }
  );
}
