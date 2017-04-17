function firmName (letterId) {
	let firm
	Meteor.call('getFirmName', letterId, (err, name) => {
		if (!err) {

			firm = name 
		} else {
			return
		}
	})

	return firm
}

export default firmName;