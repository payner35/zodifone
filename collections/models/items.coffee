# data models
# Loaded on both the client and the server.

Items = new Meteor.Collection("items")

Items.allow
	insert: ->
		true
	update: ->
		true
	remove: ->
		true
	fetch: []

@Items = Items  #@ global variable available on both client & server

