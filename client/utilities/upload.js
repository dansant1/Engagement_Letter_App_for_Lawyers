import uploader from './uploader'

let template

let _getFileFromInput = event => event.target.files[0]

let addUrlToDatabase = ( url ) => {

 	Meteor.call( "StoreUrlOfSignature", url, ( error ) => {
	    if ( error ) {
	    	Bert.alert( error.reason, "warning" )
	    	return false
	    } else {
	      	Bert.alert( "File uploaded to Amazon S3!", "success" )
	      	return true
	    }
  	})
}

let _uploadFileToAmazon = ( file ) => {

  	uploader.send( file, ( error, url ) => {
    	if ( error ) {
      		Bert.alert( error.message, "warning" )
      		
    	} else {
      		addUrlToDatabase( url )
    	}
  	})

}

let uploadSignature = (options) => {

	template = options.template

	let file = _getFileFromInput( options.event )
  	
  	_uploadFileToAmazon( file )

}

export { addUrlToDatabase }

export default uploadSignature