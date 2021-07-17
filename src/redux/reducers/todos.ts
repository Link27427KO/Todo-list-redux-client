import { AnyAction } from 'redux'
import {
   CLEAR_TODOS,
   CREATE_TODO_REQUEST,
   DELETE_TODO_REQUEST,
   GET_TODOS_REQUEST,
   GET_TODOS_SUCCESS,
   UPDATE_TODO_REQUEST,
} from '../actions/types/todos'

export interface ITodo {
   id: number
   title: string
   description: string
   status: boolean
   completedDate: string
   date: string
}

interface TodosState {
   todos: ITodo[]
   isLoading: boolean
}

const initState: TodosState = {
   todos: [],
   isLoading: false,
}

function todosReducer(state = initState, action: AnyAction): TodosState {
   switch (action.type) {
      case GET_TODOS_REQUEST:
         return {
            ...state,
            todos: action.payload,
            isLoading: true,
         }
      case GET_TODOS_SUCCESS:
         return {
            ...state,
            isLoading: false,
         }
      case CREATE_TODO_REQUEST:
         return {
            ...state,
            todos: action.payload,
            isLoading: true,
         }
      case DELETE_TODO_REQUEST:
         return {
            ...state,
            todos: action.payload,
            isLoading: true,
         }
      case CLEAR_TODOS:
         return {
            ...state,
            isLoading: false,
            todos: [],
         }
      case UPDATE_TODO_REQUEST:
         return {
            ...state,
            isLoading: true,
            todos: action.payload,
         }
      default:
         return state
   }
}

export default todosReducer
