#the route controller for this view
class @devicesController extends RouteController
	layoutTemplate: 'layoutFull'
	loadingTemplate: 'loading'
	yieldTemplates:
		'topNav': to: 'topNav'
	waitOn: ->
		return [
			this.subscribe('items').wait(),
			this.subscribe('navhelp', "devices").wait()
		]
	data: ->
		return {
			items: Items.find(),
			navhelp: Navhelp.findOne(deviceId: "devices"),
			nav: Navigation.findOne(title: "mainNav")
		} #all events gets sent to the template.



@CompareDevices = []
@compareMe = new ReactiveVar()


#template..........................
_.extend Template.devices,
	events:
		'submit form': (event) ->
			return

		'click #btn_devicesHelpMeSelect': ->
			modal = $.UIkit.modal("#searchModal")
			modal.show()
			#deactivate any selectedoptions
			$('.vfi-button-filter').removeClass('uk-active')
			$('#btn_searchModal').text('Show All Phones') #reset button text
			return


	rendered: ->
		#called when the dom is rendered..
		console.log "devices is rendered"



		try
			$("#container").mixItUp('getState') #if a current mixitup exists...
			$("#container").mixItUp('destroy') #kill it and reload..
			#mixitup seems to have an issue with rendering again.. its eaier to kill and reload.


		$("#container").mixItUp
			callbacks:
				onMixLoad: ->
					console.log "MixItUp ready!"
					return

				onMixFail: ->
					console.log "No elements found matching"
					return

			load:
				filter: ".phone"
				sort: 'vvip:dec vip:dec'

			debug:
				enable: true
				mode: "verbose"



		return