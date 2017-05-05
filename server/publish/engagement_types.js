Meteor.publish('Engagement_Types', function () {
	if (this.userId) {
		return Engagement_types.find()
	} else {
		this.stop()
		return
	}
})

Meteor.publish('defaultTemplates', function () {
	if (this.userId) {
		return Default_Templates.find()
	} else {
		this.stop()
		return
	}
})

Meteor.publish('paymentsAdmin', function () {
	if (this.userId) {
		return Payments.find()
	} else {
		this.stop()
		return
	}
})

