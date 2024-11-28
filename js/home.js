

function loadTrending() {
  fetchTrendingVideos(apiKey, function (videos) {
    displayVideos(videos);
  }, function (error) {
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
      var postedDate = new Date(result.snippet.publishedAt).toLocaleDateString();
      postedDate = timeSince(postedDate);

      div.innerHTML = `
        <img src="${result.snippet.thumbnails.medium.url}" alt="Video thumbnail">
        <h3>${result.snippet.title}</h3>
        <p>Posted ${postedDate}</p>
      `;
      div.onclick = (function (videoId) {
        return function () {
          openVideo(videoId);
        };
      })(videoId);
    } else if (result.id.kind === 'youtube#channel') {
      // Channel result
      var channelId = result.id.channelId;

      div.innerHTML = `
        <img src="${result.snippet.thumbnails.medium.url}" alt="Channel thumbnail">
        <h3>${result.snippet.title}</h3>
        <p>Channel</p>
      `;
      div.onclick = (function (channelId) {
        return function () {
          openChannel(channelId);
        };
      })(channelId);
    } else if (result.kind === 'youtube#video') {
      // Trending video result
      var trendingVideoId = result.id;
      var trendingPostedDate = new Date(result.snippet.publishedAt).toLocaleDateString();
      trendingPostedDate = timeSince(trendingPostedDate);

      div.innerHTML = `
        <img src="${result.snippet.thumbnails.medium.url}" alt="Video thumbnail">
        <h3>${result.snippet.title}</h3>
        <p>Posted ${trendingPostedDate}</p>
      `;
      div.onclick = (function (trendingVideoId) {
        return function () {
          openVideo(trendingVideoId);
        };
      })(trendingVideoId);
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

function loadMore(type) {
  if (type == 'video') {
    fetchVideoComments(apiKey, window.currentVideoId, function (comments) {
      appendComments(comments, true);
    }, function (error) {
      console.error(error);
    }, nextPageToken);
  } else if (type == 'search') {
    fetchSearchResults(apiKey, window.currentQuery, function (videos) {
      displayVideos(videos, true);
    }, function (error) {
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

function timeSince(date) {
  var now = new Date();
  var past = new Date(date);
  var seconds = Math.floor((now - past) / 1000);

  var intervals = {
    year: 31536000, // 60 * 60 * 24 * 365
    month: 2592000, // 60 * 60 * 24 * 30
    week: 604800, // 60 * 60 * 24 * 7
    day: 86400, // 60 * 60 * 24
    hour: 3600, // 60 * 60
    minute: 60,
    second: 1
  };

  for (var interval in intervals) {
    var time = Math.floor(seconds / intervals[interval]);
    if (time >= 1) {
      return time === 1
        ? "a " + interval + " ago"
        : time + " " + interval + "s ago";
    }
  }

  return "just now"; // When the difference is less than a second
}