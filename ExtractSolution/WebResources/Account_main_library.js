/* helper functions */

function _getAttribute(value) {
    return Xrm.Page.getAttribute(value);
};

function _getAttributeValue(value) {
    return _getAttribute(value) ? _getAttribute(value).getValue() : "";
};

function _setDisabled(fieldName, disabledValue) {
    try {
        Xrm.Page.getControl(fieldName).setDisabled(disabledValue);
    } catch (e) {
        console.log(e.message);
    }
};

function _setVisible(fieldName, visible) {
    try {
        Xrm.Page.getControl(fieldName).setVisible(visible);
    } catch (e) {
        console.log(e.message);
    }
};

function _toRequirementLevel(boolValue) {
    try {
        return boolValue ? "required" : "none";
    } catch (e) {
        console.log(e.message);
    }
};

/*
function _addEventHandler(elem, eventType, handler) {
    if (elem.addEventListener)
        elem.addEventListener(eventType, handler, false);
    else if (elem.attachEvent)
        elem.attachEvent('on' + eventType, handler);
}
*/

/*
function _removeEventHandler(elem, eventType, handler) {
    if (elem.removeEventListener)
        elem.removeEventListener(eventType, handler, false);
    else if (elem.detachEvent)
        elem.detachEvent('on' + eventType, handler);
}
*/


/* helper functions */

if (typeof (accountMain) == "undefined")
    accountMain = new Object();

accountMain.IFRAME_WebsitePreview_onload = function () {
    //debugger;
    try {
        // more custom code
    } catch (e) {
        console.log(e.message);
    }
};

accountMain.IsOnWebSiteFld = function (caption) {
    if (caption == 'Agent Information' ||
        caption == 'Street 1' ||
        caption == 'Country/Region' ||
        caption == 'City' ||
        caption == 'Main Phone' ||
        caption == 'Fax' ||
        caption == 'Web Site' ||
        caption == 'E-mail' ||
        caption == 'Publish on website' ||
        caption == 'transaswebsitelink' ||
        caption == 'Service Station' ||
        caption == 'Service Center' ||
        caption == 'Regional Service Center'
    ) {
        return true;
    } else
        return false;
};

accountMain.PaintWebSiteFld = function () {

    // alert("field name is chnaging");
    parent.$("#address1_line1_c").css("color", color);
    parent.$("#address1_country_c").css("color", color);
    //alert("Done field name is chnaging");
    var coll = document.getElementsByTagName('td');
    for (var i = 0; i < coll.length; i++) {
        var parent = coll[i]; // Country/Region , 
        if (accountMain.IsOnWebSiteFld(coll[i].innerText)) {
            /*
              while(parent.tagName != 'TABLE'){
                parent = parent.parentElement;
            }*/
            parent.title = 'website field';
            parent.style.color = 'red';
        }
    }
};

/**
 * Returns list of countries
 */
