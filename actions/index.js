import { browserHistory } from 'react-router';
import * as types from '../constants/actionTypes';
import search from '../api/search';

export function setPage(page = 1) {
  return {
    type: types.SET_PAGE,
    page,
  };
}

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

export function setQueryTime(queryTime = 0) {
  return {
    type: types.SET_QUERY_TIME,
    queryTime,
  }
}

export function setLoading(loading = false) {
  return {
    type: types.SET_LOADING,
    loading,
  }
}

export function setCount(count = 0) {
  return {
    type: types.SET_COUNT,
    count,
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
    const {
      term,
      selectedSubjectFields,
      page
    } = getState();

    browserHistory.push({
      pathname: '/',
      query: {
        term: term || undefined,
        selectedSubjectFields: selectedSubjectFields || undefined,
        page: page || undefined, // TODO: Don't show page in URL if 1
      },
    });

    // Only query when term has a search string
    if (term.length > 0) {
      dispatch(setLoading(true));
      search({
          term,
          selectedSubjectFields,
          page,
        })
        .fail(err => {
          // TODO: Create an alert with bootstrap alert: http://www.bootply.com/4FSUjc2qej
          // TODO: Add dispatch, see: https://stackoverflow.com/questions/37078215/how-to-handle-errors-in-fetch-responses-with-redux-thunk/37099629#37099629
          alert("An API error has occured:\n\n " + JSON.stringify(err, null, 4))
          dispatch(setLoading(false));
        })
        .then(results => {
          dispatch(setCount(results.count));
          dispatch(setQueryTime(results.queryTime));
          return results.dictentries;
        })
        .then(dictentries => {
          dispatch(setDictentries(dictentries));
          dispatch(setLoading(false));
        });
    }
  };
}
