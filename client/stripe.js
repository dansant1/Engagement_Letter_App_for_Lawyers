Meteor.startup( () => {
	Stripe.setPublishableKey(Meteor.settings.public.stripe)
})