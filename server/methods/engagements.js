import _getData from '../utilities/getData'
import { URL } from '../utilities/url'

Meteor.methods({
  createEngagementLetter1(engagement_type, engagement_client, engagement, clientId) {
    if (this.userId) {
      let firmId =  Meteor.users.findOne({_id: this.userId}).profile.firmId
      let draft = true
      let createdAt = new Date()
      let createdBy = this.userId
      let engagementId = Letters.insert({
        engagement_type, engagement_client, engagement, firmId, createdBy, createdAt, draft
      })

      return engagementId

    } else {
      return
    }
  },
  editEngagementLetter1(_id, engagement_type, engagement_client, engagement, clientId) {
     if (this.userId) {
      let firmId =  Meteor.users.findOne({_id: this.userId}).profile.firmId
      let createdAt = new Date()
      let createdBy = this.userId
      let engagementId = Letters.update({_id}, {
        $set: {
          engagement_type, engagement_client, engagement, createdBy
        }
      })

      return engagementId

    } else {
      return
    }
  },
  createEngagementLetter2(exclusion, _id) {
    if (this.userId) {
      Letters.update({_id}, {
        $set: {
          exclusion
        }
      })
    } else {
      return
    }
  },
  paymentEngagementLetter(type, recurring, deposit, deferral, _id) {
    if (this.userId) {

      if (type === "1") {
        type = "Hourly Rate"
      } else if (type === "2") {
        type = "Retainer"
      } else if (type === "3") {
        type = "Project"
      }

      Letters.update({_id}, {
        $set: {
          deposit,
          deferral,
          type,
          recurring
        }
      })
    } else {
      return
    }
  },
  getFirmName(_id) {
    let firmId = Letters.findOne({_id}).firmId
    let firmName = Firms.findOne({_id: firmId}).name;

    if (firmName) {
      return firmName
    } else {
      return undefined
    }
  },
  saveDraftLetter(_id) {
    if (this.userId) {

      let { lawyer, client, firmId } =  _getData(_id, this.userId)

      Letters.update({_id}, {
        $set: {
          status: 'draft',
          draft: false
        }
      })

      Feed.insert({
        content: `${lawyer} saved the letter for the client ${client}`,
        createdAt: new Date(),
        firmId
      })

    } else {
      return;
    }
  },
  sendLetterToClient(_id) {
    if (this.userId) {

      const { lawyer, client, firmId } =  _getData(_id, this.userId)

      Letters.update({_id}, {
        $set: {
          status: 'pending_payment',
          sendedAt: new Date(),
          draft: false
        }
      })



      Feed.insert({
        content: `${lawyer} send the letter to the client ${client}`,
        createdAt: new Date(),
        firmId
      })

      Meteor.defer( () => {
        let { lawyer, firmId, client, clientEmail } =  _getData(_id, this.userId)
        let to = URL + 'client/review_document/' + _id

        SSR.compileTemplate('template', Assets.getText('emails/engagement_letter_sended.html'));

        let data = {
          client,
          to,
          lawyer,
        }



        Email.send({
          from: Meteor.users.findOne({_id: this.userId}).emails[0].address,
          to: clientEmail,
          subject: 'Engagement Letter',
          html: SSR.render('template', data),
        })

      })

    } else {
      return
    }
  },
  signLetter(_id) {

      Letters.update({_id}, {
        $set: {
          status: 'completing'
        }
      })

      Meteor.defer( () => {
        let date = Letters.findOne({_id}).sendedAt

    		const monthNames = [
    		    "January", "February", "March",
    		    "April", "May", "June", "July",
    		    "August", "September", "October",
    		    "November", "December"
      		]

      		let day = date.getDate();
      		let monthIndex = date.getMonth();
      		let year = date.getFullYear();

    		let dated = day + ' ' + monthNames[monthIndex] + ' ' + year

        let user = Letters.findOne({_id}).createdBy

        let deposit = Letters.findOne({_id}).deposit ? 'The deposit of $ ' + Letters.findOne({_id}).deposit + ' has been paid' : '';

        let { lawyer, firmId, client, clientEmail } =  _getData(_id, user)
        let to = URL + 'client/ready_document/' + _id

        SSR.compileTemplate('template_to_client', Assets.getText('emails/engagement_letter_ready.html'));
        SSR.compileTemplate('template_to_lawyer', Assets.getText('emails/engagement_letter_ready_to_lawyer.html'));

        let data = {
          client,
          to,
          lawyer,
          dated,
          deposit,
          firm: Firms.findOne({_id: firmId}).name,
          lawyerEmail: Meteor.users.findOne({_id: user}).emails[0].address
        }

        Email.send({
          from: 'hello@engagementletter.co',
          to: data.lawyerEmail,
          subject: `Executed Agreement ${client}` ,
          html: SSR.render('template_to_lawyer', data),
        })

        Email.send({
          from: 'hello@engagementletter.co',
          to: clientEmail,
          subject: `Executed Agreement ${client}` ,
          html: SSR.render('template_to_client', data),
        })

      })

  },
  removeParty(_id) {
    Parties.remove({_id})
  },
  add_engagement_type(name) {
    if (this.userId) {
      Engagement_types.insert({name})
    } else {
      return
    }
  },
  remove_engagement_type(_id) {
    if (this.userId) {
      Engagement_types.remove({_id})
    } else {
      return
    }
  },
  remove_letter(_id) {

    Letters.remove({_id})
  },
  client_update(data, _id) {
    Clients.update({_id}, {
      $set: {
        company_name: data.company_name,
        company_address: data.company_address,
        company_phone: data.company_phone,
        company_client_name: data.company_client_name,
        company_client_email: data.company_client_email
      }
    })
  },
  add_defult_template(content, name) {
     
     Default_Templates.insert({
      content, name
     })
  },
  remove_default_template(_id) {
    Default_Templates.remove({_id})
  },
  remove_user(_id) {
    Meteor.users.remove({_id})
  },
  saveAsPendingPayment(_id) {
    Letters.update({_id}, {
      $set: {
        status: 'pending_payment'
      }
    })
  },
  saveAsPendingSignature(_id) {
    Letters.update({_id}, {
      $set: {
        status: 'pending_signature'
      }
    })
  },
  edit_firm(name, _id) {

    Firms.update({_id}, {
      $set: {
        name: name
      }
    })

  },
  edit_default_template(name, content, _id) {
    Default_Templates.update({_id}, {
      $set: {
        name: name,
        content: content
      }
    })
  },
  edit_user(first_name, last_name, phone_number , _id) {
    Meteor.users.update({_id}, {
      $set: {
        'profile.first_name': first_name,
        'profile.last_name': last_name,
        'profile.phone_number': phone_number
      }
    })
  },
  edit_engagement_types(name, _id) {
    
    Engagement_types.update({_id}, {
      $set: {
        name: name
      }
    })

  },
})
