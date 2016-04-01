//
// Debounce function that returns a Promise
// Source: https://github.com/moszeed/es6-promise-debounce
//
const debounce = (func, wait, immediate) => {
  let timeout;
  return () => {
    const context = this;
    const args = arguments;

    return new Promise((resolve) => {
      const later = () => {
        timeout = null;
        if (!immediate) resolve(func.apply(context, args));
      };

      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);

      if (callNow) resolve(func.apply(context, args));
    });
  };
};

//
// Term-Search API call
//
const apiCall = ({ term, selectedSubjectFields }) => {
  const apiUrl = 'http://localhost:2020/api/dictentries/startsWith?';
  const queryString = `term=${term}&limit=100&skip=0&subjectFields=${selectedSubjectFields}`;
  const url = apiUrl + queryString;
  // console.log(`Query: ${url}`);

  return fetch(url, { method: 'get' })
    .then(res => res.json())
    .then(json => json.results.dictentries || []); // should return an empty array if not found
};

//
// Export a debounced apiCall
//
export default debounce(apiCall, 500);
