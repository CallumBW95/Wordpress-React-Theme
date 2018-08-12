import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import Header from './_partials/Header';
import Footer from './_partials/Footer';

import Posts from './content/Posts';
import BlogPost from './content/BlogPost';
import Page from './content/Page';
import Homepage from './content/Homepage';

class App extends Component {
  render() {
    return (
      <Router>
        <div id='page'>
          <Header />
          <div id='page-wrapper'>
            <Switch>
              <Route exact path='/' component={Homepage} />
              <Route exact path='/blog' component={Posts} />
              <Route exact path='/blog/:slug' render={props => <BlogPost {...props} />} />
              <Route exact path='/:slug' render={props => <Page {...props} />} />
            </Switch>
          </div>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;