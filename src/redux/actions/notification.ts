import { CLEAR_NOTIFICATION, SET_NOTIFICATION } from './types/notification'

export const setNotification = (note: string) => {
   return {
      type: SET_NOTIFICATION,
      payload: note,
   }
}

export const clearNotification = () => {
   return {
      type: CLEAR_NOTIFICATION,
   }
}
