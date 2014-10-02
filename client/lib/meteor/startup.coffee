if Meteor.isClient

	Meteor.startup ->
		console.log "Start up client.."

		#default SEO..

		SEO.config
			title: "Vodafone | Bill Pay &amp; Pay As You Go phones, 4G, Home Phone &amp; Broadband"
			meta:
				description: "Get great offers on mobile phones and plans - including Spotify Premium -&nbsp; 4G smartphones, tablets, SIMs, mobile broadband, and home phone and broadband solutions, with Vodafone - Ireland's leading network provider."
				keywords: "vodafone, bill pay phones, pay as you go phones, sim only plans, mobile phone accessories, 4G, home phone and fibre broadband, broadband, roaming, mobile broadband, mobile phone insurance, webtext, cherry points, free credit, top up, spotify, business communications"
			og:
				title: "Vodafone - Ireland's leading network provider"
				image: "https://s3-eu-west-1.amazonaws.com/vfitest/vodafoneLogo.jpeg"



		return