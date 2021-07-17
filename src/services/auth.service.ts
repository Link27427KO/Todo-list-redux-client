import axios from 'axios'

class AuthService {
   private static apiUrl = 'http://localhost:5000/auth'

   public static login(data: any) {
      return axios
         .post(`${this.apiUrl}/login`, data, {})
         .then((res) => {
            // if (res.data.status != 200) {
            //    return {
            //       message: res.data.message,
            //       status: res.data.status,
            //    }
            // }
            const token: string = res.data.token
            localStorage.setItem('token', token)
            this.setToken(token)
            return res.data
         })
         .catch((err) => {
            console.log(err)
         })
   }

   public static setToken(token: string) {
      axios.defaults.headers.common['token'] = token
   }

   public static register(data: any) {
      return axios
         .post(`${this.apiUrl}/register`, data, {})
         .then((res) => {
            return res.data
         })
         .catch((err) => {
            console.log(err)
         })
   }
}

export default AuthService
