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

Meteor.publish('usuarios', function () {
  if (this.userId) {
    return Meteor.users.find()
  } else {
    this.stop();
    return;
  }
})

Meteor.publish('user', function () {
  if (this.userId) {
    return Meteor.users.find({_id: this.userId}, {fields: {
      'profile': 1
    }})
  } else {
    this.stop();
    return;
  }
})

