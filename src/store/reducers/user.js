import * as actionTypes from '../actions/actionTypes';

const initialState = {
  users: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_USERS:
      return { ...state, users: action.users };

    default:
      return state;
  }
};

export default reducer;
