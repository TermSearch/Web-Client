import * as types from '../constants/actionTypes';

const initialState = {
  query: '',
  friends: [],
};

export default function friendListReducer(state = initialState, action) {
  switch (action.type) {

    case types.SET_QUERY:
      return {
        ...state,
        query: action.query,
      };

    case types.SET_FRIENDS:
      return {
        ...state,
        friends: action.friends,
      };

    default:
      return state;

  }
}
