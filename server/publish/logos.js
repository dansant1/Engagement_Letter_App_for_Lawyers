Meteor.publish('Logo', function () {
	if (this.userId) {
		let firmId = Meteor.users.findOne({_id: this.userId}).profile.firmId
		return Logos.find({firmId})
	} else {
		this.stop()
		return
	}
	
	
})