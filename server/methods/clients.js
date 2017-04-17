Meteor.methods({
  add_client(data) {
    if (this.userId) {

      let firmId =  Meteor.users.findOne({_id: this.userId}).profile.firmId

      Clients.insert({
        company_name: data.company_name,
        company_address: data.company_address,
        company_phone: data.company_phone,
        company_client_name: data.company_client_name,
        company_client_email: data.company_client_email,
        firmId: firmId
      })

    } else {
        return;
    }

  }
})
