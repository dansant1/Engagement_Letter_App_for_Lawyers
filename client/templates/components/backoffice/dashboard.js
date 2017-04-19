import uploadSignature from '../../../utilities/upload'

Template.Dashboard.onCreated(() => {
  let template = Template.instance()

  template.autorun( () => {
    template.subscribe('Feed')
  })

})

Template.Dashboard.helpers({
  feed() {
    return Feed.find()
  }
})

Template.UploadSignature.events({
	'change [name="upload"]'(event, template) {
		uploadSignature( { event, template} )

	}
})

Template.UploadLogo.events({
	'change [name="uploadLogo"]'(event, template) {
		let logo = true
		uploadSignature( { event, template, logo} )

	}
})

Template.UploadSignatureOfClient.events({
	'change [name="UploadSignatureOfClient"]'(event, template) {
		let _id = FlowRouter.getParam('letterId')
		
		let clientId = Letters.findOne({_id}).engagement_client

		let client = true
		let logo = false
		uploadSignature( { event, template, logo, client, clientId} )

	}	
})

Template.letterStatus.onCreated(() => {
	let template = Template.instance()

	template.autorun( () => {
		template.subscribe('LettersEstatus')
	})
})


Template.letterStatus.helpers({
	completing() {

		let completing

		let filter = {
			status: 'completing'
		}

		let letters = Letters.find(filter).fetch().length

		completing = letters ? letters : 0

		return completing

	},
	pendingSignatures() {
		let pendingSignatures 
		
		let filter = {
			status: 'pending_signature'
		}

		let letters = Letters.find(filter).fetch().length

		pendingSignatures = letters ? letters : 0

		return pendingSignatures

	},
	pendingPayment() {
		let pendingPayment

		let filter = {
			status: 'pending_payment'
		}
		
		let letters = Letters.find(filter).fetch().length 
		
		pendingPayment = letters ? letters : 0

		return pendingPayment
	}
})