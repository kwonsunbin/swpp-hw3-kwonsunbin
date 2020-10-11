import reducer from './user';
import * as actionTypes from '../actions/actionTypes';

const stubUser = {
  id: 1,
  name: 'TEST',
};

describe('user reducer', () => {
  it('should return default state', () => {
    const newState = reducer(undefined, {});
    expect(newState).toEqual({
      users: null,
    });
  });

  it('should get all users', () => {
    const newState = reducer(undefined, {
      type: actionTypes.GET_ALL_USERS,
      users: [stubUser],
    });
    expect(newState).toEqual({
      users: [stubUser],
    });
  });
});
