# data models
# Loaded on both the client and the server.

Plans = new Meteor.Collection("plans")

Plans.allow
	insert: ->
		true
	update: ->
		true
	remove: ->
		true
	fetch: []

@Plans = Plans  #@ global variable available on both client & server

