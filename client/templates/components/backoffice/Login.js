Template.Login.events({
  'submit form'(e, t) {
    e.preventDefault()
    let data = {
      email: t.find("[name='email']").value,
      password: t.find("[name='password']").value
    }



    if (data.email !== "" && data.password !== "") {

      let $button = $('button[type="submit"]')

      $button.prop( "disabled", true )
      $button.text('Loading...')

      Meteor.loginWithPassword(data.email, data.password, (err) => {
        if (err) {
          Bert.alert( err, 'danger', 'growl-top-right' );
          $button.prop( "disabled", false )
          $button.text('Login')
        } else {
          FlowRouter.go('/home')
        }
      })

    } else {
      Bert.alert('Complete the data')
    }
  }
})

Template.LoginAdmin.events({
  'submit form'(e, t) {
    e.preventDefault()
    let data = {
      email: t.find("[name='email']").value,
      password: t.find("[name='password']").value
    }



    if (data.email !== "" && data.password !== "") {

      let $button = $('button[type="submit"]')

      $button.prop( "disabled", true )
      $button.text('Loading...')

      Meteor.loginWithPassword(data.email, data.password, (err) => {
        if (err) {
          Bert.alert( err, 'danger', 'growl-top-right' );
          $button.prop( "disabled", false )
          $button.text('Login')
        } else {
          FlowRouter.go('/admin/home')
        }
      })

    } else {
      Bert.alert('Complete the data')
    }
  }
})