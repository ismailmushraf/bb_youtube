

function loadTrending() {
  fetchTrendingVideos(apiKey, function(videos) {
    displayVideos(videos);
  }, function(error) {
    console.error(error);
  });
}

function displayVideos(results, append) {
  var content = document.getElementById('content');
  if (!append) content.innerHTML = '';
  
  // Loop through the results array
  for (var i = 0; i < results.length; i++) {
    var result = results[i];
    var div = document.createElement('div');

    if (result.id.kind === 'youtube#video') {
      // Video result
      var videoId = result.id.videoId;
      div.innerHTML = '<img src="' + result.snippet.thumbnails.medium.url + '" alt="Video thumbnail">' +
                      '<h3>' + result.snippet.title + '</h3>';
      div.onclick = (function(videoId) {
        return function() {
          openVideo(videoId);
        };
      })(videoId); // Create a closure to bind the videoId
    } else if (result.id.kind === 'youtube#channel') {
      // Channel result
      var channelId = result.id.channelId;
      div.innerHTML = '<img src="' + result.snippet.thumbnails.medium.url + '" alt="Channel thumbnail">' +
                      '<h3>' + result.snippet.title + '</h3>';
      div.onclick = (function(channelId) {
        return function() {
          openChannel(channelId);
        };
      })(channelId); // Create a closure to bind the channelId
    } else if (result.kind === 'youtube#video') {
      // Trending video result
      var trendingVideoId = result.id;
      div.innerHTML = '<img src="' + result.snippet.thumbnails.medium.url + '" alt="Video thumbnail">' +
                      '<h3>' + result.snippet.title + '</h3>';
      div.onclick = (function(trendingVideoId) {
        return function() {
          openVideo(trendingVideoId);
        };
      })(trendingVideoId); // Create a closure to bind the trendingVideoId
    }
    
    content.appendChild(div);
  }
}

// Function to handle opening a video page
function openVideo(videoId) {
  if (!videoId) {
    alert('Invalid video ID');
    return;
  }

  window.location.href = 'video.html?videoId=' + encodeURIComponent(videoId);
}

// Function to handle opening a channel page
function openChannel(channelId) {
  if (!channelId) {
    alert('Invalid channel ID');
    return;
  }
  window.location.href = 'channel.html?channelId=' + encodeURIComponent(channelId);
}

function openSearchResultPage(query) {
  if (!query) {
    alert('Invalid query');
    return;
  }
  window.location.href = 'search.html?query=' + encodeURIComponent(query);
}

function performSearch() {
  var query = document.getElementById('searchBar').value.trim();
  if (!query) {
    alert("Please enter a search term.");
    return;
  }
  fetchSearchResults(apiKey, query, function(videos) {
    displayVideos(videos);
  }, function(error) {
    console.error(error);
  });
}

function loadMore(type) {
  if (type == 'video') {
    fetchVideoComments(apiKey, window.currentVideoId, function (comments) {
      appendComments(comments, true);
    }, function (error) {
      console.error(error);
    }, nextPageToken);
  } else if (type == 'search') {
    fetchSearchResults(apiKey, window.currentQuery, function(videos) {
      displayVideos(videos, true);
    }, function(error) {
      console.error(error);
    }, nextPageToken);
  } else if (type == 'channel') {
    fetchChannelVideos(apiKey, window.currentChannelId, function (videos) {
      displayVideos(videos, true);
    }, function (error) {
      alert(error);
    }, nextPageToken);
  }
}
