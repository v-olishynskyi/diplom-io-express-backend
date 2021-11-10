export function wait(ms: number) {
  return new Promise((resolve, _) => {
    setTimeout(resolve, ms);
  });
}
