import React from 'react';
import { BACKGROUND } from './color-themes';

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
  return `//www.youtube.com/embed/${getId(url)}?autoplay=1`;
}

function getClipsEmbed(url) {
  const splitUrl = url.split('/');
  const clipSlug = splitUrl[splitUrl.length - 1];

  return `//clips.twitch.tv/embed?clip=${clipSlug}`;
}

function getTwitterEmbed(url) {
  return `https://twitframe.com/show?url=${url}`;
}

function iFrame(url) {
  return (
    <iframe
      src={url}
      title="content"
      width="100%"
      height="100%"
      frameBorder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  );
}

function getImage(url) {
  return (
    <div
      style={{
        'width': '100%',
        'height': '100%',
        'background': BACKGROUND,
      }}
    >
      <div
        style={{
          'width': '100%',
          'height': '80vh',
        }}
      >
        <img
          width="100%"
          height="100%"
          style={{
            'object-fit': 'contain',
            'background': BACKGROUND,
          }}
          src={url}
          alt="content"
        />
      </div>
    </div>
  );
}

export function getParsedContent(url) {
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    return iFrame(getYoutubeEmbed(url));
  } else if (url.includes('clips.twitch.tv')) {
    return iFrame(getClipsEmbed(url));
  } else if (url.includes('twitter.com')) {
    return iFrame(getTwitterEmbed(url));
  } else if (url.includes('reddit.com')) {
    return null;
  } else if (url.endsWith('.jpg')) {
    return getImage(url);
  }

  return iFrame(url);
}
