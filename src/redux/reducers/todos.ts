import { AnyAction } from 'redux'
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
   todo?: ITodo
   link: string
   isLoading: boolean
}

const initState: TodosState = {
   todos: [],
   link: '',
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
      case ADD_TODO_LINK:
         return {
            ...state,
            isLoading: true,
            link: action.payload,
         }
      case ADD_TODO_LINK_SUCCESS:
         return {
            ...state,
            isLoading: false,
         }
      case GET_TODO_BY_ID_REQUEST:
         return {
            ...state,
            isLoading: true,
            todo: action.payload,
         }
      case GET_TODO_BY_ID_SUCCESS:
         return {
            ...state,
            isLoading: true,
         }
      default:
         return state
   }
}

export default todosReducer
