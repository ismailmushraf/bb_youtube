


function appendComments(comments) {
  var container = document.getElementById('commentsContainer');

  comments.forEach(function (comment) {
    var snippet = comment.snippet.topLevelComment.snippet;
    var div = document.createElement('div');
    div.className = 'comment';

    div.innerHTML = ' <div class="comment-author"> ' +
      '<img src=" ' + snippet.authorProfileImageUrl + '" alt= ' + snippet.authorDisplayName + '/>' +
      '<strong> ' + snippet.authorDisplayName + '</strong>' +
      '</div>' +
      '<p>' + snippet.textDisplay + '</p>';

    container.appendChild(div);
  });
}