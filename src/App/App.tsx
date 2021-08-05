import React, { useEffect } from 'react'
import { useRoutes } from '../containers/Routes/Routes'
import { Container } from '@material-ui/core'
import { useSelector } from 'react-redux'

import { RootState } from '../redux/store'
import Navbar from '../components/Navbar/Navbar'
import AuthService from '../services/auth.service'
import { BrowserRouter as Router } from 'react-router-dom'
import { Switch } from 'react-router-dom'

const App = () => {
   const token = useSelector((store: RootState) => store.auth.token)
   const routes = useRoutes(!!token)

   useEffect(() => {
      if (token) {
         AuthService.setToken(token)
      }
   }, [token])

   return (
      <Router>
         <Switch>
            <Container>
               {!!token && <Navbar />}
               {routes}
            </Container>
         </Switch>
      </Router>
   )
}
export default App
