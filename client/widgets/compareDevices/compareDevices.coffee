_.extend Template.compareDevices,
	events:
		'click #btn_compareDevices': ->
			$('#compareDevices').addClass('compareBigMode')
			return

		'click #btn_compareClose': ->
			$('#compareDevices').removeClass('compareBigMode')
			return

		'click #btn_compareMore': ->
			Router.go 'productView', {_id: @._id}
			return



	compareMe: ->
		#reactive var
		return compareMe.get()
