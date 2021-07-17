import { AnyAction } from 'redux'
import {
   CLEAR_USER,
   GET_USER_ERROR,
   GET_USER_REQUEST,
   GET_USER_SUCCESS,
} from '../actions/types/user'

export interface IUser {
   name: string
   surname: string
   email: string
}

interface UserState {
   user: IUser | null
   error?: Error
   isLoading: boolean
}

const initState: UserState = {
   isLoading: false,
   user: null,
}

function userReducer(state = initState, action: AnyAction): UserState {
   switch (action.type) {
      case GET_USER_SUCCESS:
         return {
            ...state,
            isLoading: true,
         }
      case GET_USER_REQUEST:
         return {
            ...state,
            user: action.payload,
            isLoading: false,
         }
      case GET_USER_ERROR:
         return {
            ...state,
            error: action.payload,
            isLoading: false,
         }
      case CLEAR_USER:
         return {
            ...state,
            isLoading: false,
            user: null,
         }
      default:
         return state
   }
}
export default userReducer
