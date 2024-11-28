document.addEventListener('DOMContentLoaded', function() {
  var apiToken = localStorage.getItem('youtubeApiToken');

  if (!apiToken) {
      // If the token is not found, redirect the user to the index page
      window.location.replace('/index.html')
  }
  document.addEventListener('DOMContentLoaded', function () {
      loadTrending(); // Default tab on page load
  });
})

function loadTrending() {
  fetchTrendingVideos(apiKey, function (videos) {
    displayTrendingVideos(videos);
  }, function (error) {
    console.error(error);
  });
}

function displayTrendingVideos(results, append) {
  var content = document.getElementById('contentHome');
  if (!append) content.innerHTML = '';

  // Loop through the results array
  for (var i = 0; i < results.length; i++) {
    var result = results[i];
    var div = document.createElement('div');
    var videoId, postedDate, trendingPostedDate, channelId;

    trendingVideoId = result.id;
    trendingPostedDate = new Date(result.snippet.publishedAt).toLocaleDateString();
    trendingPostedDate = timeSince(trendingPostedDate);

    div.innerHTML =
      '<img src="' + result.snippet.thumbnails.medium.url + '" alt="Video thumbnail">' +
      '<h3>' + result.snippet.title + '</h3>' +
      '<p>Posted ' + trendingPostedDate + '</p>';

    div.onclick = (function (trendingVideoId) {
      return function () {
        openVideo(trendingVideoId);
      };
    })(trendingVideoId); // Closure to bind the trendingVideoId

    content.appendChild(div);
  }
}