accountMain.ListOfCountries = function () {
    return new Array('Andorra', 'United Arab Emirates', 'Afghanistan', 'Antigua And Barbuda', 'Anguilla', 'Albania', 'Armenia', 'Netherlands Antilles', 'Angola', 'Antarctica', 'Argentina', 'American Samoa', 'Austria', 'Australia', 'Aruba', '�land Islands', 'Azerbaijan', 'Bosnia And Herzegovina', 'Barbados', 'Bangladesh', 'Belgium', 'Burkina Faso', 'Bulgaria', 'Bahrain', 'Burundi', 'Benin', 'Saint Barth�lemy', 'Bermuda', 'Brunei Darussalam', 'Bolivia', 'Brazil', 'Bahamas', 'Bhutan', 'Bouvet Island', 'Botswana', 'Belarus', 'Belize', 'Canada', 'Cocos (Keeling) Islands', 'Congo', 'Central African Republic', 'Congo', 'Switzerland', 'C�te D\'ivoire', 'Cook Islands', 'Chile', 'Cameroon', 'China', 'Colombia', 'Costa Rica', 'Cuba', 'Cape Verde', 'Christmas Island', 'Cyprus', 'Czech Republic', 'Germany', 'Djibouti', 'Denmark', 'Dominica', 'Dominican Republic', 'Algeria', 'Ecuador', 'Estonia', 'Egypt', 'Western Sahara', 'Eritrea', 'Spain', 'Ethiopia', 'Finland', 'Fiji', 'Falkland Islands (Malvinas)', 'Micronesia', 'Faroe Islands', 'France', 'Gabon', 'United Kingdom', 'Grenada', 'Georgia', 'French Guiana', 'Guernsey', 'Ghana', 'Gibraltar', 'Greenland', 'Gambia', 'Guinea', 'Guadeloupe', 'Equatorial Guinea', 'Greece', 'South Georgia And The South Sandwich Islands', 'Guatemala', 'Guam', 'Guinea-Bissau', 'Guyana', 'Hong Kong', 'Heard And Mc Donald Islands', 'Honduras', 'Croatia', 'Haiti', 'Hungary', 'Indonesia', 'Ireland', 'Israel', 'Isle Of Man', 'India', 'British Indian Ocean Territory', 'Iraq', 'Iran', 'Iceland', 'Italy', 'Jersey', 'Jamaica', 'Jordan', 'Japan', 'Kenya', 'Kyrgyzstan', 'Cambodia', 'Kiribati', 'Comoros', 'Saint Kitts And Nevis', 'Korea, North', 'Korea, South', 'Kuwait', 'Cayman Islands', 'Kazakhstan', 'Lao People\'s Democratic Republic', 'Lebanon', 'Saint Lucia', 'Liechtenstein', 'Sri Lanka', 'Liberia', 'Lesotho', 'Lithuania', 'Luxembourg', 'Latvia', 'Libyan Arab Jamahiriya', 'Morocco', 'Monaco', 'Moldova', 'Montenegro', 'Saint Martin', 'Madagascar', 'Marshall Islands', 'Macedonia', 'Mali', 'Myanmar', 'Mongolia', 'Macao', 'Northern Mariana Islands', 'Martinique', 'Mauritania', 'Montserrat', 'Malta', 'Mauritius', 'Maldives', 'Malawi', 'Mexico', 'Malaysia', 'Mozambique', 'Namibia', 'New Caledonia', 'Niger', 'Norfolk Island', 'Nigeria', 'Nicaragua', 'Netherlands', 'Norway', 'Nepal', 'Nauru', 'Niue', 'New Zealand', 'Oman', 'Panama', 'Peru', 'French Polynesia', 'Papua New Guinea', 'Philippines', 'Pakistan', 'Poland', 'St. Pierre And Miquelon', 'Pitcairn', 'Puerto Rico', 'Palestinian Territory, Occupied', 'Portugal', 'Palau', 'Paraguay', 'Qatar', 'Reunion', 'Romania', 'Serbia', 'Russia', 'Rwanda', 'Saudi Arabia', 'Solomon Islands', 'Seychelles', 'Sudan', 'Sweden', 'Singapore', 'St. Helena', 'Slovenia', 'Svalbard And Jan Mayen Islands', 'Slovakia', 'Sierra Leone', 'San Marino', 'Senegal', 'Somalia', 'Suriname', 'Sao Tome And Principe', 'El Salvador', 'Syrian Arab Republic', 'Swaziland', 'Turks And Caicos Islands', 'Chad', 'French Southern Territories', 'Togo', 'Thailand', 'Tajikistan', 'Tokelau', 'Timor-Leste', 'Turkmenistan', 'Tunisia', 'Tonga', 'Turkey', 'Trinidad And Tobago', 'Tuvalu', 'Taiwan', 'Tanzania', 'Ukraine', 'Uganda', 'United States Minor Outlying Islands', 'USA', 'Uruguay', 'Uzbekistan', 'Holy See (Vatican City State)', 'Saint Vincent And The Grenadines', 'Venezuela', 'Virgin Islands, British', 'Virgin Islands, U.S.', 'Viet Nam', 'Vanuatu', 'Wallis And Futuna Islands', 'Samoa', 'Yemen', 'Mayotte', 'South Africa', 'Zambia', 'Zimbabwe');
};

/**
 * Function for adding suggestion functionality for text input fields in Microsoft CRM
 * textfield: XRM field address1_country
 * method: a function, that returns an list pf countries 
 * preload: true or false
 */
