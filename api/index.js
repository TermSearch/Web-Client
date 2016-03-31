const debounce = function (func, wait, immediate) {
  var timeout;
  return function () {

    var context = this,
      args = arguments;

    return new Promise(function (resolve) {
      var later = function () {
        timeout = null;
        if (!immediate) resolve(func.apply(context, args));
      };

      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);

      if (callNow) resolve(func.apply(context, args));
    });
  };
};

//
// Term-Search API call
//
export default function search({ term, selectedSubjectFields }) {
  const apiUrl = 'http://localhost:2020/api/dictentries/startsWith?';
  const queryString = `term=${term}&limit=100&skip=0&subjectFields=${selectedSubjectFields}`;
  const url = apiUrl + queryString;
  // console.log(`Query: ${url}`);
  return fetch(url, { method: 'get' })
    .then(res => res.json())
    .then(json => json.results.dictentries || []); // should return an empty array if not found
}

export { debounce };
