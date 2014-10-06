_.extend Template.topNav,
	events:
		'click #btn_openLeftNav': ->
			$("#leftNav").trigger( "open.mm" )
			return

	userPic: ->
		if Meteor.user()
			return Meteor.user().profile.img


_.extend Template.vfiNavMyVodafone,
	events:
		'click #btn_logOut': (evt)->
			Meteor.logout() #the router security will automatically go to the home view.
			return

	user: ->
		if Meteor.user()
			return Meteor.user()





someRandomNumber = null

_.extend Template.primaryNavItem,

	genRandom: ->
		#generate a random number
		someRandomNumber = Random.id()
		return someRandomNumber


	getRandom: ->
		#get the most recent random gened
		return someRandomNumber