const PHRASES_HAPPY = [
  "Let's do it!",
  'Click here!',
  'Over here, silly!',
  'Get rich!',
  'Get handsome!',
  'Be your best you!',
  'Buy buy buy!',
  'Your friend has this...',
  'Love forever',
  'Fill the hole in your heart!'
];

const PHRASES_ANGRY = [
  "Don't touch me",
  'Buzz off',
  "You don't get it",
  'Go outside',
  'Do you need this?',
  'Go click yourself',
  'Rejection, as you know',
  'Is your life this pointless?',
  'Are we supposed to be friends?',
  'Stop harrassing me',
  'Wow you have time on your hands',
  'You like wasting time',
];

function getPhrase(phrases) {
  return phrases[Math.floor(Math.random() * phrases.length)];
}

export function getAngryPhrase() {
  return getPhrase(PHRASES_ANGRY);
}

export function getHappyPhrase() {
  return getPhrase(PHRASES_HAPPY);
}