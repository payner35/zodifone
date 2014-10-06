_.extend Template.helpBar,
	rendered: ->

		Meteor.typeahead.inject($('#helpBar-search-txt'))

		return

	vfiHelp: ->
		return Help.find().fetch().map (it) ->
				it.question
