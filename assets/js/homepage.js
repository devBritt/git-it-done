// global variables
var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");

// functions
// function to request a list of repos for a particular user from GitHub
function getUserRepos(user) {
    // format the GitHub api url
    var apiUrl = "https://api.github.com/users/" + user + "/repos";

    // make a request to the url
    fetch(apiUrl)
        .then(function(response) {
            // format the response
            response.json()
                .then(function(data) {
                    // display the formatted data of response
                    displayRepos(data, user);
                });
        });
};
// function to display the returned list of repos
function displayRepos(repos, searchTerm) {
    console.log(repos);
    console.log(searchTerm);
    
    // clear prior content
    repoContainerEl.textContent = "";
    repoSearchTerm.textContent = searchTerm;

    // loop over repos
    for (var i = 0; i < repos.length; i++) {
        // format repo name
        var repoName = repos[i].owner.login + "/" + repos[i].name;
        // create a container for each repo
        var repoEl = document.createElement("a");
        repoEl.classList = "list-item flex-row justify-space-between align-center";
        repoEl.setAttribute("href", "../single-repo.html?repo=" + repoName);
        // create a status element
        var statusEl = document.createElement("span");
        statusEl.classList = "flex-row align-center";
        // create a span element to hold the repository name
        var titleEl = document.createElement("span");
        titleEl.textContent = repoName;

        // append to container
        repoEl.appendChild(titleEl);

        // check if current repo has issues or not
        if (repos[i].open_issues_count > 0) {
            statusEl.innerHTML = "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + "issue(s)";
        } else {
            statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
        };

        // append status to container
        repoEl.appendChild(statusEl);

        // append container to the DOM
        repoContainerEl.appendChild(repoEl);
    };
};

// event handlers
function formSubmitHandler(event) {
    event.preventDefault();
    
    // get value from input element\
    var username = nameInputEl.value.trim();

    if (username) {
        getUserRepos(username);
        nameInputEl.value = "";
    } else {
        alert("Please enter a GitHub username.");
    };
};

// event listeners
userFormEl.addEventListener("submit", formSubmitHandler);