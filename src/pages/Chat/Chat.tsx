import React, { useEffect, useState } from 'react'
import {
   Button,
   Card,
   CardActions,
   CardContent,
   makeStyles,
   TextField,
   Typography,
} from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { getMessages } from '../../redux/actions/chat'
import { Message } from '../../redux/reducers/chat'
import socket from '../../socket'

const useStyles = makeStyles({
   root: {
      height: '85vh',
      position: 'relative',
   },
   bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
   },
   title: {
      fontSize: 14,
   },
   pos: {
      marginBottom: 12,
   },
   messageInput: {
      width: '80%',
   },
   messageButton: {
      width: '20%',
      background: '#55d4ed',
   },
   chatBlock: {
      maxWidth: '1000px',
      margin: '0 auto',
      position: 'absolute',
      bottom: 20,
      left: 0,
      right: 0,
   },
})

export const Chat = () => {
   const history = useHistory()
   const classes = useStyles()
   const bull = <span className={classes.bullet}>•</span>
   const [messageInput, setMessageInput] = useState('')

   const dispatch = useDispatch()

   const user = useSelector((state: RootState) => state.user.user)
   const messages = useSelector((state: RootState) => state.messages.messages)

   useEffect(() => {
      if (user?.email) {
         dispatch(getMessages(user.email))
      }
   }, [dispatch, user?.email])

   useEffect(() => {
      const handleMessage = (message: Message) => {
         if ((!message.to || message.to === user?.email) && user?.email) {
            dispatch(getMessages(user.email))
         }
      }

      socket.on('newMessage', handleMessage)

      return () => {
         socket.off('newMessage')
      }
   }, [user?.email, dispatch])

   const handleSubmit = () => {
      try {
         if (!user?.email || !messageInput?.trim()) {
            return
         }
         setMessageInput('')
         socket.emit('sendMessage', {
            messageInput,
            from: user.email,
            to: 'admin@gmail.com',
         })
      } catch (e) {
         console.log(e)
      }
   }

   return (
      <>
         <svg
            style={{
               marginTop: '20px',
               marginBottom: '20px',
               marginLeft: '20px',
               cursor: 'pointer',
            }}
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            fill="currentColor"
            className="bi bi-arrow-90deg-left"
            viewBox="0 0 16 16"
            onClick={() => {
               history.push('/')
            }}
         >
            <path
               fill-rule="evenodd"
               d="M1.146 4.854a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H12.5A2.5 2.5 0 0 1 15 6.5v8a.5.5 0 0 1-1 0v-8A1.5 1.5 0 0 0 12.5 5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4z"
            />
         </svg>
         <Card className={classes.root}>
            <CardContent>
               <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
               >
                  Admin
               </Typography>
               {messages?.map((message) => {
                  return (
                     <div>
                        <h1>{message.text}</h1>
                     </div>
                  )
               })}
            </CardContent>
            <CardActions className={classes.chatBlock}>
               <TextField
                  className={classes.messageInput}
                  label="message.."
                  value={messageInput}
                  onChange={(event) => setMessageInput(event.target.value)}
               />
               <Button
                  size="small"
                  className={classes.messageButton}
                  onClick={handleSubmit}
               >
                  Send
               </Button>
            </CardActions>
         </Card>
      </>
   )
}
