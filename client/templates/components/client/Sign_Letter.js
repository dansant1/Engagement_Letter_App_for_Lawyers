Template.Sign_Letter.onCreated(() => {
	let template = Template.instance()

	template.autorun(() => {
		template.letterId = FlowRouter.getParam('letterId') 	
		
		template.subscribe('Letter', template.letterId)
		template.subscribe('SignatureOfClient', template.letterId)
	})
})

Template.Sign_Letter.events({
	signature() {
		let signature = SignaturesOfClients.findOne()


		if (signature) {
			return signature
		} 

		
	}
})