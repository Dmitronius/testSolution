// JavaScript source code
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

if (typeof (leadMain) == "undefined")
    leadMain = new Object();

leadMain.ListOfCountries = function () {
    return new Array('Algeria', 'Angola', 'Argentina', 'Australia', 'Austria', 'Baltic states', 'Bangladesh', 'Belgium', 'Benelux', 'British Virgin Islands', 'Bulgaria', 'Canada', 'Caribbean', 'Central America', 'Channel Islands', 'Chile', 'China', 'Croatia', 'Cuba', 'Cyprus', 'Denmark', 'Direct Sales', 'Commonwealth of Dominica', 'Egypt', 'Estonia', 'Finland', 'France', 'Georgia', 'Germany', 'Gibraltar', 'Greece', 'Guam', 'Holland', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Ireland', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Kenya', 'Korea', 'Kuwait', 'Latin America', 'Latvia', 'Lebanon', 'Libya', 'Luxembourg', 'Madagascar', 'Malaysia', 'Malta', 'Mauritania', 'Mediterranean', 'Mexico', 'Middle America', 'Montenegro', 'Morocco', 'Mozambique', 'Myanmar', 'Namibia', 'New Zealand', 'Nigeria', 'North Africa', 'Norway', 'Oman', 'Pakistan', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Republic of Mauritius', 'Romania', 'Russia', 'Saudi Arabia', 'Serbia', 'Seychelles', 'Singapore', 'Slovenia', 'South Africa', 'South America', 'Spain', 'Sri Lanka', 'Sweden', 'Switzerland', 'Taiwan', 'Thailand', 'Tunisia', 'Turkey', 'United Arab Emirates', 'United Kingdom', 'Ukraine', 'USA', 'Venezuela', 'Vietnam');
};

// Function for adding suggestion functionality
// for text input fields in Microsoft CRM
// textfield: document.getElementById('address1_country')
// method: a function, that returns an array of strings 
// preload: true or false
leadMain.SuggestionTextBox = function (textfield, method, preload) {
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
        //textfield.detachEvent("onblur",resetTextfield);
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
                    if (document.getElementById('suggestion_table') != null)
                        document.body.removeChild(document.getElementById('suggestion_table'));
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

        if (countMatches > 0)
            createSuggestionTable();
        else if (document.getElementById('suggestion_table'))
            document.body.removeChild(document.getElementById('suggestion_table'));
    }

    function createSuggestionTable() {
        if (document.getElementById('suggestion_table'))
            document.body.removeChild(document.getElementById('suggestion_table'));

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

    return this;
};

leadMain.OnLoadForm = function () {
    debugger;
    try {
        // more custom code
        var obj = leadMain.SuggestionTextBox(Xrm.Page.getAttribute("address1_country").getValue(), leadMain.ListOfCountries, true);
    }
    catch (e) {
        console.log(e.message);
    }
};

leadMain.OnSaveForm = function () {
    try {
        // more custom code
    }
    catch (e) {
        console.log(e.message);
    }
};

leadMain.onChange_address1_country = function () {
    debugger;
    try {
        // field "address1_country" onchange
        var obj = leadMain.SuggestionTextBox(Xrm.Page.getAttribute("address1_country").getValue(), leadMain.ListOfCountries, true);
        // more custom code
    }
    catch (e) {
        console.log(e.message);
    }
};