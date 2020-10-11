import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { withRouter } from 'react-router';
class Article extends Component {
  render() {
    return (
      <Grid container className="article">
        <Grid className="articleId" item xs={1}>
          {this.props.article.id}
        </Grid>
        <Grid item xs={10}>
          <button
            className="articleButton"
            onClick={() => {
              this.props.history.push(`articles/${this.props.article.id}`);
            }}
          >
            {this.props.article.title}
          </button>
        </Grid>
        <Grid className="articleAuthor" item xs={1}>
          {this.props.authorName}
        </Grid>
      </Grid>
    );
  }
}

export default withRouter(Article);
