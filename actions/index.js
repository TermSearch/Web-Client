import { browserHistory } from 'react-router';
import * as types from '../constants/actionTypes';
import search from '../api';

export function setQuery(query = '') {
  return {
    type: types.SET_QUERY,
    query,
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
    const { query } = getState();

    browserHistory.push({
      query: { term: query || undefined },
    });

    search(query).then(dictentries => {
      dispatch(setDictentries(dictentries));
    });
  };
}
