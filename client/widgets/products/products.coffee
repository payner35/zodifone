#template..........................
_.extend Template.products,
	events:
		'click .ggg': (event) ->

			return


	rendered: ->
		#called when the dom is rendered..
		console.log "products is rendered"
		$('#products-carousel').slick
			autoplay: true
			autoplaySpeed: 8000
			arrows: true
			infinite: true
			slidesToShow: 3
			slidesToScroll: 3
			responsive: [
				{
					breakpoint: 480
					settings:
						arrows: false
						touchMove: true
						slidesToShow: 1
						slidesToScroll: 1
				}
			]


		return
