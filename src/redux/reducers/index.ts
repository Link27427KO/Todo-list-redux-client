import { combineReducers } from 'redux'
import authReducer from './auth'
import todosReducer from './todos'
import userReducer from './user'
import notificationReducer from './notification'
import chatReducer from './chat'

const rootReducer = combineReducers({
   auth: authReducer,
   todo: todosReducer,
   user: userReducer,
   note: notificationReducer,
   messages: chatReducer,
})

export default rootReducer
