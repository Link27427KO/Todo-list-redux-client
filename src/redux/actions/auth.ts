import {
   LOGIN_ERROR,
   LOGIN_REQUEST,
   LOGIN_SUCCESS,
   LOGOUT,
   REGISTER_ERROR,
   REGISTER_REQUEST,
   REGISTER_SUCCESS,
} from './types/auth'
import { AuthData } from '../../components/Auth/Login'
import AuthService from '../../services/auth.service'
import { TokenService } from '../../services/token.service'
import { RegisterData } from '../../components/Auth/Register'
import { clearTodos } from './todo'

export const loginSuccess = (token: string) => {
   TokenService.set(token)
   return {
      type: LOGIN_SUCCESS,
      payload: token,
   }
}

export const loginError = (error: Error) => {
   return {
      type: LOGIN_ERROR,
      payload: error,
   }
}

export const loginRequest = () => {
   return {
      type: LOGIN_REQUEST,
   }
}

export const loginRedirect = () => {}

export const login = (data: AuthData) => {
   return async (dispatch: any) => {
      dispatch(loginRequest())
      try {
         const res = await AuthService.login(data)
         if (!res) {
            throw new Error(res.message)
         }
         dispatch(loginSuccess(res.token))
      } catch (e) {
         console.log(e)
         dispatch(loginError(e))
      }
   }
}

export const logout = () => {
   TokenService.delete()
   return {
      type: LOGOUT,
   }
}

export const logoutUser = () => {
   return (dispatch: any) => {
      dispatch(logout())
      dispatch(clearTodos())
   }
}

export const registerError = (error: Error) => {
   return {
      type: REGISTER_ERROR,
      payload: error,
   }
}

export const registerRequest = () => {
   return {
      type: REGISTER_REQUEST,
   }
}

export const registerSuccess = () => {
   return {
      type: REGISTER_SUCCESS,
   }
}

export const register = (data: RegisterData) => {
   return async (dispatch: any) => {
      dispatch(registerRequest())
      try {
         const res = await AuthService.register(data)
         console.log(res)
         if (!res) {
            throw new Error(res.message)
         }

         dispatch(loginSuccess(res.token))
      } catch (e) {
         console.log(e)
         dispatch(registerError(e))
         dispatch(loginError(e))
      }
   }
}
