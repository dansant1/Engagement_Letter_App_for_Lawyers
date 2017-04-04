Meteor.methods({
  add_template(content, name) {
    if (this.userId) {

      let firmId =  Meteor.users.findOne({_id: this.userId}).profile.firmId

      Templates.insert({
        content: content,
        name: name,
        firmId: firmId
      })

    } else {
        return;
    }

  },
  add_exclusion_template(content, name) {
    if (this.userId) {

      let firmId =  Meteor.users.findOne({_id: this.userId}).profile.firmId

      ExclusionTemplates.insert({
        content: content,
        name: name,
        firmId: firmId
      })

    } else {
        return;
    }

  }
})
