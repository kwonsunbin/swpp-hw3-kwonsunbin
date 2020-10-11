import reducer from './comment';
import * as actionTypes from '../actions/actionTypes';

const stubComment1 = {
  id: 1,
  author_id: 1,
  article_id: 1,
  content: 'TEST1',
};

const stubComment2 = {
  id: 2,
  author_id: 2,
  article_id: 2,
  content: 'TEST2',
};

describe('Comment Reducer', () => {
  it('should return default state', () => {
    const newState = reducer(undefined, {});
    expect(newState).toEqual({ comments: null });
  });

  it('should add comment', () => {
    const stubInitialState = {
      comments: [stubComment1],
    };
    const newState = reducer(stubInitialState, {
      type: actionTypes.ADD_COMMENT,
      id: stubComment2.id,
      author_id: stubComment2.author_id,
      article_id: stubComment2.article_id,
      content: stubComment2.content,
    });
    expect(newState).toEqual({
      comments: [stubComment1, stubComment2],
    });
  });

  it('should delete comment', () => {
    const stubInitialState = {
      comments: [stubComment1],
    };
    const newState = reducer(stubInitialState, {
      type: actionTypes.DELETE_COMMENT,
      targetID: 1,
    });
    expect(newState).toEqual({
      comments: [],
    });
  });

  it('should get all comments from backend', () => {
    const stubInitialState = {
      comments: null,
    };
    const newState = reducer(stubInitialState, {
      type: actionTypes.GET_ALL_COMMENTS,
      comments: [stubComment1, stubComment2],
    });
    expect(newState).toEqual({
      comments: [stubComment1, stubComment2],
    });
  });

  it('should update an comment', () => {
    const stubInitialState = {
      comments: [stubComment1, stubComment2],
    };
    const newState = reducer(stubInitialState, {
      type: actionTypes.UPDATE_COMMENT,
      id: 1,
      author_id: 1,
      article_id: 'TEST_MODIFIED',
      content: 'TEST_MODIFIED',
    });
    expect(newState).toEqual({
      comments: [
        {
          id: 1,
          author_id: 1,
          article_id: 'TEST_MODIFIED',
          content: 'TEST_MODIFIED',
        },
        stubComment2,
      ],
    });
  });
});
