#the route controller for this view
class @productViewController extends RouteController
	layoutTemplate: 'layoutFull'
	loadingTemplate: 'loading'
	yieldTemplates:
		'topNav': to: 'topNav'
	waitOn: ->
		return [
			this.subscribe('someItem', this.params._id).wait(),
			this.subscribe('plans').wait(),
			this.subscribe('navhelp', this.params._id).wait(),
			this.subscribe('navigation').wait()
		]
	data: ->
		return {
			item: Items.findOne(this.params._id),
			plans: Plans.find(),
			navhelp: Navhelp.findOne(deviceId: this.params._id),
			nav: Navigation.findOne(title: "mainNav")
		}
	onAfterAction: ->
		return


#template..........................
_.extend Template.productView,
	events:
		'click #btn_product-backToDevices': (event) ->
			Router.go "devices"
			return

		'click #product-videoCover': ->
			#open the video model
			console.log this
			Session.set "productVideoUrl", this.productVideoUrl
			modal = $.UIkit.modal("#modelVideo")
			modal.show()
			$("#vidContainer").fitVids()
			return


		'click [data-uk-switcher]': (evt)->
			#need a slight scroll to show in the animation..
			ele = $('body')
			ele.scrollTop(ele.scrollTop() + 1)
			return

	rendered: ->
		$('#productCarousel').slick
			autoplay: true
			draggable: false
			swipe: false
			touchMove: false
			autoplaySpeed: 8000
			arrows: false
			dots: true
			responsive: [
				{
					breakpoint: 660
					settings:
						draggable: false
						swipe: false
						touchMove: false
						dots: true
				}
			]

		return


_.extend Template.productCarousel,
	events:
		'click .uk-slidenav-previous': ->
			$('#productCarousel').slickPrev()
			return

		'click .uk-slidenav-next': ->
			$('#productCarousel').slickNext()
			return

	rendered: ->

		$("#demoTab").easyResponsiveTabs
			width: 'auto'
			fit: true

		return




