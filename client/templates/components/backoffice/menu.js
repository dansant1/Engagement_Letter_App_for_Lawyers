Template.Logout.events({
	'click .logout'() {
		Meteor.logout()
		FlowRouter.go('/')
	}
})