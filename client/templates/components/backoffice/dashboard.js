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