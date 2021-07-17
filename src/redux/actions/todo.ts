import TodoService from '../../services/todo.service'
import {
   CLEAR_TODOS,
   CREATE_TODO_REQUEST,
   DELETE_TODO_REQUEST,
   GET_TODOS_REQUEST,
   GET_TODOS_SUCCESS,
   UPDATE_TODO_REQUEST,
} from './types/todos'
import { ITodo } from '../reducers/todos'
import { TodoData } from '../../components/Index/Index'

export const getTodosRequest = (todo: ITodo) => {
   return {
      type: GET_TODOS_REQUEST,
      payload: todo,
   }
}

export const clearTodos = () => {
   return {
      type: CLEAR_TODOS,
   }
}

export const addTodoRequest = (todo: ITodo, todos: ITodo[]) => {
   todos.push(todo)
   return {
      type: CREATE_TODO_REQUEST,
      payload: todos,
   }
}

export const deleteUserTodo = (todos: ITodo[], index: number) => {
   todos.splice(index, 1)

   return {
      type: DELETE_TODO_REQUEST,
      payload: todos,
   }
}

export const updateUserTodo = (todo: ITodo, todos: ITodo[], index: number) => {
   todos[index].title = todo.title
   todos[index].description = todo.description
   return {
      type: UPDATE_TODO_REQUEST,
      payload: todos,
   }
}

export const completeUserTodo = (
   todo: ITodo,
   todos: ITodo[],
   index: number
) => {
   todos[index].status = true
   todos[index].completedDate = new Date().toLocaleString('ru', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
   })
   return {
      type: UPDATE_TODO_REQUEST,
      payload: todos,
   }
}

export const unCompleteUserTodo = (
   todo: ITodo,
   todos: ITodo[],
   index: number
) => {
   todos[index].status = false
   todos[index].completedDate = ' '
   return {
      type: UPDATE_TODO_REQUEST,
      payload: todos,
   }
}

export const getTodosSuccess = () => {
   return {
      type: GET_TODOS_SUCCESS,
   }
}

export const getTodo = () => {
   return async (dispatch: any) => {
      try {
         const res = await TodoService.getTodos()
         if (!res) {
            throw new Error(res.message)
         }
         dispatch(getTodosRequest(res))
         dispatch(getTodosSuccess())
      } catch (e) {}
   }
}

export const addNewTodo = (data: TodoData, todos: any) => {
   return async (dispatch: any) => {
      try {
         const res = await TodoService.addNewTodo(data)
         if (!res) {
            throw new Error(res.message)
         }
         dispatch(addTodoRequest(res, todos))
         dispatch(getTodosSuccess())
      } catch (e) {}
   }
}

export const deleteSelectedTodo = (id: number, todos: any, index: number) => {
   return async (dispatch: any) => {
      try {
         const res = await TodoService.DeleteUserTodo(id)
         if (!res) {
            throw new Error(res.message)
         }
         dispatch(deleteUserTodo(todos, index))
         dispatch(getTodosSuccess())
      } catch (e) {
         console.log(e)
      }
   }
}

export const updateSelectedTodo = (
   id: number,
   todos: any,
   index: number,
   todo: any
) => {
   return async (dispatch: any) => {
      try {
         const res = await TodoService.UpdateUserTodo(id, todo)
         if (!res) {
            throw new Error(res.message)
         }
         dispatch(updateUserTodo(todo, todos, index))
         dispatch(getTodosSuccess())
      } catch (e) {
         console.log(e)
      }
   }
}

export const completeSelectedTodo = (
   id: number,
   todos: any,
   index: number,
   todo: any
) => {
   return async (dispatch: any) => {
      try {
         await TodoService.CompleteUserTodo(id)

         dispatch(completeUserTodo(todo, todos, index))
         dispatch(getTodosRequest)
         dispatch(getTodosSuccess())
      } catch (e) {
         console.log(e)
      }
   }
}

export const unCompleteSelectedTodo = (
   id: number,
   todos: any,
   index: number,
   todo: any
) => {
   return async (dispatch: any) => {
      try {
         await TodoService.UnCompleteUserTodo(id)

         dispatch(unCompleteUserTodo(todo, todos, index))
         dispatch(getTodosRequest)
         dispatch(getTodosSuccess())
      } catch (e) {
         console.log(e)
      }
   }
}
