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
    }
    catch (e) {
        console.log(e.message);
    }
};

function _setVisible(fieldName, visible) {
    try {
        Xrm.Page.getControl(fieldName).setVisible(visible);
    }
    catch (e) {
        console.log(e.message);
    }
};

function _toRequirementLevel(boolValue) {
    try {
        return boolValue ? "required" : "none";
    }
    catch (e) {
        console.log(e.message);
    }
};

function _addEventHandler(elem, eventType, handler) {
    if (elem.addEventListener)
        elem.addEventListener(eventType, handler, false);
    else if (elem.attachEvent)
        elem.attachEvent('on' + eventType, handler);
}

function _removeEventHandler(elem, eventType, handler) {
    if (elem.removeEventListener)
        elem.removeEventListener(eventType, handler, false);
    else if (elem.detachEvent)
        elem.detachEvent('on' + eventType, handler);
}

/* helper functions */

if (typeof (newAreaMain) == "undefined")
    newAreaMain = new Object();

newAreaMain.ListOfCountries = function () {
    return new Array('Andorra', 'United Arab Emirates', 'Afghanistan', 'Antigua And Barbuda', 'Anguilla', 'Albania', 'Armenia', 'Netherlands Antilles', 'Angola', 'Antarctica', 'Argentina', 'American Samoa', 'Austria', 'Australia', 'Aruba', 'Åland Islands', 'Azerbaijan', 'Bosnia And Herzegovina', 'Barbados', 'Bangladesh', 'Belgium', 'Burkina Faso', 'Bulgaria', 'Bahrain', 'Burundi', 'Benin', 'Saint Barthélemy', 'Bermuda', 'Brunei Darussalam', 'Bolivia', 'Brazil', 'Bahamas', 'Bhutan', 'Bouvet Island', 'Botswana', 'Belarus', 'Belize', 'Canada', 'Cocos (Keeling) Islands', 'Congo', 'Central African Republic', 'Congo', 'Switzerland', 'Côte D\'ivoire', 'Cook Islands', 'Chile', 'Cameroon', 'China', 'Colombia', 'Costa Rica', 'Cuba', 'Cape Verde', 'Christmas Island', 'Cyprus', 'Czech Republic', 'Germany', 'Djibouti', 'Denmark', 'Dominica', 'Dominican Republic', 'Algeria', 'Ecuador', 'Estonia', 'Egypt', 'Western Sahara', 'Eritrea', 'Spain', 'Ethiopia', 'Finland', 'Fiji', 'Falkland Islands (Malvinas)', 'Micronesia', 'Faroe Islands', 'France', 'Gabon', 'United Kingdom', 'Grenada', 'Georgia', 'French Guiana', 'Guernsey', 'Ghana', 'Gibraltar', 'Greenland', 'Gambia', 'Guinea', 'Guadeloupe', 'Equatorial Guinea', 'Greece', 'South Georgia And The South Sandwich Islands', 'Guatemala', 'Guam', 'Guinea-Bissau', 'Guyana', 'Hong Kong', 'Heard And Mc Donald Islands', 'Honduras', 'Croatia', 'Haiti', 'Hungary', 'Indonesia', 'Ireland', 'Israel', 'Isle Of Man', 'India', 'British Indian Ocean Territory', 'Iraq', 'Iran', 'Iceland', 'Italy', 'Jersey', 'Jamaica', 'Jordan', 'Japan', 'Kenya', 'Kyrgyzstan', 'Cambodia', 'Kiribati', 'Comoros', 'Saint Kitts And Nevis', 'Korea, North', 'Korea, South', 'Kuwait', 'Cayman Islands', 'Kazakhstan', 'Lao People\'s Democratic Republic', 'Lebanon', 'Saint Lucia', 'Liechtenstein', 'Sri Lanka', 'Liberia', 'Lesotho', 'Lithuania', 'Luxembourg', 'Latvia', 'Libyan Arab Jamahiriya', 'Morocco', 'Monaco', 'Moldova', 'Montenegro', 'Saint Martin', 'Madagascar', 'Marshall Islands', 'Macedonia', 'Mali', 'Myanmar', 'Mongolia', 'Macao', 'Northern Mariana Islands', 'Martinique', 'Mauritania', 'Montserrat', 'Malta', 'Mauritius', 'Maldives', 'Malawi', 'Mexico', 'Malaysia', 'Mozambique', 'Namibia', 'New Caledonia', 'Niger', 'Norfolk Island', 'Nigeria', 'Nicaragua', 'Netherlands', 'Norway', 'Nepal', 'Nauru', 'Niue', 'New Zealand', 'Oman', 'Panama', 'Peru', 'French Polynesia', 'Papua New Guinea', 'Philippines', 'Pakistan', 'Poland', 'St. Pierre And Miquelon', 'Pitcairn', 'Puerto Rico', 'Palestinian Territory, Occupied', 'Portugal', 'Palau', 'Paraguay', 'Qatar', 'Reunion', 'Romania', 'Serbia', 'Russia', 'Rwanda', 'Saudi Arabia', 'Solomon Islands', 'Seychelles', 'Sudan', 'Sweden', 'Singapore', 'St. Helena', 'Slovenia', 'Svalbard And Jan Mayen Islands', 'Slovakia', 'Sierra Leone', 'San Marino', 'Senegal', 'Somalia', 'Suriname', 'Sao Tome And Principe', 'El Salvador', 'Syrian Arab Republic', 'Swaziland', 'Turks And Caicos Islands', 'Chad', 'French Southern Territories', 'Togo', 'Thailand', 'Tajikistan', 'Tokelau', 'Timor-Leste', 'Turkmenistan', 'Tunisia', 'Tonga', 'Turkey', 'Trinidad And Tobago', 'Tuvalu', 'Taiwan', 'Tanzania', 'Ukraine', 'Uganda', 'United States Minor Outlying Islands', 'USA', 'Uruguay', 'Uzbekistan', 'Holy See (Vatican City State)', 'Saint Vincent And The Grenadines', 'Venezuela', 'Virgin Islands, British', 'Virgin Islands, U.S.', 'Viet Nam', 'Vanuatu', 'Wallis And Futuna Islands', 'Samoa', 'Yemen', 'Mayotte', 'South Africa', 'Zambia', 'Zimbabwe');
};

