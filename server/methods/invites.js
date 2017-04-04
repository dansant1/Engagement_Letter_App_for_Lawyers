Meteor.methods({
  InviteMember(data) {
    if (this.userId) {
      let firmId = Meteor.users.findOne({_id: this.userId}).profile.firmId
      let InviteId = Invites.insert({
        name: data.name,
        email: data.email,
        firmId: firmId,
        firm_name: Firms.findOne({_id: firmId}).name
      })

      Meteor.defer( () => {
        Email.send({
          from: 'admin@engagementletter.co',
          to: data.email,
          text: "You've invited to Engagement Letter Co, please, signup with this link: http://localhost:3000/i/" + InviteId
        })
      })
    }
  }
})
