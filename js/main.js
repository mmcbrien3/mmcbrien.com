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
var gitTable = document.getElementById('gitCommitsTable');
// TODO: add token to increase throttling limit. Getting throttled a lot right now.
$(document).ready(() => { 
    populateCommitTable();
});

function populateCommitTable() {
    var recentCommits = null;
    if(sessionStorage.getItem('recentCommits')) {
        recentCommits = JSON.parse(sessionStorage.getItem('recentCommits'));
    }
    if (recentCommits === null) {
        $.ajax({
            url: "https://api.github.com/repos/mmcbrien3/mmcbrien.com/commits",
            headers: { 'User-Agent': 'mmcbrien.com' },
            dataType: 'json',
            success: (result) => {
                console.log('Got result from github and populating table.');
                populateCommitTableUsingResult(result);
                sessionStorage.setItem('recentCommits', JSON.stringify(result));
            },
            error: (error) => {
                gitTable.remove();
            }
        })
    } else {
        console.log('Got result from local storage and populating table.');
        populateCommitTableUsingResult(recentCommits);
    }
}

function populateCommitTableUsingResult(result) {
    let commitsDisplayed = 0;
    var commitTableEntries = document.getElementsByClassName("commitTableEntry");
    let currentElement = commitTableEntries[0];
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
        if (commitTableEntries.length <= commitsDisplayed) {
            let clonedNode = currentElement.cloneNode();
            currentElement.parentElement.appendChild(clonedNode);
            currentElement = clonedNode;
        } else {
            currentElement = commitTableEntries[commitsDisplayed];
        }
    };
}

function getFirstLineOfCommit(commitMessage) {
    var lines = commitMessage.split("\n");   // split all lines into array
    return lines.shift();   
}
