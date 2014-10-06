# data models
# Loaded on both the client and the server.

Help = new Meteor.Collection("help")

Help.allow
	insert: ->
		true
	update: ->
		true
	remove: ->
		true
	fetch: []

@Help = Help  #@ global variable available on both client & server

