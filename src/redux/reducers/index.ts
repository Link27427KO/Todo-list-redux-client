import { combineReducers } from 'redux'
import authReducer from './auth'
import todosReducer from './todos'
import userReducer from './user'

const rootReducer = combineReducers({
   auth: authReducer,
   todo: todosReducer,
   user: userReducer,
})

export default rootReducer
