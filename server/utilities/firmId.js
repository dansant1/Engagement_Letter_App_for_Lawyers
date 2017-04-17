
let FIRM = () => {
	if (this.userId) {
		return Meteor.users.findOne({_id: this.userId}).profile.firmId
	} else {
		return
	}
}

export default FIRM;