
_.extend Template.leftNav,
	events:
		'click #btn_LNgotoDevices': ->
			console.log "sdfsdsfs"
			Router.go "devices"
			return

		'click #btn_viewPortfolio': (evt) ->
			Router.go "portfolio"
			return

		'click #btn_logOut': (evt)->
			Meteor.logout() #the router security will automatically go to the home view.
			return


	rendered: ->

		$("#leftNav").mmenu
			classes: "mm-white"
			onClick:
				preventDefault: true
			header:
				title: "Vodafone"
				add: true
				update: true


		$(".vfi_btnNav").on "click", (evt) ->
			#get the route name from the div..
			el = $(evt.target)
			route = el.data().link
			newPath = "/"+route
			#console.log Router.current().path + " " + newPath
			if Router.current().path != newPath
				Meteor.setTimeout ->
					#slight delay to let the nav close...
					Router.go route
				, 200

			return


		return

