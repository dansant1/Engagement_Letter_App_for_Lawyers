Meteor.publish('Letters', function () {
  if (this.userId) {
    let firmId =  Meteor.users.findOne({_id: this.userId}).profile.firmId
    let draft = false
    return Letters.find({firmId, draft})
  } else {
    this.stop()
    return;
  }
})

Meteor.publish('letters', function () {
  if (this.userId) {
    
    return Letters.find({})
  } else {
    this.stop()
    return;
  }
})


Meteor.publish('LettersEstatus', function () {
  if (this.userId) {
    let firmId =  Meteor.users.findOne({_id: this.userId}).profile.firmId
    return Letters.find({firmId}, {
    	fields: {
    		 status: 1
    	}
    })
  } else {
    this.stop()
    return;
  }
})

Meteor.publish('Letter', function (_id) {
  
    let firmId = Letters.findOne({_id}).firmId
   	let clientId = Letters.findOne({_id}).engagement_client
   	if (firmId) {
   		return [
	    	Letters.find({_id, firmId}),
	    	Firms.find({_id: firmId}),
	    	Clients.find({_id: clientId}),
	    	Logos.find({firmId}, {
	    		fields: {
	    			url: 1
	    		}
	    	}),
	    	Meteor.users.find({_id: Letters.findOne({_id}).createdBy}, { 
	    		fields: {
	    			profile: 1
	    		}
	    	}),
	    	Signatures.find({userId: Letters.findOne({_id}).createdBy})
    	]	
   	} else {
   		this.stop()
   		return
   	}
  
})

Meteor.publish('LetterPaymentInfo', function (_id) {
	let firmId = Letters.findOne({_id}).firmId
   	if (firmId) {
   		return Letters.find({_id, firmId})
	
   	} else {
   		this.stop()
   		return
   	}
})




