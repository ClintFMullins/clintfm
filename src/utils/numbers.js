export function clamp(number, min, max) {
  return Math.max(Math.min(number, max), min);
}

export function getRandomFromList(list) {
  const randomIndex = Math.floor(Math.random() * list.length);

  return list[randomIndex];
}