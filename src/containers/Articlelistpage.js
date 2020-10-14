import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../store/actions/index';
import Grid from '@material-ui/core/Grid';
import './containers.css';
import Article from '../components/Article';
import { withRouter, Redirect } from 'react-router';

class Articlelistpage extends Component {
  componentDidMount() {
    this.props.onGetArticles();
    this.props.onGetAllUsers();
  }

  render() {
    if (!this.props.logInInfo.logged_in) {
      return <Redirect to="/login" />;
    }
    let articles = <div>loading...</div>;
    if (this.props.articles && this.props.users) {
      articles = this.props.articles.map((article) => {
        return (
          <Article
            article={article}
            authorName={
              this.props.users.filter(
                (user) => user.id === article.author_id
              )[0].name
            }
            key={article.id}
          />
        );
      });
    }

    return (
      <Grid container className="articlelistpage">
        <Grid item xs={11}>
          <h1>Article list page</h1>
        </Grid>

        <Grid item xs={1} align="end">
          <button
            id="logout-button"
            onClick={() => {
              this.props.logOut(this.props.logInInfo);
              this.props.history.push('/login');
            }}
          >
            log-out
          </button>
        </Grid>

        {articles}
        <Grid>&nbsp;</Grid>
        <Grid item xs={12}>
          <button
            id="create-article-button"
            className="full"
            onClick={() => {
              this.props.history.push('/articles/create');
            }}
          >
            create
          </button>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    logInInfo: state.login.logInInfo,
    articles: state.article.articles,
    users: state.user.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logOut: (logInInfo) => dispatch(actionCreators.logOut(logInInfo)),
    onGetArticles: () => dispatch(actionCreators.getArticles()),
    onGetAllUsers: () => dispatch(actionCreators.getUsers()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Articlelistpage));
