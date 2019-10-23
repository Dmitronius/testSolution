function preFillProductDetailsInfo (executionContext) {
    let fieldName = "wdt_productdetails" ;
    let formContext = executionContext.getFormContext();
    let formType = formContext.ui.getFormType();
    let productDetailControl = formContext.getControl(fieldName);
    let productDetailAttribute = formContext.getAttribute(fieldName);
    let preFillText = 'iOS Version: \nAndroid Version: \nPrimary Platform: \nModel: \nWärtsilä iSailor version: \nProtocol version: ';
    console.log(formType);
    console.log(productDetailAttribute.getValue());
    if ([1,2].includes(formType) && productDetailControl && productDetailAttribute.getValue() === null ) { 
        productDetailAttribute.setValue(preFillText);
    }
}