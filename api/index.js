// term-search api

export default function search(query) {
  return fetch(`http://localhost:2020/api/dictentries/startsWith?term=${query}&limit=100&skip=0&subjectFieldStr=Recht`,
    { method: 'get' })
  .then(res => res.json())
  .then(json => json.results.dictentries);
}
