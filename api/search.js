/*  Term-Search search api call
    TODO: Add response time logging to response
    TODO: Speedup response time < 300ms for API
    TODO: Add Fulltext search results?
    TODO: Search results for same dictentry.de should be merged, see static implementation
*/
import escapeRegexChars from '../util/escapeRegexChars';
const LIMIT = 20;
const SKIP = 0;

export default ({
  term,
  selectedSubjectFields
}) => {
  const escapedTerm = escapeRegexChars(term);
  const apiUrl = `${process.env.API_URL}/dictentries/startsWith?`;
  const queryString = `term=${escapedTerm}&limit=${LIMIT}&skip=${SKIP}&subjectFields=${selectedSubjectFields}`;
  const url = apiUrl + queryString;
  return fetch(url, {
      method: 'get'
    })
    .then(res => res.json())
    .then(json => json.results.dictentries || []); // should return an empty array if not found
};
