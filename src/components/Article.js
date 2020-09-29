import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { withRouter } from 'react-router';
class Article extends Component {
  render() {
    return (
      <Grid container>
        <Grid item xs={1}>
          {this.props.article.id}
        </Grid>
        <Grid item xs={10}>
          <button
            onClick={() => {
              this.props.history.push(`articles/${this.props.article.id}`);
            }}
          >
            {this.props.article.title}
          </button>
        </Grid>
        <Grid item xs={1}>
          {this.props.authorName}
        </Grid>
      </Grid>
    );
  }
}

export default withRouter(Article);
