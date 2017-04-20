Template.sendToClient.events({
	'click [name="send"]'(e, t) {
		let letterId = FlowRouter.getParam('letterId')

		if (letterId) 
			Meteor.call('sendLetterToClient', letterId, (err) => {
				if (!err) {
					FlowRouter.go('/home')
					Bert.alert('Engagement Letter Sended', 'success')
				} else {
					Bert.alert('ERROR!', 'danger')
				}
			})	
		else Bert.alert('ERROR!', 'danger')

		
	}
})