accountMain.SuggestionTextBox = function (textfield, method, preload) {
    // max items in the suggestion box
    var maxItems = 6;

    this.suggestionList = new Array();
    this.suggestionListDisplayed = new Array();

    var actual_textfield = textfield;
    var actual_value = '';

    var selectedNumber = 0;
    var countMatches = 0;

    // load the data via external method
    if (preload) {
        this.suggestionList = method;
    }

    // attach this function to the textfield   
    parent.$("#address1_county_i").focus(function () {
        initTextfield();
    });

    /**
     * Init textfield and attach necessary events
     */
    function initTextfield() {
        //attach blur event and detach 
        parent.$("#address1_county_i").blur(function (e) {
            resetTextFieldForAddress(e);
        });

        //attach blur event and detach 
        parent.$("#address1_county_i").keydown(function (e) {
            alert("inside docu");
            keyDown(e);
            resetTextFieldForDocument(e);
        });
    }

    /**
     * Reset textfield and dettach necessary event
     */
    function resetTextFieldForAddress(e) {
        //when leaving the field, we have to remove all attached events
        parent.$("#address1_county_i").off();
    }

    /**
     *  Reset textfield and dettach necessary event
     */
    function resetTextFieldForDocument(e) {
        //when leaving the field, we have to remove all attached events
        parent.$("#address1_county_i").off();
    }

    function keyDown(e) {
        var keyCode = e.keyCode;

        switch (keyCode) {
            case 9:
            case 13:
                // enter & tab key
                if (countMatches > 0) {
                    actual_textfield.value = suggestionListDisplayed[selectedNumber];
                    if (Xrm.Page.getAttribute("suggestion_table") != null) {
                        document.body.removeChild(document.getElementById('suggestion_table'));
                    }
                }
                break;

            case 38:
                //pressing up key
                if (selectedNumber > 0 && countMatches > 0) {
                    selectedNumber--;
                    createSuggestionTable();
                }
                return false;

            case 40:
                // pressing down key
                if (selectedNumber < countMatches - 1 && countMatches > 0 && selectedNumber < maxItems) {
                    selectedNumber++;
                    createSuggestionTable();
                }
                return false;

            default:
                executeSuggestion();
                break;
        }
    }

    /**
     * Exceutes the suggestions
     */
    function executeSuggestion() {
        selectedNumber = 0;
        countMatches = 0;

        actual_value = textfield.value;
        //todo add keyCode
        // get all possible values from the suggestionList

        if (!preload) {
            // load the data via external method
            // todo add some caching function
            this.suggestionList = method();
        }

        // using regular expressions to match it against the suggestion list
        var re = new RegExp(actual_value, "i");

        //if you want to search only from the beginning
        //var re = new RegExp("^" + actual_value, "i");

        countMatches = 0;
        this.suggestionListDisplayed = new Array();

        // test each item against the RE pattern

        for (i = 0; i < this.suggestionList.length; i++) {
            // if it matche add it to suggestionListDisplayed array
            if (re.test(this.suggestionList[i]) && actual_value != '') {
                this.suggestionListDisplayed[countMatches] = this.suggestionList[i];
                countMatches++;

                // if there are more values than in maxItems, just break
                if (maxItems == countMatches)
                    break;
            }
        }

        if (countMatches > 0) {
            createSuggestionTable();
        } else {
            if (Xrm.Page.getAttribute("suggestion_table")) {
                document.body.removeChild(Xrm.Page.getAttribute("suggestion_table"));
            }
        }
    }

    function createSuggestionTable() {
        if (Xrm.Page.getAttribute("suggestion_table")) {
            document.body.removeChild(Xrm.Page.getAttribute("suggestion_table"));
        }

        // creating a table object which holds the suggesions
        table = document.createElement('table');
        table.id = 'suggestion_table';

        table.width = actual_textfield.style.width;
        table.style.position = 'absolute';
        table.style.zIndex = '100000';

        table.cellSpacing = '1px';
        table.cellPadding = '2px';

        topValue = 0;
        objTop = actual_textfield;
        while (objTop) {
            topValue += objTop.offsetTop;
            objTop = objTop.offsetParent;
        }

        table.style.top = eval(topValue + actual_textfield.offsetHeight) + "px";

        leftValue = 0;
        objLeft = actual_textfield
        while (objLeft) {
            leftValue += objLeft.offsetLeft;
            objLeft = objLeft.offsetParent;
        }

        table.style.left = leftValue + "px";

        table.style.backgroundColor = '#FFFFFF';
        table.style.border = "solid 1px #7F9DB9";
        table.style.borderTop = "none";

        document.body.appendChild(table);

        // iterate list to create the table rows        
        for (i = 0; i < this.suggestionListDisplayed.length; i++) {
            row = table.insertRow(-1);

            row.id = 'suggestion_row' + (i);
            row.onclick = function () {
                onSuggestClick(this.id);
            };

            column = row.insertCell(-1);
            column.id = 'suggestion_column' + (i);


            if (selectedNumber == i) {
                column.style.color = '#ffffff';
                column.style.backgroundColor = '#316AC5';
            } else {
                column.style.color = '#000000';
                column.style.backgroundColor = '#ffffff';
            }

            column.style.fontFamily = 'Tahoma';
            column.style.fontSize = '11px';
            column.innerHTML = this.suggestionListDisplayed[i];
        }
    }

    function onSuggestClick(ttt) {
        var tmpID = ttt.replace('suggestion_row', '');
        selectedNumber = tmpID;
        actual_textfield.value = suggestionListDisplayed[selectedNumber];

        if (Xrm.Page.getAttribute("suggestion_table") != null) {
            document.body.removeChild(document.getElementById('suggestion_table'));
        }
    }

    // return object
    return this;
}

