Meteor.startup( () => {
	var stripeKey = Meteor.settings.public.stripe
  	Stripe.setPublishableKey( stripeKey );
	
	
})