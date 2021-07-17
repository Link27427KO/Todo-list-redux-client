import axios from 'axios'
import { RegisterData } from '../pages/Register/Register'
import { AuthData } from '../pages/Login/Login'

class AuthService {
   private static apiUrl = 'http://localhost:5000/auth'

   public static login(data: AuthData) {
      return axios
         .post(`${this.apiUrl}/login`, data, {})
         .then((res) => {
            const token: string = res.data.token
            localStorage.setItem('token', token)
            this.setToken(token)
            return res.data
         })
         .catch((err) => {})
   }

   public static setToken(token: string) {
      axios.defaults.headers.common['token'] = token
   }

   public static register(data: RegisterData) {
      return axios
         .post(`${this.apiUrl}/register`, data, {})
         .then((res) => {
            return res.data
         })
         .catch((err) => {})
   }
}

export default AuthService