accountMain.OnLoadForm = function (cntx) {
    debugger;
    try {
        // JScript File 24.11.2016
        var AgentTextValue = "Dealer/Service agent"; // Agent
        var HubTextValue = "HUB";
        var VesselTextValue = "Customer - Vessel";

        var customerTypeCode = _getAttribute('customertypecode');
        if (customerTypeCode == null)
            return;

        // Hides Educationl Instutions tab if Account's industrycode is not Maritime educational institutions
        var industryCode = _getAttribute('industrycode');
        if (industryCode.getText() != null) {
            if (industryCode.getText() != "Maritime educational institutions") {
                if (Xrm.Page.ui.tabs.get("Educational Institution")) {
                    Xrm.Page.ui.tabs.get("Educational Institution").setVisible(false);
                }
            } else if (Xrm.Page.ui.tabs.get("Educational Institution")) {
                Xrm.Page.ui.tabs.get("Educational Institution").setVisible(true);
            }
        }

        // Hides Ships count control if Account's industrycode is not Shipping company
        if (industryCode.getText() != null) {
            if (industryCode.getText() != "Shipping / Shipmanagement Company") {
                _setVisible('new_ships_count', false);
            } else {
                _setVisible('new_ships_count', true);
            }
        }

        // Hides Vessel if the customer type code is not customer vessel
        if (customerTypeCode.getText() != null) {
            if (customerTypeCode.getText() !== "Customer - Vessel") {
                if (Xrm.Page.ui.tabs.get("Vessel"))
                    Xrm.Page.ui.tabs.get("Vessel").setVisible(false);
                // field is not used although defined 
                if (_getAttribute('new_paperlessvessel'))
                    _setVisible('new_paperlessvessel', false);

                //if (_getAttribute('new_paperlessvessel_c'))
                //  _setVisible('new_paperlessvessel_d', false);
            }
        }

        // Show  Educational Instutution if customer type code is not dealer service agent or HUB
        if (customerTypeCode.getText() != null) {
            if ((customerTypeCode.getText() != AgentTextValue) && (customerTypeCode.getText() != HubTextValue)) {
                if (Xrm.Page.ui.tabs.get("Vessel"))
                    Xrm.Page.ui.tabs.get("Website Preview").setVisible(false);
            } else {
                if (Xrm.Page.ui.controls.get("customertypecode").getDisabled()) {
                    if (Xrm.Page.ui.tabs.get("Website Preview"))
                        Xrm.Page.ui.tabs.get("Website Preview").setVisible(false);
                }
                //accountMain.PaintWebSiteFld();
            }
        }

        setTimeout(function () {
            // field does not exist
            var obj = accountMain.SuggestionTextBox(Xrm.Page.getAttribute('address1_country'), accountMain.ListOfCountries, true);

            var el = Xrm.Page.getAttribute("customertypecode");
            //field "agent" doesn't exist
            /*            if (el != null) {
                            //if not agent field is selected disable the Agent information section and Area of Responsibilty
                            if (el.getText() != "Agent") {
                                Xrm.Page.ui.tabs.get("Details").sections.get("Agent Information").setVisible(false);
                                Xrm.Page.getControl("new_areasofresponsibilities").setVisible(false);
                            } else {
                                accountMain.PaintWebSiteFld();
                                var address1Country = _getAttribute('address1_county1');
                                var id = Xrm.Page.data.entity.getId();
                                if (address1Country && address1Country.getValue() != '' && id != '') {
                                    var new_transaswebsitelink;
                                    var transasWebsiteLink = _getAttribute('new_transaswebsitelink');
                                    if (transasWebsiteLink != null) {
                                        var link = 'http://www.transas.com/dealers/ShowDistrib.aspx?Country=' + address1Country.getValue() + '#' + id;
                                        transasWebsiteLink.setValue(link);
                                    }
                                }
                            }
                        }*/

            // HIDES | Display Sections if Nav Producs is selected
            //field "nav products" is not used
            var agentNavProducts = _getAttribute('new_agentnavproducts');
            if (agentNavProducts != null) {
                if (agentNavProducts.getValue()) {
                    //TODO: check how it works on CRM2016
                    //NAV product support Section doesnt exist!
                    Xrm.Page.getControl("new_agentnavproducts").setVisible(true);
                } else {
                    Xrm.Page.getControl("new_agentnavproducts").setVisible(false);
                }
            }
            if (customerTypeCode.getText() != null) {

                if (customerTypeCode.getText() == VesselTextValue) {
                    if (Xrm.Page.ui.tabs.get("Vessel"))
                        Xrm.Page.ui.tabs.get("Vessel").setVisible(true);
                } else if (Xrm.Page.ui.tabs.get("Vessel"))
                    Xrm.Page.ui.tabs.get("Vessel").setVisible(false);
            }
            //if (tabs.get(5))
            //    tabs.get(5).setVisible(false);

            // HIDES | Display Sections if Agents is selected
            var displayState = !(customerTypeCode && customerTypeCode.getText() != AgentTextValue);

            //TODO: check and correct what exact should be hided or shown
            //below fields does not exist
            var elem1 = Xrm.Page.getAttribute("{cf50b553-7041-e311-b91a-005056b707d3}");
            if (elem1)
                elem1.style.display = displayState;
            elem1 = Xrm.Page.getAttribute("{5f836671-ba7b-dc11-a772-001560571f55}");
            if (elem1)
                elem1.style.display = displayState;


            //show Dealer Area of activity tab with checkbox only when it is dealer/service agent
            if (customerTypeCode.getText() != null) {
                if (customerTypeCode.getText() == AgentTextValue) {
                    Xrm.Page.ui.tabs.get("Dealer Areas of Activity").setVisible(true);
                } else {
                    Xrm.Page.ui.tabs.get("Dealer Areas of Activity").setVisible(false);
                }
            }
            /* 
            Support for multiselect for Areas of Activities
            author: Jim Wang @ January 2009 
            http://jianwang.blogspot.com
            */
            /*  var PL = _getAttribute('new_areas_of_activity');
               var PLV = _getAttribute('new_areas_of_activity_value');

               if (PL != null && PLV != null) {
                   //  _setVisible(PL.getName(), false);
                   // _setVisible(PLV.getName(), false);

                   // Create a DIV container
                   var addDiv = document.createElement('div');
                   addDiv.setAttribute('style', 'overflow-y:auto; height:280px; border:1px #6699cc solid; background-color:#ffffff;');

                   if (PL.getName().parentNode != null) {
                       $get(PL.getName()).parentNode.appendChild(addDiv);
                   }

                   // Initialise checkbox controls  

                   for (var i = 1; i < PL.getOptions().length; i++) {
                       var pOption = PL.getOptions()[i];


                       var addInput = document.createElement('input');
                       addInput.setAttribute('type', 'checkbox');
                       addInput.setAttribute('style', 'border:none; width:25px; align:left;');

                       if (IsChecked(pOption.text))
                           addInput.setAttribute('checked', 'checked');

                       var addLabel = document.createElement('label');
                       addLabel.innerText = pOption.text;

                       var addBr = document.createElement('br'); //its a br flag

                       if (PL.getName().nextSibling != null) {
                           $get(PL.getName()).nextSibling.appendChild(addInput);
                           $get(PL.getName()).nextSibling.appendChild(addLabel);
                           $get(PL.getName()).nextSibling.appendChild(addBr);
                       }

                   }

                   // Check if it is selected  
                   function IsChecked(pText) {
                       if (PLV.getValue() != '' && PLV.getValue() != null) {
                           var PLVT = PLV.getValue().split('||');
                           for (var i = 0; i < PLVT.length; i++) {
                               if (PLVT[i] == pText)
                                   return true;
                           }
                       }
                       return false;
                   }

                   // Save the selected text, this filed can also be used in Advanced Find  
                   //crmForm.attachEvent('onsave', OnSave);

                   // TODO: find a way to execute 'OnSave' function when form saved.
                   function OnSave() {
                       PLV.setValue('');
                       var getInput = $get(PL.getName()).nextSibling.getElementsByTagName('input');

                       for (var i = 0; i < getInput.length; i++)
                           if (getInput[i].checked)
                               PLV.setValue(PLV.getValue() + getInput[i].nextSibling.innerText + '||');
                   }
               } */
        }, 10 /* in ms */);
    } catch (e) {
        console.log(e.message);
    }
    
    //autocomplete Name
    onLoadForm_autocomplete_name();
   
};

