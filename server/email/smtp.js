Meteor.startup( () => {

  let username = 'LegalApps';
  let password = ',nJEpkTk8mWcC6q2b';
  let service = 'smtp.sendgrid.net';
  let port = 587;

  process.env.MAIL_URL = `smtp://${username}:${password}@${service}:${port}`

});
