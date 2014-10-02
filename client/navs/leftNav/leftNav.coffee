_.extend Template.leftNav,
	events:
		'click #btn_LNgotoDevices': ->
			console.log "sdfsdsfs"
			Router.go "devices"
			return
		'click #btn_viewPortfolio': (evt) ->
			Router.go "portfolio"
			return

		'click .gavin': (evt) ->
			console.log "fjdhfdskhf"
			return

		'click #btn_logOut': (evt)->
			Meteor.logout() #the router security will automatically go to the home view.
			return

	rendered: ->

		$("#leftMenu").mmenu
			classes: "mm-white"
			onClick:
				preventDefault: true
			header:
				title: "Vodafone"
				add: true
				update: true
		,
			classNames:
				selected: "uk-active"


		$("#leftMenu").on "closing.mm", (evt)->
			#remove the mmenu stuff form the body.. ;)
			$('body').removeClass('uk-offcanvas-page')
			$('body').removeAttr("style")

			#get the route name from the div..
			el = $(evt.target).find('.mm-selected').find('.vfi-btnNav')
			route = el.data().link
			Router.go route
			return

		return




_.extend UI,
	events:
		'click .btn_Nav': (evt) ->
			console.log @
			console.log evt.target
			return
