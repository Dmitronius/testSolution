function Form_onload()
{
var script = document.createElement('script');    
script.language = 'javascript';     
script.src = '/ISV/scripts/jquery-1.3.2.min.js';     

script.onreadystatechange = function()     
{     
   if (event.srcElement.readyState == "complete" || 
      event.srcElement.readyState == "loaded")    
         jQueryIsReady();     
};

document.getElementsByTagName('head')[0].appendChild(script); 

function jQueryIsReady()    
{ 

}
}
function new_secondarylanguageid_onchange()
{

}
