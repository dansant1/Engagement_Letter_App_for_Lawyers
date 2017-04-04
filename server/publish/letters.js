Meteor.publish('Letters', function () {
  if (this.userId) {
    let firmId =  Meteor.users.findOne({_id: this.userId}).profile.firmId
    return Letters.find({firmId})
  } else {
    this.stop()
    return;
  }
})
