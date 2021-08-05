import { AppDispatch } from '../store'
import { GET_MESSAGES_SUCCESS } from './types/chat'
import ChatService from '../../services/chat.service'
import { Message } from '../reducers/chat'
import { Dispatch } from 'redux'
import TodoService from '../../services/todo.service'
import { addTodoLink, addTodoLinkSuccess } from './todo'

export const getMessagesSuccess = (messages: Message[]) => {
   return {
      type: GET_MESSAGES_SUCCESS,
      payload: messages,
   }
}

export const getMessages = (from: string) => {
   return async (dispatch: Dispatch) => {
      try {
         const res = await ChatService.getMessages(from)
         console.log(res)
         if (res.error) {
            throw new Error(res.error)
         }
         dispatch(getMessagesSuccess(res))
      } catch (e) {}
   }
}
