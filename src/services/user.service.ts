import axios from 'axios'
import { TokenService } from './token.service'

class UserService {
   private static apiUrl = 'http://localhost:5000/user'

   public static getUser() {
      return axios
         .get(this.apiUrl, {
            headers: {
               token: TokenService.get(),
            },
         })
         .then((res) => {
            return res.data
         })
         .catch((err) => {})
   }
}

export default UserService
