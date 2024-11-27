// Fetch trending videos
var apiKey = localStorage.getItem('youtubeApiToken');

var nextPageToken = null;
var currentQuery = null;
var currentChannelId = null;
var currentVideoId = null;

function fetchTrendingVideos(apiKey, callback, errorCallback, pageToken) {
  try {
    var url = 'https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=10' +
      '&key=' + encodeURIComponent(apiKey);

    if (pageToken) {
      url += '&pageToken=' + encodeURIComponent(pageToken);
    }
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onload = function () {
      if (xhr.status >= 200 && xhr.status < 300) {
        var data = JSON.parse(xhr.responseText);
        nextPageToken = data.nextPageToken || null;
        if (typeof callback === 'function') {
          callback(data.items);
        }
      } else {
        if (typeof errorCallback === 'function') {
          errorCallback('Failed to fetch trending videos. Status: ' + xhr.status);
        }
      }
    };
    xhr.onerror = function () {
      if (typeof errorCallback === 'function') {
        errorCallback('Network error occurred while fetching trending videos.');
      }
    };
    xhr.send();
  } catch (e) {
    console.log(e);
  }
}

// Fetch search results
// Fetch search results for both videos and channels
function fetchSearchResults(apiKey, query, callback, errorCallback, pageToken) {
  var url = 'https://www.googleapis.com/youtube/v3/search?key=' + apiKey +
    '&q=' + query +
    '&part=snippet&type=video,channel&maxResults=10';

  if (pageToken) {
    url += '&pageToken=' + pageToken;
  }
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 300) {
      var data = JSON.parse(xhr.responseText);
      nextPageToken = data.nextPageToken || null;
      if (typeof callback === 'function') {
        callback(data.items);
      }
    } else {
      if (typeof errorCallback === 'function') {
        errorCallback('Failed to fetch search results. Status: ' + xhr.status);
      }
    }
  };
  xhr.onerror = function () {
    if (typeof errorCallback === 'function') {
      errorCallback('Network error occurred while fetching search results.');
    }
  };
  xhr.send();
}

// Fetch videos from a specific channel
function fetchChannelVideos(apiKey, channelId, callback, errorCallback, pageToken) {
  var url = 'https://www.googleapis.com/youtube/v3/search?key=' + encodeURIComponent(apiKey) +
    '&channelId=' + encodeURIComponent(channelId) +
    '&part=snippet&order=date&maxResults=10';

  if (pageToken) {
    url += '&pageToken=' + encodeURIComponent(pageToken);
  }
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 300) {
      var data = JSON.parse(xhr.responseText);
      nextPageToken = data.nextPageToken || null;
      if (typeof callback === 'function') {
        callback(data.items);
      }
    } else {
      if (typeof errorCallback === 'function') {
        errorCallback('Failed to fetch channel videos. Status: ' + xhr.status);
      }
    }
  };
  xhr.onerror = function () {
    if (typeof errorCallback === 'function') {
      errorCallback('Network error occurred while fetching channel videos.');
    }
  };
  xhr.send();
}

function fetchVideoComments(apiKey, videoId, callback, errorCallback, pageToken) {
  var url = 'https://www.googleapis.com/youtube/v3/commentThreads?key=' + encodeURIComponent(apiKey) +
    '&videoId=' + encodeURIComponent(videoId) +
    '&part=snippet&maxResults=10&order=relevance' +
    (pageToken ? '&pageToken=' + encodeURIComponent(pageToken) : '');

  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);

  xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 300) {
      var data = JSON.parse(xhr.responseText);
      nextPageToken = data.nextPageToken || null;
      if (typeof callback === 'function') {
        callback(data.items, data.nextPageToken);
      }
    } else {
      if (typeof errorCallback === 'function') {
        errorCallback('Failed to fetch comments. Status: ' + xhr.status);
      }
    }
  };

  xhr.onerror = function () {
    if (typeof errorCallback === 'function') {
      errorCallback('Network error occurred while fetching comments.');
    }
  };

  xhr.send();
}