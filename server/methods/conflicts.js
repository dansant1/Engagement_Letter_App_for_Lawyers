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
  },
  addParty(name, type, letterId) {
    if (this.userId) {

      if (type === "0") {
        type = 'party'
      } else if (type === "1") {
        type = 'opossing_party'
      }

      Parties.insert({
        firmId: Meteor.users.findOne({_id: this.userId}).profile.firmId,
        name: name,
        type: type,
        letterId: letterId
      })
    } else {
      return;
    }
  }
})
