import { AnyAction } from 'redux'
import {
   LOGIN_ERROR,
   LOGIN_REQUEST,
   LOGIN_SUCCESS,
   LOGOUT,
   REGISTER_ERROR,
   REGISTER_REQUEST,
   REGISTER_SUCCESS,
} from '../actions/types/auth'

interface AuthState {
   token?: string | null
   error?: Error
   isLoading: boolean
}

const initState: AuthState = {
   isLoading: false,
   token: localStorage.getItem('token'),
}

function authReducer(state = initState, action: AnyAction): AuthState {
   switch (action.type) {
      case LOGIN_SUCCESS:
         return {
            ...state,
            token: action.payload,
            isLoading: false,
         }
      case LOGIN_REQUEST:
         return {
            ...state,
            isLoading: true,
         }
      case LOGIN_ERROR:
         return {
            ...state,
            error: action.payload,
            isLoading: false,
         }
      case REGISTER_SUCCESS:
         return {
            ...state,
            isLoading: false,
         }
      case LOGOUT:
         return {
            ...state,
            token: null,
         }
      case REGISTER_REQUEST:
         return {
            ...state,
            isLoading: true,
         }
      case REGISTER_ERROR:
         return {
            ...state,
            error: action.payload,
            isLoading: false,
         }
      default:
         return state
   }
}
export default authReducer
