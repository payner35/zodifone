_.extend Template.layoutFull,
	rendered: ->
		#little hack to top the ios bouncey page effect..
		#this stops the top of the page dragging..
		#http://stackoverflow.com/questions/7798201/document-ontouchmove-and-scrolling-on-ios-5
		$('nav').bind "touchmove", (e) ->
			e.preventDefault()
			return
		return


	getProductVideo: ->
		return Session.get "productVideoUrl"

