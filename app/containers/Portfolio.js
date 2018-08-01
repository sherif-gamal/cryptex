import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as PortfolioActions from '../actions/portfolio';
import style from './Portfolio.css';

@connect(
  state => ({
    portfolio: state.portfolio
  }),
  dispatch => ({
    actions: bindActionCreators(PortfolioActions, dispatch)
  })
)
export default class Portfolio extends Component {
  static propTypes = {
    portfolio: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.addPortfolioItem = this.addPortfolioItem.bind(this);
  }

  addPortfolioItem() {
    this.props.actions.addItem({});
  }

  renderPortfolioItem(item, actions) {
    return (<div className={style.box}>
      <span className={style.title}>{item.from} =&gt; {item.to}</span>
      <div>Amount: {item.amount}</div>
      <div>Price: {item.price}</div>
      <div>Average: {item.avg}</div>
    </div>);
  }

  render() {
    const { portfolio, actions } = this.props;

    return (
      <div className={style.normal}>
        <div className="round-btn" onClick={this.addPortfolioItem}>Add</div>
        {portfolio.map(item => (
          <div key={`${item.from}/${item.to}`}>
            {this.renderPortfolioItem(item, actions)}
          </div>
        ))
        }
      </div>
    );
  }
}
