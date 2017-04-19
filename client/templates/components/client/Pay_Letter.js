Template.Pay_Letter.onCreated( () => {
	let template = Template.instance()

	console.log(Meteor.settings.public.stripe)

	template.checkout = StripeCheckout.configure({
	    key: Meteor.settings.public.stripe,
	    image: 'https://tmc-post-content.s3.amazonaws.com/ghostbusters-logo.png',
	    locale: 'auto',
	    token( token ) {
	    	
	    }
  	})

	template.autorun( () => {
		template.letterId = FlowRouter.getParam('letterId')
		template.subscribe('LetterPaymentInfo', template.letterId)
	})
})

Template.Pay_Letter.events({
	'click [name="pay"]'(e, t) {
		
		let ccNum = t.find('[name="credit_card_number"]').value
		let cvc = t.find('[name="vcc"]').value
		let expMo = $('[name="expMo"]').val()
		let expYr = $('[name="expYr"]').val()
		let price = Letters.findOne().payment[0].price
		let stripeToken

		if (price) {
			
			Stripe.card.createToken({
				number: ccNum,
				cvc: cvc,
				exp_month: expMo,
				exp_year: expYr,
			}, (status, response) => {

				stripeToken = response.id

				if (stripeToken) {

					let charge = {
						amount: price,
		      			currency: 'usd',
		      			source: stripeToken,
		      			description: 'Engagement Letter',
		      			receipt_email: 'danieldelgadilloh@gmail.com'
					}

				

					Meteor.call('chargeCard', charge, (err) => {
						if (!err) {
							Bert.alert('Next', 'success')
							//FlowRouter.go('/client/sign_letter/' + t.letterId)
						} else {
							Bert.alert('Was an Error, Try again', 'danger')
						}
					})

				} else {
					Bert.alert('Was an Error, Try again', 'danger')
				}

			
			})

		} else {
			Bert.alert('Was an Error, Try again', 'danger')
		}

		
	
	}
})

Template.Pay_Letter.onRendered(() => {
  
  
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
		return this.payment[0].price ? this.payment[0].price : 0
	},
	letterId() {
		return Template.instance().letterId
	}
})