Meteor.publish('Parties', function (letterId) {
  if (this.userId) {
    let firmId = Meteor.users.findOne({_id: this.userId}).profile.firmId
    return Parties.find({firmId, letterId})
  } else {
      this.stop()
      return
  }

})
