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

Template.Dashboard.events({
	'change [name="upload"]'(event, template) {
		uploadSignature( { event, template} )
	}
})