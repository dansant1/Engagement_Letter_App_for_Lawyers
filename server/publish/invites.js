Meteor.publish('Invites', function () {
  return Invites.find()
})
