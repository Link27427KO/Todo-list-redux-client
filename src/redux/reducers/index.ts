import { combineReducers } from 'redux'
import authReducer from './auth'
import todosReducer from './todos'
import userReducer from './user'
import notificationReducer from './notification'

const rootReducer = combineReducers({
   auth: authReducer,
   todo: todosReducer,
   user: userReducer,
   note: notificationReducer,
})

export default rootReducer
