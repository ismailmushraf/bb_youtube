// Function to handle opening a channel page
function openChannel(channelId) {
    if (!channelId) {
        alert('Invalid channel ID');
        return;
    }
    window.location.href = 'channel.html?channelId=' + encodeURIComponent(channelId);
}

// Function to handle opening a video page
function openVideo(videoId) {
    if (!videoId) {
        alert('Invalid video ID');
        return;
    }

    window.location.href = 'video.html?videoId=' + encodeURIComponent(videoId);
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