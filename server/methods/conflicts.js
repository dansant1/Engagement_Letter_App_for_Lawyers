Meteor.methods({
  saveConflictAlias(email) {
    if (this.userId) {
      Conflicts.insert({
        firmId: Meteor.users.findOne({_id: this.userId}).profile.firmId,
        email: email
      })
    } else {
      return;
    }

  }
})
