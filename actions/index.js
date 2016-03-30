import { browserHistory } from 'react-router';
import * as types from '../constants/actionTypes';
import search from '../api';

export function setTerm(term = '') {
  return {
    type: types.SET_TERM,
    term,
  };
}

export function toggleSubjectField(subjectField = '') {
  return {
    type: types.TOGGLE_SUBJECTFIELD,
    subjectField,
  };
}

export function setDictentries(dictentries = []) {
  return {
    type: types.SET_DICTENTRIES,
    dictentries,
  };
}

export function fetchDictentries() {
  return (dispatch, getState) => {
    const { term, selectedSubjectFields } = getState();

    browserHistory.push({
      query: { term: term || undefined },
    });

    // console.log(`subjectFields in fetchDictentries: ${subjectFields}`);

    search({ term, selectedSubjectFields }).then(dictentries => {
      dispatch(setDictentries(dictentries));
    });
  };
}
