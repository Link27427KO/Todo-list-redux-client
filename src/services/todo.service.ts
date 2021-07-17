import axios from 'axios'
import { TokenService } from './token.service'

class TodoService {
   private static apiUrl = 'http://localhost:5000/todo'

   static getTodos() {
      return axios
         .get(this.apiUrl, {
            headers: {
               token: TokenService.get(),
            },
         })
         .then((res) => {
            return res.data
         })
         .catch((err) => {
            console.log(err)
         })
   }

   static addNewTodo(data: any) {
      return axios
         .post(this.apiUrl, data, {
            headers: {
               token: TokenService.get(),
            },
         })
         .then((res) => {
            return res.data
         })
         .catch((err) => {
            console.log(err)
         })
   }

   static DeleteUserTodo(data: any) {
      return axios
         .delete(`${this.apiUrl}/${data}`, {
            headers: {
               token: TokenService.get(),
            },
         })
         .then((res) => {
            return res.data
         })
         .catch((err) => {
            console.log(err)
         })
   }

   static UpdateUserTodo(id: number, body: any) {
      return axios
         .put(`${this.apiUrl}/${id}`, body)
         .then((res) => {
            return res.data
         })
         .catch((err) => {
            console.log(err)
         })
   }

   static CompleteUserTodo(id: number) {
      return axios
         .put(`${this.apiUrl}/complete/${id}`)
         .then((res) => {
            return res.data
         })
         .catch((err) => {
            console.log(err)
         })
   }

   static UnCompleteUserTodo(id: number) {
      return axios
         .put(`${this.apiUrl}/uncomplete/${id}`)
         .then((res) => {
            return res.data
         })
         .catch((err) => {
            console.log(err)
         })
   }
}

export default TodoService
