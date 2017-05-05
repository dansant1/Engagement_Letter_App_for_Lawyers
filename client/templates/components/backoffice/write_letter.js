import { validateEmail } from '../../../utilities/validations'

Template.Write_Letter.onCreated( () => {
  let template = Template.instance()

  template.autorun( () => {
    template.subscribe('Clients')
    template.subscribe('Templates')
    template.subscribe('Engagement_Types')
    template.subscribe('defaultTemplates')

    if (FlowRouter.getParam('letterId')) {
      template.subscribe('Clients')
    }
  })

})

Template.Write_Letter.helpers({
  clients() {
    return Clients.find()
  },
  templates() {
    return Templates.find()
  },
  contentToEdit() {
    if (FlowRouter.getParam('letterId')) {
      return Letters.findOne().engagement
    } else {
      return ''
    }
  },
  edit() {
    if (FlowRouter.getParam('letterId')) {
      return true
    } else {
      return false
    }
  },
  engagement_types() {
    return Engagement_types.find()
  },
  defaultTemplates() {
    return Default_Templates.find()
  },
  client() {
    if (FlowRouter.getParam('letterId')) {
      return Clients.findOne({_id: Letters.findOne().engagement_client})
    } else {
      return 
    }
  }
})

Template.Write_Letter.events({
  'click [name="engagement_template"]'(e, t) {
    let tipo = $('#engagement_type').val()
    if (e.target.value == "?") {

      if (  tipo !== "0" ) {

        if (tipo == "1") {
          t.find('[name="engagement"]').value = 'to represent you in connection with the dissolution of your entity, [name], and related tax issues. This letter confirms the terms on which we will represent you in this matter.'
          return
        } else if ( tipo == "2") {
          t.find('[name="engagement"]').value = ' [the formation of the company and its initial stock issuances].  [You will be responsible for applying for and obtaining all taxpayer identification numbers and business licenses and for making any tax elections (such as S Corporation elections).  Individual stockholders will be responsible for timely filing their own tax filings (as we do not represent them), such as 83(b) elections.]'
          return
        }

      }


    }
  },
  'change [name="engagement_template"]'(e, t) {

    if (e.target.value === "n") {
        Modal.show('NewTemplate')
        return
    }

    if (e.target.value === "?" ) {

        let tipo = $('#engagement_type').val()

        if (  tipo !== "0" ) {

          if (tipo == "1") {
            t.find('[name="engagement"]').value = 'to represent you in connection with the dissolution of your entity, [name], and related tax issues. This letter confirms the terms on which we will represent you in this matter.'
            return
          } else if ( tipo == "2") {
            t.find('[name="engagement"]').value = ' [the formation of the company and its initial stock issuances].  [You will be responsible for applying for and obtaining all taxpayer identification numbers and business licenses and for making any tax elections (such as S Corporation elections).  Individual stockholders will be responsible for timely filing their own tax filings (as we do not represent them), such as 83(b) elections.]'
            return
          }

        }

    } else {
      t.find('[name="engagement"]').value = e.target.value
    }

  },
  'click [name="add_client"]'(e, t) {
    let data = {
      company_name: t.find('[name="name"]').value,
      company_address: t.find('[name="address"]').value,
      company_phone: t.find('[name="phone"]').value,
      company_client_name: t.find('[name="client_name"]').value,
      company_client_email: t.find('[name="client_email"]').value,
    }

    if (data.company_name !== "" && data.company_address !== "" && data.company_phone !== "" && data.company_client_name !== "" && data.company_client_email !== "") {

      if (!validateEmail(data.company_client_email)) {
        Bert.alert('Write a correct email', 'warning')
        return
      }

      Meteor.call('add_client', data,  (err) => {
        if (err) {
          t.find('[name="name"]').value = ""
          t.find('[name="address"]').value = ""
          t.find('[name="phone"]').value = ""
          t.find('[name="client_name"]').value = ""
          t.find('[name="client_email"]').value = ""
          Bert.alert( err, 'danger', 'growl-top-right' );
        } else {
          t.find('[name="name"]').value = ""
          t.find('[name="address"]').value = ""
          t.find('[name="phone"]').value = ""
          t.find('[name="client_name"]').value = ""
          t.find('[name="client_email"]').value = ""
          Bert.alert( 'Client added', 'success', 'growl-top-right' );
        }
      })
    } else {
      Bert.alert( 'Complete the Details', 'warning', 'growl-top-right' );
    }
  },
  'click [name="next"]'(e, t) {

    let engagement_type;
    let engagement_client;
    let engagement;
    engagement_type = "1"
   

    if ($('[name="engagement"]').val() === "0") {
      Bert.alert('Write a Engagement', 'warning')
      return;
    } else {
      engagement = $('[name="engagement"]').val()
    }

    if ($('[name="engagement_client"]').val() === "0") {

      console.log('hollalalall')
      let data = {
        company_name: t.find('[name="name"]').value,
        company_address: t.find('[name="address"]').value,
        company_phone: t.find('[name="phone"]').value,
        company_client_name: t.find('[name="client_name"]').value,
        company_client_email: t.find('[name="client_email"]').value,
      }

      if (data.company_name !== "" && data.company_address !== "" && data.company_phone !== "" && data.company_client_name !== "" && data.company_client_email !== "") {

        if (!validateEmail(data.company_client_email)) {
          Bert.alert('Write a correct email', 'warning')
          return
        }

        Meteor.call('add_client', data,  (err, result) => {
          if (err) {
            t.find('[name="name"]').value = ""
            t.find('[name="address"]').value = ""
            t.find('[name="phone"]').value = ""
            t.find('[name="client_name"]').value = ""
            t.find('[name="client_email"]').value = ""
            Bert.alert( err, 'danger', 'growl-top-right' );
            return
          } else {
            t.find('[name="name"]').value = ""
            t.find('[name="address"]').value = ""
            t.find('[name="phone"]').value = ""
            t.find('[name="client_name"]').value = ""
            t.find('[name="client_email"]').value = ""
           
            engagement_client = result 

            Meteor.call('createEngagementLetter1', engagement_type, engagement_client, engagement, (err, result) => {
              if (err) {
                Bert.alert(err, 'danger')
              } else {
                FlowRouter.go('/new_letter/step_3/' + result)
              }
            })
          }
        })

      } else {
        Bert.alert( 'Complete the Details of the Client', 'warning', 'growl-top-right' );
        return
      }
    } else {
      engagement_client = $('[name="engagement_client"]').val()

       if (!FlowRouter.getParam('letterId')) {
     
        Meteor.call('createEngagementLetter1', engagement_type, engagement_client, engagement, (err, result) => {
          if (err) {
            Bert.alert(err, 'danger')
          } else {
            FlowRouter.go('/new_letter/step_3/' + result)
          }
        })
        
      } else {

        let data = {
          company_name: t.find('[name="name"]').value,
          company_address: t.find('[name="address"]').value,
          company_phone: t.find('[name="phone"]').value,
          company_client_name: t.find('[name="client_name"]').value,
          company_client_email: t.find('[name="client_email"]').value,
        }

        
        engagement_client = Letters.findOne({_id: FlowRouter.getParam('letterId')}).engagement_client

        if (data.company_name !== "" && data.company_address !== "" && data.company_phone !== "" && data.company_client_name !== "" && data.company_client_email !== "") {

          if (!validateEmail(data.company_client_email)) {
            Bert.alert('Write a correct email', 'warning')
            return
          }

          Meteor.call('client_update', data, engagement_client, (err) => {
            if (!err) {
              Meteor.call('editEngagementLetter1', FlowRouter.getParam('letterId'),  engagement_type, engagement_client, engagement, (err, result) => {
                if (err) {
                  Bert.alert(err, 'danger')
                } else {
                  FlowRouter.go('/new_letter/step_3/' + FlowRouter.getParam('letterId'))
                }
              })
            } else {
              Bert.alert(err, 'danger')
            }
          })

        }

        

      }
    }
  }
})
