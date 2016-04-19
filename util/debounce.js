//
// Debounce function that returns a Promise
// Based upon: https://github.com/moszeed/es6-promise-debounce
//
export default (func, wait, immediate) => {
  let timeout;
  return (...args) => new Promise((resolve) => {
    const later = () => {
      timeout = null;
      if (!immediate) resolve(func.apply(undefined, args));
    };

    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);

    if (callNow) resolve(func.apply(undefined, args));
  });
};
