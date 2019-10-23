function sharePointUpload(selectedControl, primaryEntityTypeCode)
{
	if (!primaryEntityTypeCode || primaryEntityTypeCode === 0)
	{
		var queryStringParams = Xrm.Page.context.getQueryStringParameters();
		if (queryStringParams && queryStringParams.etc)
		{
			primaryEntityTypeCode = queryStringParams.etc;
		}
	}
	Mscrm.CommandBarActions.sharePointUpload(selectedControl, primaryEntityTypeCode);
}