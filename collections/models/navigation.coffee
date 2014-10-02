# data models
# Loaded on both the client and the server.

Navigation = new Meteor.Collection("navigation")

Navigation.allow
	insert: ->
		true
	update: ->
		true
	remove: ->
		true
	fetch: []

@Navigation = Navigation  #@ global variable available on both client & server

