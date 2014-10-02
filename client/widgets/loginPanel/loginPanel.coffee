_.extend Template.loginPanel,
	events:
		'submit form': (event) ->
			#stop the bubble..
			event.preventDefault()
			event.stopPropagation()

			#lets log the user into the Meteor account system
			email = $("#loginPanel_name").val()
			password = $("#loginPanel_pass").val()

			Meteor.loginWithPassword {email: email}, password, (err) ->
				if err
					console.log "Bad log in"

				else
					modal = $.UIkit.modal("#modelLogin")
					if modal.isActive()
						modal.hide()

			return
