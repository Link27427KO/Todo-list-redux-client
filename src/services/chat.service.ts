import axios from 'axios'

class ChatService {
   private static apiUrl = 'http://localhost:5000/messages'

   public static getMessages(from: string) {
      return axios
         .get(`${this.apiUrl}/${from}`)
         .then((res) => {
            return res.data
         })
         .catch((err) => {})
   }
}

export default ChatService
