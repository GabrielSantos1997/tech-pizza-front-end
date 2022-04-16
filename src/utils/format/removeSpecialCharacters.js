export function all(text) {
  return text.normalize('NFD').replace(/[^a-zA-Zs]/g, '');
}
export function keepNumbers(text) {
  return text.normalize('NFD').replace(/[^a-zA-Zs0-9]/g, '');
}
export function keepNumbersAndSpaces(text) {
  return text.normalize('NFD').replace(/[^a-zA-Zs 0-9]/g, '');
}
