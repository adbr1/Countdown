export function isValidTimeFormat(time: string): boolean {
  const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
  return timeRegex.test(time);
}

export function isValidTimerName(name: string): boolean {
  return name.length >= 1 && name.length <= 50;
}