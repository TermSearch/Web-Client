import { browserHistory } from 'react-router';
import * as types from '../constants/actionTypes';
import search from '../api';

export function setTerm(term = '') {
  return {
    type: types.SET_TERM,
    term,
  };
}

export function addSubjectField(subjectField = '') {
  return {
    type: types.ADD_SUBJECTFIELD,
    subjectField,
  };
}

export function removeSubjectField(subjectField = '') {
  return {
    type: types.REMOVE_SUBJECTFIELD,
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
    const { term, subjectFields } = getState();

    browserHistory.push({
      query: { term: term || undefined },
    });

    // console.log(`subjectFields in fetchDictentries: ${subjectFields}`);

    search({ term, subjectFields }).then(dictentries => {
      dispatch(setDictentries(dictentries));
    });
  };
}
