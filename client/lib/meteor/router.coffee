if Meteor.isClient


	#set up subscriptions form the server..
	@Subscriptions =  #make gloabal var with the '@'... its now accesable in any controller
		navigation: Meteor.subscribe "navigation"

	Router.configure
		notFoundTemplate: '404'

  #define routes...
	Router.map ->
		@route 'home',
			path:"/"
			controller: "homeController"

		@route 'devices',
			path:"/devices"
			controller: "devicesController"

		@route 'productView',
			path: "/product/:_id"
			controller: "productViewController"




	Router.onBeforeAction ->
		$('body').scrollTop 0  #scroll to the top of the page on route
		jQuery.UIkit.offcanvas.hide() #close any nav if opened

		#remove any open mega menu..
		$(".vfi-nav-parent").removeClass('uk-open')
		return


	Router.onBeforeAction 'loading'
	#https://github.com/EventedMind/iron-router/issues/554