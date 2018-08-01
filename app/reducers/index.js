import { combineReducers } from 'redux';
import portfolio from './portfolio';
import settings from './settings';
import watchlist from './watchlist';
import alarms from './alarms';

export default combineReducers({
  alarms, watchlist, portfolio, settings
});
