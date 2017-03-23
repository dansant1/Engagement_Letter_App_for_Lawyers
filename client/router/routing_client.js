FlowRouter.route('/home', {
  name: 'Home',
  action() {
    BlazeLayout.render('Backoffice', { page: 'home' })
  }
})

FlowRouter.route('/auth', {
  name: 'Auth',
  action() {
    BlazeLayout.render('Auth', { step: 'Auth_Step_1' })
  }
})

FlowRouter.route('/', {
  name: 'Auth',
  action() {
    BlazeLayout.render('Auth', { step: 'Auth_Step_1' })
  }
})

FlowRouter.route('/auth_2', {
  name: 'Auth',
  action() {
    BlazeLayout.render('Auth', { step: 'Auth_Step_2' })
  }
})

FlowRouter.route('/list_letters', {
  name: 'List of Letters',
  action() {
    BlazeLayout.render('List_Letters', { page: 'letters'})
  }
})

FlowRouter.route('/setup', {
  name: 'Setup.',
  action() {
    BlazeLayout.render('Backoffice', { page: 'Setup' })
  }
})

FlowRouter.route('/payments', {
  name: 'List of Payments',
  action() {
    BlazeLayout.render('Payments', { page: 'list_of_payments'})
  }
})

FlowRouter.route('/new_letter', {
  name: 'New Letter Step 1',
  action() {
    BlazeLayout.render('New_Letter', { step: 'Write_Letter'})
  }
})

FlowRouter.route('/new_letter/step_2', {
  name: 'New Letter Step 2',
  action() {
    BlazeLayout.render('New_Letter', { step: 'Write_Exclusion'})
  }
})

FlowRouter.route('/new_letter/step_3', {
  name: 'New Letter Step 3',
  action() {
    BlazeLayout.render('New_Letter', { step: 'signature'})
  }
})

FlowRouter.route('/new_letter/step_4', {
  name: 'New Letter Step 3',
  action() {
    BlazeLayout.render('New_Letter', { step: 'Lawyer_Rates'})
  }
})

FlowRouter.route('/account/settings', {
  name: 'Account Settings',
  action() {
    BlazeLayout.render('Account', { step: 'Settings'})
  }
})


// FlowRouter.route('/view_letter/:letterId', {
//   name: 'View Letter',
//   action() {
//     BlazeLayout.render('View_Letter', { letter: 'Letter_Layout'})
//   }
// })


FlowRouter.route('/view_letter', {
  name: 'View Letter',
  action() {
    BlazeLayout.render('Letter_Layout', { letter: 'View_Letter'})
  }
})
