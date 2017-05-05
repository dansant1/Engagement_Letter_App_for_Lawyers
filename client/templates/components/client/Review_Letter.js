Template.Review_Letter.helpers({
	letterId() {
		return FlowRouter.getParam('letterId')
	}
})

Template.Review_Letter.events({
	'click [name="next"]'(e, t) {
		console.log(Letters.findOne().deposit)
		if (Letters.findOne().deposit === undefined || Letters.findOne().deposit === "" || Letters.findOne().deposit === null) {
			
			if (Letters.findOne().status === "completing") {
				FlowRouter.go('/thanks')
			} else {
				Meteor.call('saveAsPendingSignature', FlowRouter.getParam('letterId'), (err) => {
					if (!err) {
						FlowRouter.go('/client/sign_letter/' + FlowRouter.getParam('letterId'))		
					} else {
						alert(err)
					}
				})	
			}

			
			
		} else {

			if (Letters.findOne().status === "completing") {
				FlowRouter.go('/thanks')
			} else {
				Meteor.call('saveAsPendingPayment', FlowRouter.getParam('letterId'), (err) => {
					if (!err) {
						FlowRouter.go('/client/payment_letter/' + FlowRouter.getParam('letterId'))
					} else {
						alert(err)
					}
				})
			}

			

			

		}

	}
})

Template.frameLetter.onCreated( () => {
	let template = Template.instance()

	template.autorun( () =>  {
		template.letterId = FlowRouter.getParam('letterId')

		template.subscribe('Letter', template.letterId)


	})
})

Template.frameLetter.helpers({
	letter() {
		return Letters.findOne()
	},
	firmName() {
	 	return Firms.findOne().name
	},
	susan() {
		if (this.engagement_type === "1") {
			return true
		}

		return false
	},
	joe() {
		if (this.engagement_type === "2") {
			return true
		}

		return false
	},
	date() {

		let letter = Letters.findOne()

		let date = letter.sendedAt ?  letter.sendedAt : new Date()

		const monthNames = [
		    "January", "February", "March",
		    "April", "May", "June", "July",
		    "August", "September", "October",
		    "November", "December"
  		]

  		let day = date.getDate();
  		let monthIndex = date.getMonth();
  		let year = date.getFullYear();

		return day + ' ' + monthNames[monthIndex] + ' ' + year
	},
	clientName() {
		return Clients.findOne().company_client_name
	},
	clientCompany() {
		return Clients.findOne().company_name
	},
	clientAddress() {
		return Clients.findOne().company_address
	},
	lawyer() {
		let user = Meteor.users.findOne().profile
		return  user.first_name + ' ' + user.last_name
	},
	signature() {
		return Signatures.findOne()
	},
	project() {
		if ( this.payment[0].type === 'Project' ) {
			return true
		}
	},
	hourly() {
		if ( this.payment[0].type === 'Hourly' ) {
			return true
		}

		return false
	},
	retainer() {
		if ( this.payment[0].type === 'Retainer' ) {
			return true
		}

		return false
	},
	logo() {
		return Logos.findOne()
	}
})
