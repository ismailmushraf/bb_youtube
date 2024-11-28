document.addEventListener('DOMContentLoaded', function () {
    // Get the query parameter from the URL
    setTimeout(function () {
        // performSearch();
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
            displaySearchResults(videos);
        }, function (error) {
            console.error(error);
        });
    } else {
        document.getElementById('searchResults').innerText = 'No search query provided.';
    }
}

function displaySearchResults(results, append) {
    var content = document.getElementById('contentSearch');
    if (!append) content.innerHTML = '';

    // Loop through the results array
    for (var i = 0; i < results.length; i++) {
        var result = results[i];
        var div = document.createElement('div');
        var videoId, postedDate, trendingPostedDate, channelId;

        if (result.id.kind === 'youtube#video') {
            // Video result
            videoId = result.id.videoId;
            postedDate = new Date(result.snippet.publishedAt).toLocaleDateString();
            postedDate = timeSince(postedDate);

            div.innerHTML =
                '<img src="' + result.snippet.thumbnails.medium.url + '" alt="Video thumbnail">' +
                '<h3>' + result.snippet.title + '</h3>' +
                '<p>Posted ' + postedDate + '</p>';

            div.onclick = (function (videoId) {
                return function () {
                    openVideo(videoId);
                };
            })(videoId); // Closure to bind the videoId
        } else if (result.id.kind === 'youtube#channel') {
            // Channel result
            channelId = result.id.channelId;

            div.innerHTML =
                '<img src="' + result.snippet.thumbnails.medium.url + '" alt="Channel thumbnail">' +
                '<h3>' + result.snippet.title + '</h3>' +
                '<p>Channel</p>';

            div.onclick = (function (channelId) {
                return function () {
                    openChannel(channelId);
                };
            })(channelId); // Closure to bind the channelId
        }

        content.appendChild(div);
    }
}

function loadMore(type) {
    fetchSearchResults(apiKey, window.currentQuery, function (videos) {
        displaySearchResults(videos, true);
    }, function (error) {
        console.error(error);
    }, nextPageToken);
}