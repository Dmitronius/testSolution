function Form_onload()
{
/* JQuery */
var script = document.createElement('script');
script.language = 'javascript';
script.src = '/ISV/scripts/jquery-1.3.2.min.js';

script.onreadystatechange = function () {
    if (event.srcElement.readyState == "complete" || event.srcElement.readyState == "loaded")
        jQueryIsReady();
};

document.getElementsByTagName('head')[0].appendChild(script);

function jQueryIsReady() {

    /* 
    // Sales 
    new_salesapproverid
    new_sales_status
    new_approvedbysales
    
    // Finance 
    new_financeapproverid
    new_fin_status
    new_approvedbyfinance
    
    // Legal 
    new_legalapproverid
    new_legal_status
    new_approvedbylegal
    
    // Operations 
    new_operationsapproverid
    new_op_status
    new_approvedbyoperations
    
    */



    var controls = new Array(
    "new_salesapproverid",
    "new_sales_status", 
    "new_approvedbysales",
    "new_financeapproverid",
    "new_fin_status", 
    "new_approvedbyfinance",
    "new_legalapproverid",
    "new_legal_status", 
    "new_approvedbylegal",
    "new_operationsapproverid",
    "new_op_status", 
    "new_approvedbyoperations",
    "new_agreementsid",
   "new_name", 
    "statuscode",
    "new_projectcode",
    "new_contractamount",
    "new_profit"
     );


    $.each(controls, function (i) {
        $('#' + controls[i]).attr("disabled", "true");
    });

  var color = $('#statuscode option:selected').text() == 'Approved' ? '#00ff00' : '#ff0000';
  $('#statuscode').find('option:selected').css('background', color);

 color = $('#new_red_flag option:selected').text() == 'No' ? '#00ff00' : '#ff0000';
 $('#new_red_flag').find('option:selected').css('background', color);



    
}
}
