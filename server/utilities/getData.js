let _getData = (_id, userId) => {

    let lawyer = Meteor.users.findOne({_id: userId}).profile.first_name + ' ' + Meteor.users.findOne({_id: userId}).profile.last_name, 
          clientId = Letters.findOne({_id}).engagement_client,
          client = Clients.findOne({_id: clientId}).company_client_name, 
          clientEmail = Clients.findOne({_id: clientId}).company_client_email,
          firmId = Meteor.users.findOne({_id: userId}).profile.firmId
    
    console.log(userId)

    return {
      lawyer,
      client,
      clientEmail,
      firmId
    }
}

export default _getData