accountMain.OnSaveForm = function () {  
    try {
        var customerTypeCode = _getAttribute('customertypecode');
        /*
        if (customerTypeCode.getText() == "Dealer/Service agent") {
            Xrm.Utility.alertDialog('To add or edit Transas Dealer or Service agent data, please email marketing@transas.com');
            event.returnValue = false;
            return false;
        }*/

        var mainWnd = window.parent;
        for (var iCnt = 0; iCnt < mainWnd.frames.length; iCnt++) {
            if (mainWnd.frames[iCnt].save) {
                mainWnd.frames[iCnt].save();
            }
        }

        if (accountMain.OnLoadForm.OnSave)
            accountMain.OnLoadForm.OnSave();

        // more custom code
    } catch (e) {
        console.log(e.message);
    }
};

accountMain.onChange_customertypecode = function () {
    try {
        // field "customertypecode" onchange
        var tabs = Xrm.Page.ui.getTabs();

        var AgentTextValue = "Distributor/Service Agent"; // Agent
        var HubTextValue = "HUB";
        var VesselTextValue = "Customer - Vessel";

        var customerTypeCode = _getAttribute('customertypecode');

        //if (crmForm.all.customertypecode.SelectedText == VesselTextValue) {
        //    crmForm.all.tab1Tab.style.display = "inline";
        //    // Show fields
        //    crmForm.all.new_paperlessvessel_c.style.visibility = "visible";
        //    crmForm.all.new_paperlessvessel_c.style.display = 'inline';
        //    crmForm.all.new_paperlessvessel_d.style.display = 'inline';
        //}
        //else {
        //    crmForm.all.tab1Tab.style.display = "none";
        //    // Hide fields
        //    crmForm.all.new_paperlessvessel_c.style.visibility = "hidden";
        //    crmForm.all.new_paperlessvessel_c.style.display = 'none';
        //    crmForm.all.new_paperlessvessel_d.style.display = 'none';
        //}
        if (customerTypeCode.getText() == VesselTextValue) {
            if (Xrm.Page.ui.tabs.get("Vessel"))
                Xrm.Page.ui.tabs.get("Vessel").setVisible(true);
            // Show fields
            _setVisible('new_paperlessvessel_c', true);
            _setVisible('new_paperlessvessel_d', true);
        } else {
            if (Xrm.Page.ui.tabs.get("Vessel"))
                Xrm.Page.ui.tabs.get("Vessel").setVisible(false);

            // Hide fields
            _setVisible('new_paperlessvessel_c', false);
            _setVisible('new_paperlessvessel_d', false);
        }

        if (tabs.get(5))
            tabs.get(5).setVisible(false);

        // HIDES | Display Sections if Agents is selected
        var el = Xrm.Page.getAttribute("customertypecode");
        if (el) {
            //var displayState = (el && el.options[el.selectedIndex].text != AgentTextValue) ? "none" : "block";
            var displayState = !(customerTypeCode && customerTypeCode.getText() != AgentTextValue);

            //TODO: check and correct what exact should be hided or shown
            var elem1 = Xrm.Page.getAttribute("{cf50b553-7041-e311-b91a-005056b707d3}");
            if (elem1)
                elem1.style.display = displayState;

            elem1 = Xrm.Page.getAttribute("{5f836671-ba7b-dc11-a772-001560571f55}");
            if (elem1)
                emel1.style.display = displayState;
        }

        // more custom code
    } catch (e) {
        console.log(e.message);
    }
};

