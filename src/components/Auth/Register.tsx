import {
   Button,
   Card,
   CardContent,
   TextField,
   Typography,
} from '@material-ui/core'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login, register } from '../../redux/actions/auth'

export interface RegisterData {
   name: string
   surname: string
   email: string
   password: string
}

export const Register = () => {
   const history = useHistory()
   const dispatch = useDispatch()
   const [values, setValues] = useState({
      name: '',
      surname: '',
      email: '',
      password: '',
   })

   const changeHandler = (event: any) => {
      setValues({ ...values, [event.target.name]: event.target.value })
   }
   const [click, setClick] = useState(false)

   const registerHandler = (e: any) => {
      dispatch(register(values))
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
                     <div>Register</div>
                  </div>
               </Typography>
               <div>
                  <TextField
                     style={{
                        width: '100%!important',
                        display: 'block',
                        marginTop: '20px',
                     }}
                     placeholder="Name"
                     id="standard-basic"
                     type="text"
                     name="name"
                     onChange={changeHandler}
                  />
                  <TextField
                     style={{
                        width: '100%!important',
                        display: 'block',
                        marginTop: '20px',
                     }}
                     placeholder="Surname"
                     id="standard-basic"
                     type="text"
                     name="surname"
                     onChange={changeHandler}
                  />
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
                     onChange={changeHandler}
                  />
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
                     onChange={changeHandler}
                  />
               </div>
               <Button
                  id="register-btn"
                  style={{
                     margin: '0 auto',
                     color: '#fff',
                     marginTop: '20px',
                     background: '#5969e3',
                  }}
                  onClick={registerHandler}
               >
                  Register
               </Button>

               <div style={{ marginTop: '20px', color: '#2137db' }}>
                  Already registered?
               </div>
               <Button
                  onClick={() => {
                     history.push('/login')
                  }}
                  style={{ color: '#fff', marginTop: '20px' }}
               >
                  Login
               </Button>
            </CardContent>
         </Card>
      </div>
   )
}
