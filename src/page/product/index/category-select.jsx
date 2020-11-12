import React from 'react';

import MUtil from 'util/mm.jsx';
import Product from 'service/product-service.jsx';

import './category-select.scss';

const _mm = new MUtil();
const _product = new Product();

class CategorySelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstCreatoryList: [],
      firstCreatoryId: 0,
      secondCreatoryList: [],
      secondCreatoryId: 0
    }
  }
  componentDidMount() {
    this.loadFirstCreatory();
  };
  componentWillReceiveProps(nextProps) {
    let categoryIdChange = this.props.categoryId !== nextProps.categoryId,
        parentCategoryIdChange = this.props.parentCategoryId !== nextProps.parentCategoryId;
    // 数据没有发生变化的时候不作处理
    if(!categoryIdChange && !parentCategoryIdChange) {
      return;
    }
    // 假如只有一级品类
    if(nextProps.parentCategoryId === 0) {
      this.setState({
        firstCreatoryId: nextProps.categoryId,
        secondCreatoryId: 0
      })
      // 有两级品类
    } else {
      this.setState({
        firstCreatoryId: nextProps.parentCategoryId,
        secondCreatoryId: nextProps.categoryId
      }, () => {
        parentCategoryIdChange && this.loadSecondCategory();
      })
    }
  }
  // 加载一级分类
  loadFirstCreatory() {
    _product.getCategoryList().then(res => {
      this.setState({
        firstCreatoryList: res
      })
    }, errMsg => {
      _mm.errorTips(errMsg);
    });
  };

  // 加载二级品类
  loadSecondCategory() {
    _product.getCategoryList(this.state.firstCreatoryId).then(res => {
      this.setState({
        secondCreatoryList: res
      })
    }, errMsg => {
      _mm.errorTips(errMsg);
    });
  }

  // 选择一级品类
  onFirstCreatoryChange(e) {
    if(this.props.readOnly) {
      return;
    }
    let newValue = e.target.value || 0;
    this.setState({
      firstCreatoryId: newValue,
      secondCreatoryId: 0,
      secondCreatoryList: []
    }, () => {
      // 更新二级品类
      this.loadSecondCategory();
      this.onPropsCreatoryChange();
    })
  }

  // 选择二级品类
  onSecondCreatoryChange(e) {
    if(this.props.readOnly) {
      return;
    }
    let newValue = e.target.value || 0;
    this.setState({
      secondCreatoryId: newValue,
    }, () => {
      this.onPropsCreatoryChange();
    })
  }

  // 传给父组件选中的结果
  onPropsCreatoryChange() {
    // 判断 props 里面的函数是否存在
    let categoryChangeable = typeof this.props.onCreatoryChange === 'function';
    if(this.state.secondCreatoryId) {
      // 如果只有二级品类
      categoryChangeable && this.props.onCreatoryChange(this.state.secondCreatoryId, this.state.firstCreatoryId);
    }else {
      // 如果只有一级品类
      categoryChangeable && this.props.onCreatoryChange(this.state.firstCreatoryId, 0);
    }
  }

  render() {
    return (
      <div className="col-md-10">
        <select
          readOnly={this.props.readOnly}
          value={this.state.firstCreatoryId}
          onChange={(e) => {this.onFirstCreatoryChange(e)}}
          className="form-control cate-select"
        >
          <option value="">请选择一级分类</option>
          {
            this.state.firstCreatoryList.map(
              (creatory, index) => {
                return <option value={creatory.id} key={index}>{creatory.name}</option>
              }
            )
          }
        </select>
        {
          this.state.secondCreatoryList.length ?
          (<select
            readOnly={this.props.readOnly}
            value={this.state.secondCreatoryId}
            onChange={(e) => {this.onSecondCreatoryChange(e)}}
            className="form-control cate-select"
          >
            <option value="">请选择二级分类</option>
            {
              this.state.secondCreatoryList.map(
                (creatory, index) => {
                  return <option value={creatory.id} key={index}>{creatory.name}</option>
                }
              )
            }
          </select>) : null
        }
      </div>
    )
  }
}

export default CategorySelect;