Template.Login.events({
  'submit form'(e, t) {
    e.preventDefault()
    let data = {
      email: t.find("[name='email']").value,
      password: t.find("[name='password']").value
    }



    if (data.email !== "" && data.password !== "") {

      Meteor.loginWithPassword(data.email, data.password, (err) => {
        if (err) {
          Bert.alert( err, 'danger', 'growl-top-right' );
        } else {
            FlowRouter.go('/home')
        }
      })

    } else {
      Bert.alert('Complete the data')
    }
  }
})
