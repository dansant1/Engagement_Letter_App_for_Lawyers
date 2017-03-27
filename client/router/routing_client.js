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


FlowRouter.route('/login', {
  name: 'Login',
  action() {
    BlazeLayout.render('Auth', { step: 'Login' })
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

// FlowRouter.route('/new_letter/step_3', {
//   name: 'New Letter Step 3',
//   action() {
//     BlazeLayout.render('New_Letter', { step: 'Lawyer_Rates'})
//   }
// })

FlowRouter.route('/new_letter/step_3', {
  name: 'New Letter Step 3 - Conflicts',
  action() {
    BlazeLayout.render('New_Letter', { step: 'Conflicts'})
  }
})

FlowRouter.route('/new_letter/step_4', {
  name: 'New Letter Step 4',
  action() {
    BlazeLayout.render('New_Letter', { step: 'Lawyer_Rates'})
  }
})

FlowRouter.route('/new_letter/step_5', {
  name: 'New Letter Step 5',
  action() {
    BlazeLayout.render('New_Letter', { step: 'signature'})
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

// FlowRouter.route('/client/review_document/:letterId', {
//   name: 'Review Document',
//   action() {
//     BlazeLayout.render('Client_Layout', { letter: 'Review_Letter'})
//   }
// })

FlowRouter.route('/client/review_document', {
  name: 'Review Document',
  action() {
    BlazeLayout.render('Client_Layout', { page: 'Review_Letter'})
  }
})


// FlowRouter.route('/client/payment_letter/:letterId', {
//   name: 'Review Document',
//   action() {
//     BlazeLayout.render('Client_Layout', { page: 'Review_Letter'})
//   }
// })

FlowRouter.route('/client/payment_letter', {
  name: 'Pay Letter',
  action() {
    BlazeLayout.render('Client_Layout', { page: 'Pay_Letter'})
  }
})


FlowRouter.route('/client/sign_letter', {
  name: 'Sign Letter',
  action() {
    BlazeLayout.render('Client_Layout', { page: 'Sign_Letter'})
  }
})

FlowRouter.route('/mobile/signup', {
  name: 'Mobile Design Signup',
  action() {
    BlazeLayout.render('Mobile_Signup')
  }
})

FlowRouter.route('/mobile/signup/2', {
  name: 'Mobile Design Signup',
  action() {
    BlazeLayout.render('Mobile_Signup_2')
  }
})

FlowRouter.route('/mobile/login', {
  name: 'Mobile Design login',
  action() {
    BlazeLayout.render('Mobile_Login')
  }
})

FlowRouter.route('/mobile', {
  name: 'Mobile Design',
  action() {
    BlazeLayout.render('Mobile_Layout', { page: 'Mobile_Home'})
  }
})

FlowRouter.route('/mobile/setup', {
  name: 'Mobile Design Setup',
  action() {
    BlazeLayout.render('Mobile_Layout', { page: 'Mobile_Setup'})
  }
})

FlowRouter.route('/mobile/new_letter', {
  name: 'Mobile Design New Letter',
  action() {
    BlazeLayout.render('Mobile_New_Letter')
  }
})

FlowRouter.route('/mobile/new_letter/2', {
  name: 'Mobile Design New Letter 2',
  action() {
    BlazeLayout.render('Mobile_New_Letter_2')
  }
})

FlowRouter.route('/mobile/new_letter/3', {
  name: 'Mobile Design New Letter 3',
  action() {
    BlazeLayout.render('Mobile_New_Letter_3')
  }
})

FlowRouter.route('/mobile/new_letter/4', {
  name: 'Mobile Design New Letter 4',
  action() {
    BlazeLayout.render('Mobile_New_Letter_4')
  }
})

FlowRouter.route('/mobile/new_letter/5', {
  name: 'Mobile Design New Letter 5',
  action() {
    BlazeLayout.render("Mobile_New_Letter_5")
  }
})


FlowRouter.route('/mobile/new_letter/6', {
  name: 'Mobile Design New Letter 6',
  action() {
    BlazeLayout.render("Mobile_New_Letter_6")
  }
})

FlowRouter.route('/mobile/draw_signature', {
  name: 'Mobile Design Draw Signature',
  action() {
    BlazeLayout.render("Draw_Signature")
  }
})

FlowRouter.route('/mobile/letters', {
  name: 'Mobile Design List of Letters',
  action() {
    BlazeLayout.render('Mobile_Layout', { page: 'Mobile_List_Letters'})
  }
})

FlowRouter.route('/mobile/view_letter', {
  name: 'Mobile Design View of Letter',
  action() {
    BlazeLayout.render('Mobile_Layout', { page: 'mobile_view_letter'})
  }
})
