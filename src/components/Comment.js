import React, { Component, Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import { withRouter } from 'react-router';
import './component.css';
class Comment extends Component {
  render() {
    return (
      <Grid container className="commentbox" spacing={1}>
        <Grid item xs={3}>
          {this.props.author_name}
        </Grid>
        <Grid item xs={9}>
          {this.props.content}
        </Grid>
        {this.props.author_id === this.props.current_user_id ? (
          <Fragment>
            <Grid item xs={8}></Grid>
            <Grid item xs={2}>
              <button
                id="edit-comment-button"
                className="full"
                onClick={() => {
                  let content = prompt(
                    'Fill in the content',
                    `${this.props.content}`
                  );
                  if (content !== null && content !== '') {
                    this.props.onPut({
                      id: parseInt(this.props.comment_id),
                      article_id: parseInt(this.props.article_id),
                      author_id: parseInt(this.props.author_id),
                      content: content,
                    });
                  }
                }}
              >
                comment edit
              </button>
            </Grid>
            <Grid item xs={2}>
              <button
                id="delete-comment-button"
                className="full"
                onClick={() => {
                  this.props.onDelete(
                    this.props.comment_id,
                    this.props.article_id
                  );
                }}
              >
                comment delete
              </button>
            </Grid>
          </Fragment>
        ) : (
          <Fragment></Fragment>
        )}
      </Grid>
    );
  }
}

export default withRouter(Comment);
