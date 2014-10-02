if Meteor.isServer

	Meteor.startup ->
		Meteor.call "account_createDefaultUsers"


		#remove all items.. and start fresh

		###
		Items.remove({})

		Items.insert
			category: "plan"
			image: "https://s3-eu-west-1.amazonaws.com/vfitest/iphone/iphone6.png"
			productImage1: "https://s3-eu-west-1.amazonaws.com/vfitest/htc/htc-phone.png"
			productImage2: "/img/htc-phone.png"
			productImage3: "/img/htc-phone.png"
			title: "HTC One M8"
			lead: "iPhone 5s is purposefully imagined and meticulously considered, with Touch ID - a ﬁngerprint identity sensor, an A7 chip with 64-bit architecture, an even more impressive iSight camera, and ultra-fast wireless."
			info: "jfkdshfkjdsfhk"
			quote: "A great smartphone that does a lot of fantastic things"
			quoteSource: "Engadget"
			prePayCost: 20
			billPayCost: 40
			inTheBox: "https://s3-eu-west-1.amazonaws.com/vfitest/htc/htcWhatsInBox.png"

		Items.update
			title: "HTC One M8"
		,
			$push:
				features:
					category: "music"
					title: "Perfect for music lovers"
					description: "Bring your music and videos to life with HTC One's BoomSound™. Dual frontal stereo speakers give you crisp, clear sound giving you the best listening experience on a mobile phone"
					image: "https://s3-eu-west-1.amazonaws.com/vfitest/htc/htcFeature1.png"

		Items.update
			title: "HTC One M8"
		,
			$push:
				features:
					category: "camera"
					title: "Brilliant photos, anywhere"
					description: "With a 5-inch, full HD 1080P screen with tough Corning® Gorilla® Glass 3, the new HTC one has been built to last, no matter the location. HTC UltraPixel technology captures 300% more light than a megapixel, letting you capture just the right amount of light in different conditions. And the HTC Duo camera lets you add professional effects for the complete camera experience."
					image: "https://s3-eu-west-1.amazonaws.com/vfitest/htc/htcFeature2.png"

		Items.update
			title: "HTC One M8"
		,
			$push:
				features:
					category: "tech"
					title: "Amazing memory"
					description: "The all new HTC One comes with an amazing amount of space. With 16GB internal memory, a slot for a 128GB microSD™ card and an offer* for a total of 65GB Google Drive cloud storage, you’re unlikely to run out of space for your photos, videos, music and apps any time soon."


		Items.update
			title: "HTC One M8"
		,
			$push:
				features:
					category: "battery"
					title: "Impressive Battery"
					description: "2600 mAh battery combines with the super efficient processor for impressive battery life giving you plenty of time to browse, stream, listen, text and talk."

		Items.update
			title: "HTC One M8"
		, $push:
				rating:
					title: "Ease of use"
					score: "4.5"
					percentage: "90%"

		Items.update
			title: "HTC One M8"
		, $push:
			rating:
				title: "Battery Life"
				score: "4.5"
				percentage: "90%"

		Items.update
			title: "HTC One M8"
		, $push:
			rating:
				title: "Readability"
				score: "4.5"
				percentage: "90%"

		Items.update
			title: "HTC One M8"
		, $push:
			rating:
				title: "Features"
				score: "3.7"
				percentage: "72%"

		Items.update
			title: "HTC One M8"
		, $push:
			rating:
				title: "Size & weight"
				score: "3.0"
				percentage: "60%"





		Items.insert
			category: "phone"
			image: "/img/iphone6.png"
			title: "Samsung Galaxy S5"
			lead: "iPhone 5s is purposefully imagined and meticulously considered, with Touch ID - a ﬁngerprint identity sensor, an A7 chip with 64-bit architecture, an even more impressive iSight camera, and ultra-fast wireless."

		Items.insert
			category: "phone"
			image: "/img/iphone6.png"
			title: "Apple iPhone 5S"
			lead: "iPhone 5s is purposefully imagined and meticulously considered, with Touch ID - a ﬁngerprint identity sensor, an A7 chip with 64-bit architecture, an even more impressive iSight camera, and ultra-fast wireless."

		Items.insert
			category: "phone"
			image: "/img/iphone6.png"
			title: "Samsung Galaxy S5"
			lead: "iPhone 5s is purposefully imagined and meticulously considered, with Touch ID - a ﬁngerprint identity sensor, an A7 chip with 64-bit architecture, an even more impressive iSight camera, and ultra-fast wireless."

		Items.insert
			category: "plan"
			image: "/img/iphone6.png"
			title: "Apple iPhone 5S"
			lead: "iPhone 5s is purposefully imagined and meticulously considered, with Touch ID - a ﬁngerprint identity sensor, an A7 chip with 64-bit architecture, an even more impressive iSight camera, and ultra-fast wireless."

		Items.insert
			category: "phone"
			image: "/img/iphone6.png"
			title: "Samsung Galaxy S5"
			lead: "iPhone 5s is purposefully imagined and meticulously considered, with Touch ID - a ﬁngerprint identity sensor, an A7 chip with 64-bit architecture, an even more impressive iSight camera, and ultra-fast wireless."

		Items.insert
			category: "phone"
			image: "/img/iphone6.png"
			title: "Apple iPhone 5S"
			lead: "iPhone 5s is purposefully imagined and meticulously considered, with Touch ID - a ﬁngerprint identity sensor, an A7 chip with 64-bit architecture, an even more impressive iSight camera, and ultra-fast wireless."

		Items.insert
			category: "phone"
			image: "/img/iphone6.png"
			title: "Samsung Galaxy S5"
			lead: "iPhone 5s is purposefully imagined and meticulously considered, with Touch ID - a ﬁngerprint identity sensor, an A7 chip with 64-bit architecture, an even more impressive iSight camera, and ultra-fast wireless."



		###

		return



