import React, { useEffect, useState } from 'react'
import {
   Button,
   Card,
   CardContent,
   Snackbar,
   TextField,
   Typography,
} from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../redux/actions/auth'
import { useHistory } from 'react-router-dom'
import MuiAlert from '@material-ui/lab/Alert'
import useStyles from '../../pages/Login/styles.login'
import { RootState } from '../../redux/store'
import { clearNotification } from '../../redux/actions/notification'

export interface AuthData {
   email: string
   password: string
}

function Alert(props: any) {
   return <MuiAlert elevation={6} variant="filled" {...props} />
}

export const Login = () => {
   const history = useHistory()
   const dispatch = useDispatch()

   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [emailDirty, setEmailDirty] = useState(false)
   const [passwordDirty, setPasswordDirty] = useState(false)
   const [emailError, setEmailError] = useState('Email must not be empty')
   const [passwordError, setPasswordError] = useState(
      'Password must not be empty'
   )
   const [formValid, setFormValid] = useState(false)

   useEffect(() => {
      if (emailError || passwordError) {
         setFormValid(false)
      } else {
         setFormValid(true)
      }
   }, [emailError, passwordError])

   const emailChangeHandler = (e: any) => {
      setEmail(e.target.value)
      if (!e.target.value) {
         setEmailError('Email must not be empty')
      } else if (e.target.value) {
         if (!e.target.value.includes('@')) {
            setEmailError('Email must include @')
         } else if (e.target.value.includes('@')) {
            if (
               e.target.value.substring(0, 1) == '@' ||
               countSymbols('@', e.target.value) > 1
            ) {
               setEmailError('Enter valid Email')
            } else {
               setEmailError('')
            }
         }
      }
   }

   const passwordChangeHandler = (e: any) => {
      setPassword(e.target.value)

      if (!e.target.value) {
         setPasswordError('Password must not be empty')
      } else if (e.target.value) {
         if (e.target.value.length < 6) {
            setPasswordError('Minimum password length 6 characters')
         } else if (e.target.value.length >= 6) {
            setPasswordError('')
         }
      }
   }

   const blurHandler = (e: any) => {
      switch (e.target.name) {
         case 'email':
            setEmailDirty(true)
            break
         case 'password':
            setPasswordDirty(true)
            break
         default:
            break
      }
   }

   const loginHandler = () => {
      setOpen(true)
      dispatch(
         login({
            email,
            password,
         })
      )
   }

   const countSymbols = (symbol: string, str: string) => {
      return str.split('').filter((item) => item == symbol).length
   }

   const classes = useStyles()
   const [open, setOpen] = React.useState(false)

   const noteClose = (event: any, reason: any) => {
      if (reason === 'clickaway') {
         return
      }
      setOpen(false)
      dispatch(clearNotification())
   }

   const note = useSelector((state: RootState) => state.note.note)

   return (
      <div style={{ textAlign: 'center', color: '#fff' }}>
         {note && (
            <div className={classes.root}>
               <Snackbar
                  open={open}
                  autoHideDuration={3000}
                  onClose={noteClose}
               >
                  <Alert onClose={noteClose} severity="error">
                     {note}
                  </Alert>
               </Snackbar>
            </div>
         )}
         <Card
            style={{
               background:
                  'linear-gradient(160deg, rgba(2,0,36,1) 0%, rgba(9,121,110,1) 0%, rgba(0,212,255,1) 62%)',
               maxWidth: '600px',
               margin: '0 auto',
               marginTop: '50px',
            }}
         >
            <CardContent>
               <Typography variant="h5" component="h2">
                  <div
                     style={{
                        margin: '0 auto',
                        color: '#fff',
                     }}
                  >
                     <div>Login</div>
                  </div>
               </Typography>
               <div>
                  <TextField
                     style={{
                        width: '100%!important',
                        display: 'block',
                        marginTop: '20px',
                     }}
                     placeholder="Email"
                     id="standard-basic"
                     type="text"
                     name="email"
                     onChange={(e) => emailChangeHandler(e)}
                     onBlur={(e) => blurHandler(e)}
                  />
                  {emailError && emailDirty && (
                     <div style={{ color: 'red' }}>{emailError}</div>
                  )}
                  <TextField
                     style={{
                        marginTop: '20px',
                        display: 'block',
                        textDecorationColor: '#fff',
                     }}
                     placeholder="Password"
                     id="standard-basic"
                     type="password"
                     name="password"
                     onChange={(e) => passwordChangeHandler(e)}
                     onBlur={(e) => blurHandler(e)}
                  />
                  {passwordError && passwordDirty && (
                     <div style={{ color: 'red' }}>{passwordError}</div>
                  )}
               </div>
               <Button
                  style={{
                     margin: '0 auto',
                     color: '#fff',
                     marginTop: '20px',
                     background: '#5969e3',
                  }}
                  onClick={loginHandler}
                  disabled={!formValid}
               >
                  Sign In
               </Button>

               <div style={{ marginTop: '20px', color: '#2137db' }}>
                  Not registered yet?
               </div>
               <Button
                  onClick={() => {
                     history.push('/register')
                  }}
                  style={{ color: '#fff', marginTop: '20px' }}
               >
                  Register
               </Button>
            </CardContent>
         </Card>
      </div>
   )
}
