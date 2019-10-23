function callPickWorkflow (executionContext) {
    let formContext = executionContext.getFormContext();
    let caseId = formContext.data.entity.getId();
    Process.callWorkflow("43FFF8A4-1FF9-4BFD-ADF9-A1EB658400ED", //Process.js Library
    caseId,
    function () {
        alert("PICK workflow executed successfully");
        formId = formContext.ui.formSelector.getCurrentItem().getId();

        if (formId === "78898ffe-82ac-4fb9-84e5-9879fccb918e") { // 78898ffe-82ac-4fb9-84e5-9879fccb918e - for Customer Support With AT Form
        console.log("formId: " + formId);
        getIsWorkedByFilledInQueueItems (executionContext) //incident_main_library.js library
        }
    },
    function () {
        alert("Error executing PICK workflow");
    });
}