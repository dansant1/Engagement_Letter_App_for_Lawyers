import { uploader, uploaderLogo } from './uploader'

let template

let _getFileFromInput = event => event.target.files[0]

let addUrlToDatabase = ( url, isLogo, isClient, clientId) => {

	if (isLogo) {
		
		Meteor.call( "StoreUrlOfLogo", url, ( error ) => {
		    if ( error ) {
		    	Bert.alert( error.reason, "warning" )
		    	return false
		    } else {
		      	Bert.alert( "Signature Saved!", "success" )
		      	return true
		    }
  		})
	} else if (isClient) {
		
		Meteor.call( "StoreUrlOfSignatureClient", url, clientId, ( error ) => {
		    if ( error ) {
		    	Bert.alert( error.reason, "warning" )
		    	return false
		    } else {
		      	Bert.alert( "Signature Saved!", "success" )
		      	return true
		    }
  		})

	} else {
		
		Meteor.call( "StoreUrlOfSignature", url, ( error ) => {
		    if ( error ) {
		    	Bert.alert( error.reason, "warning" )
		    	return false
		    } else {
		      	Bert.alert( "Signature Saved!", "success" )
		      	return true
		    }
  		})
	}
}

let _uploadFileToAmazon = ( file, logo, client, clientId ) => {

	if (logo) {
		uploaderLogo.send( file, ( error, url ) => {
	    	if ( error ) {
	      		Bert.alert( error.message, "warning" )
	      		
	    	} else {

	    		if (logo) addUrlToDatabase( url, logo )
	    		else addUrlToDatabase( url )	
	      		
	    	}
  		})
	} else if (client) {
		
		let client1 = {
			_id: clientId
		}

		let uploaderSignatureClient = new Slingshot.Upload('UploadSignatureOfClient', client1)
		uploaderSignatureClient.send( file, ( error, url ) => {
	    	if ( error ) {
	      		Bert.alert( error.message, "warning" )
	      		
	    	} else {

	    		if (logo) addUrlToDatabase( url, logo )
	    		else addUrlToDatabase( url, false, true, clientId )	
	      		
	    	}
  		})

	} else {

		uploader.send( file, ( error, url ) => {
	    	if ( error ) {
	      		Bert.alert( error.message, "warning" )
	      		
	    	} else {

	    		if (logo) addUrlToDatabase( url, logo )
	    		else addUrlToDatabase( url )	
	      		
	    	}
  		})
	}

  	

}

let uploadSignature = (options) => {

	template = options.template

	let file = _getFileFromInput( options.event )
  

  	_uploadFileToAmazon( file, options.logo, options.client, options.clientId )

}

export { addUrlToDatabase }

export default uploadSignature