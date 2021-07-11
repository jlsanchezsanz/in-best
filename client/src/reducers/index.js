import { combineReducers } from 'redux';

import company from './company';
import filters from './filters';

export default combineReducers({ company, filters });
