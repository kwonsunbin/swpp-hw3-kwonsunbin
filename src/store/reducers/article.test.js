import reducer from './article';
import * as actionTypes from '../actions/actionTypes';

const stubArticle1 = {
  id: 1,
  author_id: 1,
  title: 'ADD_TEST1',
  content: 'ADD_TEST1',
};

const stubArticle2 = {
  id: 2,
  author_id: 2,
  title: 'ADD_TEST2',
  content: 'ADD_TEST2',
};

describe('Article Reducer', () => {
  it('should return default state', () => {
    const newState = reducer(undefined, {});
    expect(newState).toEqual({ articles: null });
  });

  it('should add article', () => {
    const stubInitialState = {
      articles: [stubArticle1],
    };
    const newState = reducer(stubInitialState, {
      type: actionTypes.ADD_ARTICLE,
      id: stubArticle2.id,
      author_id: stubArticle2.author_id,
      title: stubArticle2.title,
      content: stubArticle2.content,
    });
    expect(newState).toEqual({
      articles: [stubArticle1, stubArticle2],
    });
  });

  it('should delete article', () => {
    const stubInitialState = {
      articles: [stubArticle1],
    };
    const newState = reducer(stubInitialState, {
      type: actionTypes.DELETE_ARTICLE,
      targetID: 1,
    });
    expect(newState).toEqual({
      articles: [],
    });
  });

  it('should get all articles from backend', () => {
    const stubInitialState = {
      articles: null,
    };
    const newState = reducer(stubInitialState, {
      type: actionTypes.GET_ALL_ARTICLES,
      articles: [stubArticle1, stubArticle2],
    });
    expect(newState).toEqual({
      articles: [stubArticle1, stubArticle2],
    });
  });

  it('should get an article', () => {
    const stubInitialState = {
      articles: [stubArticle1],
    };
    const newState = reducer(stubInitialState, {
      type: actionTypes.GET_ARTICLE,
      selectedArticle: stubArticle1,
    });
    expect(newState).toEqual({
      articles: [stubArticle1],
      selectedArticle: stubArticle1,
    });
  });

  it('should update an article', () => {
    const stubInitialState = {
      articles: [stubArticle1, stubArticle2],
    };
    const newState = reducer(stubInitialState, {
      type: actionTypes.UPDATE_ARTICLE,
      id: 1,
      author_id: 1,
      title: 'ADD_TEST_MODIFIED',
      content: 'ADD_TEST_MODIFIED',
    });
    expect(newState).toEqual({
      articles: [
        {
          id: 1,
          author_id: 1,
          title: 'ADD_TEST_MODIFIED',
          content: 'ADD_TEST_MODIFIED',
        },
        stubArticle2,
      ],
    });
  });
});
