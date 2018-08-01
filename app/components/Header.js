import React, { PropTypes, Component } from 'react';
import style from './Header.css';

const TABS = ['Watchlist', 'Portfolio', 'Alarms', 'Settings'];

export default class Header extends Component {

  static propTypes = {
    changeTab: PropTypes.func.isRequired
  };

  constructor(props, context) {
    super(props, context);
    if (props.changeTab) {
      this.clickHanders = TABS.map(tab => () => props.changeTab(tab));
    }
  }

  renderItem(key) {
    return (
      <li key={key} onClick={this.props.changeTab}>{key}</li>
    );
  }

  render() {
    return (
      <header className={style.header}>
        <ul className={style.tabs}>
          {TABS.map((item, i) =>
            <li key={item} onClick={this.clickHanders[i]}>
              {item}
            </li>
          )}
        </ul>
      </header>
    );
  }
}
