Meteor.methods({
  signup(data) {

    let firmId;

    if (data.inviteId) {
      firmId = Invites.findOne({_id: data.inviteId}).firmId
      Invites.remove({_id: data.inviteId})
    } else {
      firmId = Firms.insert({
        name: data.firm_name,
        createdAt: new Date()
      })
    }

    if (firmId) {
        let userId = Accounts.createUser({
          email: data.email,
          password: data.password,
          profile: {
            first_name: data.first_name,
            last_name: data.last_name,
            phone_number: data.phone_number,
            firmId: firmId
          }
        })



        if (userId) {
          Roles.addUsersToRoles(userId, ['Lawyer'], 'Firm')
        }
    }

  }
})
