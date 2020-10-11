import reducer from './login';
import * as actionTypes from '../actions/actionTypes';

const stubLogInInfoLO = {
  id: 1,
  email: 'TEST_EMAIL',
  password: 'TEST_PW',
  name: 'TEST_NAME',
  logged_in: false,
};

const stubLogInInfoLI = {
  id: 1,
  email: 'TEST_EMAIL',
  password: 'TEST_PW',
  name: 'TEST_NAME',
  logged_in: false,
};

describe('login reducer', () => {
  it('should return default state', () => {
    const newState = reducer(undefined, {});
    expect(newState).toEqual({
      logInInfo: {
        id: 1,
        email: 'swpp@snu.ac.kr',
        password: 'iluvswpp',
        name: 'Software Lover',
        logged_in: false,
      },
    });
  });

  it('should make user logged in', () => {
    const newState = reducer(undefined, {
      type: actionTypes.SIGN_IN,
      info: stubLogInInfoLI,
    });
    expect(newState).toEqual({
      logInInfo: stubLogInInfoLI,
    });
  });

  it('should make user logged out', () => {
    const newState = reducer(undefined, {
      type: actionTypes.SIGN_OUT,
    });
    expect(newState).toEqual({
      logInInfo: {
        id: 1,
        email: 'swpp@snu.ac.kr',
        password: 'iluvswpp',
        name: 'Software Lover',
        logged_in: false,
      },
    });
  });

  it('should get logInInfo', () => {
    const newState = reducer(undefined, {
      type: actionTypes.GET_LOGININFO,
      logInInfo: {
        id: 1,
        email: 'swpp@snu.ac.kr',
        password: 'iluvswpp',
        name: 'Software Lover',
        logged_in: false,
      },
    });
    expect(newState).toEqual({
      logInInfo: {
        id: 1,
        email: 'swpp@snu.ac.kr',
        password: 'iluvswpp',
        name: 'Software Lover',
        logged_in: false,
      },
    });
  });
});
