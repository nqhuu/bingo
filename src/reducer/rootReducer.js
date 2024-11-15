import { combineReducers } from 'redux';
import counterReducer from './counterReducer';
import adminReducer from './adminReducer';


const rootReducer = combineReducers({

    counter: counterReducer,
    admin: adminReducer,  // Add your other reducers here if needed.

});

export default rootReducer;