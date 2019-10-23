/*
Sample JavaScript function
The JavaScript function for displaying custom icons and tooltips expects the following two arguments: 
the entire row object specified in layoutxml and the calling user’s Locale ID (LCID). 
The LCID parameter enables you to specify tooltip text in multiple languages. 
For more information about the languages supported by CRM, see Enable languages and Install or upgrade Language Packs for Microsoft Dynamics 365. 
For a list of locale ID (LCID) values that you can use in your code, see Locale IDs Assigned by Microsoft .
Assuming you will be adding custom icons for an option-set type of attribute, which has a limited set of predefined options, 
make sure you use the integer value of the options instead of label to avoid localization issues.
The following sample code displays icons and tooltips based on one of three values (1: Hot, 2: Warm, 3: Cold) in the opportunityratingcode (Rating) attribute. 
The sample code also shows how to display localized tooltip text. 
For this sample to work, you must create three image web resources with 16x16 images in your Dynamics 365 instance with the following names: new_Hot, new_Warm, and new_Cold.
This results in displaying icons with tooltips in the Rating column that depend on the value in each row. The result could look like this:
*/

function displayIconTooltip(rowData, userLCID) {
    var str = JSON.parse(rowData);
//console.log(rowData);
//console.log(str);
    var coldata = str.statuscode_Value;
    var imgName = "";
    var tooltip = "";
    switch (coldata) {
        case 1:
            imgName = "tra_fine1_16";
            switch (userLCID) {
                case 1036:
                    tooltip = "French: Opportunity is Hot";
                    break;
                default:
                    tooltip = "Opportunity is Hot";
                    break;
            }
            break;
        case 0:
            imgName = "tra_info1_16";
            switch (userLCID) {
                case 1036:
                    tooltip = "French: Opportunity is Warm";
                    break;
                default:
                    tooltip = "Opportunity is Warm";
                    break;
            }
            break;
        case 2:
            imgName = "tra_warning4_16";
            switch (userLCID) {
                case 1036:
                    tooltip = "French: Opportunity is Cold";
                    break;
                default:
                    tooltip = "Opportunity is Cold";
                    break;
            }
            break;
        default:
            imgName = "";
            tooltip = "";
            break;
    }
    var resultarray = [imgName, tooltip];
//console.log(resultarray);
    return resultarray;
}