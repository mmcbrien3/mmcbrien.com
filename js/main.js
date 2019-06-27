var myHeading = document.getElementById("welcomeMessage");
console.log("hello from js");
var geocoder;



$(document).ready( function() { 
    console.log("Getting location");
    $.getJSON("https://geoip-db.com/json/",
        function (result) {
            if (result.length !== 0) {
		console.log("Got location: " + result.city);
                myHeading.textContent = "Thanks for visiting my website from " + result.city + ".";
            }
        });
    }
)
