arc = null

_.extend Template.superGuage,

	rendered: ->

		return



_.extend Template.credits,

	rendered: ->
		el =  this.find('.superGuage')
		g = this.data
		@svg = null

		radius = 70

		arc = d3.svg.arc()
			.innerRadius(.9 * 70)
			.outerRadius(70)
			.startAngle(0)

		# Create the SVG container, and apply a transform such that the origin is the
		# center of the canvas. This way, we don't need to position arcs individually.
		svg = d3.select(el).append("svg")
			.attr("width", 2*radius)
			.attr("height", 2*radius)
			.append("g")
			.attr("transform", "translate(" + radius + "," + radius + ")")

		# Add the background arc, from 0 to 100% (τ).
		background = svg.append("path")
			.datum(endAngle: 360 * (Math.PI / 180))
			.style("fill", "#efefef")
			.style("stroke": "#efefef")
			.attr("d", arc)

		# Add the foreground arc in orange, currently showing 12.7%.
		foreground = svg.append("path")
			.datum(endAngle: 0 * (Math.PI / 180))
			.style("fill", g.color)
			.style("stroke": g.color)
			.attr("d", arc)

		addText(svg, g.amount,"amount","VodafoneRg_Bd", 30, -20)
		addText(svg, g.p1,"p1", "VodafoneLt", 20, 0)
		addText(svg, g.p2, "p2", "VodafoneLt", 20, 16)
		rotateDial(foreground, g.radius/360, g.color)


		return

	addText = (someSVG, someText, someClass, font, size, position) ->
		someSVG.append("svg:text")
		.attr("y", position)
		.attr("text-anchor", "middle")
		.attr("class", someClass)
		.style("dominant-baseline", "central")
		.text(someText)
		#.style("font-size", size + "px")
		.attr("font-family", font)
		return


	rotateDial = (foreground, roateMe, color) ->
		foreground.style("fill", color)
		foreground.style("stroke": color)
		foreground.transition()
		.duration(750)
		.call(arcTween, roateMe*(2 * Math.PI))
		return

	arcTween = (transition, newAngle) ->


		# The function passed to attrTween is invoked for each selected element when
		# the transition starts, and for each element returns the interpolator to use
		# over the course of transition. This function is thus responsible for
		# determining the starting angle of the transition (which is pulled from the
		# element's bound datum, d.endAngle), and the ending angle (simply the
		# newAngle argument to the enclosing function).

		transition.attrTween 'd', (d) ->

			# To interpolate between the two angles, we use the default d3.interpolate.
			# (Internally, this maps to d3.interpolateNumber, since both of the
			# arguments to d3.interpolate are numbers.) The returned function takes a
			# single argument t and returns a number between the starting angle and the
			# ending angle. When t = 0, it returns d.endAngle; when t = 1, it returns
			# newAngle; and for 0 < t < 1 it returns an angle in-between.
			interpolate = d3.interpolate(d.endAngle, newAngle)

			# The return value of the attrTween is also a function: the function that
			# we want to run for each tick of the transition. Because we used
			# attrTween("d"), the return value of this last function will be set to the
			# "d" attribute at every tick. (It's also possible to use transition.tween
			# to run arbitrary code for every tick, say if you want to set multiple
			# attributes from a single function.) The argument t ranges from 0, at the
			# start of the transition, to 1, at the end.
			(t) ->

				# Calculate the current arc angle based on the transition time, t. Since
				# the t for the transition and the t for the interpolate both range from
				# 0 to 1, we can pass t directly to the interpolator.
				#
				# Note that the interpolated angle is written into the element's bound
				# data object! This is important: it means that if the transition were
				# interrupted, the data bound to the element would still be consistent
				# with its appearance. Whenever we start a new arc transition, the
				# correct starting angle can be inferred from the data.
				d.endAngle = interpolate(t)

				# Lastly, compute the arc path given the updated data! In effect, this
				# transition uses data-space interpolation: the data is interpolated
				# (that is, the end angle) rather than the path string itself.
				# Interpolating the angles in polar coordinates, rather than the raw path
				# string, produces valid intermediate arcs during the transition.
				arc d

		return
