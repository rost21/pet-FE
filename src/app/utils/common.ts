export const debounce = (() => {
  let timer = 0;
  return (callback: any, ms: number) => {
    clearTimeout(timer);
    timer = setTimeout(callback, ms);
  };
})();