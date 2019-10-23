function addProductPreSearch(executionContext) {
    let formContext = executionContext.getFormContext();
    formContext.getControl("new_productid").addPreSearch(filterProductsOnAccountProduct);
}

function filterProductsOnAccountProduct(executionContext) {
    let formContext = executionContext.getFormContext();

    let solutionCode = 0;
    let categoryCode = 0;

    if (formContext.getAttribute('tra_solutioncode').getValue()) {
        solutionCode = parseInt(formContext.getAttribute('tra_solutioncode').getValue(), 10);
    } else {
        formContext.ui.setFormNotification('Please select Solution first', 'Warning', 'solution_not_selected');
        setInterval(() => {
            formContext.ui.clearFormNotification('solution_not_selected');
        }, 15000);
    }

    if (formContext.getAttribute('wdt_solutioncategorycode').getValue()) {
        categoryCode = parseInt(formContext.getAttribute('wdt_solutioncategorycode').getValue(), 10);
    } else {
        formContext.ui.setFormNotification('You haven\'t selected Solution Category. Products for selection can be limited', 'Warning', 'solution_Category_not_selected');
        setInterval(() => {
            formContext.ui.clearFormNotification('solution_Category_not_selected');
        }, 15000);
    }

    const productNumberPrefix = "prdln";
    let filter = '<filter type="and"><condition attribute="tra_solutioncode" operator="eq" value="'
        + solutionCode + '"/><condition attribute="wdt_solutioncategorycode" operator="eq" value="'
        + categoryCode + '"/><condition attribute="statecode" operator="eq" value="0" />'
        + '<condition attribute="productnumber" operator="begins-with" value="' + productNumberPrefix + '" ></condition></filter>'
    formContext.getControl("new_productid").addCustomFilter(filter, "product");

}

function formSelector(executionContext) {
  let formContext = executionContext.getFormContext();
  let solution = formContext.getAttribute("tra_solutioncode").getValue();
  let currentForm = formContext.ui.formSelector.getCurrentItem();
  let currentFormId = currentForm.getId();
  let defaultFormId = "90247b49-c498-43bd-aef7-738ac260202b";
  let isDirty = formContext.data.entity.getIsDirty();
  let solutionForms = [
    { solutionId: 167490000, formId: "4a2caff3-7da4-4082-867a-adc0521e8c29" },
    { solutionId: 167490001, formId: "fa2f9544-5fd5-467e-a099-2c6cbc721d66" },
    { solutionId: 167490002, formId: "fa2f9544-5fd5-467e-a099-2c6cbc721d66" },
    { solutionId: 167490003, formId: "fa2f9544-5fd5-467e-a099-2c6cbc721d66" },
    { solutionId: 167490004, formId: defaultFormId },
    { solutionId: 167490005, formId: defaultFormId },
    { solutionId: 167490006, formId: defaultFormId },
    { solutionId: 167490007, formId: defaultFormId },
    { solutionId: 167490008, formId: defaultFormId }
  ];

  for (let i = 0; i < solutionForms.length; i++) {
    if (
      solution === solutionForms[i].solutionId &&
      currentFormId !== solutionForms[i].formId
    ) {
      let targetForm = getTargetFormItem(
        executionContext,
        solutionForms[i].formId
      );
      if (targetForm && isDirty !== true) {
        console.log(
          "WDT. For solution : " +
            solutionForms[i].solutionId +
            " switching form to : " +
            targetForm.getLabel() +
            " with ID : " +
            targetForm.getId()
        );
        targetForm.navigate();
      } else if (targetForm && isDirty == true) {

            formContext.ui.setFormNotification(
              "Solution field was amended. Please refresh the page to display correct Account Product Form",
              "INFO",
              "formSelectorFormIsDirty"
            );
      } else {
        formContext.ui.clearFormNotification("formSelectorFormIsDirty");
      }
    }
  }
}

function getTargetFormItem(executionContext, targetFormId) {
  let formContext = executionContext.getFormContext();
  let availableForms = formContext.ui.formSelector.items.get();
  let targetForm = {};
  for (let i = 0; i < availableForms.length; i++) {
    if (availableForms[i].getId() === targetFormId) {
      targetForm = availableForms[i];
    }
  }
  return targetForm;
}