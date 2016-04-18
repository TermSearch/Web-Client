//
// Debounce function that returns a Promise
// Based upon: https://github.com/moszeed/es6-promise-debounce
// TODO Move to an external library
//
const debounce = (func, wait, immediate) => {
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

//
// Term-Search API call
//
const apiCall = ({ term, selectedSubjectFields }) => {
  const apiUrl = `${process.env.API_URL}/dictentries/startsWith?`;
  const queryString = `term=${term}&limit=100&skip=0&subjectFields=${selectedSubjectFields}`;
  const url = apiUrl + queryString;
  return fetch(url, { method: 'get' })
    .then(res => res.json())
    .then(json => json.results.dictentries || []); // should return an empty array if not found
};

//
// Export a debounced apiCall
//
export default debounce(apiCall, 1000);
