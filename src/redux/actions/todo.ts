import TodoService from '../../services/todo.service'
import {
   ADD_TODO_LINK,
   ADD_TODO_LINK_SUCCESS,
   CLEAR_TODOS,
   CREATE_TODO_REQUEST,
   DELETE_TODO_REQUEST,
   GET_TODO_BY_ID_REQUEST,
   GET_TODO_BY_ID_SUCCESS,
   GET_TODOS_REQUEST,
   GET_TODOS_SUCCESS,
   UPDATE_TODO_REQUEST,
} from './types/todos'
import { ITodo } from '../reducers/todos'
import { TodoData } from '../../pages/Index/Index'
import { Dispatch } from 'redux'

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

export const updateUserTodo = (
   todo: TodoData,
   todos: ITodo[],
   index: number
) => {
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

export const addTodoLink = (link: string) => {
   return {
      type: ADD_TODO_LINK,
      payload: link,
   }
}

export const addTodoLinkSuccess = (link: string) => {
   navigator.clipboard
      .writeText(link)
      .then(() => {})
      .catch((err) => {
         console.log('Something went wrong', err)
      })
   return {
      type: ADD_TODO_LINK_SUCCESS,
   }
}
export const setTodoById = (todo: ITodo) => {
   return {
      type: GET_TODO_BY_ID_REQUEST,
      payload: todo,
   }
}

export const successTodoById = () => {
   return {
      type: GET_TODO_BY_ID_SUCCESS,
   }
}

export const getTodo = () => {
   return async (dispatch: Dispatch) => {
      try {
         const res = await TodoService.getTodos()
         if (res.error) {
            throw new Error(res.error)
         }
         dispatch(getTodosRequest(res.data))
         dispatch(getTodosSuccess())
      } catch (e) {}
   }
}

export const addNewTodo = (data: TodoData, todos: ITodo[]) => {
   return async (dispatch: Dispatch) => {
      try {
         const res = await TodoService.addNewTodo(data)
         if (res.error) {
            throw new Error(res.error)
         }
         dispatch(addTodoRequest(res.data, todos))
         dispatch(getTodosSuccess())
      } catch (e) {}
   }
}

export const deleteSelectedTodo = (
   id: number,
   todos: ITodo[],
   index: number
) => {
   return async (dispatch: Dispatch) => {
      try {
         const res = await TodoService.DeleteUserTodo(id)
         if (res.error) {
            throw new Error(res.error)
         }
         dispatch(deleteUserTodo(todos, index))
         dispatch(getTodosSuccess())
      } catch (e) {}
   }
}

export const updateSelectedTodo = (
   id: number,
   todos: ITodo[],
   index: number,
   todoData: TodoData
) => {
   return async (dispatch: Dispatch) => {
      try {
         await TodoService.UpdateUserTodo(id, todoData)
         dispatch(updateUserTodo(todoData, todos, index))
         dispatch(getTodosSuccess())
      } catch (e) {}
   }
}

export const completeSelectedTodo = (
   id: number,
   todos: ITodo[],
   index: number,
   todo: ITodo
) => {
   return async (dispatch: Dispatch) => {
      try {
         await TodoService.CompleteUserTodo(id)

         dispatch(completeUserTodo(todo, todos, index))
         dispatch(getTodosSuccess())
      } catch (e) {}
   }
}

export const unCompleteSelectedTodo = (
   id: number,
   todos: ITodo[],
   index: number,
   todo: ITodo
) => {
   return async (dispatch: Dispatch) => {
      try {
         await TodoService.UnCompleteUserTodo(id)

         dispatch(unCompleteUserTodo(todo, todos, index))
         dispatch(getTodosSuccess())
      } catch (e) {}
   }
}

export const generateTodoLink = (id: number) => {
   return async (dispatch: Dispatch) => {
      try {
         const res = await TodoService.CreateTodoLink(id)
         console.log(res)
         dispatch(addTodoLink(res.data))
         dispatch(addTodoLinkSuccess(res.data))
      } catch (e) {
         console.log(e)
      }
   }
}

export const getUserTodoById = (id: string) => {
   return async (dispatch: Dispatch) => {
      try {
         const res = await TodoService.GetTodoById(id)
         dispatch(setTodoById(res.data))
         dispatch(successTodoById())
      } catch (e) {
         console.log(e)
      }
   }
}
