//
// Term-Search live search api call
//
import escapeRegexChars from '../util/escapeRegexChars';
import debounce from '../util/debounce';

const DEBOUNCE_TIME = 200;
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

const liveSearch = ({
  term,
  selectedSubjectFields
}) => {
  /*
    TODO: Add caching for terms, see: http://codepen.io/moroshko/pen/JGEmeX
  */
  const escapedTerm = escapeRegexChars(term);
  const apiUrl = `${process.env.API_URL}/dictentries/liveSearch?`;
  const queryString = `term=${escapedTerm}&limit=${API_LIMIT}&skip=${API_SKIP}&subjectFields=${selectedSubjectFields}`;
  const url = apiUrl + queryString;
  return fetch(url, {
      method: 'get'
    })
    .then(res => res.json())
    .then(json => json.results.dictentries || []) // should return an empty array if not found
    .then(filterUniques)  // return only unique suggestions
    .then(limitResults) // limits number of returned results
}

export default debounce(liveSearch, DEBOUNCE_TIME);
