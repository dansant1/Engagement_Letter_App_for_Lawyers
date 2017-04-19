import checkUrlValidity from '../utilities/url'

Meteor.methods({
      StoreUrlOfSignature( url ) {
            checkUrlValidity(url)
            try {
            
                  Signatures.find({userId: this.userId}).forEach( (s) => {
                              Signatures.remove({_id: s._id})
                  })

                  Signatures.insert({
                        url,
                        userId: Meteor.userId(),
                        added: new Date() 
                  })

            } catch( exception ) {
                  return exception;
            }
  
      },
      StoreUrlOfLogo(url) {

            checkUrlValidity(url)
            try {

                  let firmId = Meteor.users.findOne({_id: this.userId}).profile.firmId
            
                  Logos.find({firmId}).forEach( (s) => {
                              Logos.remove({_id: s._id})
                  })

                  Logos.insert({
                        url,
                        firmId,
                        added: new Date() 
                  })

            } catch( exception ) {
                  return exception;
            }
      },
      StoreUrlOfSignatureClient(url, clientId) {

            checkUrlValidity(url)
            try {

                  
                  SignaturesOfClients.find({clientId}).forEach( (s) => {
                              SignaturesOfClients.remove({_id: s._id})
                  })

                  SignaturesOfClients.insert({
                        url,
                        clientId,
                        added: new Date() 
                  })

            } catch( exception ) {
                  return exception;
            }

      }

});