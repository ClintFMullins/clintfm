function getId(url) {
  var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  var match = url.match(regExp);

  if (match && match[2].length === 11) {
      return match[2];
  } else {
      return 'error';
  }
}

function getYoutubeEmbed(url) {
  return `//www.youtube.com/embed/${getId(url)}'`
}

function getClipsEmbed(url) {
  const splitUrl = url.split('/');
  const clipSlug = splitUrl[splitUrl.length - 1];

  return `//clips.twitch.tv/embed?clip=${clipSlug}`;
}

export function convertPreviewUrl(url) {
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    return getYoutubeEmbed(url);
  } else if (url.includes('clips.twitch.tv')) {
    return getClipsEmbed(url);
  }

  return url;
}
