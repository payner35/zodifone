#the route controller for this view
class @homeController extends RouteController
	layoutTemplate: 'layoutFull'
	loadingTemplate: 'loading'
	yieldTemplates:
		'topNav': to: 'topNav'
	waitOn: ->
		return [
			this.subscribe('items').wait(),
			this.subscribe('navhelp', "home").wait()
		]
	data: ->
		return {
			items: Items.find(),
			navhelp: Navhelp.findOne(deviceId: "home"),
			nav: Navigation.findOne(title: "mainNav")
		} #all events gets sent to the template.





#template..........................
_.extend Template.home,




	rendered: ->
		#called when the dom is rendered..
		console.log "home is rendered"






		return