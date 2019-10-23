//IT-30875 6\12\2017 andnov
//If the TRA namespace object is not defined, create it.
if (typeof (TRA) == "undefined") { TRA = {}; }
// Create Namespace container for functions in this library;
TRA.VesselLibrary = {};

TRA.VesselLibrary.clearFormNotification = function (notifId) {
    Xrm.Page.ui.clearFormNotification(notifId);
};

TRA.VesselLibrary.setNotification = function (message, notifId) {
    debugger;
    Xrm.Page.ui.setFormNotification(message, "WARNING", notifId);
};

TRA.VesselLibrary.setAndClearNotification = function (message, notifId, timeoutsetting) {
    debugger;
    Xrm.Page.ui.setFormNotification(message, "WARNING", notifId);
    setTimeout(TRA.FormNotification.clearFormNotification, timeoutsetting, notifId);
};

TRA.VesselLibrary.setFieldNotification = function (controlname, messagetext, notifId) {
    Xrm.Page.getControl(controlname).setNotification(messagetext, notifId);
};

TRA.VesselLibrary.clearFieldNotification = function (controlname, notifId) {
    Xrm.Page.getControl(controlname).clearNotification(notifId)
};


TRA.VesselLibrary.checkIMO = function (fieldIMO) {
    if (Xrm.Page.getControl(fieldIMO) != undefined) {
        let strIMO = Xrm.Page.getAttribute(fieldIMO).getValue();
        let re = /^\d{7}$/;
        console.log(re.test(strIMO));
        if (!re.test(strIMO) && strIMO !== null) {
            TRA.VesselLibrary.setFieldNotification(fieldIMO, "IMO field must contain exactly 7 characters.", "badIMO"); //???
            TRA.VesselLibrary.setNotification("IMO field must contain exactly 7 characters.", "badIMOform");
        } else {
            TRA.VesselLibrary.clearFieldNotification(fieldIMO, "badIMO"); //???
            TRA.VesselLibrary.clearFormNotification("badIMOform");
        }
    } else {
        console.log("TRA message: Control /" + fieldIMO + "/ wasnt found on the form");
    }
};

TRA.VesselLibrary.checkDongle = function (fieldDongle) {
    //debugger;
    if (Xrm.Page.getControl(fieldDongle) != undefined) {
        let strDongle = Xrm.Page.getAttribute(fieldDongle).getValue();
        let re = /^\d{7}$/;
        console.log(re.test(strDongle));
        if (!re.test(strDongle) && strDongle !== null) {
            TRA.VesselLibrary.setFieldNotification(fieldDongle, "Dongle number field must contain exactly 7 characters.", "badDongle"); //???
            TRA.VesselLibrary.setNotification("Dongle number field must contain exactly 7 characters.", "badDongleform");
        } else {
            TRA.VesselLibrary.clearFieldNotification(fieldDongle, "badDongle"); //???
            TRA.VesselLibrary.clearFormNotification("badDongleform");
        }
    } else {
        console.log("TRA message: Control /" + fieldDongle + "/ wasnt found on the form");
    }
};

