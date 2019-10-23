//generates project code if empty on ribbon button
// <reference path="C:\DevDynamics\CRMFirst\Transas\Transas CRM Solution\WebResources\MSXRMTOOLS.Xrm.Page.2016.js" />
function EnableProjectCodeButton() {    
    return (Xrm.Page.data.entity.getId() != '' && Xrm.Page.data.entity.attributes.get('CFSTLProjectID').getValue() == null);
}

function GenerateProjectCode() {
    let opportunityId = Xrm.Page.data.entity.getId();
    let workflowId = "93C38F61-4151-4CF9-8379-C21B94ACCF93"; //"Opportunities: Generate Project code"
    let clientUrl = Xrm.Page.context.getClientUrl();
    
    Xrm.Page.data.save();

    executeWorkflow(opportunityId, workflowId, clientUrl);
}


function executeWorkflow(opportunityId, workflowId, clientUrl) {
    let functionName = "executeWorkflow >>";
    let query = "";
    try {

        //Define the query to execute the action
        query = "workflows(" + workflowId.replace("}", "").replace("{", "") + ")/Microsoft.Dynamics.CRM.ExecuteWorkflow";

        var data = {
            "EntityId": opportunityId
        };

        var req = new XMLHttpRequest();
        req.open("POST", clientUrl + "/api/data/v8.2/" + query, true);
        req.setRequestHeader("Accept", "application/json");
        req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        req.setRequestHeader("OData-MaxVersion", "4.0");
        req.setRequestHeader("OData-Version", "4.0");

        req.onreadystatechange = function () {

            if (this.readyState == 4 /* complete */) {

                req.onreadystatechange = null;

                if (this.status == 200 || this.status == 204) {
                    //success callback this returns null since no return value available.
                    //var result = JSON.parse(this.response);
                    Xrm.Page.data.refresh(true);
                } else {
                    //error callback
                    if (this.response != "") {
                        var error = JSON.parse(this.response).error;
                        Xrm.Utility.alertDialog(error.message);                        
                        console.log(error);
                    }
                }
            }
        };
        req.send(JSON.stringify(data));

    } catch (e) {
        throwError(functionName, e);
    }
}