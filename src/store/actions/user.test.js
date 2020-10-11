import axios from 'axios';
import * as actionCreators from './user';
import { store } from '../store';

const stubUser1 = {
  id: 1,
  name: 'TEST1',
};

const stubUser2 = {
  id: 2,
  name: 'TEST2',
};

const stubUserList = [stubUser1, stubUser2];

describe('user ActionCreators', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it(`'getUsers' should fetch users correctly`, (done) => {
    const spy = jest.spyOn(axios, 'get').mockImplementation((url) => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: stubUserList,
        };
        resolve(result);
      });
    });

    store.dispatch(actionCreators.getUsers()).then(() => {
      const newState = store.getState();
      expect(newState.user.users).toBe(stubUserList);
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });
});
