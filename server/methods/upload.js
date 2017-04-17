import checkUrlValidity from '../utilities/url'

Meteor.methods({
      StoreUrlOfSignature( url ) {
            checkUrlValidity(url)
            try {
            
                  Signatures.find({userId: this.userId}).forEach( (s) => {
                              Signatures.remove({_id: s._id})
                  })

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