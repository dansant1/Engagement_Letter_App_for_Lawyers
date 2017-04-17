Meteor.publish('Signature', function () {
	if (this.userId) {
		return Signatures.find({userId: this.userId})
	} else {
		this.stop()
		return
	}
})