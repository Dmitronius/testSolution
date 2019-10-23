/**
 * Функционал риббонов Клиента
 */
var AccountRibbon = new function() {

	var pthis = this;

	/**
	 * Логика нажатия кнопки на 'MDM'
	 */
    pthis.MmdButtonClickLogic = function () {

        // обновление поля nav_ismdmbuttonpressed на true
        var accountId = Xrm.Page.data.entity.getId().replace(/{|}/g, '');
        var updatedAccount = new XrmServiceToolkit.Soap.BusinessEntity(Xrm.Page.data.entity.getEntityName(), accountId);
        
        updatedAccount.attributes["nav_ismdmbuttonpressed"] = { value: true, type: 'boolean' };
        
        XrmServiceToolkit.Soap.Update(updatedAccount, function(response) {

            console.log(response);

            Xrm.Utility.alertDialog("Информация отправлена в MDM");
        });
    };

	return pthis;
};