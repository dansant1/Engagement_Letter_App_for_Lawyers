Template.Pay_Letter.onCreated( () => {
	let template = Template.instance()

	template.checkout = StripeCheckout.configure({
	    key: Meteor.settings.public.stripe,
	    token( token ) {
	    	
	    }
  	})

	template.autorun( () => {
		template.letterId = FlowRouter.getParam('letterId')
		template.subscribe('LetterPaymentInfo', template.letterId)
	})
})

Template.Pay_Letter.events({
	'keyup [name="credit_card_number"]'(e, t) {
		let $box = $(e.target)

		$box.css({"border": "none"})
	},
	'keyup [name="vcc"]'(e, t) {
		let $box = $(e.target)

		$box.css({"border": "none"})
	},
	'click [name="pay"]'(e, t) {
		
		let ccNum = t.find('[name="credit_card_number"]').value
		let cvc = t.find('[name="vcc"]').value
		let expMo = $('[name="expMo"]').val()
		let expYr = $('[name="expYr"]').val()
		let price = Letters.findOne().deposit
		let stripeToken

		let $button = $(e.target)
		$button.prop('disabled', true)

		let $cc = $('[name="credit_card_number"]')
		let $cvc = $('[name="vcc"]')
		let $expMo = $('[name="expMo"]')
		let $expYr = $('[name="expYr"]')

		if (ccNum !== '' && cvc !== '') {
			if (price) {

			Stripe.card.createToken({
				number: ccNum,
				cvc: cvc,
				exp_month: expMo,
				exp_year: expYr,
			}, (status, response) => {

				stripeToken = response.id

				if ( response.error ) {
	          		Bert.alert( response.error.message, "danger" )
	          		$button.prop('disabled', false)
	        	} else {

	          			if (stripeToken) {

							let charge = {
								amount: price,
				      			currency: 'usd',
				      			source: 'tok_visa',//stripeToken,
				      			description: 'Engagement Letter',
				      			receipt_email: 'danieldelgadilloh@gmail.com'
							}	

							Meteor.call('chargeCard', charge, (err) => {
								if (!err) {
									Bert.alert('Next', 'success')
									$button.prop('disabled', false)
									FlowRouter.go('/client/sign_letter/' + t.letterId)
								} else {
									Bert.alert('Was an Error, Try again', 'danger')
									$button.prop('disabled', false)
								}
							})

						} else {
							Bert.alert('Was an Error, Try again', 'danger')
							$button.prop('disabled', false)
						}
	        		}

				

			
				})

			} else {
				Bert.alert('Was an Error, Try again', 'danger')
				$button.prop('disabled', false)
			}
		} else {

			if ($cc.val() === "") {
				console.log('wokkr')
				$cc.css({	"border-color": "#e74c3c", 
	             			"border-width":"1px", 
	             			"border-style":"solid"})
				$button.prop('disabled', false)
				return
			}

			if ($cvc.val() === "") {
				$cvc.css({	"border-color": "#e74c3c", 
	             			"border-width":"1px", 
	             			"border-style":"solid"})
				$button.prop('disabled', false)
				return
			}

			if ($expMo.val()  === "") {
				$expMo.css({	"border-color": "#e74c3c", 
	             			"border-width":"1px", 
	             			"border-style":"solid"})
				$button.prop('disabled', false)
				return
			}

			if ($expYr.val()  === "") {
				$expYr.css({	"border-color": "#e74c3c", 
	             			"border-width":"1px", 
	             			"border-style":"solid"})
				$button.prop('disabled', false)
				return
			}
		}
	
	}
})

Template.Pay_Letter.helpers({
	letter() {
		return Letters.findOne()
	},
	letterId() {
		return Template.instance().letterId
	}
})