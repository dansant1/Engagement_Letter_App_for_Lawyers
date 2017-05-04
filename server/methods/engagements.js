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
  }
})
