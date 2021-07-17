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
   return async (dispatch: any) => {
      try {
         const res = await UserService.getUser()
         console.log(res)
         if (!res) {
            throw new Error(res.message)
         }
         dispatch(getUserRequest(res))
         dispatch(getUserSuccess())
      } catch (e) {
         console.log(e)
         dispatch(userError(e))
      }
   }
}
