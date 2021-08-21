console.log(
"_______                           \n" +
"|__    \\                          \n" + 
"   \\    \\                         \n" +
"    \\    \\                        \n" +
"    /     \\                       \n" +
"   /  /\\   \\                      \n" +
"  /  /  \\   \\_                    \n" +
" /__/    \\____|                   \n" 
);
var messageElement = document.getElementById("welcomeMessage");
$(document).ready( function() { 
    console.log("Accessing location via 'https://geoip-db.com/json/'");
    $.getJSON("https://geoip-db.com/json/",
        function (result) {
	    let welcoming = "Thanks for visiting my website from ";
	    let city = "Planet Earth";
            if (result.length !== 0) {
                city = result.city;
            }
	    welcoming += city;
	    messageElement.textContent = welcoming;
        });
    }
)
