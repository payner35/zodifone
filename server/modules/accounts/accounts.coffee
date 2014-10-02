Accounts.config
	sendVerificationEmail: true

Accounts.onCreateUser (options, user) ->
	#called when a new user is originally set up in Meteor


	if user.services?.facebook?
		#do we have a new facebook user registering for the first time.
		console.log "Creating a Facebook account for " + user.services.facebook.email
		options.profile.email = user.services.facebook.email
		options.profile.name = user.services.facebook.name
		options.profile.id = user.services.facebook.id
		options.profile.img = 'https://graph.facebook.com/' + user.services.facebook.id + '/picture?type=small'
		user.roles = [] #initialise a new roles array
		user.roles.push("user")


	if options.profile
		#to make the profile variables available to the usrs beyond the account owner (the admins)
		#we need to add them to a public profile object.
		user.profile = options.profile
	else
		user.profile = null #create a user profile variable..



	mergeObject = (obj1, obj2) ->
		#merges 2 objects together....
		obj3 = {}
		for attrname of obj1
			obj3[attrname] = obj1[attrname]
		for attrname of obj2
			obj3[attrname] = obj2[attrname]
		return obj3

	if options.email is "admin@admin.com"
		settings =  #defult settings for the superadmin
			points: 0
			name: "Chuck Norris"
			id: "111111"
			level: "white"
			img: "/img/adminProfile.jpg"
			email: options.email
		user.profile = mergeObject user.profile, settings  #merge the settings into the object..
	else
		if user.services?.facebook?
			settings =
				points: 0
				level: "blue"
		else
		#some normal user..
			settings =  #defult settings for the user
				points: 0
				name: "Brian Griffin"
				id: "222222"
				level: "blue"
				id: "12345"
				img: "/img/userProfile.jpg"
				email: options.email
		user.profile = mergeObject user.profile, settings  #merge the settings into the object..

	console.log "new user has been created....."
	console.log "------------------------------"
	return user
	
	
Meteor.methods

	account_createNewAccount: (doc) ->
		#we MUST call check to validate the schema
		#check(doc, AccountSchema)
		#lets make sure the user does not allready exist..
		#Meteor.users.findOne(emails: { $elemMatch: { address: doc.email }})
		if Meteor.users.findOne({"profile.email": doc.email }) #does the email allready exist
			console.log "Account: - This user allready exsits.. " + doc.email
		else
			console.log "Creating an account for " + doc.email
			#add user to a role.
			if doc.email is "admin@admin.com"
				someUser = Accounts.createUser
					email: doc.email
					password: "admin"
				Roles.addUsersToRoles(someUser, ['super', 'vvip']) #set as super user
			else
				someUser = Accounts.createUser
					email: doc.email
					password: "user"
				Roles.addUsersToRoles(someUser, ['user', 'ios']) #set as standard user
		return

	account_deleteAllUsers: ->
		#jim your crazy... but your about to delete all the users..
		Meteor.users.remove({})
		Meteor.call "account_createDefaultUsers"
		return

	account_createDefaultUsers: ()->
		#create the default users..
		#set up the default superadmin...
		Meteor.call "account_createNewAccount", {email: "admin@admin.com", pass: "admin"}
		Meteor.call "account_createNewAccount", {email: "user@user.com", pass: "user"}
		return


