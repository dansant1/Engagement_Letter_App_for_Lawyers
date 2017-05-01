import _getData from '../utilities/getData'
import { URL } from '../utilities/url'

Meteor.methods({
  createEngagementLetter1(engagement_type, engagement_client, engagement, clientId) {
    if (this.userId) {
      let firmId =  Meteor.users.findOne({_id: this.userId}).profile.firmId
      let createdAt = new Date()
      let createdBy = this.userId
      let engagementId = Letters.insert({
        engagement_type, engagement_client, engagement, firmId, createdBy, createdAt
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
  paymentEngagementLetter(payment, total, hourly, deposit, deferral, _id, secondTotal) {
    if (this.userId) {
      Letters.update({_id}, {
        $set: {
          payment,
          total,
          deposit,
          deferral,
          hourly,
          secondTotal
        }
      })
    } else {
      return;
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
          status: 'draft'
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
          sendedAt: new Date()
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

  }
})
