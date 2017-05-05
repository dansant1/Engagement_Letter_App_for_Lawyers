Template.Lawyer_Rates.onCreated( () => {
  let template = Template.instance();

  template.texto = new ReactiveVar('Rate')
  template.textBox = new ReactiveVar(false)
  template.hourly = new ReactiveVar(true)
  template.payment = new ReactiveVar([])
  template.discount = new ReactiveVar([])
  template.array = []
  template.secondTotal = new ReactiveVar(0)
  template.total = new ReactiveVar(0)
  template.autorun(() => {
    template.subscribe('lawyers')
  })


})

Template.Lawyer_Rates.helpers({
  text() {
    return Template.instance().texto.get()
  },
  textBox() {
    return Template.instance().textBox.get()
  },
  lawyers() {
    return Meteor.users.find()
  },
  isHourly() {
    return Template.instance().hourly.get()
  },
  payment() {
    return Template.instance().payment.get()
  },
  discount() {
    return Template.instance().discount.get()
  },
  total() {
    return Template.instance().total.get()
  },
  estimate() {
    return Template.instance().secondTotal.get()
  },
  deferral() {
    if (FlowRouter.getParam('letterId')) {
      return Letters.findOne().deferral ? Letters.findOne().deferral : '' 
    } else {
      return ''
    }
  },
  deposit() {
    if (FlowRouter.getParam('letterId')) {
      return Letters.findOne().deposit ? Letters.findOne().deposit : '' 
    } else {
      return ''
    }
  },
  checked() {
    if (FlowRouter.getParam('letterId')) {
      if (Letters.findOne().recurring) {
        return 'checked'
      }  else {
        return ''
      }
    } else {
      return ''
    }
  }
})

Template.Lawyer_Rates.events({
  'click [name="next"]'(e, t) {

    let letterId = FlowRouter.getParam('letterId')
    
    let deposit_amount = t.find('[name="deposit_amount"]').value
    let deferral = null

    let type = $('[name="engagement_charge"]').val()

    if ( t.find('[name="deferral"]') ) {
      deferral = t.find('[name="deferral"]').value
    }

    if (deposit_amount === "") {
      deposit_amount = null
    }

    let recurring = $('#recurring').is(":checked")

    
    Meteor.call('paymentEngagementLetter', type, recurring, deposit_amount, deferral, letterId, (err) => {
        if (err) {
          Bert.alert(err, 'danger')
        } else {
          Meteor.call('sendLetterToClient', letterId, (err) => {
            if (!err) {
              FlowRouter.go('/home')
              Bert.alert('Engagement Letter Sended', 'success')
            } else {
              Bert.alert(err, 'danger')
            }
          })

        }
    })

  },
  'click [name="save"]'() {
    let letterId = FlowRouter.getParam('letterId')

    if (letterId) {
      Meteor.call('saveDraftLetter', letterId, (err) => {
        if (err) {
          Bert.alert(err, 'danger')
        } else {
          FlowRouter.go('/home')
        }
      })
    }
  }
})

Template.Lawyer_Rates.onCreated(() => {
  let template = Template.instance()

  template.autorun( () => {
    template.subscribe('Payment_Templates')
  })
})

Template.Lawyer_Rates.helpers({
  templates() {
    return PaymentTemplates.find()
  }
})

Template.Lawyer_Rates.events({
  'change [name="engagement_template"]'(e, t) {
    if (e.target.value === "n") {
      Modal.show('NewPaymentTemplate')
      return;
    }

    if (e.target.value !== "0") {
      t.find('[name="deferral"]').value = e.target.value
    }
  }
})
