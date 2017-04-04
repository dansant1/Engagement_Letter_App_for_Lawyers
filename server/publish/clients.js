Meteor.publish('Clients', function () {
  if (this.userId) {
    let firmId =  Meteor.users.findOne({_id: this.userId}).profile.firmId
    return Clients.find({firmId})
  } else {
    this.stop()
    return;
  }
})

Meteor.publish('lawyers', function () {
  if (this.userId) {
    let firmId =  Meteor.users.findOne({_id: this.userId}).profile.firmId
    return Meteor.users.find({'profile.firmId': firmId})
  } else {
    this.stop()
    return;
  }
})
