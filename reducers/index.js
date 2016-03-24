import * as types from '../constants/actionTypes';

const initialState = {
  query: '',
  subjectField: [],
  dictentries: [],
};

export default function dictEntryListReducer(state = initialState, action) {
  switch (action.type) {

    case types.SET_QUERY:
      return {
        ...state,
        query: action.query,
      };

    case types.SET_SUBJECTFIELD:
      return {
        ...state,
        subjectField: [...state.subjectField].concat(action.subjectField),
      };

    case types.SET_DICTENTRIES:
      return {
        ...state,
        dictentries: action.dictentries,
      };

    default:
      return state;

  }
}
