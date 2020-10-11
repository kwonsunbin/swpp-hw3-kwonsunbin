import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../store/actions/index';
import Grid from '@material-ui/core/Grid';
import './containers.css';
import Comment from '../components/Comment';

class Articledetailpage extends Component {
  state = { comment: '' };

  componentDidMount() {
    this.props.onGetArticle(this.props.match.params.id);
    this.props.onGetAllComments();
  }
  render() {
    if (!this.props.logInInfo.logged_in) {
      this.props.history.push('/login');
    }
    let comments = 'loading...';
    let author = 'loading...';
    let author_id = 'loading...';
    let current_user_id = 'loading...';
    let title = 'loading...';
    let content = 'loading...';

    if (
      this.props.comments &&
      this.props.users &&
      this.props.selectedArticle &&
      this.props.logInInfo
    ) {
      comments = this.props.comments
        .filter(
          (comment) => comment.article_id === this.props.selectedArticle.id
        )
        .map((comment) => (
          <Comment
            content={comment.content}
            author_name={
              this.props.users.filter(
                (user) => user.id === comment.author_id
              )[0].name
            }
            author_id={comment.author_id}
            current_user_id={this.props.logInInfo.id}
            onDelete={this.props.onDeleteComment}
            onPut={this.props.onPutComment}
            article_id={this.props.match.params.id}
            comment_id={comment.id}
            key={comment.id}
          />
        ));
      author = this.props.users.filter(
        (user) => user.id === this.props.selectedArticle.author_id
      )[0].name;

      title = this.props.selectedArticle.title;
      content = this.props.selectedArticle.content;
      author_id = this.props.selectedArticle.author_id;
      current_user_id = this.props.logInInfo.id;
    }

    return (
      <Grid container className="articledetailpage">
        <Grid item xs={11}>
          <h1>Article {this.props.match.params.id} detail page</h1>
        </Grid>
        <Grid item xs={1} align="end">
          {this.props.logInInfo.logged_in ? (
            <button
              id="logout-button"
              onClick={() => {
                this.props.onLogOut(this.props.logInInfo);
                this.props.history.push('/login');
              }}
            >
              log-out
            </button>
          ) : null}
        </Grid>
        <Grid item xs={12}>
          &nbsp;
        </Grid>

        <Grid container item xs={12}>
          <Grid item xs={3} align="center">
            <p>author</p>
          </Grid>
          <Grid item xs={9}>
            <p id="article-author" className="full">
              {author}
            </p>
          </Grid>
          <Grid item xs={3} align="center">
            <p>title</p>
          </Grid>
          <Grid item xs={9}>
            <p id="article-title" className="full">
              {title}
            </p>
          </Grid>
          <Grid item xs={3} align="center">
            <p>content</p>
          </Grid>
          <Grid item xs={9}>
            <p id="article-content" className="full">
              {content}
            </p>
          </Grid>

          <Grid item xs={12}>
            &nbsp;
          </Grid>
          <Grid item xs={6}></Grid>
          {author_id === current_user_id ? (
            <Fragment>
              <Grid item xs={2}>
                <button
                  id="edit-article-button"
                  className="full"
                  onClick={() => {
                    this.props.history.push(
                      `/articles/${this.props.match.params.id}/edit`
                    );
                  }}
                >
                  edit article
                </button>
              </Grid>
              <Grid item xs={2}>
                <button
                  id="delete-article-button"
                  className="full"
                  onClick={() => {
                    this.props.onDeleteArticle(this.props.match.params.id);
                  }}
                >
                  delete article
                </button>
              </Grid>
              <Grid item xs={2}>
                <button
                  id="back-detail-article-button"
                  className="full"
                  onClick={() => {
                    this.props.history.push('/articles');
                  }}
                >
                  back
                </button>
              </Grid>
            </Fragment>
          ) : (
            <Fragment>
              <Grid item xs={10}></Grid>
              <Grid item xs={2}>
                <button
                  id="back-detail-article-button"
                  className="full"
                  onClick={() => {
                    this.props.history.push('/articles');
                  }}
                >
                  back
                </button>
              </Grid>
            </Fragment>
          )}

          <Grid item xs={12}>
            &nbsp;
          </Grid>
          <Grid item xs={12}>
            &nbsp;
          </Grid>
          <Grid item xs={2}></Grid>

          <Grid container item xs={8} spacing={3}>
            {comments}
            <Grid item xs={12}>
              <textarea
                id="new-comment-content-input"
                className="full"
                value={this.state.comment}
                onChange={(event) =>
                  this.setState({ comment: event.target.value })
                }
              />
            </Grid>
            <Grid item xs={10}></Grid>
            <Grid item xs={2}>
              {this.state.comment ? (
                <button
                  id="confirm-create-comment-button"
                  className="full"
                  onClick={() => {
                    this.props.onPostComment({
                      id: this.props.comments.length + 100,
                      article_id: parseInt(this.props.match.params.id),
                      author_id: this.props.logInInfo.id,
                      content: this.state.comment,
                    });
                    this.setState({ comment: '' });
                  }}
                >
                  comment confirm
                </button>
              ) : (
                <button
                  id="confirm-create-comment-button"
                  className="full"
                  disabled
                >
                  comment confirm
                </button>
              )}
            </Grid>
          </Grid>
          <Grid item xs={2}></Grid>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    logInInfo: state.login.logInInfo,
    comments: state.comment.comments,
    users: state.user.users,
    selectedArticle: state.article.selectedArticle,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogOut: (logInInfo) => dispatch(actionCreators.logOut(logInInfo)),
    onGetAllComments: () => dispatch(actionCreators.getComments()),
    onGetArticle: (id) => dispatch(actionCreators.getArticle(id)),
    onDeleteComment: (id) => dispatch(actionCreators.deleteComment(id)),
    onPostComment: (comment) => dispatch(actionCreators.postComment(comment)),
    onDeleteArticle: (id) => dispatch(actionCreators.deleteArticle(id)),
    onPutComment: (comment) => dispatch(actionCreators.putComment(comment)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Articledetailpage);
