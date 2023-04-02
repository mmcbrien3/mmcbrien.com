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
const MAX_COMMITS_TO_SHOW = 3;
var commitTitles = document.getElementsByClassName("commitTableEntry");
var gitTable = document.getElementById('gitCommitsTable');
// TODO: add token to increase throttling limit. Getting throttled a lot right now.
$(document).ready(() => { 
    $.ajax({
        url: "https://api.github.com/repos/mmcbrien3/mmcbrien.com/commits",
        headers: { 'User-Agent': 'mmcbrien.com' },
        dataType: 'json',
        success: (result) => {
            console.log(`Found ${result.length} commits`);
            let commitsDisplayed = 0;
            let currentElement = commitTitles[0];
            while (commitsDisplayed < MAX_COMMITS_TO_SHOW && result.length >= commitsDisplayed) {
                let currentCommit = result[commitsDisplayed];
                let messageEntry = currentElement.appendChild(document.createElement('th'));
                messageEntry.textContent = getFirstLineOfCommit(currentCommit.commit.message);
                messageEntry.style.fontSize = 'x-small';
                let shaEntry = currentElement.appendChild(document.createElement('th'));
                linkElement = shaEntry.appendChild(document.createElement('a'));
                linkElement.href = currentCommit.html_url;
                linkElement.textContent = currentCommit.sha.substring(0, 7);
                shaEntry.style.fontSize = 'x-small';
                commitsDisplayed += 1;
                let clonedNode = currentElement.cloneNode();
                currentElement.parentElement.appendChild(clonedNode);
                currentElement = clonedNode;
            };
        },
        error: (error) => {
            gitTable.remove();
        }
    })
});

function getFirstLineOfCommit(commitMessage) {
    var lines = commitMessage.split("\n");   // split all lines into array
    return lines.shift();   
}
