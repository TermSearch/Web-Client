//
// Term-Search live search api call
//
const API_LIMIT = 20;
const API_SKIP = 0;
const RESULTS_LIMIT = 10;

const filterUniques = (dictentries) => {
  return dictentries.filter(
    (dictentry, i) => (i < dictentries.length - 1) ? (dictentry.de !== dictentries[i + 1].de) : true
  )
}

const limitResults = (dictentries) => {
  return dictentries.splice(0, RESULTS_LIMIT)
}

export default ({
  term,
  selectedSubjectFields
}) => {
  const apiUrl = `${process.env.API_URL}/dictentries/liveSearch?`;
  const queryString = `term=${term}&limit=${API_LIMIT}&skip=${API_SKIP}&subjectFields=${selectedSubjectFields}`;
  const url = apiUrl + queryString;
  return fetch(url, {
      method: 'get'
    })
    .then(res => res.json())
    .then(json => json.results.dictentries || []) // should return an empty array if not found
    .then(filterUniques)  // return only unique suggestions
    .then(limitResults) // limits number of returned results
}
