import { browserHistory } from 'react-router';
import * as types from '../constants/actionTypes';
import search from '../api/search';

export function setTerm(term = '') {
  return {
    type: types.SET_TERM,
    term,
  };
}

export function liveSearchLoading(liveSearchIsLoading = false) {
  return {
    type: types.LIVE_SEARCH_LOADING,
    liveSearchIsLoading,
  }
}

export function toggleSubjectField(subjectField = '') {
  return {
    type: types.TOGGLE_SUBJECTFIELD,
    subjectField,
  };
}

export function setSelectedSubjectFields(selectedSubjectFields = []) {
  return {
    type: types.SET_SELECTED_SUBJECTFIELDS,
    selectedSubjectFields,
  };
}

export function setDictentries(dictentries = []) {
  return {
    type: types.SET_DICTENTRIES,
    dictentries,
  };
}

export function setSuggestions(suggestions = []) {
  return {
    type: types.SET_SUGGESTIONS,
    suggestions,
  };
}

export function clearAll() {
  return {
    type: types.CLEAR_ALL
  };
}

export function fetchDictentries() {
  return (dispatch, getState) => {
    const { term, selectedSubjectFields } = getState();

    browserHistory.push({
      pathname: '/',
      query: {
        term: term || undefined,
        selectedSubjectFields: selectedSubjectFields || undefined
       },
    });

    // Only query when term has a search string
    if (term.length > 0) search({ term, selectedSubjectFields })
      .fail( err => {
        // TODO: Create an alert with bootstrap alert: http://www.bootply.com/4FSUjc2qej
        // TODO: Add dispatch, see: https://stackoverflow.com/questions/37078215/how-to-handle-errors-in-fetch-responses-with-redux-thunk/37099629#37099629
        alert("An API error has occured:\n\n "+JSON.stringify(err, null, 4))
      })
      .then(results => {
        // TODO: Move this to seach results view, tiny letters above footer
        console.log("Query time: "+results.queryTime+" ms");
        return results.dictentries;
      })
      .then(dictentries => {
        dispatch(setDictentries(dictentries));
      });
  };
}
