import * as actionTypes from './actionTypes';
import axios from 'axios';

export const getComments_ = (comments) => {
  return {
    type: actionTypes.GET_ALL_COMMENTS,
    comments: comments,
  };
};
export const getComments = () => {
  return (dispatch) => {
    return axios
      .get('/api/comments/')
      .then((res) => dispatch(getComments_(res.data)));
  };
};

export const deleteComment_ = (id) => {
  return {
    type: actionTypes.DELETE_COMMENT,
    targetID: id,
  };
};

export const deleteComment = (comment_id, article_id) => {
  return (dispatch) => {
    return axios
      .delete(`/api/comments/${comment_id}/`)
      .then(() => dispatch(deleteComment_(comment_id)));
  };
};

export const postComment_ = (comment) => {
  return {
    type: actionTypes.ADD_COMMENT,
    id: comment.id,
    author_id: comment.author_id,
    article_id: comment.article_id,
    content: comment.content,
  };
};

export const postComment = (comment) => {
  return (dispatch) => {
    return axios
      .post(`/api/comments/`, comment)
      .then((res) => dispatch(postComment_(res.data)));
  };
};

export const putComment_ = (comment) => {
  return {
    type: actionTypes.UPDATE_COMMENT,
    id: comment.id,
    author_id: comment.author_id,
    article_id: comment.article_id,
    content: comment.content,
  };
};

export const putComment = (comment) => {
  return (dispatch) => {
    return axios
      .put(`/api/comments/${comment.id}`)
      .then(() => dispatch(putComment_(comment)));
  };
};
