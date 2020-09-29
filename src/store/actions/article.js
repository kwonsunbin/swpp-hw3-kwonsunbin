import * as actionTypes from './actionTypes';
import axios from 'axios';
import { push } from 'connected-react-router';

export const getArticles_ = (articles) => {
  return { type: actionTypes.GET_ALL_ARTICLES, articles: articles };
};
export const getArticles = () => {
  return (dispatch) => {
    return axios
      .get('/api/articles/')
      .then((res) => dispatch(getArticles_(res.data)));
  };
};

export const getArticle_ = (article) => {
  return { type: actionTypes.GET_ARTICLE, selectedArticle: article };
};
export const getArticle = (id) => {
  return (dispatch) => {
    return axios
      .get(`/api/articles/${id}/`)
      .then((res) => dispatch(getArticle_(res.data)));
  };
};

export const postArticle_ = (article) => {
  return {
    type: actionTypes.ADD_ARTICLE,
    id: article.id,
    author_id: article.author_id,
    title: article.title,
    content: article.content,
  };
};

export const postArticle = (article) => {
  return (dispatch) => {
    return axios
      .post(`/api/articles/`, article)
      .then((res) => dispatch(postArticle_(res.data)))
      .then(() => dispatch(push(`/articles/${article.id}`)));
  };
};

export const putArticle_ = (article) => {
  return {
    type: actionTypes.UPDATE_ARTICLE,
    id: article.id,
    author_id: article.author_id,
    title: article.title,
    content: article.content,
  };
};

export const putArticle = (article) => {
  return (dispatch) => {
    return axios
      .put(`/api/articles/${article.id}/`, article)
      .then((res) => dispatch(putArticle_(res.data)))
      .then(() => dispatch(push(`/articles/${article.id}`)));
  };
};

export const deleteArticle_ = (id) => {
  return { type: actionTypes.DELETE_ARTICLE, targetID: id };
};

export const deleteArticle = (id) => {
  return (dispatch) => {
    return axios
      .delete(`/api/articles/${id}`)
      .then(() => dispatch(deleteArticle_(id)))
      .then(() => dispatch(push(`/articles`)));
  };
};
