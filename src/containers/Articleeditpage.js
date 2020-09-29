import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../store/actions/index';
import Grid from '@material-ui/core/Grid';
import './containers.css';

class Articleeditpage extends Component {
  state = {
    mode: 'write',
    title: '',
    content: '',
  };

  toWriteMode = () => {
    this.setState({ mode: 'write' });
  };

  toPreviewMode = () => {
    this.setState({ mode: 'preview' });
  };

  componentDidMount() {
    // Why should I check if this is undefiend or not?
    if (this.props.selectedArticle) {
      this.setState({
        title: this.props.selectedArticle.title,
        content: this.props.selectedArticle.content,
      });
    }
  }
  render() {
    if (!this.props.logInInfo.logged_in) {
      this.props.history.push('/login');
    }

    return (
      <Grid container>
        <Grid item xs={11}>
          <h1>Article {this.props.match.params.id} edit page</h1>
        </Grid>
        <Grid item xs={1} align="end">
          {this.props.logInInfo.logged_in ? (
            <button
              id="logout-button"
              onClick={() => {
                this.props.logOut(this.props.logInInfo);
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
        <Grid container item xs={12} spacing={3}>
          <Grid item xs={6}>
            <button
              id="write-tab-button"
              className="button"
              onClick={() => {
                this.toWriteMode();
              }}
            >
              write-tab-button
            </button>
          </Grid>
          <Grid item xs={6}>
            <button
              id="preview-tab-button"
              className="button"
              onClick={() => {
                this.toPreviewMode();
              }}
            >
              preview-tab-button
            </button>
          </Grid>

          {this.state.mode === 'write' ? (
            <Fragment>
              <Grid item xs={12} align="center">
                <h1>write-mode</h1>
              </Grid>
              <Grid item xs={3} align="center">
                <p>title</p>
              </Grid>
              <Grid item xs={9}>
                <input
                  id="article-title-input"
                  value={this.state.title}
                  onChange={(event) =>
                    this.setState({ title: event.target.value })
                  }
                  className="full"
                />
              </Grid>
              <Grid item xs={3} align="center">
                <p>content</p>
              </Grid>
              <Grid item xs={9}>
                <textarea
                  id="article-content-input"
                  value={this.state.content}
                  onChange={(event) =>
                    this.setState({ content: event.target.value })
                  }
                  className="full"
                />
              </Grid>
              <Grid item xs={12}>
                &nbsp;
              </Grid>
            </Fragment>
          ) : (
            <Fragment>
              <Grid item xs={12} align="center">
                <h1>preview-mode</h1>
              </Grid>

              <Grid item xs={3} align="center">
                <p>author</p>
              </Grid>
              <Grid item xs={9}>
                <p id="article-author" className="full">
                  {this.props.logInInfo.name}
                </p>
              </Grid>
              <Grid item xs={3} align="center">
                <p>title</p>
              </Grid>
              <Grid item xs={9}>
                <p id="article-title" className="full">
                  {this.state.title}
                </p>
              </Grid>

              <Grid item xs={3} align="center">
                <p>content</p>
              </Grid>
              <Grid item xs={9}>
                <p id="article-content" className="full">
                  {this.state.content}
                </p>
              </Grid>
              <Grid item xs={12}>
                &nbsp;
              </Grid>
            </Fragment>
          )}
          <Grid item xs={8}></Grid>
          <Grid item xs={2}>
            <button
              id="back-edit-article-button"
              className="button"
              onClick={() => {
                if (
                  this.props.selectedArticle.title === this.state.title &&
                  this.props.selectedArticle.content === this.state.content
                ) {
                  this.props.history.push(
                    `/articles/${this.props.match.params.id}`
                  );
                } else {
                  let ans = window.confirm(
                    'Are you sure? The change will be lost.'
                  );
                  if (ans) {
                    this.props.history.push(
                      `/articles/${this.props.match.params.id}`
                    );
                  }
                }
              }}
            >
              back
            </button>
          </Grid>
          <Grid item xs={2}>
            {!this.state.title || !this.state.content ? (
              <button
                id="confirm-edit-article-button"
                className="button"
                disabled
              >
                confirm
              </button>
            ) : (
              <button
                id="confirm-edit-article-button"
                className="button"
                onClick={() => {
                  this.props.onPutArticle({
                    title: this.state.title,
                    content: this.state.content,
                    id: this.props.selectedArticle.id,
                    author_id: this.props.logInInfo.id,
                  });
                }}
              >
                confirm
              </button>
            )}
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    logInInfo: state.login.logInInfo,
    selectedArticle: state.article.selectedArticle,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logOut: (logInInfo) => dispatch(actionCreators.logOut(logInInfo)),
    onPutArticle: (id) => dispatch(actionCreators.putArticle(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Articleeditpage);
