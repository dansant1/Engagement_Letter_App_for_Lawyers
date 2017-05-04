Template.Conflicts.onCreated( () => {
  let template = Template.instance()

  template.autorun( () => {
    let letterId = FlowRouter.getParam('letterId')
    template.subscribe('Parties', letterId)
  })

})

Template.Conflicts.helpers({
  parties() {
    return Parties.find({type: 'party'})
  },
  opossingParties() {
    return Parties.find({type: 'opossing_party'})
  },
  disabled() {
    if (Parties.find({}).fetch().length > 0) {
      return ''
    } else {
      return 'disabled'
    }
  }
})

Template.Conflicts.events({
  'click .remove'(e, t) {
    Meteor.call('removeParty', this._id, (err) => {
      if (!err) {
        Bert.alert('Party Removed', 'success')
      } else {
        Bert.alert(err, 'danger') 
      }
    })
  },
  'click [name="add_party"]'(e, t) {
    let name = t.find('[name="partyname"]').value
    let letterId = FlowRouter.getParam('letterId')
    let type = "0";

    if (name !== "") {
      Meteor.call('addParty', name, type, letterId, (err) => {
        if (err) {
          Bert.alert(err, 'danger')
        } else {
          t.find('[name="partyname"]').value = ""

          $('[name="next"]').prop('disabled', false)

          Bert.alert('Party added', 'success')
        }
      })
    } else {
        Bert.alert('Complete the name', 'warning')
    }

  },
  'click [name="add_opossing_party"]'(e, t) {
    let name = t.find('[name="opposingpartyname"]').value
    let letterId = FlowRouter.getParam('letterId')
    let type = "1";

    if (name !== "") {
      Meteor.call('addParty', name, type, letterId, (err) => {
        if (err) {
          Bert.alert(err, 'danger')
        } else {
          t.find('[name="opposingpartyname"]').value = ""
          $('[name="next"]').prop('disabled', false)
          Bert.alert('Party added', 'success')
        }
      })
    } else {
        Bert.alert('Complete the name', 'warning')
    }
  },
  'click [name="next"]'(e, t) {
    let letterId = FlowRouter.getParam('letterId')
    FlowRouter.go('/new_letter/step_4/' + letterId)
  },
  'click [name="skip"]'(e, t) {
    let letterId = FlowRouter.getParam('letterId')
    FlowRouter.go('/new_letter/step_4/' + letterId)
  }
})
