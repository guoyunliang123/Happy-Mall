import React from 'react';

import MUtil from 'util/mm.jsx'
import User from 'service/user-service.jsx'
import './index.scss'

const _mm = new MUtil();
const _user = new User();

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      redirect: _mm.getUrlParam('redirect') || '/'
    }
  };

  componentWillMount() {
    document.title = '登录 - MMALL ADMIN';
  }

  // 获取用户名，密码
  onInputChange(e) {
    let inputValue = e.target.value,
        inputName = e.target.name;
    this.setState({
      [inputName]: inputValue
    })
  }

  onInputKeyUp(e) {
    if(e.keyCode === 13) {
      this.onSubmit();
    }
  }

  // 登录事件
  onSubmit() {
    let loginInfo = {
      username: this.state.username,
      password: this.state.password
    }
    let checkResult = _user.checkLoginInfo(loginInfo);
    if(checkResult.status) {
      _user.login({
        username: loginInfo.username,
        password: loginInfo.password
      }).then((res) => {
        // localStorage.setItem("userInfo", JSON.stringify(res));
        _mm.setStorage('userInfo', res);
        this.props.history.push(this.state.redirect);
      }, (errMsg) => {
        _mm.errorTips(errMsg);
      })
    } else {
      _mm.errorTips(checkResult.msg);
    }
  }
  // onPasswordChange(e) {
  //   this.setState({
  //     password: e.target.value
  //   })
  // }
  render() {
    return (
      <div className="col-md-4 col-md-offset-4">
        <div className="panel panel-default login-panel">
          <div className="panel-heading" style={{textAlign: 'center'}}>欢迎登陆 - MMALL</div>
          <div className="panel-body">
            <div>
              <div className="form-group">
                {/* <label htmlFor="exampleInputEmail1">用户名</label> */}
                <input
                  name="username"
                  type="text"
                  className="form-control"
                  placeholder="请输入用户名"
                  onKeyUp={e => this.onInputKeyUp(e)}
                  onChange={e => this.onInputChange(e)}
                />
              </div>
              <div className="form-group">
                {/* <label htmlFor="exampleInputPassword1">密码</label> */}
                <input
                  name="password"
                  type="password"
                  className="form-control"
                  placeholder="请输入密码"
                  onKeyUp={e => this.onInputKeyUp(e)}
                  onChange={e => this.onInputChange(e)}
                />
              </div>
              <button
                className="btn btn-lg btn-block btn-primary"
                onClick={e => this.onSubmit(e)}
              >
                登陆
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Login;