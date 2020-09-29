import * as actionTypes from './actionTypes';
import axios from 'axios';

export const getUsers_ = (users) => {
  return {
    type: actionTypes.GET_ALL_USERS,
    users: users,
  };
};

export const getUsers = () => {
  return (dispatch) => {
    return axios.get('/api/user/').then((res) => dispatch(getUsers_(res.data)));
  };
};
