// functions
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
                    console.log(data);
                });
        });
};

getUserRepos("facebook");