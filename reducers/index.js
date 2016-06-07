import * as types from '../constants/actionTypes';

const initialState = {
  liveSearchIsLoading: false,
  term: '',
  selectedSubjectFields: [],
  dictentries: [],
  suggestions: [],
  queryTime: 0,
  count: 0,
  page: 1,
};

export default function dictEntryListReducer(state = initialState, action) {
  switch (action.type) {

    case types.SET_PAGE:
      return {
        ...state,
        page: action.page,
      };

    case types.SET_TERM:
      return {
        ...state,
        term: action.term,
      };

    case types.LIVE_SEARCH_LOADING:
      return {
        ...state,
        liveSearchIsLoading: action.liveSearchIsLoading,
      };

    case types.SET_QUERY_TIME:
      return {
        ...state,
        queryTime: action.queryTime,
      };

    case types.SET_COUNT:
      return {
        ...state,
        count: action.count,
      };

    case types.SET_LOADING:
      return {
        ...state,
        loading: action.loading,
      };

    // Removes subjectField from selectedSubjectFields array if it exists
    // Adds it if it doesn't
    case types.TOGGLE_SUBJECTFIELD:
      return {
        ...state,
        selectedSubjectFields: (state.selectedSubjectFields.indexOf(action.subjectField) > -1)
                        ? state.selectedSubjectFields.filter(item => item !== action.subjectField)
                        : [...state.selectedSubjectFields].concat([action.subjectField]),
      };

    case types.SET_SELECTED_SUBJECTFIELDS:
      return {
        ...state,
        selectedSubjectFields: action.selectedSubjectFields
      }

    case types.SET_DICTENTRIES:
      return {
        ...state,
        dictentries: action.dictentries,
      };

    case types.SET_SUGGESTIONS:
      return {
        ...state,
        suggestions: action.suggestions,
      };

    case types.CLEAR_ALL:
      return {
        ...state,
        suggestion: [],
        dictentries: [],
        term: '',
        liveSearchLoading: false,
        queryTime: 0,
        count: 0,
        loading: false,
      }

    default:
      return state;

  }
}
