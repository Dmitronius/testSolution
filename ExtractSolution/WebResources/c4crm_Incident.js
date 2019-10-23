WebResourceDocumentsFromAssociatedEmails = {
    WasOpened: false,
    TabStateChange: function (context) {
        if (!WebResourceDocumentsFromAssociatedEmails.WasOpened) {
            if (parent.$('div[name="DocumentsFromAssociatedEmailsTab"]').length > 0) {
                var tab = parent.$('div[name="DocumentsFromAssociatedEmailsTab"]');
                var section = parent.$(tab).find('table.ms-crm-FormSection[name="DocumentsFromAssociatedEmailsSection"]');
                if (parent.$(section).length > 0) {
                    var headTable = '<tr style="background-color: rgba(246,247,248,1); color: #505050 !important; font-size: 12px;">' +
	                                    '<td colspan="2" style="position: relative;">' +
		                                    '<div style="width: 50%; position: absolute; top: 12px;">File Name</div>' +
		                                    '<div style="width: 50%; position: absolute; right: 10px; top: 12px;">File Size</div>' +
	                                    '</td>' +
                                    '</tr>';
                    parent.$(section).find('tbody').prepend(headTable);
                }
            }
            WebResourceDocumentsFromAssociatedEmails.WasOpened = true;
        }
    }
};