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

interface githubCommitData {
    commit: gitCommitData
    html_url: string
    sha: string
}

interface gitCommitData {
    message: string
}

const MAX_COMMITS_TO_SHOW = 3;
const GIT_COMMITS_TABLE_ID = 'gitCommitsTable';
const GIT_COMMITS_TABLE_ENTRY_CLASS_NAME = 'commitTableEntry';
const RESIZING_CANVAS_CONTAINER_CLASS_NAME = 'resizingCanvasContainer';
const RECENT_COMMITS_CACHE_KEY = 'recentCommits';
const GITHUB_COMMITS_API_URL = 'https://api.github.com/repos/mmcbrien3/mmcbrien.com/commits';

let gitTable: HTMLElement = (document.getElementById(GIT_COMMITS_TABLE_ID))!;

// TODO: add token to increase throttling limit. Getting throttled a lot right now.
$(document).ready(() => { 
    populateCommitTable();
});

function populateCommitTable(): void {
    let recentCommits: githubCommitData[] | null = null;
    if(sessionStorage.getItem(RECENT_COMMITS_CACHE_KEY)) {
        recentCommits = JSON.parse(sessionStorage.getItem(RECENT_COMMITS_CACHE_KEY)!);
    }
    if (!recentCommits) {
        $.ajax({
            url: GITHUB_COMMITS_API_URL,
            headers: { 'User-Agent': 'mmcbrien.com' },
            dataType: 'json',
            success: (result) => {
                console.log('Got result from github and populating table.');
                populateCommitTableUsingResult(result);
                sessionStorage.setItem('recentCommits', JSON.stringify(result));
            },
            error: () => {
                gitTable!.remove();
            }
        })
    } else {
        console.log('Got result from local storage and populating table.');
        populateCommitTableUsingResult(recentCommits);
    }
}

function populateCommitTableUsingResult(result: githubCommitData[]): void {
    let commitsDisplayed = 0;
    let commitTableEntries: HTMLCollectionOf<Element> = document.getElementsByClassName(GIT_COMMITS_TABLE_ENTRY_CLASS_NAME)!;
    let currentElement: Node = commitTableEntries[0];
    while (commitsDisplayed < MAX_COMMITS_TO_SHOW && result.length >= commitsDisplayed) {
        let currentCommit = result[commitsDisplayed];
        let messageEntry = currentElement.appendChild(document.createElement('th'));

        messageEntry.textContent = getFirstLineOfCommit(currentCommit.commit.message);
        messageEntry.style.fontSize = 'x-small';

        let shaEntry = currentElement.appendChild(document.createElement('th'));
        let linkElement = shaEntry.appendChild(document.createElement('a'));

        linkElement.href = currentCommit.html_url;
        linkElement.textContent = currentCommit.sha.substring(0, 7);
        shaEntry.style.fontSize = 'x-small';

        commitsDisplayed += 1;

        if (commitTableEntries.length <= commitsDisplayed) {
            let clonedNode: Node = currentElement.cloneNode();
            currentElement.parentElement!.appendChild(clonedNode);
            currentElement = clonedNode;
        } else {
            currentElement = commitTableEntries[commitsDisplayed];
        }
    };
}

function getFirstLineOfCommit(commitMessage: string): string {
    let lines: string[] = commitMessage.split("\n");   // split all lines into array
    let result = lines.shift()
    if (!result) {
        throw new Error(`Could not find first line of commit: ${commitMessage}`);
    }
    return result;
}

let rescalingCanvases: HTMLCollectionOf<Element> = document.getElementsByClassName(RESIZING_CANVAS_CONTAINER_CLASS_NAME);

for (const c of rescalingCanvases) {
    const resizeObserver = new ResizeObserver(() => {
        resizeScalingCanvas(c, c.children[0] as ResizingCanvas);
    });
    resizeObserver.observe(c);
    resizeScalingCanvas(c, c.children[0] as ResizingCanvas);
};

function resizeScalingCanvas(container: Element, canvas: ResizingCanvas) {
    console.log(`Resizing ${container.id}`);
    let size = Math.max(container.clientWidth, container.clientHeight);
    canvas.width = size;
    canvas.height = size;
    if (canvas.customResize !== undefined) {
        canvas.customResize();
    }
}