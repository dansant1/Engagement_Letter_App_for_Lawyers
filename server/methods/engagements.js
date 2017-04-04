Meteor.methods({
  createEngagementLetter1(engagement_type, engagement_client, engagement, clientId) {
    if (this.userId) {
      let firmId =  Meteor.users.findOne({_id: this.userId}).profile.firmId;

      let createdBy = this.userId
      let engagementId = Letters.insert({
        engagement_type, engagement_client, engagement, firmId, createdBy
      })

      return engagementId
    } else {
      return;
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
      return;
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
  saveDraftLetter(_id) {
    if (this.userId) {
      Letters.update({_id}, {
        $set: {
          draft: true
        }
      })
      let lawyer = Meteor.users.findOne({_id: this.userId}).profile.first_name + ' ' + Meteor.users.findOne({_id: this.userId}).profile.last_name
      let clientId = Letters.findOne({_id}).engagement_client;
      let client = Clients.findOne({_id: clientId}).company_client_name
      let firmId =  Meteor.users.findOne({_id: this.userId}).profile.firmId

      Feed.insert({
        content: `${lawyer} saved the letter for the client ${client}`,
        createdAt: new Date(),
        firmId
      })

    } else {
      return;
    }
  }
})
