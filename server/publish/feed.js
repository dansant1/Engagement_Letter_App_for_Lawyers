Meteor.publish('Feed', function () {
  if (this.userId) {
    let firmId =  Meteor.users.findOne({_id: this.userId}).profile.firmId
    return Feed.find({firmId})
  } else {
    this.stop()
    return
  }
})
