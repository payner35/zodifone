;(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
    /*jslint indent: 2 */
    /*jslint node: true */
    /*jslint nomen: true*/
    /*jslint white: true */

    /*global d3 */

// A context for drawing into SVG using polar co-ordinates.

    "use strict";

    var _ = require("./lodash-2.4.0.min.js");

    var diskProto = {

        name: "defaultDisk",
        radius: 100,
        classes: "disk",

        defaultStyles: {
            "fill": "#000",
            "stroke": "#000",
            "stroke-width": "1px",
            "font-family": "sans-serif"
        },

        degreesToRadians: function degreesToRadians(degrees) {
            return degrees * Math.PI / 180;
        },

        /**
         * @private
         * Convert from polar to cartesian co-ordinates.
         * @param {Number} t Angle in degrees, where 0 degrees is
         *     upwards.
         * @param {Number} r Distance from disk's centre, as a
         *     proportion of the disk's radius (i.e. a number between 0
         *     and 1).
         */
        polarToCartesian: function polarToCartesian(t, r) {
            // We add 90 degrees to t here so that t=0 degrees means "upwards"
            // (otherwise it means "to the left", which is just weird).
            var radians = this.degreesToRadians(t + 90);
            return {
                x: this.radius - this.radius * r * Math.cos(radians), // XXX
                y: this.radius - this.radius * r * Math.sin(radians)  // XXX
            };
        },

        /**
         * Set some styles on some object.  Given a target object and a
         * list of style names to set, it sets each of those styles on
         * the object to either the disk object's default styles or (if
         * specified here) an override value.
         * @private
         * @param {Object} target The object whose styles we wish to
         *     modify.
         * @param {String[]} styles Names of styles to set.  An array
         *     containing zero or more of the strings "fill", "stroke"
         *     and "stroke-width".
         * @param {Object} [overrides] An object containing overrides of
         *     the disk's default drawing styles.
         * @param {String} [overrides.fill] A fill colour, e.g. "#000".
         * @param {String} [overrides.stroke] A stroke colour,
         *     e.g. "#000".
         * @param {String} [overrides.stroke-width] A stroke width,
         *     e.g. "1px".
         * @param {String} [overrides.font-family] A font family,
         *     e.g. "Courier New".
         */
        setStyles: function setStyles(target, styles, overrides) {
            var useStyles = _.merge({}, this.defaultStyles, overrides);
            styles.forEach(function(style) {
                if (useStyles[style] !== undefined) {
                    target.style(style, useStyles[style]);
                }
            });
        },

        /**
         * Draw a circle.
         * @param {Number} radius Radius of circle, as a proportion of the disk's
         *     radius (i.e. a number between 0 and 1).
         * @param {Object} [styles] Overrides of the disk's default
         *     styles for drawing.
         * @param {String} [styles.fill] The circle's fill colour,
         *     e.g. "#000".
         * @param {String} [styles.stroke] The circle's stroke colour
         *     (for its outline), e.g. "#000".
         * @param {String} [styles.stroke-width] The circle's stroke
         *     width (for its outline) e.g. "1px".
         */
        drawCircle: function drawCircle(radius, styles) {
            var circle = this.body.append("svg:circle")
                .attr("cx", this.radius)
                .attr("cy", this.radius)
                .attr("r", this.radius * radius);
            this.setStyles(circle, ["fill", "stroke", "stroke-width"], styles);
            return this;
        },

        /**
         * Draw a radial line.
         * @param {Number} angle Angle at which to draw radial, in
         *     degrees.
         * @param {Number} innerRadius Inner limit of radial, as a
         *     proportion of the disk's radius (i.e. a number between 0
         *     and 1).
         * @param {Number} outerRadius Outer limit of radial, as a
         *     proportion of the disk's radius (i.e. a number between 0
         *     and 1).
         * @param {Object} [styles] Overrides of the disk's default styles for
         *     drawing.
         * @param {String} [styles.stroke] The radial's stroke colour,
         *     e.g. "#000".
         * @param {String} [styles.stroke-width] The radial's stroke width,
         *     e.g. "1px".
         */
        drawRadial: function drawRadial(angle, innerRadius, outerRadius, styles) {
            var start = this.polarToCartesian(angle, innerRadius),
                end = this.polarToCartesian(angle, outerRadius),
                radial = this.body.append("svg:line")
                    .attr("x1", start.x)
                    .attr("y1", start.y)
                    .attr("x2", end.x)
                    .attr("y2", end.y);
            this.setStyles(radial, ["stroke", "stroke-width"], styles);
            return this;
        },

        /**
         * Draw an arc.
         * @param {Number} startAngle Start angle of arc, in degrees.
         * @param {Number} endAngle End angle of arc, in degrees.
         * @param {Number} innerRadius Inner radius of arc, as a
         *     proportion of the disk's radius (i.e. a number between 0
         *     and 1).
         * @param {Number} outerRadius Outer radius of arc, as a
         *     proportion of the disk's radius (i.e. a number between 0
         *     and 1).
         * @param {Object} [styles] Overrides of the disk's default styles for
         *     drawing.
         * @param {String} [styles.fill] The arc's colour, e.g. "#000".
         * @param {String} [styles.stroke] The arc's stroke colour,
         *     e.g. "#000".
         * @param {String} [styles.stroke-width] The arc's stroke width,
         *     e.g. "1px".
         */


        drawArc: function drawArc(startAngle, endAngle, innerRadius,
                                  outerRadius, className, styles) {
            var self = this,
                arc = this.body.append("svg:path");
            this.setStyles(arc, ["fill", "stroke", "stroke-width"], styles);
            arc.attr("d", d3.svg.arc()
                    .startAngle(this.degreesToRadians(startAngle))
                    .endAngle(this.degreesToRadians(endAngle))
                    .innerRadius(innerRadius * this.radius)
                    .outerRadius(outerRadius * this.radius)
                    )
                .attr("class", className)
                .attr("transform", function() {
                    return "translate(" + self.radius + ", " + self.radius + ")";
                });
            return this;
        },

        /**
         * Draw some text.
         * @param {Number} angle Angular component of polar co-ordinate
         *     at which to draw text.
         * @param {Number} radius Radial component of polar co-ordinate
         *     at which to draw text; a proportion of the disk's radius
         *     (i.e. a number between 0 and 1).
         * @param {Number} rotation Angle by which to rotate text (0 is
         *     no rotation).
         * @param {Number} fontSize Font size, as a proportion of the
         *     disk's radius (i.e. a number between 0 and 1).
         * @param {String} text The text to draw.
         * @param {Object} [styles] Overrides of the disk's default
         *     styles for drawing.
         * @param {String} [styles.fill] The text's fill colour,
         *     e.g. "#000".
         * @param {String} [styles.font-family] The text's font family,
         *     e.g. "Courier New".
         */
        drawText: function drawText(angle, radius, rotation, fontSize, text, className,
                                    styles) {
            var loc = this.polarToCartesian(angle, radius),
                size = Math.floor(this.radius * fontSize),
            // dy = Math.floor((this.radius * fontSize) / 2);
            // loc.y = loc.y - dy;
                tsvg = this.body.append("svg:text")
                    .attr("x", loc.x)
                    .attr("y", loc.y) // this.config.cy / 2 + fontSize / 2)
                    .attr("dy", 0) // dy) // fontSize / 2)
                    .attr("text-anchor", "middle")
                    .attr("class", className)
                    .style("dominant-baseline", "central")
                    .text(text)
                    .style("font-size", size + "px");
            this.setStyles(tsvg, ["fill", "font-family"], styles);
            tsvg.attr("transform", function() {
                return "rotate(" + rotation + "," + loc.x + "," + loc.y + ")";
            });
            return this;
        }

    };

    exports.createDisk = function(config) {
        var newDisk = _.merge({}, diskProto, config);
        // console.log("CreateDisk", config, newDisk);
        newDisk.body = d3.select("#" + newDisk.name)
            .append("svg:svg")
            .attr("class", newDisk.classes)
            .attr("width", newDisk.radius * 2)
            .attr("height", newDisk.radius * 2);
        return newDisk;
    };

},{"./lodash-2.4.0.min.js":3}],2:[function(require,module,exports){
    /*jslint indent: 2 */
    /*jslint node: true */
    /*jslint nomen: true*/
    /*jslint white: true */

    /*global d3 */

    "use strict";

// A context for drawing into SVG using polar co-ordinates.
    var disk = require('./disk.js');

    function Gauge(gaugeName, configuration) {

        this.gaugeName = gaugeName;

        var self = this; // for internal d3 functions

        this.configure = function(configuration) {

            var defaults,
                key;
            this.config = configuration;

            function setConfig(name, defaultValue) {
                if (self.config[name] === undefined) {
                    self.config[name] = defaultValue;
                }
            }

            function clamp(name, minimum, maximum) {
                if (undefined !== minimum) {
                    self.config[name] = Math.max(self.config[name], minimum);
                }
                if (undefined !== maximum) {
                    self.config[name] = Math.min(self.config[name], maximum);
                }
            }

            defaults = {

                size: 100,
                // Offset gap degrees (anticlockwise).  0: gap at bottom; 90:
                // gap at right.
                rotation: 90,
                gap: 90,

                drawOuterCircle: true,
                outerStrokeColor: "#000",
                outerFillColor: "#ccc",
                innerStrokeColor: "#e0e0e0",
                innerFillColor: "#fff",

                label: undefined,
                labelSize: 0.1, // Default font size is 10% of radius.
                labelColor: "#333",

                min: -6,
                max: 6,
                initial: undefined,
                clampUnderflow: false,
                clampOverflow: false,

                majorTickColor: "#333",
                majorTickWidth: "2px",
                minorTicks: 5,
                minorTickColor: "#666",
                minorTickWidth: "1px",

                greenColor: "#109618",
                yellowColor: "#FF9900",
                redColor: "#DC3912",

                transitionDuration: 500

            };

            for (key in defaults) {
                if (defaults.hasOwnProperty(key)) {
                    setConfig(key, defaults[key]);
                }
            }

            // Object.keys(defaults).forEach(function (key) {
            //   setConfig(key, defaults[key]);
            // });

            this.config.size = this.config.size * 0.9;
            this.config.radius = this.config.size * 0.97 / 2;
            this.config.cx = this.config.size / 2;
            this.config.cy = this.config.size / 2;
            this.config.range = this.config.max - this.config.min;
            setConfig("initial", (this.config.min + this.config.max) / 2);
            setConfig("majorTicks", this.config.range + 1);

            clamp("majorTicks", 0);
            clamp("minorTicks", 0);
            clamp("transitionDuration", 0);
            clamp("gap", 0, 360);

            // console.log(this.config);
        };

        this.render = function() {
            this.disk = disk.createDisk({
                name: this.gaugeName,
                classes: "gauge",
                radius: this.config.size / 2
            });

            this.renderDisk();
            this.renderLabel();
            this.renderRegions([
                [this.config.greenZones, this.config.greenColor],
                [this.config.yellowZones, this.config.yellowColor],
                [this.config.redZones, this.config.redColor]
            ]);
            this.renderTicks();
            this.renderPointer();
            this.setPointer(this.config.initial, 0);
        };

        this.renderDisk = function() {
            // Outer circle
            if (this.config.drawOuterCircle) {
                this.disk.drawCircle(1, {
                    fill: this.config.outerFillColor,
                    stroke: this.config.outerStrokeColor,
                    "stroke-width": "0.5px"
                });
            }

            // Inner circle
            this.disk.drawCircle(0.9, {
                fill: this.config.innerFillColor,
                stroke: this.config.innerStrokeColor,
                "stroke-width": "0.5px"
            });
        };

        this.renderLabel = function() {
            if (undefined !== this.config.label) {
                this.disk.drawText(0, 0.3, 0, this.config.labelSize, this.config.label, {
                    fill: this.config.labelColor
                });
            }
        };

        this.renderRegions = function(zones) {
            function renderOneRegion(region, color) {
                region.forEach(function(band) {
                    self.drawBand(band.from, band.to, color);
                });
            }
            this.clearRegions();
            zones.forEach(function(zone) {
                renderOneRegion(zone[0], zone[1]);
            });
            renderOneRegion(this.config.yellowZones, this.config.yellowColor);
            renderOneRegion(this.config.redZones, this.config.redColor);
        };

        this.clearRegions = function() {
            this.disk.body.selectAll(".gaugeBand").remove();
        };

        this.drawBand = function(start, end, color) {
            var startDegrees = this.valueToDegrees(start),
                endDegrees = this.valueToDegrees(end);
            this.disk.drawArc(startDegrees, endDegrees, 0.65, 0.85, {
                fill: color,
                stroke: "none"
            });
        };

        this.renderTicks = function() {
            var majorDelta,
                minorDelta,
                major,
                minor,
                majorDegrees,
                majorText,
                fontSize = 0.1; // XXX
            // Render major ticks.
            if (this.config.majorTicks <= 0) {
                return;
            }
            majorDelta = this.config.range / (this.config.majorTicks - 1);
            for (major = this.config.min; major <= this.config.max; major += majorDelta) {
                // Render minor ticks.
                minorDelta = majorDelta / this.config.minorTicks;
                for (minor = major + minorDelta; minor < Math.min(major + majorDelta, this.config.max); minor += minorDelta) {
                    this.disk.drawRadial(this.valueToDegrees(minor), 0.75, 0.85, {
                        stroke: this.config.minorTickColor,
                        "stroke-width": this.config.minorTickWidth
                    });
                }
                majorDegrees = this.valueToDegrees(major);
                this.disk.drawRadial(majorDegrees, 0.7, 0.85, {
                    stroke: this.config.majorTickColor,
                    "stroke-width": this.config.majorTickWidth
                });

                // Render numbers.
                majorText = parseFloat(major.toFixed(2));
                this.disk.drawText(majorDegrees, 0.58, 0, fontSize, majorText, {
                    fill: this.config.majorTickColor
                });
            }
        };

        this.renderPointer = function() {
            var pointerContainer,
                pointerPath,
                pointerLine,
                fontSize;
            pointerContainer = this.disk.body.append("svg:g").attr("class", "pointerContainer");
            this.pointerValue = this.config.min; // Start out pointing at minimum value.
            pointerPath = this.buildPointerPath();
            pointerLine = d3.svg.line()
                .x(function(d) { return d.x; })
                .y(function(d) { return d.y; })
                .interpolate("basis");
            pointerContainer.selectAll("path")
                .data([pointerPath])
                .enter().append("svg:path")
                .attr("d", pointerLine)
                .style("fill", "#dc3912")
                .style("stroke", "#c63310")
                .style("fill-opacity", 0.7);
            fontSize = Math.round(this.config.labelSize * this.config.size / 2);
            pointerContainer.selectAll("text")
                .data([this.pointerValue])
                .enter().append("svg:text")
                .attr("x", this.config.cx)
                .attr("y", this.config.size - this.config.cy / 2 - fontSize)
                .attr("dy", fontSize / 2)
                .attr("text-anchor", "middle")
                .style("font-size", fontSize + "px")
                .style("fill", this.config.labelColor)
                .style("stroke-width", "0px");
        };

        // Compute points for initial pointer state.
        this.buildPointerPath = function() {
            var fatness = 15,
                head,
                head1,
                head2,
                tailAngle,
                tail,
                tail1,
                tail2;
            this.pointerAngle = this.valueToDegrees(this.pointerValue);
            tailAngle = this.pointerAngle + 180;
            head = this.polarToCartesian(this.pointerAngle, 0.65);
            head1 = this.polarToCartesian(this.pointerAngle - fatness, 0.12);
            head2 = this.polarToCartesian(this.pointerAngle + fatness, 0.12);
            tail = this.polarToCartesian(tailAngle, 0.28);
            tail1 = this.polarToCartesian(tailAngle - fatness, 0.12);
            tail2 = this.polarToCartesian(tailAngle + fatness, 0.12);
            return [head, head1, tail2, tail, tail1, head2, head];
        };

        this.setPointer = function(newValue, duration) {
            var valueForAngle,
                oldAngle = this.pointerAngle,
                newAngle,
                pointerContainer = this.disk.body.select(".pointerContainer");
            if ((newValue > self.config.max) && this.config.clampOverflow) {
                newValue = self.config.max;
            } else if ((newValue < self.config.min) && this.config.clampUnderflow) {
                newValue = self.config.min;
            }
            if (newValue > self.config.max) {
                valueForAngle = self.config.max + 0.02 * self.config.range;
            } else if (newValue < self.config.min) {
                valueForAngle = self.config.min - 0.02 * self.config.range;
            } else {
                valueForAngle = newValue;
            }
            if (undefined === duration) {
                duration = this.config.transitionDuration;
            }
            newAngle = self.valueToDegrees(valueForAngle) + this.config.rotation - (this.config.gap / 2);
            this.pointerAngle = newAngle;
            this.pointerValue = newValue;
            this.rotateElement(pointerContainer.selectAll("path"),
                oldAngle,
                newAngle,
                self.config.cx,
                self.config.cy,
                duration);
            pointerContainer.selectAll("text").text(parseFloat(newValue.toFixed(2)));
        };



        // Converting gauge values to angles and points on the disk.

        // Convert a value (on the guage) into the corresponding angle on
        // the gauge.
        this.valueToDegrees = function(value) {
            var valueProp,
                rotate,
                arc,
                angleFromStart;
            // Value as a proportion of the range.  Somewhere between 0 and 1
            // (or slightly out of that ranfge for underflow/overflow).
            valueProp = (value - this.config.min) / this.config.range;
            // 0 rotation (in config) means gap at bottom.  But in drawing
            // terms, 0 degrees is upwards (assuming the computation goes via
            // polarToCartesian below, which it should), so we rotate
            // everything by 180 degrees to get 0 degrees to point to the
            // bottom, then rotate by half of whatever gap has been requested
            // in order to centre the gap there.  Finally add whatever
            // rotation the config asks for.
            rotate = 180 + (this.config.gap / 2) + this.config.rotation;
            // arc is the number of degrees covered by the gauge - it defaults
            // to 270 (ie a gap of 90 degrees).
            arc = 360 - this.config.gap;
            angleFromStart = valueProp * arc + rotate;
            return angleFromStart;
        };

        this.valueToRadians = function(value) {
            return this.degreesToRadians(this.valueToDegrees(value));
        };

        // Convert a gauge value and a factor (0-1, a proportion of the
        // radius) to cartesian co-ordinates.
        this.valueToPoint = function(value, factor) {
            return this.polarToCartesian(this.valueToDegrees(value), factor);
        };



        // Co-ordinate system utilities.

        this.degreesToRadians = function(degrees) {
            return degrees * Math.PI / 180;
        };

        // Convert polar coordinate - specified by angle t (in degrees,
        // where 0 degrees is upwards) and distance r (as proportion of
        // radius, so 0 is centre and 1 is at circumference) - into
        // Cartesian coordinate.
        this.polarToCartesian = function(t, r) {
            // We add 90 degrees to t here so that t=0 degrees means "upwards"
            // (otherwise it means "to the left", which is just weird).
            var radians = this.degreesToRadians(t + 90);
            return {
                x: this.config.cx - this.config.radius * r * Math.cos(radians),
                y: this.config.cy - this.config.radius * r * Math.sin(radians)
            };
        };



        // Drawing utilities.

        this.rotateElement = function(element, fromAngle, toAngle, centre_x, centre_y, duration) {
            element.transition()
                .duration(duration)
                .attrTween("transform", function() {
                    return function(step) {
                        var dest = fromAngle + (toAngle - fromAngle) * step;
                        return "rotate("+ dest +","+ centre_x + ","+ centre_y +")";
                    };
                });
        };

        // initialization
        this.configure(configuration);
    }

    exports.Gauge = Gauge;

},{"./disk.js":1}],3:[function(require,module,exports){
    var global=typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {};/**
     * @license
     * Lo-Dash 2.4.0 (Custom Build) lodash.com/license | Underscore.js 1.5.2 underscorejs.org/LICENSE
     * Build: `lodash modern -o ./dist/lodash.js`
     */
    ;(function(){function n(n,t,e){e=(e||0)-1;for(var r=n?n.length:0;++e<r;)if(n[e]===t)return e;return-1}function t(t,e){var r=typeof e;if(t=t.l,"boolean"==r||null==e)return t[e]?0:-1;"number"!=r&&"string"!=r&&(r="object");var u="number"==r?e:m+e;return t=(t=t[r])&&t[u],"object"==r?t&&-1<n(t,e)?0:-1:t?0:-1}function e(n){var t=this.l,e=typeof n;if("boolean"==e||null==n)t[n]=true;else{"number"!=e&&"string"!=e&&(e="object");var r="number"==e?n:m+n,t=t[e]||(t[e]={});"object"==e?(t[r]||(t[r]=[])).push(n):t[r]=true
    }}function r(n){return n.charCodeAt(0)}function u(n,t){for(var e=n.m,r=t.m,u=-1,o=e.length;++u<o;){var i=e[u],a=r[u];if(i!==a){if(i>a||typeof i=="undefined")return 1;if(i<a||typeof a=="undefined")return-1}}return n.n-t.n}function o(n){var t=-1,r=n.length,u=n[0],o=n[r/2|0],i=n[r-1];if(u&&typeof u=="object"&&o&&typeof o=="object"&&i&&typeof i=="object")return false;for(u=f(),u["false"]=u["null"]=u["true"]=u.undefined=false,o=f(),o.k=n,o.l=u,o.push=e;++t<r;)o.push(n[t]);return o}function i(n){return"\\"+U[n]
    }function a(){return h.pop()||[]}function f(){return g.pop()||{k:null,l:null,m:null,"false":false,n:0,"null":false,number:null,object:null,push:null,string:null,"true":false,undefined:false,o:null}}function l(n){n.length=0,h.length<_&&h.push(n)}function c(n){var t=n.l;t&&c(t),n.k=n.l=n.m=n.object=n.number=n.string=n.o=null,g.length<_&&g.push(n)}function p(n,t,e){t||(t=0),typeof e=="undefined"&&(e=n?n.length:0);var r=-1;e=e-t||0;for(var u=Array(0>e?0:e);++r<e;)u[r]=n[t+r];return u}function s(e){function h(n){if(!n||ce.call(n)!=q)return false;
        var t=n.valueOf,e=typeof t=="function"&&(e=ye(t))&&ye(e);return e?n==e||ye(n)==e:ht(n)}function g(n,t,e){if(!n||!V[typeof n])return n;t=t&&typeof e=="undefined"?t:et(t,e,3);for(var r=-1,u=V[typeof n]&&Te(n),o=u?u.length:0;++r<o&&(e=u[r],false!==t(n[e],e,n)););return n}function _(n,t,e){var r;if(!n||!V[typeof n])return n;t=t&&typeof e=="undefined"?t:et(t,e,3);for(r in n)if(false===t(n[r],r,n))break;return n}function U(n,t,e){var r,u=n,o=u;if(!u)return o;for(var i=arguments,a=0,f=typeof e=="number"?2:i.length;++a<f;)if((u=i[a])&&V[typeof u])for(var l=-1,c=V[typeof u]&&Te(u),p=c?c.length:0;++l<p;)r=c[l],"undefined"==typeof o[r]&&(o[r]=u[r]);
        return o}function H(n,t,e){var r,u=n,o=u;if(!u)return o;var i=arguments,a=0,f=typeof e=="number"?2:i.length;if(3<f&&"function"==typeof i[f-2])var l=et(i[--f-1],i[f--],2);else 2<f&&"function"==typeof i[f-1]&&(l=i[--f]);for(;++a<f;)if((u=i[a])&&V[typeof u])for(var c=-1,p=V[typeof u]&&Te(u),s=p?p.length:0;++c<s;)r=p[c],o[r]=l?l(o[r],u[r]):u[r];return o}function J(n){var t,e=[];if(!n||!V[typeof n])return e;for(t in n)me.call(n,t)&&e.push(t);return e}function Q(n){return n&&typeof n=="object"&&!$e(n)&&me.call(n,"__wrapped__")?n:new X(n)
    }function X(n,t){this.__chain__=!!t,this.__wrapped__=n}function Z(n){function t(){if(r){var n=r.slice();be.apply(n,arguments)}if(this instanceof t){var o=tt(e.prototype),n=e.apply(o,n||arguments);return wt(n)?n:o}return e.apply(u,n||arguments)}var e=n[0],r=n[2],u=n[4];return De(t,n),t}function nt(n,t,e,r,u){if(e){var o=e(n);if(typeof o!="undefined")return o}if(!wt(n))return n;var i=ce.call(n);if(!K[i])return n;var f=Re[i];switch(i){case T:case F:return new f(+n);case W:case P:return new f(n);case z:return o=f(n.source,C.exec(n)),o.lastIndex=n.lastIndex,o
    }if(i=$e(n),t){var c=!r;r||(r=a()),u||(u=a());for(var s=r.length;s--;)if(r[s]==n)return u[s];o=i?f(n.length):{}}else o=i?p(n):H({},n);return i&&(me.call(n,"index")&&(o.index=n.index),me.call(n,"input")&&(o.input=n.input)),t?(r.push(n),u.push(o),(i?St:g)(n,function(n,i){o[i]=nt(n,t,e,r,u)}),c&&(l(r),l(u)),o):o}function tt(n){return wt(n)?je(n):{}}function et(n,t,e){if(typeof n!="function")return Ut;if(typeof t=="undefined"||!("prototype"in n))return n;var r=n.__bindData__;if(typeof r=="undefined"&&(Ae.funcNames&&(r=!n.name),r=r||!Ae.funcDecomp,!r)){var u=ge.call(n);
        Ae.funcNames||(r=!O.test(u)),r||(r=E.test(u),De(n,r))}if(false===r||true!==r&&1&r[1])return n;switch(e){case 1:return function(e){return n.call(t,e)};case 2:return function(e,r){return n.call(t,e,r)};case 3:return function(e,r,u){return n.call(t,e,r,u)};case 4:return function(e,r,u,o){return n.call(t,e,r,u,o)}}return Mt(n,t)}function rt(n){function t(){var n=f?i:this;if(u){var h=u.slice();be.apply(h,arguments)}return(o||c)&&(h||(h=p(arguments)),o&&be.apply(h,o),c&&h.length<a)?(r|=16,rt([e,s?r:-4&r,h,null,i,a])):(h||(h=arguments),l&&(e=n[v]),this instanceof t?(n=tt(e.prototype),h=e.apply(n,h),wt(h)?h:n):e.apply(n,h))
    }var e=n[0],r=n[1],u=n[2],o=n[3],i=n[4],a=n[5],f=1&r,l=2&r,c=4&r,s=8&r,v=e;return De(t,n),t}function ut(e,r){var u=-1,i=vt(),a=e?e.length:0,f=a>=b&&i===n,l=[];if(f){var p=o(r);p?(i=t,r=p):f=false}for(;++u<a;)p=e[u],0>i(r,p)&&l.push(p);return f&&c(r),l}function ot(n,t,e,r){r=(r||0)-1;for(var u=n?n.length:0,o=[];++r<u;){var i=n[r];if(i&&typeof i=="object"&&typeof i.length=="number"&&($e(i)||yt(i))){t||(i=ot(i,t,e));var a=-1,f=i.length,l=o.length;for(o.length+=f;++a<f;)o[l++]=i[a]}else e||o.push(i)}return o
    }function it(n,t,e,r,u,o){if(e){var i=e(n,t);if(typeof i!="undefined")return!!i}if(n===t)return 0!==n||1/n==1/t;if(n===n&&!(n&&V[typeof n]||t&&V[typeof t]))return false;if(null==n||null==t)return n===t;var f=ce.call(n),c=ce.call(t);if(f==D&&(f=q),c==D&&(c=q),f!=c)return false;switch(f){case T:case F:return+n==+t;case W:return n!=+n?t!=+t:0==n?1/n==1/t:n==+t;case z:case P:return n==oe(t)}if(c=f==$,!c){var p=me.call(n,"__wrapped__"),s=me.call(t,"__wrapped__");if(p||s)return it(p?n.__wrapped__:n,s?t.__wrapped__:t,e,r,u,o);
        if(f!=q)return false;if(f=n.constructor,p=t.constructor,f!=p&&!(dt(f)&&f instanceof f&&dt(p)&&p instanceof p)&&"constructor"in n&&"constructor"in t)return false}for(p=!u,u||(u=a()),o||(o=a()),f=u.length;f--;)if(u[f]==n)return o[f]==t;var v=0,i=true;if(u.push(n),o.push(t),c){if(f=n.length,v=t.length,i=v==n.length,!i&&!r)return i;for(;v--;)if(c=f,p=t[v],r)for(;c--&&!(i=it(n[c],p,e,r,u,o)););else if(!(i=it(n[v],p,e,r,u,o)))break;return i}return _(t,function(t,a,f){return me.call(f,a)?(v++,i=me.call(n,a)&&it(n[a],t,e,r,u,o)):void 0
    }),i&&!r&&_(n,function(n,t,e){return me.call(e,t)?i=-1<--v:void 0}),p&&(l(u),l(o)),i}function at(n,t,e,r,u){($e(t)?St:g)(t,function(t,o){var i,a,f=t,l=n[o];if(t&&((a=$e(t))||h(t))){for(f=r.length;f--;)if(i=r[f]==t){l=u[f];break}if(!i){var c;e&&(f=e(l,t),c=typeof f!="undefined")&&(l=f),c||(l=a?$e(l)?l:[]:h(l)?l:{}),r.push(t),u.push(l),c||at(l,t,e,r,u)}}else e&&(f=e(l,t),typeof f=="undefined"&&(f=t)),typeof f!="undefined"&&(l=f);n[o]=l})}function ft(n,t){return n+he(Ee()*(t-n+1))}function lt(e,r,u){var i=-1,f=vt(),p=e?e.length:0,s=[],v=!r&&p>=b&&f===n,h=u||v?a():s;
        if(v){var g=o(h);g?(f=t,h=g):(v=false,h=u?h:(l(h),s))}for(;++i<p;){var g=e[i],y=u?u(g,i,e):g;(r?!i||h[h.length-1]!==y:0>f(h,y))&&((u||v)&&h.push(y),s.push(g))}return v?(l(h.k),c(h)):u&&l(h),s}function ct(n){return function(t,e,r){var u={};e=Q.createCallback(e,r,3),r=-1;var o=t?t.length:0;if(typeof o=="number")for(;++r<o;){var i=t[r];n(u,i,e(i,r,t),t)}else g(t,function(t,r,o){n(u,t,e(t,r,o),o)});return u}}function pt(n,t,e,r,u,o){var i=1&t,a=4&t,f=16&t,l=32&t;if(!(2&t||dt(n)))throw new ie;f&&!e.length&&(t&=-17,f=e=false),l&&!r.length&&(t&=-33,l=r=false);
        var c=n&&n.__bindData__;return c&&true!==c?(c=c.slice(),!i||1&c[1]||(c[4]=u),!i&&1&c[1]&&(t|=8),!a||4&c[1]||(c[5]=o),f&&be.apply(c[2]||(c[2]=[]),e),l&&be.apply(c[3]||(c[3]=[]),r),c[1]|=t,pt.apply(null,c)):(1==t||17===t?Z:rt)([n,t,e,r,u,o])}function st(n){return Fe[n]}function vt(){var t=(t=Q.indexOf)===Wt?n:t;return t}function ht(n){var t,e;return n&&ce.call(n)==q&&(t=n.constructor,!dt(t)||t instanceof t)?(_(n,function(n,t){e=t}),typeof e=="undefined"||me.call(n,e)):false}function gt(n){return Be[n]}function yt(n){return n&&typeof n=="object"&&typeof n.length=="number"&&ce.call(n)==D||false
    }function mt(n,t,e){var r=Te(n),u=r.length;for(t=et(t,e,3);u--&&(e=r[u],false!==t(n[e],e,n)););return n}function bt(n){var t=[];return _(n,function(n,e){dt(n)&&t.push(e)}),t.sort()}function _t(n){for(var t=-1,e=Te(n),r=e.length,u={};++t<r;){var o=e[t];u[n[o]]=o}return u}function dt(n){return typeof n=="function"}function wt(n){return!(!n||!V[typeof n])}function jt(n){return typeof n=="number"||n&&typeof n=="object"&&ce.call(n)==W||false}function kt(n){return typeof n=="string"||n&&typeof n=="object"&&ce.call(n)==P||false
    }function xt(n){for(var t=-1,e=Te(n),r=e.length,u=Xt(r);++t<r;)u[t]=n[e[t]];return u}function Ct(n,t,e){var r=-1,u=vt(),o=n?n.length:0,i=false;return e=(0>e?Ne(0,o+e):e)||0,$e(n)?i=-1<u(n,t,e):typeof o=="number"?i=-1<(kt(n)?n.indexOf(t,e):u(n,t,e)):g(n,function(n){return++r<e?void 0:!(i=n===t)}),i}function Ot(n,t,e){var r=true;t=Q.createCallback(t,e,3),e=-1;var u=n?n.length:0;if(typeof u=="number")for(;++e<u&&(r=!!t(n[e],e,n)););else g(n,function(n,e,u){return r=!!t(n,e,u)});return r}function Nt(n,t,e){var r=[];
        t=Q.createCallback(t,e,3),e=-1;var u=n?n.length:0;if(typeof u=="number")for(;++e<u;){var o=n[e];t(o,e,n)&&r.push(o)}else g(n,function(n,e,u){t(n,e,u)&&r.push(n)});return r}function It(n,t,e){t=Q.createCallback(t,e,3),e=-1;var r=n?n.length:0;if(typeof r!="number"){var u;return g(n,function(n,e,r){return t(n,e,r)?(u=n,false):void 0}),u}for(;++e<r;){var o=n[e];if(t(o,e,n))return o}}function St(n,t,e){var r=-1,u=n?n.length:0;if(t=t&&typeof e=="undefined"?t:et(t,e,3),typeof u=="number")for(;++r<u&&false!==t(n[r],r,n););else g(n,t);
        return n}function Et(n,t,e){var r=n?n.length:0;if(t=t&&typeof e=="undefined"?t:et(t,e,3),typeof r=="number")for(;r--&&false!==t(n[r],r,n););else{var u=Te(n),r=u.length;g(n,function(n,e,o){return e=u?u[--r]:--r,t(o[e],e,o)})}return n}function Rt(n,t,e){var r=-1,u=n?n.length:0;if(t=Q.createCallback(t,e,3),typeof u=="number")for(var o=Xt(u);++r<u;)o[r]=t(n[r],r,n);else o=[],g(n,function(n,e,u){o[++r]=t(n,e,u)});return o}function At(n,t,e){var u=-1/0,o=u;if(typeof t!="function"&&e&&e[t]===n&&(t=null),null==t&&$e(n)){e=-1;
        for(var i=n.length;++e<i;){var a=n[e];a>o&&(o=a)}}else t=null==t&&kt(n)?r:Q.createCallback(t,e,3),St(n,function(n,e,r){e=t(n,e,r),e>u&&(u=e,o=n)});return o}function Dt(n,t,e,r){if(!n)return e;var u=3>arguments.length;t=Q.createCallback(t,r,4);var o=-1,i=n.length;if(typeof i=="number")for(u&&(e=n[++o]);++o<i;)e=t(e,n[o],o,n);else g(n,function(n,r,o){e=u?(u=false,n):t(e,n,r,o)});return e}function $t(n,t,e,r){var u=3>arguments.length;return t=Q.createCallback(t,r,4),Et(n,function(n,r,o){e=u?(u=false,n):t(e,n,r,o)
    }),e}function Tt(n){var t=-1,e=n?n.length:0,r=Xt(typeof e=="number"?e:0);return St(n,function(n){var e=ft(0,++t);r[t]=r[e],r[e]=n}),r}function Ft(n,t,e){var r;t=Q.createCallback(t,e,3),e=-1;var u=n?n.length:0;if(typeof u=="number")for(;++e<u&&!(r=t(n[e],e,n)););else g(n,function(n,e,u){return!(r=t(n,e,u))});return!!r}function Bt(n,t,e){var r=0,u=n?n.length:0;if(typeof t!="number"&&null!=t){var o=-1;for(t=Q.createCallback(t,e,3);++o<u&&t(n[o],o,n);)r++}else if(r=t,null==r||e)return n?n[0]:v;return p(n,0,Ie(Ne(0,r),u))
    }function Wt(t,e,r){if(typeof r=="number"){var u=t?t.length:0;r=0>r?Ne(0,u+r):r||0}else if(r)return r=zt(t,e),t[r]===e?r:-1;return n(t,e,r)}function qt(n,t,e){if(typeof t!="number"&&null!=t){var r=0,u=-1,o=n?n.length:0;for(t=Q.createCallback(t,e,3);++u<o&&t(n[u],u,n);)r++}else r=null==t||e?1:Ne(0,t);return p(n,r)}function zt(n,t,e,r){var u=0,o=n?n.length:u;for(e=e?Q.createCallback(e,r,1):Ut,t=e(t);u<o;)r=u+o>>>1,e(n[r])<t?u=r+1:o=r;return u}function Pt(n,t,e,r){return typeof t!="boolean"&&null!=t&&(r=e,e=typeof t!="function"&&r&&r[t]===n?null:t,t=false),null!=e&&(e=Q.createCallback(e,r,3)),lt(n,t,e)
    }function Kt(){for(var n=1<arguments.length?arguments:arguments[0],t=-1,e=n?At(Le(n,"length")):0,r=Xt(0>e?0:e);++t<e;)r[t]=Le(n,t);return r}function Lt(n,t){var e=-1,r=n?n.length:0,u={};for(t||!r||$e(n[0])||(t=[]);++e<r;){var o=n[e];t?u[o]=t[e]:o&&(u[o[0]]=o[1])}return u}function Mt(n,t){return 2<arguments.length?pt(n,17,p(arguments,2),null,t):pt(n,1,null,null,t)}function Vt(n,t,e){function r(){c&&ve(c),i=c=p=v,(g||h!==t)&&(s=Me(),a=n.apply(l,o),c||i||(o=l=null))}function u(){var e=t-(Me()-f);0<e?c=_e(u,e):(i&&ve(i),e=p,i=c=p=v,e&&(s=Me(),a=n.apply(l,o),c||i||(o=l=null)))
    }var o,i,a,f,l,c,p,s=0,h=false,g=true;if(!dt(n))throw new ie;if(t=Ne(0,t)||0,true===e)var y=true,g=false;else wt(e)&&(y=e.leading,h="maxWait"in e&&(Ne(t,e.maxWait)||0),g="trailing"in e?e.trailing:g);return function(){if(o=arguments,f=Me(),l=this,p=g&&(c||!y),false===h)var e=y&&!c;else{i||y||(s=f);var v=h-(f-s),m=0>=v;m?(i&&(i=ve(i)),s=f,a=n.apply(l,o)):i||(i=_e(r,v))}return m&&c?c=ve(c):c||t===h||(c=_e(u,t)),e&&(m=true,a=n.apply(l,o)),!m||c||i||(o=l=null),a}}function Ut(n){return n}function Gt(n,t,e){var r=true,u=t&&bt(t);
        t&&(e||u.length)||(null==e&&(e=t),o=X,t=n,n=Q,u=bt(t)),false===e?r=false:wt(e)&&"chain"in e&&(r=e.chain);var o=n,i=dt(o);St(u,function(e){var u=n[e]=t[e];i&&(o.prototype[e]=function(){var t=this.__chain__,e=this.__wrapped__,i=[e];if(be.apply(i,arguments),i=u.apply(n,i),r||t){if(e===i&&wt(i))return this;i=new o(i),i.__chain__=t}return i})})}function Ht(){}function Jt(n){return function(t){return t[n]}}function Qt(){return this.__wrapped__}e=e?Y.defaults(G.Object(),e,Y.pick(G,A)):G;var Xt=e.Array,Yt=e.Boolean,Zt=e.Date,ne=e.Function,te=e.Math,ee=e.Number,re=e.Object,ue=e.RegExp,oe=e.String,ie=e.TypeError,ae=[],fe=re.prototype,le=e._,ce=fe.toString,pe=ue("^"+oe(ce).replace(/[.*+?^${}()|[\]\\]/g,"\\$&").replace(/toString| for [^\]]+/g,".*?")+"$"),se=te.ceil,ve=e.clearTimeout,he=te.floor,ge=ne.prototype.toString,ye=pe.test(ye=re.getPrototypeOf)&&ye,me=fe.hasOwnProperty,be=ae.push,_e=e.setTimeout,de=ae.splice,we=function(){try{var n={},t=pe.test(t=re.defineProperty)&&t,e=t(n,n,n)&&t
    }catch(r){}return e}(),je=pe.test(je=re.create)&&je,ke=pe.test(ke=Xt.isArray)&&ke,xe=e.isFinite,Ce=e.isNaN,Oe=pe.test(Oe=re.keys)&&Oe,Ne=te.max,Ie=te.min,Se=e.parseInt,Ee=te.random,Re={};Re[$]=Xt,Re[T]=Yt,Re[F]=Zt,Re[B]=ne,Re[q]=re,Re[W]=ee,Re[z]=ue,Re[P]=oe,X.prototype=Q.prototype;var Ae=Q.support={};Ae.funcDecomp=!pe.test(e.a)&&E.test(s),Ae.funcNames=typeof ne.name=="string",Q.templateSettings={escape:/<%-([\s\S]+?)%>/g,evaluate:/<%([\s\S]+?)%>/g,interpolate:N,variable:"",imports:{_:Q}},je||(tt=function(){function n(){}return function(t){if(wt(t)){n.prototype=t;
        var r=new n;n.prototype=null}return r||e.Object()}}());var De=we?function(n,t){M.value=t,we(n,"__bindData__",M)}:Ht,$e=ke||function(n){return n&&typeof n=="object"&&typeof n.length=="number"&&ce.call(n)==$||false},Te=Oe?function(n){return wt(n)?Oe(n):[]}:J,Fe={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Be=_t(Fe),We=ue("("+Te(Be).join("|")+")","g"),qe=ue("["+Te(Fe).join("")+"]","g"),ze=ct(function(n,t,e){me.call(n,e)?n[e]++:n[e]=1}),Pe=ct(function(n,t,e){(me.call(n,e)?n[e]:n[e]=[]).push(t)
    }),Ke=ct(function(n,t,e){n[e]=t}),Le=Rt,Me=pe.test(Me=Zt.now)&&Me||function(){return(new Zt).getTime()},Ve=8==Se(d+"08")?Se:function(n,t){return Se(kt(n)?n.replace(I,""):n,t||0)};return Q.after=function(n,t){if(!dt(t))throw new ie;return function(){return 1>--n?t.apply(this,arguments):void 0}},Q.assign=H,Q.at=function(n){for(var t=arguments,e=-1,r=ot(t,true,false,1),t=t[2]&&t[2][t[1]]===n?1:r.length,u=Xt(t);++e<t;)u[e]=n[r[e]];return u},Q.bind=Mt,Q.bindAll=function(n){for(var t=1<arguments.length?ot(arguments,true,false,1):bt(n),e=-1,r=t.length;++e<r;){var u=t[e];
        n[u]=pt(n[u],1,null,null,n)}return n},Q.bindKey=function(n,t){return 2<arguments.length?pt(t,19,p(arguments,2),null,n):pt(t,3,null,null,n)},Q.chain=function(n){return n=new X(n),n.__chain__=true,n},Q.compact=function(n){for(var t=-1,e=n?n.length:0,r=[];++t<e;){var u=n[t];u&&r.push(u)}return r},Q.compose=function(){for(var n=arguments,t=n.length;t--;)if(!dt(n[t]))throw new ie;return function(){for(var t=arguments,e=n.length;e--;)t=[n[e].apply(this,t)];return t[0]}},Q.constant=function(n){return function(){return n
    }},Q.countBy=ze,Q.create=function(n,t){var e=tt(n);return t?H(e,t):e},Q.createCallback=function(n,t,e){var r=typeof n;if(null==n||"function"==r)return et(n,t,e);if("object"!=r)return Jt(n);var u=Te(n),o=u[0],i=n[o];return 1!=u.length||i!==i||wt(i)?function(t){for(var e=u.length,r=false;e--&&(r=it(t[u[e]],n[u[e]],null,true)););return r}:function(n){return n=n[o],i===n&&(0!==i||1/i==1/n)}},Q.curry=function(n,t){return t=typeof t=="number"?t:+t||n.length,pt(n,4,null,null,null,t)},Q.debounce=Vt,Q.defaults=U,Q.defer=function(n){if(!dt(n))throw new ie;
        var t=p(arguments,1);return _e(function(){n.apply(v,t)},1)},Q.delay=function(n,t){if(!dt(n))throw new ie;var e=p(arguments,2);return _e(function(){n.apply(v,e)},t)},Q.difference=function(n){return ut(n,ot(arguments,true,true,1))},Q.filter=Nt,Q.flatten=function(n,t,e,r){return typeof t!="boolean"&&null!=t&&(r=e,e=typeof t!="function"&&r&&r[t]===n?null:t,t=false),null!=e&&(n=Rt(n,e,r)),ot(n,t)},Q.forEach=St,Q.forEachRight=Et,Q.forIn=_,Q.forInRight=function(n,t,e){var r=[];_(n,function(n,t){r.push(t,n)});var u=r.length;
        for(t=et(t,e,3);u--&&false!==t(r[u--],r[u],n););return n},Q.forOwn=g,Q.forOwnRight=mt,Q.functions=bt,Q.groupBy=Pe,Q.indexBy=Ke,Q.initial=function(n,t,e){var r=0,u=n?n.length:0;if(typeof t!="number"&&null!=t){var o=u;for(t=Q.createCallback(t,e,3);o--&&t(n[o],o,n);)r++}else r=null==t||e?1:t||r;return p(n,0,Ie(Ne(0,u-r),u))},Q.intersection=function(){for(var e=[],r=-1,u=arguments.length,i=a(),f=vt(),p=f===n,s=a();++r<u;){var v=arguments[r];($e(v)||yt(v))&&(e.push(v),i.push(p&&v.length>=b&&o(r?e[r]:s)))
    }var p=e[0],h=-1,g=p?p.length:0,y=[];n:for(;++h<g;){var m=i[0],v=p[h];if(0>(m?t(m,v):f(s,v))){for(r=u,(m||s).push(v);--r;)if(m=i[r],0>(m?t(m,v):f(e[r],v)))continue n;y.push(v)}}for(;u--;)(m=i[u])&&c(m);return l(i),l(s),y},Q.invert=_t,Q.invoke=function(n,t){var e=p(arguments,2),r=-1,u=typeof t=="function",o=n?n.length:0,i=Xt(typeof o=="number"?o:0);return St(n,function(n){i[++r]=(u?t:n[t]).apply(n,e)}),i},Q.keys=Te,Q.map=Rt,Q.mapValues=function(n,t,e){var r={};return t=Q.createCallback(t,e,3),g(n,function(n,e,u){r[e]=t(n,e,u)
    }),r},Q.max=At,Q.memoize=function(n,t){function e(){var r=e.cache,u=t?t.apply(this,arguments):m+arguments[0];return me.call(r,u)?r[u]:r[u]=n.apply(this,arguments)}if(!dt(n))throw new ie;return e.cache={},e},Q.merge=function(n){var t=arguments,e=2;if(!wt(n))return n;if("number"!=typeof t[2]&&(e=t.length),3<e&&"function"==typeof t[e-2])var r=et(t[--e-1],t[e--],2);else 2<e&&"function"==typeof t[e-1]&&(r=t[--e]);for(var t=p(arguments,1,e),u=-1,o=a(),i=a();++u<e;)at(n,t[u],r,o,i);return l(o),l(i),n},Q.min=function(n,t,e){var u=1/0,o=u;
        if(typeof t!="function"&&e&&e[t]===n&&(t=null),null==t&&$e(n)){e=-1;for(var i=n.length;++e<i;){var a=n[e];a<o&&(o=a)}}else t=null==t&&kt(n)?r:Q.createCallback(t,e,3),St(n,function(n,e,r){e=t(n,e,r),e<u&&(u=e,o=n)});return o},Q.omit=function(n,t,e){var r={};if(typeof t!="function"){var u=[];_(n,function(n,t){u.push(t)});for(var u=ut(u,ot(arguments,true,false,1)),o=-1,i=u.length;++o<i;){var a=u[o];r[a]=n[a]}}else t=Q.createCallback(t,e,3),_(n,function(n,e,u){t(n,e,u)||(r[e]=n)});return r},Q.once=function(n){var t,e;
        if(!dt(n))throw new ie;return function(){return t?e:(t=true,e=n.apply(this,arguments),n=null,e)}},Q.pairs=function(n){for(var t=-1,e=Te(n),r=e.length,u=Xt(r);++t<r;){var o=e[t];u[t]=[o,n[o]]}return u},Q.partial=function(n){return pt(n,16,p(arguments,1))},Q.partialRight=function(n){return pt(n,32,null,p(arguments,1))},Q.pick=function(n,t,e){var r={};if(typeof t!="function")for(var u=-1,o=ot(arguments,true,false,1),i=wt(n)?o.length:0;++u<i;){var a=o[u];a in n&&(r[a]=n[a])}else t=Q.createCallback(t,e,3),_(n,function(n,e,u){t(n,e,u)&&(r[e]=n)
    });return r},Q.pluck=Le,Q.property=Jt,Q.pull=function(n){for(var t=arguments,e=0,r=t.length,u=n?n.length:0;++e<r;)for(var o=-1,i=t[e];++o<u;)n[o]===i&&(de.call(n,o--,1),u--);return n},Q.range=function(n,t,e){n=+n||0,e=typeof e=="number"?e:+e||1,null==t&&(t=n,n=0);var r=-1;t=Ne(0,se((t-n)/(e||1)));for(var u=Xt(t);++r<t;)u[r]=n,n+=e;return u},Q.reject=function(n,t,e){return t=Q.createCallback(t,e,3),Nt(n,function(n,e,r){return!t(n,e,r)})},Q.remove=function(n,t,e){var r=-1,u=n?n.length:0,o=[];for(t=Q.createCallback(t,e,3);++r<u;)e=n[r],t(e,r,n)&&(o.push(e),de.call(n,r--,1),u--);
        return o},Q.rest=qt,Q.shuffle=Tt,Q.sortBy=function(n,t,e){var r=-1,o=$e(t),i=n?n.length:0,p=Xt(typeof i=="number"?i:0);for(o||(t=Q.createCallback(t,e,3)),St(n,function(n,e,u){var i=p[++r]=f();o?i.m=Rt(t,function(t){return n[t]}):(i.m=a())[0]=t(n,e,u),i.n=r,i.o=n}),i=p.length,p.sort(u);i--;)n=p[i],p[i]=n.o,o||l(n.m),c(n);return p},Q.tap=function(n,t){return t(n),n},Q.throttle=function(n,t,e){var r=true,u=true;if(!dt(n))throw new ie;return false===e?r=false:wt(e)&&(r="leading"in e?e.leading:r,u="trailing"in e?e.trailing:u),L.leading=r,L.maxWait=t,L.trailing=u,Vt(n,t,L)
    },Q.times=function(n,t,e){n=-1<(n=+n)?n:0;var r=-1,u=Xt(n);for(t=et(t,e,1);++r<n;)u[r]=t(r);return u},Q.toArray=function(n){return n&&typeof n.length=="number"?p(n):xt(n)},Q.transform=function(n,t,e,r){var u=$e(n);if(null==e)if(u)e=[];else{var o=n&&n.constructor;e=tt(o&&o.prototype)}return t&&(t=Q.createCallback(t,r,4),(u?St:g)(n,function(n,r,u){return t(e,n,r,u)})),e},Q.union=function(){return lt(ot(arguments,true,true))},Q.uniq=Pt,Q.values=xt,Q.where=Nt,Q.without=function(n){return ut(n,p(arguments,1))
    },Q.wrap=function(n,t){return pt(t,16,[n])},Q.xor=function(){for(var n=-1,t=arguments.length;++n<t;){var e=arguments[n];if($e(e)||yt(e))var r=r?lt(ut(r,e).concat(ut(e,r))):e}return r||[]},Q.zip=Kt,Q.zipObject=Lt,Q.collect=Rt,Q.drop=qt,Q.each=St,Q.eachRight=Et,Q.extend=H,Q.methods=bt,Q.object=Lt,Q.select=Nt,Q.tail=qt,Q.unique=Pt,Q.unzip=Kt,Gt(Q),Q.clone=function(n,t,e,r){return typeof t!="boolean"&&null!=t&&(r=e,e=t,t=false),nt(n,t,typeof e=="function"&&et(e,r,1))},Q.cloneDeep=function(n,t,e){return nt(n,true,typeof t=="function"&&et(t,e,1))
    },Q.contains=Ct,Q.escape=function(n){return null==n?"":oe(n).replace(qe,st)},Q.every=Ot,Q.find=It,Q.findIndex=function(n,t,e){var r=-1,u=n?n.length:0;for(t=Q.createCallback(t,e,3);++r<u;)if(t(n[r],r,n))return r;return-1},Q.findKey=function(n,t,e){var r;return t=Q.createCallback(t,e,3),g(n,function(n,e,u){return t(n,e,u)?(r=e,false):void 0}),r},Q.findLast=function(n,t,e){var r;return t=Q.createCallback(t,e,3),Et(n,function(n,e,u){return t(n,e,u)?(r=n,false):void 0}),r},Q.findLastIndex=function(n,t,e){var r=n?n.length:0;
        for(t=Q.createCallback(t,e,3);r--;)if(t(n[r],r,n))return r;return-1},Q.findLastKey=function(n,t,e){var r;return t=Q.createCallback(t,e,3),mt(n,function(n,e,u){return t(n,e,u)?(r=e,false):void 0}),r},Q.has=function(n,t){return n?me.call(n,t):false},Q.identity=Ut,Q.indexOf=Wt,Q.isArguments=yt,Q.isArray=$e,Q.isBoolean=function(n){return true===n||false===n||n&&typeof n=="object"&&ce.call(n)==T||false},Q.isDate=function(n){return n&&typeof n=="object"&&ce.call(n)==F||false},Q.isElement=function(n){return n&&1===n.nodeType||false
    },Q.isEmpty=function(n){var t=true;if(!n)return t;var e=ce.call(n),r=n.length;return e==$||e==P||e==D||e==q&&typeof r=="number"&&dt(n.splice)?!r:(g(n,function(){return t=false}),t)},Q.isEqual=function(n,t,e,r){return it(n,t,typeof e=="function"&&et(e,r,2))},Q.isFinite=function(n){return xe(n)&&!Ce(parseFloat(n))},Q.isFunction=dt,Q.isNaN=function(n){return jt(n)&&n!=+n},Q.isNull=function(n){return null===n},Q.isNumber=jt,Q.isObject=wt,Q.isPlainObject=h,Q.isRegExp=function(n){return n&&typeof n=="object"&&ce.call(n)==z||false
    },Q.isString=kt,Q.isUndefined=function(n){return typeof n=="undefined"},Q.lastIndexOf=function(n,t,e){var r=n?n.length:0;for(typeof e=="number"&&(r=(0>e?Ne(0,r+e):Ie(e,r-1))+1);r--;)if(n[r]===t)return r;return-1},Q.mixin=Gt,Q.noConflict=function(){return e._=le,this},Q.noop=Ht,Q.now=Me,Q.parseInt=Ve,Q.random=function(n,t,e){var r=null==n,u=null==t;return null==e&&(typeof n=="boolean"&&u?(e=n,n=1):u||typeof t!="boolean"||(e=t,u=true)),r&&u&&(t=1),n=+n||0,u?(t=n,n=0):t=+t||0,e||n%1||t%1?(e=Ee(),Ie(n+e*(t-n+parseFloat("1e-"+((e+"").length-1))),t)):ft(n,t)
    },Q.reduce=Dt,Q.reduceRight=$t,Q.result=function(n,t){if(n){var e=n[t];return dt(e)?n[t]():e}},Q.runInContext=s,Q.size=function(n){var t=n?n.length:0;return typeof t=="number"?t:Te(n).length},Q.some=Ft,Q.sortedIndex=zt,Q.template=function(n,t,e){var r=Q.templateSettings;n=oe(n||""),e=U({},e,r);var u,o=U({},e.imports,r.imports),r=Te(o),o=xt(o),a=0,f=e.interpolate||S,l="__p+='",f=ue((e.escape||S).source+"|"+f.source+"|"+(f===N?x:S).source+"|"+(e.evaluate||S).source+"|$","g");n.replace(f,function(t,e,r,o,f,c){return r||(r=o),l+=n.slice(a,c).replace(R,i),e&&(l+="'+__e("+e+")+'"),f&&(u=true,l+="';"+f+";\n__p+='"),r&&(l+="'+((__t=("+r+"))==null?'':__t)+'"),a=c+t.length,t
    }),l+="';",f=e=e.variable,f||(e="obj",l="with("+e+"){"+l+"}"),l=(u?l.replace(w,""):l).replace(j,"$1").replace(k,"$1;"),l="function("+e+"){"+(f?"":e+"||("+e+"={});")+"var __t,__p='',__e=_.escape"+(u?",__j=Array.prototype.join;function print(){__p+=__j.call(arguments,'')}":";")+l+"return __p}";try{var c=ne(r,"return "+l).apply(v,o)}catch(p){throw p.source=l,p}return t?c(t):(c.source=l,c)},Q.unescape=function(n){return null==n?"":oe(n).replace(We,gt)},Q.uniqueId=function(n){var t=++y;return oe(null==n?"":n)+t
    },Q.all=Ot,Q.any=Ft,Q.detect=It,Q.findWhere=It,Q.foldl=Dt,Q.foldr=$t,Q.include=Ct,Q.inject=Dt,Gt(function(){var n={};return g(Q,function(t,e){Q.prototype[e]||(n[e]=t)}),n}(),false),Q.first=Bt,Q.last=function(n,t,e){var r=0,u=n?n.length:0;if(typeof t!="number"&&null!=t){var o=u;for(t=Q.createCallback(t,e,3);o--&&t(n[o],o,n);)r++}else if(r=t,null==r||e)return n?n[u-1]:v;return p(n,Ne(0,u-r))},Q.sample=function(n,t,e){return n&&typeof n.length!="number"&&(n=xt(n)),null==t||e?n?n[ft(0,n.length-1)]:v:(n=Tt(n),n.length=Ie(Ne(0,t),n.length),n)
    },Q.take=Bt,Q.head=Bt,g(Q,function(n,t){var e="sample"!==t;Q.prototype[t]||(Q.prototype[t]=function(t,r){var u=this.__chain__,o=n(this.__wrapped__,t,r);return u||null!=t&&(!r||e&&typeof t=="function")?new X(o,u):o})}),Q.VERSION="2.4.0",Q.prototype.chain=function(){return this.__chain__=true,this},Q.prototype.toString=function(){return oe(this.__wrapped__)},Q.prototype.value=Qt,Q.prototype.valueOf=Qt,St(["join","pop","shift"],function(n){var t=ae[n];Q.prototype[n]=function(){var n=this.__chain__,e=t.apply(this.__wrapped__,arguments);
        return n?new X(e,n):e}}),St(["push","reverse","sort","unshift"],function(n){var t=ae[n];Q.prototype[n]=function(){return t.apply(this.__wrapped__,arguments),this}}),St(["concat","slice","splice"],function(n){var t=ae[n];Q.prototype[n]=function(){return new X(t.apply(this.__wrapped__,arguments),this.__chain__)}}),Q}var v,h=[],g=[],y=0,m=+new Date+"",b=75,_=40,d=" \t\x0B\f\xa0\ufeff\n\r\u2028\u2029\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000",w=/\b__p\+='';/g,j=/\b(__p\+=)''\+/g,k=/(__e\(.*?\)|\b__t\))\+'';/g,x=/\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g,C=/\w*$/,O=/^\s*function[ \n\r\t]+\w/,N=/<%=([\s\S]+?)%>/g,I=RegExp("^["+d+"]*0+(?=.$)"),S=/($^)/,E=/\bthis\b/,R=/['\n\r\t\u2028\u2029\\]/g,A="Array Boolean Date Function Math Number Object RegExp String _ attachEvent clearTimeout isFinite isNaN parseInt setTimeout".split(" "),D="[object Arguments]",$="[object Array]",T="[object Boolean]",F="[object Date]",B="[object Function]",W="[object Number]",q="[object Object]",z="[object RegExp]",P="[object String]",K={};
        K[B]=false,K[D]=K[$]=K[T]=K[F]=K[W]=K[q]=K[z]=K[P]=true;var L={leading:false,maxWait:0,trailing:false},M={configurable:false,enumerable:false,value:null,writable:false},V={"boolean":false,"function":true,object:true,number:false,string:false,undefined:false},U={"\\":"\\","'":"'","\n":"n","\r":"r","\t":"t","\u2028":"u2028","\u2029":"u2029"},G=V[typeof window]&&window||this,H=V[typeof exports]&&exports&&!exports.nodeType&&exports,J=V[typeof module]&&module&&!module.nodeType&&module,Q=J&&J.exports===H&&H,X=V[typeof global]&&global;!X||X.global!==X&&X.window!==X||(G=X);
        var Y=s();typeof define=="function"&&typeof define.amd=="object"&&define.amd?(G._=Y, define(function(){return Y})):H&&J?Q?(J.exports=Y)._=Y:H._=Y:G._=Y}).call(this);
},{}],4:[function(require,module,exports){
    /*jslint indent: 2 */
    /*jslint node: true */
    /*jslint nomen: true*/
    /*jslint white: true */

    /*global window */

    "use strict";

    var d3_gauge_plus = (function() {
        var gauge = require('./gauge.js'),
            disk = require('./disk.js');
        return {
            Gauge: gauge.Gauge,
            disk: disk
        };
    }());

    if (window !== undefined) {
        window.d3_gauge_plus = d3_gauge_plus;
    }

},{"./disk.js":1,"./gauge.js":2}]},{},[4])
;