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
$(document).ready(() => { 
    console.log("Accessing location via 'https://geoip-db.com/json/'");
    $.ajax({
        url: "https://geoip-db.com/json/",  
        dataType: 'jsonp',
        success: (result) => {
	    let welcoming = "Thanks for visiting my website from ";
	    let city = "Planet Earth";
            if (result.length !== 0) {
                city = result.city;
            }
	    welcoming += city;
	    messageElement.textContent = welcoming;
        }
    });
});