accountMain.onChange_new_countryid = function () {
    try {
        // field "new_countryid" onchange
        //var item = crmForm.all.new_countryid.DataValue;
        //if (item == null) {
        //    crmForm.address1_country.DataValue = "";
        //}
        //else {
        //    crmForm.address1_country.DataValue = item[0].name;
        //}
        var countryIdValue = _getAttributeValue('new_countryid');
        var address1Country = _getAttribute('address1_country');
        if (countryIdValue == null)
            address1Country.setValue('');
        else
            address1Country.setValue(countryIdValue[0].name);
        // more custom code
    } catch (e) {
        console.log(e.message);
    }
};

accountMain.onChange_industrycode = function () {
    try {
        // HIDE EI tab if Account is not industrycode=Maritime educational institutions 
        //if (crmForm.elements("industrycode").SelectedText != "Maritime educational institutions") {
        //    if (crmForm.all.tab6Tab) crmForm.all.tab6Tab.style.display = "none";
        //}
        //else {
        //    if (crmForm.all.tab6Tab) crmForm.all.tab6Tab.style.display = "block";
        //}
        var tabs = Xrm.Page.ui.getTabs();
        var industryCode = _getAttribute('industrycode');

        if (Xrm.Page.ui.tabs.get("ABC Rating")) {
            var isVisible = industryCode.getText() != "Maritime educational institutions";
            Xrm.Page.ui.tabs.get("ABC Rating").setVisible(isVisible);
        }

        // HIDE Ships count control if Account is not industrycode= Shipping company
        //if (crmForm.elements("industrycode").SelectedText != "Shipping / Shipmanagement Company") {
        //    if (crmForm.all.new_ships_count) {
        //        crmForm.all.new_ships_count.style.display = "none";
        //        crmForm.all.new_ships_count_c.style.display = "none";
        //    }
        //}
        //else if (crmForm.all.new_ships_count) {
        //    crmForm.all.new_ships_count.style.display = "block";
        //    crmForm.all.new_ships_count_c.style.display = "block";
        //
        //}
        var newShipsCount = _getAttribute('new_ships_count');
        var isVisible1 = industryCode.getText() != "Shipping / Shipmanagement Company";
        _setVisible('new_ships_count', isVisible1);
        _setVisible('new_ships_count_c', isVisible1);

        // more custom code
    } catch (e) {
        console.log(e.message);
    }
};

