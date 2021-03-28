var myHeading = document.getElementById("welcomeMessage");
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
$(document).ready( function() { 
    console.log("Accessing location via 'https://geoip-db.com/json/'");
    $.getJSON("https://geoip-db.com/json/",
        function (result) {
            if (result.length !== 0) {
                myHeading.textContent = "Thanks for visiting my website from " + result.city + ".";
            }
        });
    }
)
