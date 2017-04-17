Template.sendToClient.events({
	'click [name="send"]'(e, t) {
		let letterId = FlowRouter.getParam('letterId')

		if (letterId) 
			Meteor.call('sendLetterToClient', letterId, (err) => {
				if (!err) {
					FlowRouter.go('/home')
				} else {
					Bert.alert('ERROR!', 'danger')
				}
			})	
		else Bert.alert('ERROR!', 'danger')

		
	}
})