export const debounce = (() => {
  let timer = 0;
  return (callback: any, ms: number) => {
    clearTimeout(timer);
    timer = setTimeout(callback, ms);
  };
})();

export const randomInteger = (min: number, max: number) => {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
};

export const generateColor = () => '#' + (Math.random().toString(16) + '000000').substring(2,8).toUpperCase();