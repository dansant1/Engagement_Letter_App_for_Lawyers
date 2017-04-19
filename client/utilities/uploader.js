const uploader = new Slingshot.Upload( 'Upload' )
const uploaderLogo = new Slingshot.Upload( 'UploadLogos' ) 
const uploaderSignatureClient = (clientId) => {
	return //new Slingshot.Upload('UploadSignatureOfClient', clientId)
}

export  {uploader, uploaderLogo, uploaderSignatureClient}