import { AnyAction } from 'redux'
import { GET_MESSAGES_SUCCESS } from '../actions/types/chat'

interface ChatsState {
   messages: Message[]
}

export interface Message {
   from: string
   text: string
   date: Date
   to?: string
}

const initState: ChatsState = {
   messages: [],
}

function chatReducer(state = initState, action: AnyAction): ChatsState {
   switch (action.type) {
      case GET_MESSAGES_SUCCESS:
         return {
            ...state,
            messages: action.payload,
         }
      default:
         return state
   }
}

export default chatReducer