accountMain.onChange_address1_country = function () {
    try {
        /*
        var f = function ListOfCountries() {
                 return new Array('Andorra','United Arab Emirates','Afghanistan','Antigua and Barbuda','Anguilla','Albania','Armenia','Netherlands Antilles','Angola','Antarctica','Argentina','American Samoa','Austria','Australia','Aruba','�land Islands','Azerbaijan','Bosnia and Herzegovina','Barbados','Bangladesh','Belgium','Burkina Faso','Bulgaria','Bahrain','Burundi','Benin','Saint Barth�lemy','Bermuda','Brunei Darussalam','Bolivia','Brazil','Bahamas','Bhutan','Bouvet Island','Botswana','Belarus','Belize','Canada','Cocos (Keeling) Islands','Congo, The Democratic Republic of The','Central African Republic','Congo','Switzerland','C�te D\'Ivoire','Cook Islands','Chile','Cameroon','China','Colombia','Costa Rica','Cuba','Cape Verde','Christmas Island','Cyprus','Czech Republic','Germany','Djibouti','Denmark','Dominica','Dominican Republic','Algeria','Ecuador','Estonia','Egypt','Western Sahara','Eritrea','Spain','Ethiopia','Finland','Fiji','Falkland Islands (Malvinas)','Micronesia, Federated States of','Faroe Islands','France','Gabon','United Kingdom','Grenada','Georgia','French Guiana','Guernsey','Ghana','Gibraltar','Greenland','Gambia','Guinea','Guadeloupe','Equatorial Guinea','Greece','South Georgia and The South Sandwich Islands','Guatemala','Guam','Guinea-Bissau','Guyana','Hong Kong','Heard Island and Mcdonald Islands','Honduras','Croatia','Haiti','Hungary','Indonesia','Ireland','Israel','Isle of Man','India','British Indian Ocean Territory','Iraq','Iran, Islamic Republic of','Iceland','Italy','Jersey','Jamaica','Jordan','Japan','Kenya','Kyrgyzstan','Cambodia','Kiribati','Comoros','Saint Kitts and Nevis','Korea, Democratic People\'s Republic of','Korea, Republic of','Kuwait','Cayman Islands','Kazakhstan','Lao People\'s Democratic Republic','Lebanon','Saint Lucia','Liechtenstein','Sri Lanka','Liberia','Lesotho','Lithuania','Luxembourg','Latvia','Libyan Arab Jamahiriya','Morocco','Monaco','Moldova, Republic of','Montenegro','Saint Martin','Madagascar','Marshall Islands','Macedonia, The Former Yugoslav Republic of','Mali','Myanmar','Mongolia','Macao','Northern Mariana Islands','Martinique','Mauritania','Montserrat','Malta','Mauritius','Maldives','Malawi','Mexico','Malaysia','Mozambique','Namibia','New Caledonia','Niger','Norfolk Island','Nigeria','Nicaragua','Netherlands','Norway','Nepal','Nauru','Niue','New Zealand','Oman','Panama','Peru','French Polynesia','Papua New Guinea','Philippines','Pakistan','Poland','Saint Pierre and Miquelon','Pitcairn','Puerto Rico','Palestinian Territory, Occupied','Portugal','Palau','Paraguay','Qatar','Reunion','Romania','Serbia','Russian Federation','Rwanda','Saudi Arabia','Solomon Islands','Seychelles','Sudan','Sweden','Singapore','Saint Helena','Slovenia','Svalbard and Jan Mayen','Slovakia','Sierra Leone','San Marino','Senegal','Somalia','Suriname','Sao Tome and Principe','El Salvador','Syrian Arab Republic','Swaziland','Turks and Caicos Islands','Chad','French Southern Territories','Togo','Thailand','Tajikistan','Tokelau','Timor-Leste','Turkmenistan','Tunisia','Tonga','Turkey','Trinidad and Tobago','Tuvalu','Taiwan, Province of China','Tanzania, United Republic of','Ukraine','Uganda','United States Minor Outlying Islands','United States','Uruguay','Uzbekistan','Holy See (Vatican City State)','Saint Vincent and The Grenadines','Venezuela','Virgin Islands, British','Virgin Islands, U.S.','Viet Nam','Vanuatu','Wallis and Futuna','Samoa','Yemen','Mayotte','South Africa','Zambia','Zimbabwe');
        };
        var obj = SuggestionTextBox(document.getElementById('address1_country'), f, true);
        */

        // more custom code
    } catch (e) {
        console.log(e.message);
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

     //Transfer link to MDM if need
     if (Xrm.Page.ui.getFormType()==2){        
        if (Xrm.Page.getAttribute('tra_istransferedtomdm').getValue()==false ){
            name_onchange1(true);                        
        }
     }             

     //autocomplete   
     var keyPressFcn = function (ext) {
        try {
            var userInput = Xrm.Page.getControl("name").getValue(); 
            if (userInput.length<3) return;           
            resultSet = {
                results: new Array()               
            };           
    
        var userInputLowerCase = userInput.toLowerCase();
        var data = {};
        data.prefix= userInputLowerCase;
    
        url=getTargetUrlPrefix()+getTargetUrlFolder()+'/CustomerMdmAddService/Customer.aspx/GetCustomers';

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

    Xrm.Page.getControl("name").addOnKeyPress(keyPressFcn);    

}

function name_onchange() {
    name_onchange1(false); 
}

function name_onchange1(transferToMDM) {    
    
    if (Xrm.Page.getAttribute("name") != null) {

        //alert("transfer-"+transferToMDM);
            
        var userInput = Xrm.Page.getControl("name").getAttribute().getValue();
    
        var userInputLowerCase = userInput.toLowerCase();
        var data = {};
        data.prefix= userInputLowerCase;
    
        url=getTargetUrlPrefix()+getTargetUrlFolder()+'/CustomerMdmAddService/Customer.aspx/GetCustomers';

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
                    var Country_Name="";
                    var CRM_code="";
                    var PhoneNo="";
                    var OtherPhone="";
                    var Fax="";
                    var Email="";
                    var Address="";
                    var ContactPerson="";
                    var SourceName="";
                    for (var i = 0; i < MDMCollection.d.length; i++) {                        
                        var sys = MDMCollection.d[i];                      
                        Code=sys.split('|')[0];                                    
                        Name=sys.split('|')[1];
                        Country_Name=sys.split('|')[2];
                        CRM_code=sys.split('|')[3];
                        PhoneNo=sys.split('|')[4];
                        OtherPhone=sys.split('|')[5];
                        Fax=sys.split('|')[6];
                        Email=sys.split('|')[7];
                        Address=sys.split('|')[8];
                        ContactPerson=sys.split('|')[9];
                        SourceName=sys.split('|')[10];                                                               
                    }                   

                    if (transferToMDM==true){                                        
                        //alert("createmap-"+transferToMDM);
                        var guidCRM = Xrm.Page.data.entity.getId();
                        guidCRM = guidCRM.replace("{", "");                    
                        guidCRM = guidCRM.replace("}", "");                            
                        setLinkCustomerCRM(Code, guidCRM);                        
                        Xrm.Page.getAttribute('tra_istransferedtomdm').setValue(true);                        
                    }
                    else{
                        Xrm.Page.getAttribute("telephone1").setValue(PhoneNo);
                        Xrm.Page.getAttribute("telephone2").setValue(OtherPhone);
                        Xrm.Page.getAttribute("fax").setValue(Fax);
                        Xrm.Page.getAttribute("emailaddress1").setValue(Email);
                        Xrm.Page.getAttribute("address1_name").setValue(Address);                    
                        getCountry(Country_Name, function(CountryId){
                            if (CountryId!=null){                                                                        
                                Xrm.Page.getAttribute("new_countryid").setValue([{ id: CountryId, name: Country_Name, entityType: "new_country"}]);
                            }
                        });
                        //var ContactType = Xrm.Page.data.entity.attributes.get("ContactPerson").getValue()[0].entityType;
                        //Xrm.Page.getAttribute("primarycontactid").setValue([{ id: recorid, name: ContactPerson, entityType: ContactType}]);
                        //Xrm.Page.getAttribute("primarycontactid").setValue(ContactPerson);
                    }
                }
    	    } else {        
                console.error('Error:'+xhr.responseText);        
        	}
        }
        
        xhr.send(JSON.stringify(data)); 
    } 

}

