var myHeading = document.querySelector('h2');
var location;
$.get("http://ipinfo.io", function(response) {
    myHeading.textContent = "Welcome from " + response.city;
}, "jsonp");