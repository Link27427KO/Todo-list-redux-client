import axios from 'axios'
import { TokenService } from './token.service'
import { TodoData } from '../pages/Index/Index'

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
         .catch((err) => {})
   }

   static addNewTodo(data: TodoData) {
      return axios
         .post(this.apiUrl, data, {
            headers: {
               token: TokenService.get(),
            },
         })
         .then((res) => {
            return res.data
         })
         .catch((err) => {})
   }

   static DeleteUserTodo(id: number) {
      return axios
         .delete(`${this.apiUrl}/${id}`, {
            headers: {
               token: TokenService.get(),
            },
         })
         .then((res) => {
            return res.data
         })
         .catch((err) => {})
   }

   static UpdateUserTodo(id: number, body: TodoData) {
      return axios
         .put(`${this.apiUrl}/${id}`, body)
         .then((res) => {
            return res.data
         })
         .catch((err) => {})
   }

   static CompleteUserTodo(id: number) {
      return axios
         .put(`${this.apiUrl}/complete/${id}`)
         .then((res) => {
            return res.data
         })
         .catch((err) => {})
   }

   static UnCompleteUserTodo(id: number) {
      return axios
         .put(`${this.apiUrl}/uncomplete/${id}`)
         .then((res) => {
            return res.data
         })
         .catch((err) => {})
   }
}

export default TodoService
