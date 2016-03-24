//
// Term-Search API call
//
export default function search({ query, subjectField }) {
  const apiUrl = 'http://localhost:2020/api/dictentries/startsWith?';
  const queryString = `term=${query}&limit=100&skip=0&subjectFieldStr=${subjectField}`;
  const url = apiUrl + queryString;
  return fetch(url, { method: 'get' })
  .then(res => res.json())
  .then(json => json.results.dictentries || []); // should return an empty array if not found
}
