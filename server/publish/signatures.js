Meteor.publish('Signature', function () {
	if (this.userId) {
		return Signatures.find({userId: this.userId})
	} else {
		this.stop()
		return
	}
})

Meteor.publish('SignatureOfClient', function (_id) {
	
	let clientId = Letters.findOne({_id}).engagement_client

	if (clientId) {
		return SignaturesOfClients.find({_id: clientId})
	} else {
		this.stop()
		return
	}
		
	
})