function getTargetUrlFolder() {
    var newTarget;

    var orgName = Xrm.Page.context.getOrgUniqueName();

    if (orgName === "transas2") {
        newTarget = "ISV";
    }
    else if (orgName === "orgbe46661f") {
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

function onLoadForm_autocomplete_name() {

    //Transfer link to MDM
    if (Xrm.Page.ui.getFormType()==2){        
        if (Xrm.Page.getAttribute('tra_istransferedtomdm').getValue()==false ){
            name_onchange1(true);            
        }
    }

     //autocomplete   
     var keyPressFcn = function (ext) {
        try {
            var userInput = Xrm.Page.getControl("new_name").getValue();            
            if (userInput.length<3) return;           
            resultSet = {
                results: new Array()               
            }; 
                       
            var ownerInput ="";
           
            if (Xrm.Page.getControl("new_parentaccount").getAttribute().getValue()==null){                
                if (Xrm.Page.getControl("tra_shipmanager").getAttribute().getValue()==null){
                    alert('Select Ship Owner OR Ship Manager');
                    return;
                }
                else{
                    ownerInput = Xrm.Page.getControl("tra_shipmanager").getAttribute().getValue()[0].id;                   
                }
            }
            else{
                ownerInput = Xrm.Page.getControl("new_parentaccount").getAttribute().getValue()[0].id;
            }
            ownerInput = ownerInput.replace("{", "");                    
            ownerInput = ownerInput.replace("}", "");

            var userInputLowerCase = userInput.toLowerCase();
            var data = {};
            data.prefix= userInputLowerCase;
            //data.customer_crm_id='adbe55d3-0885-e811-813f-5065f38b06f1';      
            data.customer_crm_id= ownerInput.toLowerCase();            
            url=getTargetUrlPrefix()+getTargetUrlFolder()+'/CustomerMdmAddService/Customer.aspx/GetVessels';

            var xhr = new XMLHttpRequest();
            xhr.open("POST", url, true);
            xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
            xhr.onload = function () {    	    
    	      if (xhr.readyState == 4 && xhr.status == "200") {             	
                var MDMCollection = JSON.parse(xhr.responseText);

                if (MDMCollection.d.length==0)
                {
                    return;
                }
                else{                  
                    var Name="";                  
                    for (var i = 0; i < MDMCollection.d.length; i++) {
                        var sys = MDMCollection.d[i];                                                            
                        Name=sys.split('|')[1];                        
                                        
                        resultSet.results.push({
                            id: i,
                            fields: [Name]
                        });

                        if (resultSet.results.length >= 20) break;
                
                        if (resultSet.results.length > 0) {
                            ext.getEventSource().showAutoComplete(resultSet);
                        } else {
                            ext.getEventSource().hideAutoComplete();
                        }
                                       
                    }                   
                }
    	    } else {        
                alert('Error:'+xhr.responseText);        
        	}
          }
        
          xhr.send(JSON.stringify(data)); 
           
        } catch (e) {            
            console.log(e);
        }
    };

    Xrm.Page.getControl("new_name").addOnKeyPress(keyPressFcn);    

}

function name_onchange() {
    name_onchange1(false); 
}

function name_onchange1(transferToMDM) {

    if (Xrm.Page.getAttribute("new_name") != null) {
            
        var userInput = Xrm.Page.getControl("new_name").getAttribute().getValue();                   

        var ownerInput ="";
           
        if (Xrm.Page.getControl("new_parentaccount").getAttribute().getValue()==null){                
            if (Xrm.Page.getControl("tra_shipmanager").getAttribute().getValue()==null){
                alert('Select Ship Owner OR Ship Manager');
                return;
            }
            else{
                ownerInput = Xrm.Page.getControl("tra_shipmanager").getAttribute().getValue()[0].id;                
            }
        }
        else{
            ownerInput = Xrm.Page.getControl("new_parentaccount").getAttribute().getValue()[0].id;
        }

        ownerInput = ownerInput.replace("{", "");                    
        ownerInput = ownerInput.replace("}", "");

        var userInputLowerCase = userInput.toLowerCase();
        var data = {};
        data.prefix= userInputLowerCase;
        //data.customer_crm_id='adbe55d3-0885-e811-813f-5065f38b06f1';      
        data.customer_crm_id= ownerInput.toLowerCase();
    
        url=getTargetUrlPrefix()+getTargetUrlFolder()+'/CustomerMdmAddService/Customer.aspx/GetVessels';

        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
        xhr.onload = function () {    	    
    	    if (xhr.readyState == 4 && xhr.status == "200") {             	
                var MDMCollection = JSON.parse(xhr.responseText);

                if (MDMCollection.d.length==0)
                {                   
                    return;
                }
                else{
                    var Code="";
                    var Name="";
                    var IMONumber="";
                    var SourceName="";
                    var GrossTonnage="";
                    var MMSI="";
                    var Type="";
                  
                    
                    for (var i = 0; i < MDMCollection.d.length; i++) {                        
                        var sys = MDMCollection.d[i];                      
                        Code=sys.split('|')[0];                                    
                        Name=sys.split('|')[1];
                        IMONumber=sys.split('|')[2];
                        SourceName=sys.split('|')[3];
                        GrossTonnage=sys.split('|')[4];
                        MMSI=sys.split('|')[5];
                        Type=sys.split('|')[6];                                                                                 
                    }                   

                    if (transferToMDM==true){                                
                        var guidCRM = Xrm.Page.data.entity.getId();
                        guidCRM = guidCRM.replace("{", "");                    
                        guidCRM = guidCRM.replace("}", "");                                                
                        setLinkVesselCRM(Code, guidCRM);                        
                        Xrm.Page.getAttribute('tra_istransferedtomdm').setValue(true);                        
                    }
                    else{
                        Xrm.Page.getAttribute("new_imo").setValue(IMONumber);
                        Xrm.Page.getAttribute("new_mmsi").setValue(MMSI);
                        if (Type!=null && Type==''){
                            var options = Xrm.Page.getAttribute("new_vesseltype").getOptions();
                            for (var i in options) {
                                if (Type==options[i].text){                                    
                                    Xrm.Page.getAttribute("new_vesseltype").setValue(options[i].value);
                                    //Xrm.Page.data.entity.attributes.get("new_vesseltype").setValue(options[i].value);
                                    break;
                                }                                
                            }
                        }                                     
                    }
                }
    	    } else {        
                alert('Error:'+xhr.responseText);        
        	}
        }
        
        xhr.send(JSON.stringify(data)); 
    } 

}

function setLinkVesselCRM(guidMDM, guidCRM){
        
        var data = {};
        data.guidMDM = guidMDM.toLowerCase();
        data.guidCRM = guidCRM.toLowerCase();
    
        url=getTargetUrlPrefix()+getTargetUrlFolder()+'/CustomerMdmAddService/Customer.aspx/SetLink_Vessel_CRM';

        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
        xhr.onload = function () {    	    
    	    if (xhr.readyState == 4 && xhr.status == "200") {                
    	    } else {        
                alert('Error (link create):'+xhr.responseText);        
        	}
        }
        
        xhr.send(JSON.stringify(data));

}