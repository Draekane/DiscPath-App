# DiscPath-App

This is an attempt to create a web app based off the single page application of [discpath](http://discpath.haxor.fi/) as I love the functionality of that site, but am always disappointed at how far behind the disc selection is.  The logic and the basic code to draw the paths all come from his single page html5 application, but I am taking that and blowing it out to a React/Redux application that will load the disc data from data files (currently just JSON files) that can be updated independently of rebuilding the site.



The end goal is to have something that looks similar to and functions similar to the original, but with a more robust and expandable set of components, and an easier way to update the existing disc data (possibly even adding an add/update discs capability through the UI).



This is being build using Node.js and can be started by calling:

`npm run start`