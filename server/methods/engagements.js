import _getData from '../utilities/getData'
import { URL } from '../utilities/url'

Meteor.methods({
  createEngagementLetter1(engagement_type, engagement_client, engagement, clientId) {
    if (this.userId) {
      let firmId =  Meteor.users.findOne({_id: this.userId}).profile.firmId

      let createdBy = this.userId
      let engagementId = Letters.insert({
        engagement_type, engagement_client, engagement, firmId, createdBy
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
  paymentEngagementLetter(payment, total, hourly, _id) {
    if (this.userId) {
      Letters.update({_id}, {
        $set: {
          payment,
          total,
          hourly
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
          status: 'pending signature',
          sendedAt: new Date()
        }
      })
      


      Feed.insert({
        content: `${lawyer} send the letter to the client ${client}`,
        createdAt: new Date(),
        firmId
      })

      Meteor.defer( () => {
        let { lawyer, firmId } =  _getData(_id, this.userId)
        let to = URL + 'client/review_document/' + _id
        console.log(to)
        Email.send({
          from: Meteor.users.findOne({_id: this.userId}).emails[0].address,
          to: 'danieldelgadilloh@gmail.com',
          text: `${lawyer} sended you his engagement letter. Link to ${to}`
        })
      })

    } else {
      return
    }
  }
})
