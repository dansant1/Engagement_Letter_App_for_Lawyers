let _fileExistsInDatabase = ( url ) => {
  return Signatures.findOne( { "url": url, "userId": Meteor.userId() }, { fields: { "_id": 1 } } );
};

let _isNotAmazonUrl = ( url ) => {
  return ( url.indexOf( 's3.amazonaws.com' ) < 0 );
};

let _validateUrl = ( url ) => {
  if ( _fileExistsInDatabase( url ) ) {
    return { valid: false, error: "Sorry, this file already exists!" };
  }

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

export default checkUrlValidity 