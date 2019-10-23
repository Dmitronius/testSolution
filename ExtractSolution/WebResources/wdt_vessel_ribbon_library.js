function displayRecordId(primaryControl) {
  let formContext = primaryControl;
  let entityId = formContext.data.entity
    .getId()
    .replace("{", "")
    .replace("}", "");
  let alertStrings = {
    text: "Please select Record ID and press Ctrl+C to copy it:\n" + entityId
  };
  let alertOptions = { height: 120, width: 480 };
  if (entityId) {
    Xrm.Navigation.openAlertDialog(alertStrings, alertOptions).then(
      function success(result) {
        console.log("Alert dialog closed");
      },
      function(error) {
        console.log(error.message);
      }
    );
  }
}
