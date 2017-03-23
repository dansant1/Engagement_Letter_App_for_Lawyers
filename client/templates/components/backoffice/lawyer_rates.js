Template.Lawyer_Rates.onCreated( () => {
  let template = Template.instance();

  template.texto = new ReactiveVar('Type of Charge')
})

Template.Lawyer_Rates.helpers({
  text() {
    return Template.instance().texto.get()
  }
})

Template.Lawyer_Rates.events({
  'change [name="engagement_charge"]'(e, t) {

    if (e.target.value === "1") {
      t.texto.set('Hourly')
    } else if (e.target.value === "2" ) {
      t.texto.set('Montly Retainer')
    } else if (e.target.value === "3") {
      t.texto.set('Project Estimate')
    } else {
      t.texto.set('Type of Charge')
    }

  }
})
