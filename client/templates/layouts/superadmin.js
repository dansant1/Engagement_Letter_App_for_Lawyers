Template.AdminHome.onCreated(() => {
	let template = Template.instance()

	template.autorun(() => {
		template.subscribe('Engagement_Types')
		template.subscribe('usuarios')
		template.subscribe('firms')
		template.subscribe('defaultTemplates')
	})
})

Template.AdminHome.events({
	'click [name="signup"]'(e, t) {
		let data = {
	        firm_name: t.find('[name="firm_name"]').value,
	        first_name: t.find('[name="first_name"]').value,
	        last_name: t.find('[name="last_name"]').value,
	        email: t.find('[name="email"]').value,
	        phone_number: t.find('[name="phone_number"]').value,
	        password: t.find('[name="password"]').value
    	}

	    if (data.firm_name !== "" && data.first_name !== "" && data.last_name !== "" && data.email !== "" && data.phone_number !== "" && data.password !== "") {
	      if (data.password.length >= 8) {
	        Meteor.call('signup', data, (err) => {
	          if (err) {
	              Bert.alert( err, 'danger', 'growl-top-right' );
	          } else {
	          		t.find('[name="firm_name"]').value = ""
	        		t.find('[name="first_name"]').value = ""
	        		t.find('[name="last_name"]').value = ""
	        		t.find('[name="email"]').value = ""
	        		t.find('[name="phone_number"]').value = ""
	        		t.find('[name="password"]').value = ""
	            	Bert.alert( 'User Added', 'success', 'growl-top-right' );

	          }
	        })
	      } else {
	        Bert.alert('The password must have minimun 8 characters', 'warning')
	      }

	    } else {
	      Bert.alert( 'Complete your details', 'warning', 'growl-top-right' );
	    }
	},
	'click [name="add_engagement_type"]'(e, t) {
		let engagement_type = t.find("[name='engagement_type_name']").value
		if ( engagement_type !== "") {
			Meteor.call('add_engagement_type', engagement_type, (err) => {
				if (!err) {
					Bert.alert('Engagement Type Added', 'success')
					t.find("[name='engagement_type_name']").value = ""
				} else {
					Bert.alert(err, 'danger')
					t.find("[name='engagement_type_name']").value = ""
				}
			})
		}
	},
	'click .remove_engagement_type'(e, t) {
		Meteor.call('remove_engagement_type', this._id, (err) => {
			if (!err) {
				Bert.alert('Engagement Type Removed', 'success')
			} else {
				Bert.alert(err, 'danger')
			}
		})
	},
	'click [name="add_engagement_template"]'(e, t) {
		let content = t.find('[name="template_content"]').value;
	    let name = t.find('[name="template_name"]').value;
	    if (content !== "") {
	      Meteor.call('add_defult_template', content, name, (err) => {
	        if (err) {
	          Bert.alert(err, 'danger')
	        } else {
	        	t.find('[name="template_name"]').value = "";
	         	t.find('[name="template_content"]').value = "";
	        	Bert.alert('Template Added', 'success')
	        }
	      })
	    } else {
	      Bert.alert('Complete', 'warning')
	    }
	},
	'click #remove_template'(e, t) {
		Meteor.call('remove_default_template', this._id, (err) => {
			if (!err) {
				Bert.alert('Template Removed', 'success')
			} else {
				Bert.alert(err, 'danger')
			}
		})
	},
	'click #remove_user'(e, t) {
		Meteor.call('remove_user', this._id, (err) => {
			if (!err) {
				Bert.alert('User Removed', 'success')
			} else {
				Bert.alert(err, 'danger')
			}
		})	
	},
	'click #edit__firm'(e, t) {
		let name = $("#firm__" + this._id).val()

		if (name !== "") {
			Meteor.call('edit_firm', name, this._id, (err) => {
				if (!err) {
					Bert.alert('Firm Edited', 'success')
				} else {
					Bert.alert(err, 'danger')
				}
			})	
		} else {
			Bert.alert('Complete the Data', 'warning')
		}
		
	},
	'click #edit__default_template'(e, t) {
		let name = $("#default_template__name__" + this._id).val()
		let content = $("#default_template__content__" + this._id).val()

		if (name !== "" && content !== "") {
			Meteor.call('edit_default_template', name, content, this._id, (err) => {
				if (!err) {
					if (!err) {
						Bert.alert('Default Template Edited', 'success')
					} else {
						Bert.alert(err, 'danger')
					}	
				}
			})
		} else {
			Bert.alert('Complete the Data', 'warning')

		}
	},
	'click #edit__user'(e, t) {
		let first_name = $("#first_name_" + this._id).val()
		let last_name = $("#last_name_" + this._id).val()
		let phone_number = $("#phone_number_" + this._id).val()

		if (first_name !== "" && last_name !== "" && phone_number !== "") {
			Meteor.call('edit_user', first_name, last_name, phone_number ,this._id, (err) => {
				if (!err) {
					if (!err) {
						Bert.alert('User Edited', 'success')
					} else {
						Bert.alert(err, 'danger')
					}	
				}
			})
		} else {
			Bert.alert('Complete the Data', 'warning')
		}
	},
	'click #edit__type'(e, t) {

		let name = $("#name__" + this._id).val()

		if (name !== "") {
			Meteor.call('edit_engagement_types', name, this._id, (err) => {
				if (!err) {
						if (!err) {
							Bert.alert('User Edited', 'success')
						} else {
							Bert.alert(err, 'danger')
						}	
				}
			})	
		} else {
			Bert.alert('Complete the Data', 'warning')
		}

		
	}
})

Template.AdminHome.helpers({
	engagement_types() {
		return Engagement_types.find()
	},
	users() {
		return Meteor.users.find()
	},
	email() {
		return Meteor.users.findOne({_id: this._id}).emails[0].address
	},
	firmName() {
		return Firms.findOne({_id: this.profile.firmId}).name
	},
	default_templates() {
		return Default_Templates.find()
	},
	firms() {
		return Firms.find()
	}
})

Template.AdminPayments.onCreated(() => {
	let template = Template.instance()

	template.autorun( () => {
		template.subscribe('firms')
		template.subscribe('paymentsAdmin')
		template.subscribe('clients')
		template.subscribe('letters')
		template.subscribe('usuarios')
	}) 
})

Template.AdminPayments.helpers({
	payments() {
		return Payments.find()
	},
	firm() {
		return Firms.findOne({_id: this.firmId}).name
	},
	client() {
		let client = Letters.findOne({ _id: this.letterId }).engagement_client
		return Clients.findOne({_id: client}).company_client_name
	},
	date() {


		let date = this.createdAt

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
	amount() {
		return Letters.findOne({ _id: this.letterId }).deposit
	},
	lawyer() {
		let userId = Letters.findOne({ _id: this.letterId }).createdBy
		let user = Meteor.users.findOne({_id: userId}).profile
		return  user.first_name + ' ' + user.last_name
	}
})