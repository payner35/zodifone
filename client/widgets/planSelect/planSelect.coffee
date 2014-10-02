
g1 = null
g2 = null
g3 = null #the guages
g4 = null


_.extend Template.planSelect,
	events:
		'click .uk-close': (evt) ->
			#close the select plan box
			$('.plan-wrapper').removeClass('plan-active')
			return

		'click .btn-plan': (evt) ->



			return


	rendered: ->

		#simulate a click
		$('#plan-wrapper-selectButtons>li:first-child button').click()

		return

