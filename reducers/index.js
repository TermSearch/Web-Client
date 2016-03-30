import * as types from '../constants/actionTypes';

const initialState = {
  term: '',
  selectedSubjectFields: [],
  dictentries: [],
};

export default function dictEntryListReducer(state = initialState, action) {
  switch (action.type) {

    case types.SET_TERM:
      return {
        ...state,
        term: action.term,
      };

    case types.TOGGLE_SUBJECTFIELD:
      return {
        ...state,
        selectedSubjectFields: (state.selectedSubjectFields.indexOf(action.subjectField) > -1)
                        ? state.selectedSubjectFields.filter(item => item !== action.subjectField)
                        : [...state.selectedSubjectFields].concat([action.subjectField]),
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
