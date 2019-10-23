$(document).ready(function () {

    var navListItems = $('div.setup-panel div a'),
    allWells = $('.setup-content'),
    allNextBtn = $('.nextBtn'),
    allPrevBtn = $('.prevBtn');

    allWells.hide();

    navListItems.click(function (e) {
        e.preventDefault();
        var $target = $($(this).attr('href')),
        $item = $(this);

        if (!$item.hasClass('disabled')) {
            navListItems.removeClass('btn-primary').addClass('btn-default');
            $item.addClass('btn-primary');
            allWells.hide();
            $target.show();
            $target.find('input:eq(0)').focus();
        }
    });

    allNextBtn.click(function () {
        var curStep = $(this).closest(".setup-content"),
        curStepBtn = curStep.attr("id"),
        nextStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().next().children("a"),
        curInputs = curStep.find("input[type='text'],input[type='url']"),
        isValid = true;

        $(".form-group").removeClass("has-error");
        for (var i = 0; i < curInputs.length; i++) {
            if (!curInputs[i].validity.valid) {
                isValid = false;
                $(curInputs[i]).closest(".form-group").addClass("has-error");
            }
        }

        if (isValid)
            nextStepWizard.removeAttr('disabled').trigger('click');
    });

    allPrevBtn.click(function () {
        var curStep = $(this).closest(".setup-content"),
        curStepBtn = curStep.attr("id"),
        prevStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().prev().children("a"),
        curInputs = curStep.find("input[type='text'],input[type='url']"),
        isValid = true;

        $(".form-group").removeClass("has-error");
        for (var i = 0; i < curInputs.length; i++) {
            if (!curInputs[i].validity.valid) {
                isValid = false;
                $(curInputs[i]).closest(".form-group").addClass("has-error");
            }
        }

        if (isValid)
            prevStepWizard.removeAttr('disabled').trigger('click');
    });

    $('div.setup-panel div a.btn-primary').trigger('click');

    $('form-control').tooltip();
    $('control-label').tooltip();

    jQuery.fn.extend({
        disable: function (state) {
            return this.each(function () {
                this.disabled = state;
            });
        }
    });
    
    // FOS Gold    
    Quotation.PriceListId = $("#PriceList").val();    
    $("#Period_y").text(Quotation.SubscriptionPeriod + ' Years');

    //Default value (init)    

    //Set client     
    $('#Client option[value="' + Quotation.ClientId + '"]').attr("selected", true);

    if (Quotation.Vessels == null || Quotation.Vessels == '') {
        SetClient();
        //Wireless Access Point
        SetItemCount("Wireless", 1);
        //VOIP 
        SetItemCount("VOIP", 2);
        //DIDs
        SetItemCount("DID", 1);

        //Navigation Solution (Silver)
        SetItemCount($("#TypeECDISPack").val(), 1);

        //ARM, ADD, FOS Access option                  
        SetItemCount("ARM ", 1);
        $("#ARM").prop('checked', true);
        $("#ARM").attr('readonly', 'readonly');
        $("#ARM").attr('disabled', 'disabled');

        SetItemCount("ADD ", 1);
        $("#ADD").prop('checked', true);
        $("#ADD").attr('readonly', 'readonly');
        $("#ADD").attr('disabled', 'disabled');

        SetItemCount("AIR ", 1);
        $("#AIR").prop('checked', true);
        $("#AIR").attr('readonly', 'readonly');
        $("#AIR").attr('disabled', 'disabled');

        SetItemCount("ARTS Advanced", 1);
        $("#ARTS").prop('checked', true);
        $("#ARTS").attr('readonly', 'readonly');
        $("#ARTS").attr('disabled', 'disabled');

        SetItemCount("FOS Secure", 1);
        $("#FOSaccess").prop('checked', true);
        $("#FOSaccess").attr('readonly', 'readonly');
        $("#FOSaccess").attr('disabled', 'disabled');

        var index_init = Quotation.Items.findIndex(function (o) {
            return o.Id === $("#ASAT").val();
        })
        if (index_init !== -1) Quotation.Items[index_init].Quantity = 1;
    }
        //restore exist items 
    else {
        SetClientEdit();
        //Change name button
        $('#Create_Edit').html('Update quote');

        for (var i = 0; i < Quotation.Items.length; i++) {
            if (Quotation.Items[i].Quantity > 0) {
                Quotation.Items[i].Quantity = Quotation.Items[i].Quantity / Quotation.Vessels.length;
                //ASAT
                $("#ASAT option").each(function () {
                    if (Quotation.Items[i].Id == $(this).val()) {
                        $('#ASAT option[value="' + Quotation.Items[i].Id + '"]').attr("selected", true);
                    }
                });
                //Wireless Access Point        
                if (Quotation.Items[i].Name.indexOf("Wireless") >= 0) {
                    $('input[name="ExtraWirelessAP"]').val(Quotation.Items[i].Quantity - 1);
                }
                //VOIP 
                if (Quotation.Items[i].Name.indexOf("VOIP") >= 0) {
                    $('input[name="ExtraVOIP"]').val(Quotation.Items[i].Quantity - 2);
                }
                //DIDs
                if (Quotation.Items[i].Name.indexOf("DID") >= 0) {
                    $('input[name="ExtraDID"]').val(Quotation.Items[i].Quantity - 1);
                }

                //Backup Supply 
                if ((Quotation.Items[i].Name.indexOf("Iridium") >= 0) || (Quotation.Items[i].Name.indexOf("Intellian") >= 0)) {
                    $('#BackupSupply option[value="Transas"]').attr("selected", true);
                    document.getElementById("BackupHWCustomer").style.display = "none";
                    document.getElementById("BackupAirtimeCustomer").style.display = "none";
                    document.getElementById("BackupHW").style.display = "block";
                    document.getElementById("BackupHWType").style.display = "block";
                }

                //BackupSupplyHWType, BackupSupplyHW
                $("#BackupSupplyHWType option").each(function () {
                    if (Quotation.Items[i].Id == $(this).val()) {
                        $('#BackupSupplyHWType option[value="' + Quotation.Items[i].Id + '"]').attr("selected", true);
                        $('#BackupSupplyHW option[value="Transas"]').attr("selected", true);
                    }
                });

                //Airtime plan FB.
                $("#BackupAirtimePlanFB option").each(function () {
                    if (Quotation.Items[i].Id === $(this).val()) {
                        $('#BackupAirtimePlanFB option[value="' + Quotation.Items[i].Id + '"]').attr("selected", true);
                        document.getElementById("BackupAirtimePlanFB").style.display = "block";
                        document.getElementById("BackupAirtimePlan").style.display = "none";
                    }
                });

                //Airtime plan
                $("#BackupAirtimePlan option").each(function () {
                    if (Quotation.Items[i].Id === $(this).val()) {
                        $('#BackupAirtimePlan option[value="' + Quotation.Items[i].Id + '"]').attr("selected", true);
                        document.getElementById("BackupAirtimePlan").style.display = "block";
                        document.getElementById("BackupAirtimePlanFB").style.display = "none";
                    }
                });

                //ECDIS
                $("#TypeECDISPack option").each(function () {
                    if (Quotation.Items[i].Name.indexOf($(this).val()) >= 0) {
                        $('#TypeECDISPack option[value="' + $(this).val() + '"]').attr("selected", true);
                        if ($(this).val().indexOf("Silver") >= 0) {
                            document.getElementById("RIB").style.display = "none";
                            document.getElementById("Display26").style.display = "none";
                            document.getElementById("ES6Keyboard").style.display = "block";
                        }
                        else if ($(this).val().indexOf("Platinum") >= 0) {
                            document.getElementById("RIB").style.display = "block";
                            document.getElementById("Display26").style.display = "block";
                            document.getElementById("ES6Keyboard").style.display = "none";
                        }
                    }
                });

                //RIB
                if (Quotation.Items[i].Name.indexOf("RIB") >= 0) {                    
                    $('#RIB option[value="' + Quotation.Items[i].Quantity + '"]').attr("selected", true);
                }

                //Console
                if (Quotation.Items[i].Name.indexOf("Console") >= 0) {
                    $('#console option[value="' + Quotation.Items[i].Quantity + '"]').attr("selected", true);
                }

                //ES6
                if (Quotation.Items[i].Name.indexOf("Keyboard") >= 0) {
                    $('#keyboard option[value="' + Quotation.Items[i].Quantity + '"]').attr("selected", true);                    
                }

                //Flagstate!!!!
                if (Quotation.Items[i].Name.indexOf("Diode") >= 0) {
                    //Greece
                    if (Quotation.Items[i].Quantity === 1) {
                        $('#SpecialPack option[value="Greece"]').attr("selected", true);                        
                    }
                }

                if (Quotation.Items[i].Name.indexOf("Battery") >= 0) {
                    if (Quotation.Items[i].Quantity === 2) {
                        var power = false;
                        for (var j = 0; j < Quotation.Items.length; j++) {
                            if (Quotation.Items[j].Quantity > 0) {
                                if (Quotation.Items[j].Name.indexOf("Power Supply") >= 0) {
                                    power = true;
                                    break;
                                }
                            }
                        }

                        //Netherland
                        if (power) {
                            $('#SpecialPack option[value="Netherland"]').attr("selected", true);                            
                        }
                        //Malta
                        else {
                            $('#SpecialPack option[value="Malta"]').attr("selected", true);                            
                        }
                    }
                }

                //A-SUITE
                if (Quotation.Items[i].Name.indexOf("A-SUITE") >= 0) {
                    $('#ASUITELifeTimeSubscription').prop('checked', true);
                }
                //FOS Secure
                if (Quotation.Items[i].Name.indexOf("FOS Secure") >= 0) {
                    $('#FOSaccess').prop('checked', true);
                }
                //ADD
                if (Quotation.Items[i].Name.indexOf("ADD Advanced") >= 0) {
                    $('#ADD').prop('checked', true);
                }
                //ARM
                if (Quotation.Items[i].Name.indexOf("ARM Advanced") >= 0) {
                    $('#ARM').prop('checked', true);
                }
                //AIR
                if (Quotation.Items[i].Name.indexOf("AIR Advanced") >= 0) {
                    $('#AIR').prop('checked', true);
                }
                //AID
                if (Quotation.Items[i].Name.indexOf("AID Anomaly") >= 0) {
                    $('#AID').prop('checked', true);
                }
                //AIM
                if (Quotation.Items[i].Name.indexOf("AIM Advanced") >= 0) {
                    $('#AIM').prop('checked', true);
                }
                //ADP
                if (Quotation.Items[i].Name.indexOf("ADP Advanced") >= 0) {
                    $('#ADP').prop('checked', true);
                }
                //ARTS
                if (Quotation.Items[i].Name.indexOf("ARTS Advanced") >= 0) {
                    $('#ARTS').prop('checked', true);
                }
            }
        }

        if (Quotation.Messages.length == 1) {
            $('#DescribeCustomerProvidedSolutionBackupHW').val(Quotation.Messages[0]);
        } else if (Quotation.Messages.length == 2) {
            $('#DescribeCustomerProvidedSolutionBackupHW').val(Quotation.Messages[0]);
            $('#DescribeCustomerProvidedSolutionBackupAirtime').val(Quotation.Messages[1]);
        }

        PostData();
    }

    //help
    $("#helpASAT").text($('#ASAT option:selected').attr('title'));
    $("#helpBackupSupply").text($('#BackupSupply option:selected').attr('title'));
    $("#helpBackupSupplyHW").text($('#BackupSupplyHW option:selected').attr('title'));
    $("#helpECDIS").text($('#TypeECDISPack option:selected').attr('title'));

    $("#Client").change(function () {
        SetClient();
    });

    //Events
    function SetClient() {

        var options = '';
        Quotation.ClientId = $("#Client").val();
        Quotation.Vessels = [];
        $("#VesselList").empty();
        for (var i = 0; i < Vessels.length; i++) {
            if (Vessels[i].ClientId === Quotation.ClientId || Vessels[i].ManagerId === Quotation.ClientId) {
                options += '<label><input type="checkbox" id="VesselName" value="'
                          + Vessels[i].VesselName + '">' +
                          Vessels[i].VesselName + ' (' + Vessels[i].IMO + ')</label><br/>';
                Quotation.Vessels.push(Object.assign({}, Vessels[i]));
            }
        }

        if (options === '') {
            //Quotation.Vessels = [];
        }
        else {
            $("#VesselList").append(options);
            for (var i = 0; i < Quotation.Vessels.length; i++) {
                Quotation.Vessels[i].ClientId = '00000000-0000-0000-0000-000000000000';
            }
        }
    }

    function SetClientEdit() {
        var options = '';
        Quotation.ClientId = $("#Client").val();
        $("#VesselList").empty();
        for (var i = 0; i < Vessels.length; i++) {
            if (Vessels[i].ClientId === Quotation.ClientId || Vessels[i].ManagerId === Quotation.ClientId) {
                options += '<label><input type="checkbox" id="VesselName" value="'
                          + Vessels[i].VesselName + '">' +
                          Vessels[i].VesselName + ' (' + Vessels[i].IMO + ')</label><br/>';
            }
        }
        $("#VesselList").append(options);

        for (var i = 0; i < Quotation.Vessels.length; i++) {
            $('input[value="' + Quotation.Vessels[i].VesselName + '"]').prop('checked', true);
        }
    }

    $(document).on('change', '[type=checkbox]', function () {
        if ($(this).attr('id') == 'VesselName') {
            var labelName = $(this).val();
            if ($(this).is(':checked')) {
                var index = Quotation.Vessels.findIndex(function (o) {
                    return o.VesselName === labelName;
                })
                if (index !== -1) Quotation.Vessels[index].ClientId = Quotation.ClientId;
            }
            else {
                var index = Quotation.Vessels.findIndex(function (o) {
                    return o.VesselName === labelName;
                })
                if (index !== -1) Quotation.Vessels[index].ClientId = '00000000-0000-0000-0000-000000000000';
            }
            PostData();
        }
    });


    $("#ASAT").change(function () {
        $("#helpASAT").text($('#ASAT option:selected').attr('title'));
        $("#ASAT option").each(function () {
            var ASATName = $(this).val();
            var index_init = Quotation.Items.findIndex(function (o) {
                return o.Id === ASATName;
            })
            if ($(this).is(':selected')) {
                if (index_init !== -1) Quotation.Items[index_init].Quantity = 1;
            }
            else {
                if (index_init !== -1) Quotation.Items[index_init].Quantity = 0;
            }
        });
        PostData();
    });

    $('input[name="ExtraWirelessAP"]').change(function () {
        SetItemCount("Wireless", 1 + parseInt($(this).val()));
        PostData();
    });

    //VOIP
    $('input[name="ExtraVOIP"]').change(function () {
        SetItemCount("VOIP", 2 + parseInt($(this).val()));
        PostData();
    });
    //DIDs
    $('input[name="ExtraDID"]').change(function () {
        SetItemCount("DID", 1 + parseInt($(this).val()));
        PostData();
    });

    $("#BackupSupply").change(function () {
        $("#helpBackupSupply").text($('#BackupSupply option:selected').attr('title'));
        if ($('option:selected', this).text() == "Customer Supply") {
            document.getElementById("BackupHWCustomer").style.display = "block";
            document.getElementById("BackupAirtimeCustomer").style.display = "block";
            document.getElementById("BackupHW").style.display = "none";
            document.getElementById("BackupHWType").style.display = "none";
            document.getElementById("BackupAirtimePlan").style.display = "none";
            document.getElementById("BackupAirtimePlanFB").style.display = "none";
            ResetAirTimePackage();
            ResetHWPack();
            PostData();
        }
        else {
            document.getElementById("BackupHWCustomer").style.display = "none";
            document.getElementById("BackupAirtimeCustomer").style.display = "none";
            document.getElementById("BackupHW").style.display = "block";
            document.getElementById("BackupHWType").style.display = "block";
            document.getElementById("BackupAirtimePlan").style.display = "block";
            $('#DescribeCustomerProvidedSolutionBackupHW').val('');
            $('#DescribeCustomerProvidedSolutionBackupAirtime').val('');
            ResetAirTimePackage();
            ResetHWPack();
            SetPackage();
            PostData();
        }
    });

    $("#BackupSupplyHW").change(function () {
        $("#helpBackupSupplyHW").text($('#BackupSupplyHW option:selected').attr('title'));
        ResetAirTimePackage();
        ResetHWPack();
        SetPackage();
        PostData();
    });

    $("#BackupHWType").change(function () {
        if ($('option:selected', this).text() == "Iridium Pilot") {
            document.getElementById("BackupAirtimePlan").style.display = "block";
            document.getElementById("BackupAirtimePlanFB").style.display = "none";
        }
        if ($('option:selected', this).text() == "Intellian FB250" || $('option:selected', this).text() == "Intellian FB500") {
            document.getElementById("BackupAirtimePlan").style.display = "none";
            document.getElementById("BackupAirtimePlanFB").style.display = "block";
        }
        ResetAirTimePackage();
        ResetHWPack();
        SetPackage();
        PostData();
    });

    $("#BackupAirtimePlan").change(function () {
        ResetAirTimePackage();
        SetPackage();
        PostData();
    });
        
    $("#TypeECDISPack").change(function () {
        $("#helpCDIS").text($('#TypeECDISPack option:selected').attr('title'));
        if ($('option:selected', this).text() == "Silver") {
            document.getElementById("RIB").style.display = "none";
            SetItemCount("RIB", 0);
            document.getElementById("Display26").style.display = "none";
            SetItemCount("ECDIS 24", 0);
            SetItemCount("ECDIS 26", 0);
            SetItemCount("ECDIS MPC24", 1);
            document.getElementById("ES6Keyboard").style.display = "block";
            SetItemCount("ES6", parseInt($("#keyboard option:selected").val()));            

        }
        else if ($('option:selected', this).text() == "Platinum") {
            document.getElementById("RIB").style.display = "block";            
            SetItemCount("RIB", parseInt($("#RIB option:selected").val()));
            document.getElementById("Display26").style.display = "block";
            if ($("#Display").is(':checked')) {
                SetItemCount("ECDIS MPC24", 0);
                SetItemCount("ECDIS 24", 0);
                SetItemCount("ECDIS 26", 1);
            }
            else {
                SetItemCount("ECDIS MPC24", 0);
                SetItemCount("ECDIS 24", 1);
                SetItemCount("ECDIS 26", 0);
            }
            document.getElementById("ES6Keyboard").style.display = "none";
            SetItemCount("ES6", 0);
        }
        PostData();
    });

    //Console         
    $("#console").change(function () {        
        SetItemCount("Console", parseInt($('option:selected', this).text()));
        PostData();
    });

    //Keyboard    
    $("#keyboard").change(function () {
        SetItemCount("ES6", parseInt($('option:selected', this).text()));
        PostData();
    });

    //RIB    
    $("#RIB").change(function () {
        SetItemCount("RIB", parseInt($('option:selected', this).text()));
        PostData();
    });

    //Display 26
    $("#Display").change(function () {
        if ($("#Display").prop('checked')) {
            SetItemCount("ECDIS 24", 0);
            SetItemCount("ECDIS 26", 1);
        }
        else {
            SetItemCount("ECDIS 24", 1);
            SetItemCount("ECDIS 26", 0);
        }
        PostData();
    });


    //Flagstate pack    
    $("#SpecialPack").change(function () {
        if ($('option:selected', this).text() === "None") {
            SetItemCount("Redundancy Diode", 0);
            SetItemCount("Battery 12Ah", 0);
            SetItemCount("Power Supply", 0);
        }
        else if ($('option:selected', this).text() === "Greece") {
            SetItemCount("Redundancy Diode", 1);
            SetItemCount("Battery 12Ah", 0);
            SetItemCount("Power Supply", 0);
        }
        else if ($('option:selected', this).text() === "Malta") {
            SetItemCount("Redundancy Diode", 0);
            SetItemCount("Battery 12Ah", 2);
            SetItemCount("Power Supply", 0);
        }
        else if ($('option:selected', this).text() === "Netherland") {
            SetItemCount("Redundancy Diode", 2);
            SetItemCount("Battery 12Ah", 2);
            SetItemCount("Power Supply", 2);
        }
        PostData();
    });
    
    $("#ASUITELifeTimeSubscription").change(function () {
        if ($("#ASUITELifeTimeSubscription").is(':checked')) {
            SetItemCount("A-SUITE", 1);
            SetItemCount("FOS Secure", 1);
            $("#FOSaccess").prop('checked', true);
            $("#FOSaccess").attr('readonly', true);
            $("#FOSaccess").attr('disabled', true);
            SetItemCount("ADD ", 1);
            $("#ADD").prop('checked', true);
            $("#ADD").attr('readonly', true);
            $("#ADD").attr('disabled', true);
            SetItemCount("ARM ", 1);
            $("#ARM").prop('checked', true);
            $("#ARM").attr('readonly', true);
            $("#ARM").attr('disabled', true);
            SetItemCount("AIR ", 1);
            $("#AIR").prop('checked', true);
            $("#AIR").attr('readonly', true);
            $("#AIR").attr('disabled', true);
            SetItemCount("AID ", 1);
            $("#AID").prop('checked', true);
            $("#AID").attr('readonly', true);
            $("#AID").attr('disabled', true);
            SetItemCount("AIM ", 1);
            $("#AIM").prop('checked', true);
            $("#AIM").attr('readonly', true);
            $("#AIM").attr('disabled', true);
            SetItemCount("ADP ", 1);
            $("#ADP").prop('checked', true);
            $("#ADP").attr('readonly', true);
            $("#ADP").attr('disabled', true);
            SetItemCount("ARTS ", 1);
            $("#ARTS").prop('checked', true);
            $("#ARTS").attr('readonly', true);
            $("#ARTS").attr('disabled', true);
        }
        else {
            SetItemCount("A-SUITE", 0);
            SetItemCount("AID ", 0);
            $("#AID").prop('checked', false);
            $("#AID").attr('readonly', false);
            $("#AID").attr('disabled', false);
            SetItemCount("AIM ", 0);
            $("#AIM").prop('checked', false);
            $("#AIM").attr('readonly', false);
            $("#AIM").attr('disabled', false);
            SetItemCount("ADP ", 0);
            $("#ADP").prop('checked', false);
            $("#ADP").attr('readonly', false);
            $("#ADP").attr('disabled', false);
        }
        PostData();
    });

    $("#AID").change(function () {
        if ($("#AID").is(':checked')) {
            SetItemCount("AID ", 1);
        }
        else {
            SetItemCount("AID ", 0);
        }
        PostData();
    });

    function SetItemCount(ItemName, count) {
        var index_init = Quotation.Items.findIndex(function (o) {
            return o.Name.indexOf(ItemName) >= 0;
        })
        if (index_init != -1) Quotation.Items[index_init].Quantity = count;
    }

    function PostData() {
        var subscriptionPeriod = Quotation.SubscriptionPeriod * 12;
        var discount = 0.25;
        var CountVessel = 0;
        var Price = 0;
        for (var i = 0; i < Quotation.Vessels.length; i++) {
            if (Quotation.Vessels[i].ClientId != '00000000-0000-0000-0000-000000000000') {
                CountVessel++;
            }
        }

        for (var i = 0; i < Quotation.Items.length; i++) {
            if (Quotation.Items[i].Quantity > 0) {
                Price += Quotation.Items[i].Quantity * Quotation.Items[i].Amount;
            }
        }

        $("#Period").text(subscriptionPeriod + ' months');
        $("#PrepFee").text("$ 2 500");
        $("#PrepFeeAll").text("$ " + blankDigit((CountVessel * 2500).toFixed(0)));
        $("#MarketPriceTop").text("$ " + blankDigit((Price).toFixed(0)));
        $("#MarketPrice").text("$ " + blankDigit((Price).toFixed(0)));
        $("#MarketPriceAll").text("$ " + blankDigit(((Price) * subscriptionPeriod * CountVessel).toFixed(0)));
        $("#SubscriptionPricePerMonth").text("$ " + blankDigit((Price - Price * discount).toFixed(0)));
        $("#SubscriptionPricePerDay").text("$ " + blankDigit((((Price - Price * discount) * 12) / 365).toFixed(0)));
        $("#SubscriptionPriceMarket").text("$ " + blankDigit((Price).toFixed(0)));
        $("#SavingMonth").text("saving of $ " + blankDigit((Price * discount).toFixed(0)) + " / month and vessel");
        $("#SubscriptionPricePerMonth2").text($("#SubscriptionPricePerMonth").text());
        $("#SubscriptionPricePerDay2").text($("#SubscriptionPricePerDay").text());
        $("#SubscriptionPriceAll").text("$ " + blankDigit(((Price - Price * discount) * subscriptionPeriod * CountVessel).toFixed(0)));
        $("#CountVessel").text(CountVessel);
        $("#Period").text(subscriptionPeriod);
        $("#TotalPricePerMonthAndFee").text("$ " + blankDigit((Price - Price * discount + 2500).toFixed(0)));
        $("#TotalPricePerMonthAllAndFee").text("$ " + blankDigit(((Price - Price * discount) * subscriptionPeriod * CountVessel + (CountVessel * 2500)).toFixed(0)));

        //Check count of selected vessels (disable Next button if not selected)
        if (CountVessel > 0) {
            $('#Next').disable(false);
        }
        else {
            $('#Next').disable(true);
        }
    }


    $("#Create_Edit").click(function () {
        if ($('#DescribeCustomerProvidedSolutionBackupHW').val().trim() != '') {
            Quotation.Messages[0] = $('#DescribeCustomerProvidedSolutionBackupHW').val();
        }
        if ($('#DescribeCustomerProvidedSolutionBackupAirtime').val().trim() != '') {
            Quotation.Messages[1] = $('#DescribeCustomerProvidedSolutionBackupAirtime').val();
        }


        $('#Create_Edit').disable(true);
        $('#Previous').disable(true);
        document.getElementById("loader").style.display = "block";
        var q = JSON.stringify(Quotation);
        $.post('Home/CreateQuote', { Quotation: q }, function (responseData) {
            alert(responseData);
            document.getElementById("loader").style.display = "none";
            $('#Create_Edit').disable(false);
            $('#Previous').disable(false);
            window.close();
        });
    });

    function blankDigit(digit) {
        return digit.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
    }

    function ResetAirTimePackage() {
        for (var i = 0; i < Quotation.Items.length; i++) {
            if (Quotation.Items[i].Name.indexOf("Fleet ") >= 0 || (Quotation.Items[i].Name.indexOf("Iridium ") >= 0 && Quotation.Items[i].Name.indexOf("MB") >= 0)) {
                Quotation.Items[i].Quantity = 0;
            }
        }
    }

    function ResetHWPack() {
        for (var i = 0; i < Quotation.Items.length; i++) {
            if (Quotation.Items[i].Name.indexOf("Iridium Pilot") >= 0 || Quotation.Items[i].Name.indexOf("Intellian FB250") >= 0 || Quotation.Items[i].Name.indexOf("Intellian FB500") >= 0) {
                Quotation.Items[i].Quantity = 0;
            }
        }
    }

    function SetPackage() {
        //Airtime
        if ($("#BackupSupplyHWType :selected").text() === "Iridium Pilot") {
            var index_init = Quotation.Items.findIndex(function (o) {
                return o.Name.indexOf($("#BackupAirtimePlan :selected").text()) >= 0;
            })
            if (index_init !== -1) Quotation.Items[index_init].Quantity = 1;
        }
        else {
            var index_init = Quotation.Items.findIndex(function (o) {
                return o.Name.indexOf($("#BackupAirtimePlanFB :selected").text()) >= 0;
            })
            if (index_init !== -1) Quotation.Items[index_init].Quantity = 1;
        }
        //HW
        if ($("#BackupSupplyHW :selected").text() === "Transas Supply") {
            var index_init = Quotation.Items.findIndex(function (o) {
                return o.Name.indexOf($("#BackupSupplyHWType :selected").text()) >= 0;
            })
            if (index_init !== -1) Quotation.Items[index_init].Quantity = 1;
        }
    }
});