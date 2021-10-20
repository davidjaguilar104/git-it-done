var issueContainerEl = document.querySelector("#issues-container");

var getRepoIssues = function(repo) {
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";

    fetch(apiUrl).then(function(response) {
        // request was successful
        if(response.ok) {
            response.json().then(function(data) {
                // pass response data to dom function 
                displayIssues(data);
                console.log(data); // to see objects properties
            });
        } 
        else {
            alert("There was a problem with your request!");
        } 
    });
};

getRepoIssues("facebook/react");

var displayIssues = function(issues) {
    if(issues.length === 0) {
        issueContainerEl.textContent = "This repo has no open issues!";
        return;
    }

    for(var i = 0; i < issues.length; i++) {
        // create a link element to take users to the issue on github
        var issueEl = document.createElement("a");
        issueEl.classList = "list-item flex-row justify-space-between align-center";
        issueEl.setAttribute("href", issues[i].html_url); 
        issueEl.setAttribute("target", "_blank");
        
        // create span to hold issue title 
        var titleEL = document.createElement("span");
        titleEL.textContent = issues[i].title;

        // append to container
        issueEl.appendChild(titleEL);

        // create a type element
        var typeEl = document.createElement("span");

        // check if issue is an actual issue or pull request 
        if(issues[i].pull_request) {
            typeEl.textContent = "(Pull request)";
        }
        else {
            typeEl.textContent = "(Issue)";
        }

        // append to container 
        issueEl.appendChild(typeEl);

        // append issueEl to issueContainerEl which is a reference to our container in html
        issueContainerEl.appendChild(issueEl);
    }
};