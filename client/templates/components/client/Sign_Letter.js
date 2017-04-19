Template.Sign_Letter.onCreated(() => {
	let template = Template.instance()

	template.autorun(() => {
		template.letterId = FlowRouter.getParam('letterId') 	
		
		template.subscribe('Letter', template.letterId)
		template.subscribe('SignatureOfClient', template.letterId)
	})
})

Template.Sign_Letter.helpers({
	signature() {
		let signature = SignaturesOfClients.findOne()

		console.log(signature);

		if (signature) {
			return signature
		} 
	}
})

Template.Sign_Letter.events({
	'click [name="draw"]'(e, t) {
		let letterId = FlowRouter.getParam('letterId')
    	let clientId = Letters.findOne().engagement_client
    	Session.set('fromOf', letterId) 
    	Session.set('isClient', true)
    	Session.set('clientId', clientId)
    	FlowRouter.go('/client/draw_signature')
	}
})