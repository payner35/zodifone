_.extend Template.productItem,
	events:
		'click .productClickMe': (evt) ->
			Router.go 'productView', {_id: @._id}
			return

		'click .product-compare-box': (evt) ->
			if $(window).width() > 660
				#only for non mobile

				checkBox = $(evt.target).closest('i')
				if checkBox.length is 0
					checkBox =  $(evt.target).find('i')

				isChecked = checkBox.hasClass('uk-icon-check-square-o')

				if !isChecked
					if CompareDevices.length > 2
						#we have 3 items on the compare list..
						#pop the first out..
						#turn off check box
						CompareDevices[0].target.removeClass("uk-icon-check-square-o")
						CompareDevices[0].target.addClass("uk-icon-square-o")
						CompareDevices[0].compareBox.removeClass("compare-active")
						console.log CompareDevices.shift()

					#add new item to the compare list
					someDevice =
						target: checkBox
						compareBox: $(evt.target).closest(".product-compare-box")
						data: @

					#turn on the check box
					checkBox.removeClass("uk-icon-square-o").addClass("uk-icon-check-square-o")
					$(evt.target).closest(".product-compare-box").addClass("compare-active")
					CompareDevices.push(someDevice)
				else
					#delete it form compare list
					i = CompareDevices.length
					while i--
						if CompareDevices[i].data._id is @._id
							CompareDevices[i].target.removeClass("uk-icon-check-square-o").addClass("uk-icon-square-o")
							CompareDevices[i].compareBox.removeClass("compare-active")
							CompareDevices.splice i, 1


				if CompareDevices.length > 0
					#show the copare box
					#console.log "show"
					$('#compareDevices-wrapper').addClass('uk-animation-slide-bottom') #slide up from bottom
					$('#compareDevices-wrapper').removeClass('uk-hidden') #slide up from bottom

				if CompareDevices.length is 0
					#hide the compare box
					#console.log "hide"
					$('#compareDevices-wrapper').removeClass('uk-animation-slide-bottom') #slide up from bottom
					$('#compareDevices-wrapper').addClass('uk-hidden') #slide up from bottom

				compareMe.set(CompareDevices) #set the reactive var..

			return


	rendered: ->
		#with underscore..
		segments = _.intersection(this.data.segment, ['vvip', 'vip'])
		if segments.length > 0
			#add the class for styling
			this.$('.uk-panel').addClass('vip')

			#add the data attributes fro sorting mixitup
			setMe = this.firstNode
			_.each this.data.segment, (item, index) ->
				setMe.setAttribute("data-"+item, index)



		return