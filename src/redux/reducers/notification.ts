import { AnyAction } from 'redux'
import {
   CLEAR_NOTIFICATION,
   SET_NOTIFICATION,
} from '../actions/types/notification'
import userReducer from './user'

interface NoteState {
   note: string
}

const initState: NoteState = {
   note: '',
}

function notificationReducer(state = initState, action: AnyAction): NoteState {
   switch (action.type) {
      case SET_NOTIFICATION:
         return {
            ...state,
            note: action.payload,
         }
      case CLEAR_NOTIFICATION:
         return {
            ...state,
            note: '',
         }

      default:
         return state
   }
}
export default notificationReducer
