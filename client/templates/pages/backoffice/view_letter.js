Template.View_Letter.helpers({
	letter() {
		return Letters.findOne()
	},
	date() {
		
		let letter = Letters.findOne()

		let date = letter.sendedAt ?  letter.sendedAt : new Date()

		const monthNames = [
		    "January", "February", "March",
		    "April", "May", "June", "July",
		    "August", "September", "October",
		    "November", "December"
  		]

  		let day = date.getDate();
  		let monthIndex = date.getMonth();
  		let year = date.getFullYear();
		
		return day + ' ' + monthNames[monthIndex] + ' ' + year
	},
	client() {
		return Clients.findOne().company_client_name
	},
	lawyer() {
		let user = Meteor.users.findOne().profile
		return  user.first_name + ' ' + user.last_name
	}, 
	estatus() {
		switch (this.status) {
			case 'draft':
				return 'Draft'
			break;
			case 'pending_signature': 
				return 'Pending Signature'
			break;
			case 'pending_payment': 
				return 'Pending Payment'
			break;
			case 'completing': 
				return 'Completed'
			break;
			default:
				return '--'
			break
		}
	}
})