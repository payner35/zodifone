# data models
# Loaded on both the client and the server.

Navhelp = new Meteor.Collection("navhelp")

Navhelp.allow
	insert: ->
		true
	update: ->
		true
	remove: ->
		true
	fetch: []

@Navhelp = Navhelp  #@ global variable available on both client & server