function setLinkCustomerCRM(guidMDM, guidCRM){
        
        var data = {};
        data.guidMDM = guidMDM.toLowerCase();
        data.guidCRM = guidCRM.toLowerCase();
    
        url=getTargetUrlPrefix()+getTargetUrlFolder()+'/CustomerMdmAddService/Customer.aspx/SetLink_Customer_CRM';

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

function getCountry(countryName, callback){

    var req = new XMLHttpRequest();    
    req.open("GET", Xrm.Page.context.getClientUrl() + "/api/data/v8.2/new_countries?$select=new_countryid,new_name&$filter=new_name eq '"+countryName+"'", true);
    req.setRequestHeader("OData-MaxVersion", "4.0");
    req.setRequestHeader("OData-Version", "4.0");
    req.setRequestHeader("Accept", "application/json");
    req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    req.setRequestHeader("Prefer", "odata.include-annotations=\"*\"");
    req.onreadystatechange = function() {
     if (req.readyState === 4) {
        req.onreadystatechange = null;
        if (req.status === 200) {
            var results = JSON.parse(req.response);
            for (var i = 0; i < results.value.length; i++) {
                var new_countryid = results.value[i]["new_countryid"];
                //var new_name = results.value[i]["new_name"];
                callback(new_countryid);                                
            }

        } else {
            Xrm.Utility.alertDialog(req.statusText);
        }
     }
    };
    req.send();

}