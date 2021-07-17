import React, { useState } from 'react'
import {
   Button,
   Card,
   CardContent,
   TextField,
   Typography,
} from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { login } from '../../redux/actions/auth'
import { useHistory } from 'react-router-dom'

export interface AuthData {
   email: string
   password: string
}

export const Login = () => {
   const history = useHistory()
   const dispatch = useDispatch()
   const [values, setValues] = useState({
      email: '',
      password: '',
   })

   const [emailError, setEmailError] = useState('')
   const [passwordError, setPasswordError] = useState('')
   const [formValid, setFormValid] = useState(false)
   const [clickEmailInput, setClickEmailInput] = useState(false)
   const [clickPasswordInput, setClickPasswordInput] = useState(false)

   const changeHandler = (event: any) => {
      setValues({ ...values, [event.target.name]: event.target.value })
   }

   const loginHandler = () => {
      dispatch(login(values))
   }

   const countSymbols = (symbol: string, str: string) => {
      return str.split('').filter((item) => item == symbol).length
   }

   return (
      <div style={{ textAlign: 'center', color: '#fff' }}>
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
                     onChange={(e) => {
                        setValues({
                           ...values,
                           email: e.target.value,
                        })
                        if (!e.target.value) {
                           if (values.password) {
                              setFormValid(false)
                              setEmailError('Email not must be empty')
                              if (values.password.length < 6) {
                                 setPasswordError(
                                    'Minimum password length 6 characters'
                                 )
                              } else if (values.password.length >= 6) {
                                 setPasswordError('')
                              }
                           } else if (!values.password) {
                              setFormValid(false)
                              setEmailError('Email not must be empty')
                              setPasswordError('Password not must be empty')
                           }
                        } else if (e.target.value) {
                           if (values.password) {
                              if (e.target.value.includes('@')) {
                                 if (
                                    e.target.value.substring(0, 1) == '@' ||
                                    countSymbols('@', e.target.value) > 1
                                 ) {
                                    setEmailError('Enter valid Email')
                                    setFormValid(false)
                                 } else if (values.password.length < 6) {
                                    setPasswordError(
                                       'Minimum password length 6 characters'
                                    )
                                    setFormValid(false)
                                 } else if (values.password.length >= 6) {
                                    setFormValid(true)
                                    setPasswordError('')
                                    setEmailError('')
                                 }
                              } else if (!e.target.value.includes('@')) {
                                 setEmailError('Email must include @')
                              }
                           } else if (!values.password) {
                              setFormValid(false)
                              setPasswordError('Password not must be empty')
                              if (e.target.value.includes('@')) {
                                 if (
                                    e.target.value.substring(0, 1) == '@' ||
                                    countSymbols('@', e.target.value) > 1
                                 ) {
                                    setEmailError('Enter valid Email')
                                 }
                              } else if (!e.target.value.includes('@')) {
                                 setEmailError('Email must include @')
                              }
                              if (!clickPasswordInput) {
                                 setPasswordError('')
                              }
                           }
                        }
                     }}
                  />
                  {emailError && (
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
                     onChange={(e) => {
                        setValues({
                           ...values,
                           password: e.target.value,
                        })
                        if (!e.target.value) {
                           if (values.email) {
                              setFormValid(false)
                              setPasswordError('Password not must be empty')
                              if (e.target.value.includes('@')) {
                                 if (
                                    e.target.value.substring(0, 1) == '@' ||
                                    countSymbols('@', e.target.value) > 1
                                 ) {
                                    setEmailError('Enter valid Email')
                                    setFormValid(false)
                                 }
                              } else if (!e.target.value.includes('@')) {
                                 setEmailError('Email must include @')
                              }
                           } else if (!values.email) {
                              setFormValid(false)
                              setEmailError('Email not must be empty')
                              setPasswordError('Password not must be empty')
                           }
                        } else if (e.target.value) {
                           if (values.email) {
                              if (values.email.includes('@')) {
                                 if (
                                    values.email.substring(0, 1) == '@' ||
                                    countSymbols('@', values.email) > 1
                                 ) {
                                    setEmailError('Enter valid Email')
                                    setFormValid(false)
                                 } else if (e.target.value.length < 6) {
                                    setPasswordError(
                                       'Minimum password length 6 characters'
                                    )
                                    setFormValid(false)
                                 } else if (e.target.value.length >= 6) {
                                    setFormValid(true)
                                    setPasswordError('')
                                    setEmailError('')
                                 }
                              } else if (!values.email.includes('@')) {
                                 setEmailError('Email must include @')
                              }
                           } else if (!values.email) {
                              setFormValid(false)
                              setEmailError('Email not must be empty')
                              if (e.target.value.length < 6) {
                                 setPasswordError(
                                    'Minimum password length 6 characters'
                                 )
                                 setFormValid(false)
                              } else if (e.target.value.length >= 6) {
                                 setPasswordError('')
                              }
                              if (!clickEmailInput) {
                                 setEmailError('')
                              }
                           }
                        }
                     }}
                  />
                  {passwordError && (
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
