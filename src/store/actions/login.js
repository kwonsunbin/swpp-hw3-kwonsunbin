import * as actionTypes from './actionTypes';
import axios from 'axios';
import { push } from 'connected-react-router';

export const logIn_ = (info) => {
  return { type: actionTypes.SIGN_IN, info: info };
};

export const logIn = () => {
  return (dispatch) => {
    let existingData;
    axios
      .get('api/user/1')
      .then((res) => {
        existingData = res.data;
      })
      .then(() => {
        return axios
          .put('/api/user/1', { ...existingData, logged_in: true })
          .then((res) => {
            dispatch(logIn_(res.data));
          })
          .then(() => dispatch(push('/articles')));
      });
  };
};

export const logOut_ = (info) => {
  return { type: actionTypes.SIGN_OUT, logInInfo: info };
};

export const logOut = (logInInfo) => {
  return (dispatch) => {
    return axios
      .put('/api/user/1', { ...logInInfo, logged_in: false })
      .then(() => dispatch(logOut_(logInInfo)));
  };
};

export const getLogInInfo_ = (logInInfo) => {
  return { type: actionTypes.GET_LOGININFO, logInInfo: logInInfo };
};

export const getLogInInfo = () => {
  return (dispatch) => {
    return axios
      .get(`/api/user/1`)
      .then((res) => dispatch(getLogInInfo_(res.data)));
  };
};
