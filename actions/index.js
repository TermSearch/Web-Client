import { browserHistory } from 'react-router';
import * as types from '../constants/actionTypes';
import search from '../api';

export function setQuery(query = '') {
  return {
    type: types.SET_QUERY,
    query,
  };
}

export function setSubjectField(subjectField = []) {
  return {
    type: types.SET_SUBJECTFIELD,
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
    const { query, subjectField } = getState();

    const subjectFieldStr = subjectField.join(',');
    console.log(subjectFieldStr);

    browserHistory.push({
      query: { term: query || undefined,
        subjectField: subjectFieldStr || undefined },
    });

    search({ query, subjectField: subjectFieldStr }).then(dictentries => {
      dispatch(setDictentries(dictentries));
    });
  };
}
