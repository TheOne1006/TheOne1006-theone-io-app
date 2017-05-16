/**
 * @flow
 */
import { Map, fromJS } from 'immutable';
import { loop, combineReducers } from 'redux-loop-symbol-ponyfill';
import SettingReducer from './reducers/setting';
import NavigatorStateReducer from '../modules/navigator/NavigatorState';
import HomeStateReducer from '../modules/home/HomeState';
import CatesStateReducer from '../modules/cates/CatesState';
import ArticleStateReducer from '../modules/article/ArticleState';
import SessionStateReducer, { RESET_STATE } from '../modules/session/SessionState';

const reducers = {
  // Counter sample app state. This can be removed in a live application
  home: HomeStateReducer,
  cate: CatesStateReducer,
  article: ArticleStateReducer,
  setting: SettingReducer,

  // Navigator states
  navigatorState: NavigatorStateReducer,

  session: SessionStateReducer,

};

// initial state, accessor and mutator for supporting root-level
// immutable data with redux-loop reducer combinator
const immutableStateContainer = Map();
const getImmutable = (child, key) => (child ? child.get(key) : undefined);
const setImmutable = (child, key, value) => child.set(key, value);

const namespacedReducer = combineReducers(
  reducers,
  immutableStateContainer,
  getImmutable,
  setImmutable,
);

export default function mainReducer(state: Object, action: Object = {}) {
  const [nextState, effects] = action.type === RESET_STATE
    ? namespacedReducer(action.payload, action)
    : namespacedReducer(state || undefined, action);

  // enforce the state is immutable
  return loop(fromJS(nextState), effects);
}
