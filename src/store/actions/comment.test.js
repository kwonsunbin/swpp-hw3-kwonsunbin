import axios from 'axios';
import * as actionCreators from './comment';
import { store } from '../store';

const stubComment1 = {
  id: 1,
  author_id: 1,
  article_id: 1,
  content: 'TEST1',
};

const stubComment2 = {
  id: 2,
  author_id: 2,
  article_id: 1,
  content: 'TEST2',
};

const stubComment3 = {
  id: 3,
  author_id: 3,
  article_id: 1,
  content: 'TEST3',
};

const stubComment3Modified = {
  id: 3,
  author_id: 3,
  article_id: 1,
  content: 'TEST3_MODIFIED',
};

const stubInitialComments = [stubComment1, stubComment2];

describe('comment ActionCreators', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it(`'getComments' should fetch comments correctly`, (done) => {
    const spy = jest.spyOn(axios, 'get').mockImplementation((url) => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: stubInitialComments,
        };
        resolve(result);
      });
    });

    store.dispatch(actionCreators.getComments()).then(() => {
      const newState = store.getState();
      expect(newState.comment.comments).toBe(stubInitialComments);
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it(`'postComment' should post comment correctly`, (done) => {
    const spy = jest.spyOn(axios, 'post').mockImplementation((url) => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: stubComment3,
        };
        resolve(result);
      });
    });

    store.dispatch(actionCreators.postComment({ id: 3 })).then(() => {
      const newState = store.getState();
      expect(newState.comment.comments).toEqual([
        ...stubInitialComments,
        stubComment3,
      ]);
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it(`'putComment' should put comment correctly`, (done) => {
    const spy = jest.spyOn(axios, 'put').mockImplementation((url) => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
        };
        resolve(result);
      });
    });

    store.dispatch(actionCreators.putComment(stubComment3Modified)).then(() => {
      const newState = store.getState();
      expect(newState.comment.comments).toEqual([
        ...stubInitialComments,
        stubComment3Modified,
      ]);
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it(`'deleteComment' should delete comment correctly`, (done) => {
    const spy = jest.spyOn(axios, 'delete').mockImplementation((url) => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
        };
        resolve(result);
      });
    });

    store.dispatch(actionCreators.deleteComment(3)).then(() => {
      const newState = store.getState();
      expect(newState.comment.comments).toEqual([...stubInitialComments]);
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });
});
