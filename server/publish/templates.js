Meteor.publish('Templates', function () {
  if (this.userId) {
    let firmId =  Meteor.users.findOne({_id: this.userId}).profile.firmId
    return Templates.find({firmId})
  } else {
    this.stop()
    return;
  }
})

Meteor.publish('Exclusion_Templates', function () {
  if (this.userId) {
    let firmId =  Meteor.users.findOne({_id: this.userId}).profile.firmId
    return ExclusionTemplates.find({firmId})
  } else {
    this.stop()
    return;
  }
})

Meteor.publish('Payment_Templates', function () {
  if (this.userId) {
    let firmId =  Meteor.users.findOne({_id: this.userId}).profile.firmId
    return PaymentTemplates.find({firmId})
  } else {
    this.stop()
    return;
  }
})
