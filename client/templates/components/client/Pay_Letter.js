Template.Pay_Letter.onCreated( () => {
	let template = Template.instance()

	template.autorun( () => {
		template.letterId = FlowRouter.getParam('letterId')
		template.subscribe('LetterPaymentInfo', template.letterId)
	})
})

Template.Pay_Letter.helpers({
	letter() {
		return Letters.findOne()
	},
	type() {
		switch (this.payment[0].type) {
			case 'Hourly':
				return 'Rate'
			break;
			case 'Project':
				return 'Project Estimate'
			break;
			case 'Retainer':
				return 'Montly Fee'
			break;
		}
	},
	price() {
		return this.payment[0].price + '.00'
	},
	letterId() {
		return Template.instance().letterId
	}
})