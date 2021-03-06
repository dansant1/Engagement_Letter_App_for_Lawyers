import { uploader } from './uploader'

import { addUrlToDatabase } from './upload'

import { saveAs } from 'file-saver'

export default function convertCanvasToPNG (c, $button, isClient, clientId) {

	

    c.toBlob( blob => {

    	if (isClient) {

    		let client1 = {
					_id: clientId
				}

    		let uploaderSignatureClient = new Slingshot.Upload('UploadSignatureOfClient', client1)

    		
			uploaderSignatureClient.send( blob, ( error, url ) => {
		    	if ( error ) {
		      		Bert.alert( error.message, "warning" )
		      		$button.text('Save')
	    			$button.prop('disabled', false)
		    	} else {
		    		addUrlToDatabase( url, false, true, clientId )	
		      		$button.text('Save')
	    			$button.prop('disabled', false)
		    	}
	  		})
	  		
    	} else {

    		uploader.send( blob, ( error, url ) => {
		    	if ( error ) {
		      		Bert.alert( error.message, "warning" )
		      		$button.text('Save')
	    			$button.prop('disabled', false)
		    	} else {
		      		if (addUrlToDatabase( url )) {
		      			$button.text('Save')
	    				$button.prop('disabled', false)
		      			
		      		} else {
		      			$button.text('Save')
	    				$button.prop('disabled', false)
		      			
		      		}
		    		
		    	}
  			})

    	}


  		

	});
    
}