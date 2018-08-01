import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Portfolio from './Portfolio';
import Settings from './Settings';
import Watchlist from './Watchlist';
import Alarms from './Alarms';
import Header from '../components/Header';
import * as WatchlistActions from '../actions/watchlist';
import style from './App.css';

@connect(
  state => ({
    alarms: state.alarms,
    watchlist: state.watchlist,
    portfolio: state.portfolio,
    settings: state.settings
  }),
  dispatch => ({
    actions: bindActionCreators(WatchlistActions, dispatch)
  })
)

export default class App extends Component {

  static propTypes = {
    portfolio: PropTypes.array.isRequired,
    settings: PropTypes.object.isRequired,
    watchlist: PropTypes.array.isRequired,
    alarms: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = { tab: 'Watchlist' };
    this.changeTab = this.changeTab.bind(this);
  }

  changeTab(tab) {
    this.setState({ tab });
  }

  render() {
    const { portfolio, settings, watchlist, alarms, actions } = this.props;
    const { tab } = this.state;

    return (
      <div className={style.normal}>
        <Header changeTab={this.changeTab} />
        {(tab === 'Settings' && <Settings settings={settings} {...actions} />) ||
        (tab === 'Portfolio' && <Portfolio portfolio={portfolio} />) ||
        (tab === 'Alarms' && <Alarms alarms={alarms} {...actions} />) ||
        <Watchlist watchlist={watchlist} {...actions} />}
      </div>
    );
  }
}
