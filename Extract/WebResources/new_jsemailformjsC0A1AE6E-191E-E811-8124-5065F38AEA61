function OnLoad() {
    //debugger;
    var status = Xrm.Page.getAttribute('statuscode').getValue();
    var parent = Xrm.Page.getAttribute('parentactivityid').getValue();
    if (parent == null || parent.length == 0 || status  != 1) {
        return;
    }
    Alert.showLoading();
    try {
        Process.callWorkflow("8F13C96F-173D-4A0E-A37E-52BA6E366814",  // Process: AttachmentsFromSharepoint
            Xrm.Page.data.entity.getId(),
            function () {
                console.log("Workflow AttachmentsFromSharepoint executed successfully");
                var subgrid = Xrm.Page.ui.controls.get("attachmentsGrid");
                subgrid .refresh();
                Alert.hide();
            },
            function () {
                Alert.hide();
                console.error("Error executing workflow AttachmentsFromSharepoint");
            });
    }
    catch(ex) {
        Alert.hide()
    }
}