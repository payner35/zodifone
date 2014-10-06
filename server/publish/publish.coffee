Meteor.publish "items",() ->
	myRoles = Roles.getRolesForUser(this.userId) #roles packages
	myRoles.push "standard" #for everyone

	console.log myRoles
	return Items.find
		segment:
			$in: myRoles


Meteor.publish null, ->
	return Meteor.users.find()

Meteor.publish "someItem",(someId) ->
	if someId
		return Items.find(_id: someId)
	else
		return null
	this.ready()
	return


Meteor.publish "plans", ->
	return Plans.find()



Meteor.publish "navhelp",(deviceID) ->
	#get the help nav items for a particular device
	if deviceID
		return Navhelp.find(deviceId: deviceID)
	else
		return null
	this.ready()
	return



Meteor.publish "navigation", ->
	return Navigation.find(title: "mainNav")

Meteor.publish "help", ->
	return Help.find()