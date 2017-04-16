let template

let _getFileFromInput = event => event.target.files[0]

let _addUrlToDatabase = ( url ) => {
 	Meteor.call( "StoreUrlOfSignature", url, ( error ) => {
	    if ( error ) {
	    	Bert.alert( error.reason, "warning" )
	    } else {
	      	Bert.alert( "File uploaded to Amazon S3!", "success" )
	      
	    }
  	})
}

let _uploadFileToAmazon = ( file ) => {

	const uploader = new Slingshot.Upload( "Upload" )

  	uploader.send( file, ( error, url ) => {
    	if ( error ) {
      		Bert.alert( error.message, "warning" )
      		
    	} else {
      		_addUrlToDatabase( url )
    	}
  	})

}

let uploadSignature = (options) => {

	template = options.template

	let file = _getFileFromInput( options.event )

  	
  	_uploadFileToAmazon( file )

}

export default uploadSignature 