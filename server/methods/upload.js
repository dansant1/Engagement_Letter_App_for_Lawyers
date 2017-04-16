import checkUrlValidity from '../utilities/url'

Meteor.methods({
      StoreUrlOfSignature( url ) {
            
            checkUrlValidity( url )

            try {
                  Signatures.insert({
                        url: url,
                        userId: Meteor.userId(),
                        added: new Date() 
                  })

            } catch( exception ) {
                  return exception;
            }
  
      }

});