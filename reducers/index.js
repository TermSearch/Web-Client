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

    case types.ADD_SUBJECTFIELD:
      return {
        ...state,
        subjectFields: [...state.subjectFields].concat([action.subjectField]),
      };

    case types.REMOVE_SUBJECTFIELD:
      return {
        ...state,
        subjectFields: state.subjectFields.filter(item => item !== action.subjectField),
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
