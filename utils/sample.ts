export let sample = <T extends unknown>(array: T[]): T =>
  array[Math.floor(Math.random() * array.length)]
