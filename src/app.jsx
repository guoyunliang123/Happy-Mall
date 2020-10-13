import React from 'react';
import ReactDOM from  'react-dom';
import { BrowserRouter as Router, Redirect, Route, Link, Switch } from 'react-router-dom';

import Layout from 'component/layout/index.jsx';
// 页面
import Home from 'page/home/index.jsx';

class App extends React.Component {
  render() {
    return (
      <Router>
        <Layout>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/product" exact component={Home} />
            <Route path="/product-category" exact component={Home} />
            <Route path="/order" exact component={Home} />
            <Route path="/user" exact component={Home} />
            {/* <Redirect from="*" to="/" /> */}
          </Switch>
        </Layout>
      </Router>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);