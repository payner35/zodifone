_.extend Template.mainCarousel,
	events:
		'click .uk-slidenav-previous': (event) ->
			$('#mainCarousel').slickPrev()
			return

		'click .uk-slidenav-next': (event) ->
			$('#mainCarousel').slickNext()
			return

	rendered: ->
		$('#mainCarousel').slick
			autoplay: true
			autoplaySpeed: 8000
			arrows: false
			dots: false

		return