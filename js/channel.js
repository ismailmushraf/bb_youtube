document.addEventListener('DOMContentLoaded', function () {
    var queryString = window.location.search.substring(1);
    var queryParams = {};
    queryString.split('&').forEach(function (pair) {
        var parts = pair.split('=');
        queryParams[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);
    });

    var channelId = queryParams['channelId'];
    window.currentChannelId = channelId;
    if (channelId) {
        fetchChannelVideos(apiKey, channelId, function (videos) {
            displayChannel(videos);
        }, function (error) {
            alert(error);
        });
    } else {
        alert("No channel selected.");
    }
});

function displayChannel(results, append) {
    var content = document.getElementById('contentChannel');
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

function loadMore() {
    fetchChannelVideos(apiKey, window.currentChannelId, function (videos) {
        displayChannel(videos, true);
    }, function (error) {
        alert(error);
    }, nextPageToken);
}