import * as actionTypes from '../actions/actionTypes';

const initialState = {
  logInInfo: {
    id: 1,
    email: 'swpp@snu.ac.kr',
    password: 'iluvswpp',
    name: 'Software Lover',
    logged_in: false,
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SIGN_IN:
      return { ...state, logInInfo: action.info };
    case actionTypes.SIGN_OUT:
      return {
        ...state,
        logInInfo: {
          id: 1,
          email: 'swpp@snu.ac.kr',
          password: 'iluvswpp',
          name: 'Software Lover',
          logged_in: false,
        },
      };
    case actionTypes.GET_LOGININFO:
      return { ...state, logInInfo: action.logInInfo };
    default:
      return { ...state };
  }
};

export default reducer;
