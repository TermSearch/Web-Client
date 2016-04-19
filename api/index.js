//
// Term-Search search api call
//
export default ({ term, selectedSubjectFields }) => {
  const apiUrl = `${process.env.API_URL}/dictentries/startsWith?`;
  const queryString = `term=${term}&limit=100&skip=0&subjectFields=${selectedSubjectFields}`;
  const url = apiUrl + queryString;
  return fetch(url, { method: 'get' })
    .then(res => res.json())
    .then(json => json.results.dictentries || []); // should return an empty array if not found
};
