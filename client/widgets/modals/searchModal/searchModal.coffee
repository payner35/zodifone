filterArray = []

_.extend Template.searchModal,
	events:
		'click #btn_searchModal': ->
			modal = $.UIkit.modal("#searchModal")
			modal.hide()

			if filterArray.length is 0
				filterArray =  ['all']

			#set the mixItUp Filter...
			$('#container').mixItUp 'filter', filterArray.toString(), (state)->
				#console.log state
				return true

			filterArray = [] #reset the filter
			return

		'click .vfi-button-filter': (evt)->

			if $(evt.target).hasClass('uk-active')
				#toggle on..
				console.log "toggle on"
				#console.log $(evt.target).text()
				filterArray.push "."+$(evt.target).text()

			else
				#togle off.. remove the class from the string
				index = filterArray.indexOf("."+$(evt.target).text()) # <-- Not supported in <IE9
				filterArray.splice index, 1  if index isnt -1

			if filterArray.length > 0
				$('#btn_searchModal').text('Show Phones')
			else
				$('#btn_searchModal').text('Show All')

			return




