var config = {
	port: 8000,
	ipWhitelist: ["127.0.0.1", "::ffff:127.0.0.1", "::1"],
	language: "en",
	timeFormat: 24,
	units: "metric",

	modules: [
		{
			module: "alert",
		},
		{
			module: "updatenotification",
			position: "top_bar"
		},
		{
			module: "clock",
			position: "top_right"
		},
		{
			module: "MMM-Scrobbler",
			position: "top_center"
		},
		/*{
		  module: 'MMM-Volumio',
		  position: 'top_center',
		  header: 'Volumio',
		  config: {
		    volumioUrl: 'http:/volumio.local'
		  }
	  },*/
		{
			module: "currentweather",
			position: "top_left",
			config: {
				location: "Guelph",
				locationID: "5967629",  //ID from http://www.openweathermap.org/help/city_list.txt
				appid: "9a63394687d978825b676f21ff4d6813",
				degreeLabel: "true"
			}
		},
		/*{
			module: "calendar",
			header: "Canadian Holidays",
			position: "",
			config: {
				calendars: [
					{
						symbol: "calendar-check-o ",
						url: "webcal://www.calendarlabs.com/templates/ical/Canada-Holidays.ics"
					}
				]
			}
		},*/
		{
			module: "compliments",
			position: "middle_center"
		},
		{
			module: "newsfeed",
			position: "bottom_center",
			config: {
				feeds: [
					{
						title: "New York Times",
						url: "http://www.nytimes.com/services/xml/rss/nyt/HomePage.xml"
					},
					{
						title: "CBC Canada",
						url: "http://rss.cbc.ca/lineup/canada.xml"
					},
					{
						title: "CBC Sports",
						url: "http://rss.cbc.ca/lineup/sports.xml"
					}
				],
				showSourceTitle: true,
				showPublishDate: true
			}
		},
	]

};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") {module.exports = config;}
