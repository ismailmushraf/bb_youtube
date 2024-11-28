document.addEventListener('DOMContentLoaded', function () {
    // Get the query parameter from the URL
    setTimeout(function() {
        performSearch();
    }, 2000);
});

function performSearch() {
    var queryString = window.location.search.substring(1);
    var queryParams = {};
    queryString.split('&').forEach(function (pair) {
        var parts = pair.split('=');
        queryParams[parts[0]] = parts[1];
    });
    var query = queryParams['q'];
    window.currentQuery = query;
    if (query) {
        fetchSearchResults(apiKey, query, function (videos) {
            displayVideos(videos);
        }, function (error) {
            console.error(error);
        });
    } else {
        document.getElementById('searchResults').innerText = 'No search query provided.';
    }
}