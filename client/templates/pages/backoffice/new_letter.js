
Template.New_Letter.onCreated( () => {
	let template = Template.instance()

	if (FlowRouter.getParam('letterId')) {
      template.autorun(() => {
      	template.subscribe('Letter', FlowRouter.getParam('letterId'))
      })
    }


})

Template.New_Letter.helpers({
	defaultText() {
		if (FlowRouter.getParam('letterId')) {
			return 'Edit'
		} else {
			return 'New'
		}
	}
})