// JScript File
// Function for adding suggestion functionality
// for text input fields in Microsoft CRM
// textfield: document.getElementById('address1_country')
// method: a function, that returns an array of strings 
// preload: true or false
newAreaMain.SuggestionTextBox = function (textfield, method, preload) {
    //debugger;
    try {
        // max items in the suggestion box
        var maxItems = 6;

        this.suggestionList = new Array();
        this.suggestionListDisplayed = new Array();


        var actual_textfield = textfield;
        var actual_value = '';

        var selectedNumber = 0;
        var countMatches = 0;

        if (preload) {
            // load the data via external method
            this.suggestionList = method();
        }

        // attach this function to the textfield
        //textfield.attachEvent("onfocus", initTextfield);
        _addEventHandler(textfield, "focus", initTextfield);

        // init textfield and attach necessary events
        function initTextfield() {
            // when leaving the field we have to clear our site    
            //textfield.attachEvent("onblur", resetTextfield);
            //document.attachEvent("onkeydown", keyDown);
            _addEventHandler(textfield, "blur", resetTextfield);
            _addEventHandler(document, "keydown", keyDown);
        }

        function resetTextfield(e) {
            //when leaving the field, we have to remove all attached events
            //document.detachEvent("onkeydown", keyDown);
            //textfield.detachEvent("onblur", resetTextfield);
            _removeEventHandler(document, "keydown", keyDown);
            _removeEventHandler(textfield, "blur", resetTextfield);
        }

        function keyDown(e) {
            keyCode = e.keyCode;

            switch (keyCode) {
                case 9: case 13:
                    // enter & tab key
                    if (countMatches > 0) {
                        actual_textfield.value = suggestionListDisplayed[selectedNumber];
                        if (document.getElementById('suggestion_table') != null) {
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
                    break;
                case 40:
                    // pressing down key
                    if (selectedNumber < countMatches - 1 && countMatches > 0 && selectedNumber < maxItems) {
                        selectedNumber++;
                        createSuggestionTable();
                    }

                    return false;
                    break;
                default:
                    // do not call the function to often
                    setTimeout(
                                function () {
                                    executeSuggestion(keyCode)
                                }, 200 /* in ms */
                               );
                    break;
            }
        }

        function executeSuggestion(keyCode) {
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
            }
            else if (document.getElementById('suggestion_table')) {
                document.body.removeChild(document.getElementById('suggestion_table'));
            }
        }

        function createSuggestionTable() {

            if (document.getElementById('suggestion_table')) {
                document.body.removeChild(document.getElementById('suggestion_table'));
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
                row.onclick = function () { onSuggestClick(this.id); };

                column = row.insertCell(-1);
                column.id = 'suggestion_column' + (i);

                if (selectedNumber == i) {
                    column.style.color = '#ffffff';
                    column.style.backgroundColor = '#316AC5';
                }
                else {
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

            if (document.getElementById('suggestion_table') != null) {
                document.body.removeChild(document.getElementById('suggestion_table'));
            }
            actual_textfield.onchange();
        }

        return this;
    }
    catch (e) {
        console.log(e.message);
    }
};

newAreaMain.OnLoadForm = function () {
    //debugger;
    try {
        // more custom code
        var obj = newAreaMain.SuggestionTextBox(document.getElementById('new_country'), newAreaMain.ListOfCountries, true);
    }
    catch (e) {
        console.log(e.message);
    }
};

newAreaMain.OnSaveForm = function () {
    try {
        // more custom code
    }
    catch (e) {
        console.log(e.message);
    }
};

function Form_onload() {

};

newAreaMain.refreshNewName = function () {
    try {
        var newName = _getAttribute('new_name');
        var newCountryValue = _getAttributeValue('new_country');
        var newCityValue = _getAttributeValue('new_city');

        var newValue = newCountryValue + ";" + newCityValue;
        newName.setValue(newValue);
    }
    catch (e) {
        console.log(e.message);
    }
};

newAreaMain.onChange_new_city = function () {
    try {
        newAreaMain.refreshNewName();
    }
    catch (e) {
        console.log(e.message);
    }
};

newAreaMain.onChange_new_country = function () {
    try {
        newAreaMain.refreshNewName();
    }
    catch (e) {
        console.log(e.message);
    }
};