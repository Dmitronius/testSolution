//29032019 deprecated
/// <reference path="C:\DevDynamics\CRMFirst\Transas\Transas CRM Solution\WebResources\MSXRMTOOLS.Xrm.Page.2016.js" />
/*function EnableStartApprovalButton() {

    //TODO: Prevent Contract Creation when ContractApprovalIsRequired == No

    var bidApprovalRequired = (Xrm.Page.getAttribute("tra_isbidapprovalrequired").getValue() == "167490001"); //167490001 = Yes
    var contractApprovalRequired = (Xrm.Page.getAttribute("tra_iscontractapprovalrequired").getValue() == "167490001"); //167490001 = Yes

    return ( (Xrm.Page.data.entity.getId() != '')  && (bidApprovalRequired || (bidApprovalRequired && contractApprovalRequired)) );    
}
*/