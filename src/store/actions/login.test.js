import axios from 'axios';
import * as actionCreators from './login';
import { store } from '../store';

const stubLogInInfoBF = {
  id: 1,
  email: 'swpp@snu.ac.kr',
  password: 'iluvswpp',
  name: 'Software Lover',
  logged_in: false,
};

const stubLogInInfoAF = {
  id: 1,
  email: 'swpp@snu.ac.kr',
  password: 'iluvswpp',
  name: 'Software Lover',
  logged_in: false,
  logged_in: true,
};

describe('user ActionCreators', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it(`'logIn' should make user login correctly`, (done) => {
    const spyGet = jest.spyOn(axios, 'get').mockImplementation((url) => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: stubLogInInfoAF,
        };
        resolve(result);
      });
    });

    const spyPut = jest.spyOn(axios, 'put').mockImplementation((url) => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: stubLogInInfoAF,
        };
        resolve(result);
      });
    });

    store.dispatch(actionCreators.logIn()).then(() => {
      const newState = store.getState();
      expect(newState.login.logInInfo).toBe(stubLogInInfo);
      expect(spyGet).toHaveBeenCalledTimes(1);
      expect(spyPut).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it(`'logOut' should make user logout correctly`, (done) => {
    const spyPut = jest.spyOn(axios, 'put').mockImplementation((url) => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: stubLogInInfoBF,
        };
        resolve(result);
      });
    });

    store.dispatch(actionCreators.logOut(stubLogInInfoBF)).then(() => {
      const newState = store.getState();
      expect(newState.login.logInInfo).toEqual(stubLogInInfoBF);
      expect(spyPut).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it(`'getLogInInfo' should correctly fetch logInInfo`, (done) => {
    const spyGet = jest.spyOn(axios, 'get').mockImplementation((url) => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: stubLogInInfoAF,
        };
        resolve(result);
      });
    });

    store.dispatch(actionCreators.getLogInInfo()).then(() => {
      const newState = store.getState();
      expect(newState.login.logInInfo).toBe(stubLogInInfoAF);
      expect(spyGet).toHaveBeenCalledTimes(1);
      done();
    });
  });
});
