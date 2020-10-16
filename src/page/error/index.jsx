import React from 'react';
import { Link } from 'react-router-dom';

import PageTitle from 'component/page-title/index.jsx'

class Error extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div id="page-wrapper">
        <PageTitle title="出错了！" />
        <div className="row">
          <div className="col-md-12">
            找不到该路径：
            <Link to="/">点击返回首页</Link>
          </div>
        </div>
      </div>
    )
  }
}

export default Error;