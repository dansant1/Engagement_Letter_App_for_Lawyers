let _isNotAmazonUrl = ( url ) => {
  return ( url.indexOf( 's3.amazonaws.com' ) < 0 );
};

let _validateUrl = ( url ) => {
  
  if ( _isNotAmazonUrl( url ) ) {
    return { valid: false, error: "Sorry, this isn't a valid URL!" };
  }

  return { valid: true };
};

let checkUrlValidity = ( url ) => {
  let test = _validateUrl( url );

  if ( !test.valid ) {
    throw new Meteor.Error( "file-error", test.error );
  }
}

const URL = 'http://localhost:3000/'


export { URL }

export default checkUrlValidity 