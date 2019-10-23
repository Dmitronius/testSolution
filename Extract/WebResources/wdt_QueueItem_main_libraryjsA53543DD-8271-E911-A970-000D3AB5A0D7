function mergeCasesOnQueueItemView(selectedControl, selectedItemsIds) {
    let gridContext = selectedControl;
    let queueItemIDArr = [];
    selectedItemsIds.forEach((element, index) => {
        queueItemIDArr[index] = element.Id.replace('{', '').replace('}', '');
    }
    )
    getCasesForMergeByQueueItem(queueItemIDArr, function (caseObjArr) {
        XrmCore.Commands.Merge.mergeRecordsLegacy(gridContext, caseObjArr, 112);
    });

}

function getCasesForMergeByQueueItem(queueItemIDArr, callback) {
    queueItemIDArrString = "['" + queueItemIDArr.join("','") + "']";
    let caseObjArr = [];
    let caseObj = { Id: "", Name: "" };
    Xrm.WebApi.online.retrieveMultipleRecords("queueitem", "?$expand=objectid_incident($select=incidentid,title)&$filter=Microsoft.Dynamics.CRM.In(PropertyName='queueitemid',PropertyValues= " + queueItemIDArrString + ") eq true").then(
        function success(results) {
            for (var i = 0; i < results.entities.length; i++) {
                caseObjArr[i] = { Id: results.entities[i]["objectid_incident"]["incidentid"] , Name: results.entities[i]["objectid_incident"]["title"] };
            }
            callback(caseObjArr);
        },
        function (error) {
            Xrm.Utility.alertDialog(error.message);
        }
    );
}