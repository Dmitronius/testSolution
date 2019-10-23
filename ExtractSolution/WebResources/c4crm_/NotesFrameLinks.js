var UnsupportedFileExtensions = "ade;adp;app;asa;ashx;asmx;asp;bas;bat;cdx;cer;chm;class;cmd;com;config;cpl;crt;csh;dll;exe;fxp;hlp;hta;htr;htw;ida;idc;idq;inf;ins;isp;its;jar;js;jse;ksh;lnk;mad;maf;mag;mam;maq;mar;mas;mat;mau;mav;maw;mda;mdb;mde;mdt;mdw;mdz;msc;msh;msh1;msh1xml;msh2;msh2xml;mshxml;msi;msp;mst;ops;pcd;pif;prf;prg;printer;pst;reg;rem;scf;scr;sct;shb;shs;shtm;shtml;soap;stm;tmp;url;vb;vbe;vbs;vsmacros;vss;vst;vsw;ws;wsc;wsf;wsh;p7m;";

///Add onclick for note upload
function addNotesUploadGif()
{
    $('#postButton.doneLink:first', window.parent.document).on('click', appendNotesUploadGif);
    $('#notesWall', window.parent.document).append(
        '<div id="notesUploadGif" '+
        'style="display: none;position: absolute; z-index: 1; left: 0;  top: 0;width: 100%;height: 100%;overflow: auto; background-color: rgb(0,0,0); background-color: rgba(0,0,0,0.1);">' +
        '<img src="../WebResources/c4crm_alert_load.gif" style="display:block; position: relative; margin:auto"/>' +
        '</div>');
}

//Add "Loading" gif when uploading note
function appendNotesUploadGif()
{
    var fileName = $("#createNote_attachFileIframe",window.parent.document).contents().find("#userFile").val();
    var isFileSelected = fileName ? true : false;
   
    if (isFileSelected)
    {
        var fileExtension = fileName.split('.').pop() + ';';
        if (UnsupportedFileExtensions.indexOf(fileExtension) != -1) {
            return;
        }
        var notesCount = getCurrentNodesCount();
        $('#notesUploadGif', window.parent.document).show();
        hideUploadGif(notesCount);
    }
}

//Hide "Loading" gif when note is uploaded
function hideUploadGif(notesCount)
{
    var curreNotesCount = getCurrentNodesCount();
    if (curreNotesCount > notesCount)
    {
        $('#notesUploadGif', window.parent.document).hide();
    }
    else
    {
        setTimeout(hideUploadGif, 100, notesCount);
    }
}

//Get current nodes count for current entity
function getCurrentNodesCount ()
{
    var fetchXml = "<fetch mapping='logical' aggregate='true'>" +
                          "<entity name='annotation'>" +
                            "<attribute name='annotationid' alias='count' aggregate='count'/> " +
                                "<filter type='and'>" +
                                   "<condition attribute='objectid' operator='eq' value='" + Xrm.Page.data.entity.getId() + "' />" +
                                 "</filter>" +
                          "</entity>" +
                       "</fetch>  ";
    var result = XrmServiceToolkit.Soap.Fetch(fetchXml);
    if (result && result[0].attributes.count.value)
    {
        return result[0].attributes.count.value;
    }
    return 0;
}

//Add custom functionality to notes tab
function addSharepointLinksToNotes()
{
	$('a[title="NOTES"]',window.parent.document).click(function() {
	    appendLinksToNotes();
	    addNotesUploadGif();
	});
}

//Add sharepoint link when click on node filename 
function appendLinksToNotes()
{
	var locationCache = {};
	var currentEntityId = Xrm.Page.data.entity.getId();
	var files = $("#notesWallContainer .attachmentFileName",window.parent.document);
	if (files.length == 0)
	{
		setTimeout(appendLinksToNotes,500);
	}
	else
	{
		$.each(files,function(index, value) {
		var filename = value.title;
		var filenameWithoutExtension = filename.replace(/\.[^/.]+$/, "");
		var filenameWithoutExtensionWithoutDots = filenameWithoutExtension.replace(/\./g, "-");
		filename = filename.replace(filenameWithoutExtension, filenameWithoutExtensionWithoutDots);
		var url = filename;
		var fetchXml = "<fetch mapping='logical' count='1'>"+
						   "<entity name='sharepointdocumentlocation'>"+
							  "<attribute name='relativeurl'/>"+ 
							  "<attribute name='parentsiteorlocation'/>"+ 
							  "<attribute name='sharepointdocumentlocationid'/>"+ 
								 "<filter type='and'>"+ 
									"<condition attribute='regardingobjectid' operator='eq' value='" + currentEntityId + "' />"+
								  "</filter>"+ 
						   "</entity>"+ 
						"</fetch>  ";
		var result = XrmServiceToolkit.Soap.Fetch(fetchXml);
		if (result && result.length && result.length > 0)
		{
			var sharepointDocLoc = result[0].attributes;
			url =  sharepointDocLoc.relativeurl.value + "/" +url;
			while (sharepointDocLoc && sharepointDocLoc.parentsiteorlocation)
			{
				//if location is in cache, just get value 
				if (locationCache[sharepointDocLoc.parentsiteorlocation.id])
				{
					url =  locationCache[sharepointDocLoc.parentsiteorlocation.id].url + "/" +url;
					sharepointDocLoc = {parentsiteorlocation: locationCache[sharepointDocLoc.parentsiteorlocation.id].parentlocation};
				}
				else
				{
					if (sharepointDocLoc.parentsiteorlocation.name == "sharepointdocumentlocation")
					{
						fetchXml = "<fetch mapping='logical' count='1'>"+
							   "<entity name='sharepointdocumentlocation'>"+
								  "<attribute name='relativeurl'/>"+ 
								  "<attribute name='parentsiteorlocation'/>"+ 
								  "<attribute name='sharepointdocumentlocationid'/>"+ 
									 "<filter type='and'>"+ 
										"<condition attribute='sharepointdocumentlocationid' operator='eq' value='" + sharepointDocLoc.parentsiteorlocation.id + "' />"+
									  "</filter>"+ 
							   "</entity>"+ 
							"</fetch>  ";
						result = XrmServiceToolkit.Soap.Fetch(fetchXml);	
						sharepointDocLoc = result[0].attributes;
						url =  sharepointDocLoc.relativeurl.value + "/" +url;
						locationCache[result[0].id] = {};
						locationCache[result[0].id].parentlocation = sharepointDocLoc.parentsiteorlocation;
						locationCache[result[0].id].url = sharepointDocLoc.relativeurl.value;
						
					}
					else
					{
						fetchXml = "<fetch mapping='logical' count='1'>"+
							   "<entity name='sharepointsite'>"+
								  "<attribute name='absoluteurl'/>"+ 
								  "<attribute name='sharepointsiteid'/>"+ 
									 "<filter type='and'>"+ 
										"<condition attribute='sharepointsiteid' operator='eq' value='" + sharepointDocLoc.parentsiteorlocation.id + "' />"+
									  "</filter>"+ 
							   "</entity>"+ 
							"</fetch>  ";
						result = XrmServiceToolkit.Soap.Fetch(fetchXml);
						sharepointDocLoc = result[0].attributes;					
						url =  sharepointDocLoc.absoluteurl.value + "/" +url;
						locationCache[result[0].id] = {};
						locationCache[result[0].id].parentlocation = null;
						locationCache[result[0].id].url = sharepointDocLoc.absoluteurl.value;
					}
				}
			}
		}
		
		$(value).attr('href',url);
		});
	}
}