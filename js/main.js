var myHeading = document.querySelector('h2');
console.log("hello from js");
var geocoder;



$(document).ready( function() { 
    console.log("ready");
    console.log("Getting location");
    $.getJSON("https://geoip-db.com/json/",
        function (result) {
            if (result.length !== 0) {
                myHeading.textContent = "Welcome from " + result.city + ".";
            }
        });
    }
)