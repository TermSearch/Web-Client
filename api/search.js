/*  Term-Search search api call
    TODO: Add Fulltext search results?
    TODO: Add pagination
*/

import escapeRegexChars from '../util/escapeRegexChars';
import mergeDuplicates from '../util/mergeDuplicates';
import $ from 'jquery';

export default ({
  term,
  selectedSubjectFields,
  page,
}) => {

  const startTime = new Date();

  const escapedTerm = escapeRegexChars(term);
  const apiUrl = `${process.env.API_URL}/dictentries/startsWith?`;
  let count = 0;

  const limit = 20;
  const skip = Math.ceil((page - 1) * limit);

  return $.ajax({
      url: apiUrl,
      data: {
        term: escapedTerm,
        limit: limit,
        skip: skip || 0,
        subjectFields: selectedSubjectFields,
        format: 'json'
      },
      dataType: 'json',
      type: 'GET'
    })
    .then(json => {
      count = json.results.count;
      return json;
    })
    .then(json => json.results.dictentries || [])
    .then(mergeDuplicates)
    .then(dictentries => {
      const queryTime = new Date() - startTime;
      return {
        count,
        queryTime,
        dictentries // should return an empty array if not found
      }
    });
};
