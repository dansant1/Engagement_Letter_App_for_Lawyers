import uploader from './uploader'

import { addUrlToDatabase } from './upload'

import { saveAs } from 'file-saver'

export default function convertCanvasToPNG (c, $button) {

    c.toBlob( blob => {

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

	});
    
}