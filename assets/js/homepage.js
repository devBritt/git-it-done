// function to get repos by account username
function getUserRepos() {
    fetch("https://api.github.com/users/octocat/repos");
};

getUserRepos();