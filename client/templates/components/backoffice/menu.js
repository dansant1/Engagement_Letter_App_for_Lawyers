Template.Logout.events({
	'click .logout'() {
		Meteor.logout()
		console.log("hola")
	}
})