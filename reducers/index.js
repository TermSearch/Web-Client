import * as types from '../constants/actionTypes';

const initialState = {
  term: '',
  subjectFields: [],
  dictentries: [],
};

export default function dictEntryListReducer(state = initialState, action) {
  switch (action.type) {

    case types.SET_TERM:
      return {
        ...state,
        term: action.term,
      };

    case types.SET_SUBJECTFIELDS:
      return {
        ...state,
        subjectFields: [...state.subjectFields].concat(action.subjectFields),
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
