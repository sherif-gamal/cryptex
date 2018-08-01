import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as WatchlistActions from '../actions/watchlist';
import style from './App.css';

@connect(
  state => ({
    watchlist: state.watchlist
  }),
  dispatch => ({
    actions: bindActionCreators(WatchlistActions, dispatch)
  })
)
export default class Settings extends Component {

  static propTypes = {
    watchlist: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
  };

  render() {
    const { watchlist, actions } = this.props;

    return (
      <div className={style.normal}>
        <span>settings</span>
      </div>
    );
  }
}
