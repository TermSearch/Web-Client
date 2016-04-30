/*  Term-Search search api call
    TODO: Speedup response time < 300ms for API
    TODO: Add Fulltext search results?
*/
import escapeRegexChars from '../util/escapeRegexChars';
const LIMIT = 20;
const SKIP = 0;

// Helper function
// TODO: Move to lib
// TODO: Use same function for webclient as well
// TODO: Write tests for this function
// TODO: Also remove duplicate nl translations here?
const mergeDuplicates = (dictEntries) => {
	const onlyUniques = [];
	dictEntries.forEach((entry) => {
		let unique = true;
		onlyUniques.forEach((uniqueEntry) => {
				if (uniqueEntry.de === entry.de) {
					unique = false;
					// add Dutch translations to existing uniqueEntry
					uniqueEntry.nl = uniqueEntry.nl.concat(entry.nl);
				}
			});
		if (unique) onlyUniques.push(entry);
	});
	return onlyUniques;
};

export default ({
  term,
  selectedSubjectFields
}) => {

  const startTime = new Date();

  const escapedTerm = escapeRegexChars(term);
  const apiUrl = `${process.env.API_URL}/dictentries/startsWith?`;
  const queryString = `term=${escapedTerm}&limit=${LIMIT}&skip=${SKIP}&subjectFields=${selectedSubjectFields}`;
  const url = apiUrl + queryString;
  return fetch(url, {
      method: 'get'
    })
    .then(res => res.json())
    .then(json => json.results.dictentries || [])
    .then(mergeDuplicates)
    .then(dictentries => {
      const queryTime = new Date() - startTime;
      return {
        queryTime,
        dictentries // should return an empty array if not found
      }
    });
};
