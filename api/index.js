//
// Term-Search API call
//
export default function search({ term, subjectFields }) {
  const apiUrl = 'http://localhost:2020/api/dictentries/startsWith?';
  const queryString = `term=${term}&limit=100&skip=0&subjectFieldStr=${subjectFields}`;
  const url = apiUrl + queryString;
  console.log(`Query: ${url}`);
  return fetch(url, { method: 'get' })
  .then(res => res.json())
  .then(json => json.results.dictentries || []); // should return an empty array if not found
}
