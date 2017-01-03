import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import request from './request/reducer';
import collapsable from './collapsable/reducer';
import collections from './collections/reducer';
import modal from './modal/reducer';
import options from './options/reducer';
import urlVariables from './urlVariables/reducer';

export default combineReducers({
  request,
  collapsable,
  collections,
  modal,
  options,
  urlVariables,
  form,
});

