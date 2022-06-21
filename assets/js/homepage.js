// request list of repos by octocat from GitHub
fetch("https://api.github.com/users/octocat/repos")
    .then(function(response) {
        // format the response
        response.json()
            .then(function(data) {
                // display the formatted data of response
                console.log(data);
            });
    });