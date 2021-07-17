import { ITodo } from '../reducers/todos'
import {
   CLEAR_USER,
   GET_USER_ERROR,
   GET_USER_REQUEST,
   GET_USER_SUCCESS,
} from './types/user'
import { IUser } from '../reducers/user'
import UserService from '../../services/user.service'
import { CLEAR_TODOS } from './types/todos'
import { Dispatch } from 'redux'

export const getUserRequest = (user: IUser) => {
   return {
      type: GET_USER_REQUEST,
      payload: user,
   }
}

export const getUserSuccess = () => {
   return {
      type: GET_USER_SUCCESS,
   }
}

export const userError = (error: Error) => {
   return {
      type: GET_USER_ERROR,
      payload: error,
   }
}

export const clearUser = () => {
   return {
      type: CLEAR_USER,
   }
}

export const getRegisteredUser = () => {
   return async (dispatch: Dispatch) => {
      try {
         const res = await UserService.getUser()
         if (res.error) {
            throw new Error(res.error)
         }
         dispatch(getUserRequest(res.data))
         dispatch(getUserSuccess())
      } catch (e) {
         dispatch(userError(e))
      }
   }
}
