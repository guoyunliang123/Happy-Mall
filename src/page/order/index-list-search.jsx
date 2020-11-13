import React from 'react';

class ListSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderNumber: '',
    }
  };
  onValueChange(e) {
    let name = e.target.name;
    let value = e.target.value.trim();
    this.setState({
      [name]: value
    });
  };
  // 查询
  onSearch() {
    this.props.onSearch(this.state.orderNumber)
  };
  onSearchKeyWordKeyUp(e) {
    if(e.keyCode === 13) {
      this.onSearch();
    };
  };
  render() {
    return (
      <div className="row search-wrap">
        <div className="col-md-12">
          <div className="form-inline">
            <div className="form-group">
              <select
                className="form-control"
              >
                <option value="">按订单号查询</option>
              </select>
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="请输入订单号"
                name="orderNumber"
                onKeyUp={(e) => {this.onSearchKeyWordKeyUp(e)}}
                onChange={(e) => {this.onValueChange(e)}}
              />
            </div>
            <button onClick={(e) => {this.onSearch(e)}} className="btn btn-primary">查询</button>
          </div>
        </div>
      </div>
    )
  }
}

export default ListSearch;