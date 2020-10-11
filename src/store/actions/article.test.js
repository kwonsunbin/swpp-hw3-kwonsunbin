import axios from 'axios';
import * as actionCreators from './article';
import { store } from '../store';

const stubArticle1 = {
  id: 1,
  author_id: 1,
  title: 'TEST1',
  content: 'TEST1',
};

const stubArticle2 = {
  id: 2,
  author_id: 2,
  title: 'TEST2',
  content: 'TEST2',
};

const stubArticle3 = {
  id: 3,
  author_id: 3,
  title: 'TEST3',
  content: 'TEST3',
};

const stubArticle3Modified = {
  id: 3,
  author_id: 3,
  title: 'TEST3_MODIFIED',
  content: 'TEST3_MODIFIED',
};

const stubInitialArticles = [stubArticle1, stubArticle2];

describe('article ActionCreators', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it(`'getArticles' should fetch articles correctly`, (done) => {
    const spy = jest.spyOn(axios, 'get').mockImplementation((url) => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: stubInitialArticles,
        };
        resolve(result);
      });
    });

    store.dispatch(actionCreators.getArticles()).then(() => {
      const newState = store.getState();
      expect(newState.article.articles).toBe(stubInitialArticles);
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it(`'getArticle' should fetch article correctly`, (done) => {
    const spy = jest.spyOn(axios, 'get').mockImplementation((url) => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: stubArticle1,
        };
        resolve(result);
      });
    });

    store.dispatch(actionCreators.getArticle()).then(() => {
      const newState = store.getState();

      expect(newState.article.selectedArticle).toBe(stubArticle1);
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it(`'postArticle' should post article correctly`, (done) => {
    const spy = jest.spyOn(axios, 'post').mockImplementation((url) => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: stubArticle3,
        };
        resolve(result);
      });
    });

    store.dispatch(actionCreators.postArticle({ id: 1 })).then(() => {
      const newState = store.getState();
      expect(newState.article.articles).toEqual([
        ...stubInitialArticles,
        stubArticle3,
      ]);
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it(`'putArticle' should put article correctly`, (done) => {
    const spy = jest.spyOn(axios, 'put').mockImplementation((url) => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: stubArticle3Modified,
        };
        resolve(result);
      });
    });

    store.dispatch(actionCreators.putArticle({ id: 1 })).then(() => {
      const newState = store.getState();
      expect(newState.article.articles).toEqual([
        ...stubInitialArticles,
        stubArticle3Modified,
      ]);
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it(`'deleteArticle' should delete article correctly`, (done) => {
    const spy = jest.spyOn(axios, 'delete').mockImplementation((url) => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
        };
        resolve(result);
      });
    });

    store.dispatch(actionCreators.deleteArticle(3)).then(() => {
      const newState = store.getState();
      expect(newState.article.articles).toEqual([...stubInitialArticles]);
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });
});
