Meteor.publish('Parties', function () {
  if (this.userId) {
    let firmId = Meteor.users.findOne({_id: this.userId}).profile.firmId
    return Parties.find({firmId})
  } else {
      this.stop()
      return
  }

})
