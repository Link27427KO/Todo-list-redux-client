import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Login } from '../../components/Auth/Login'
import { Index } from '../../components/Index/Index'
import { Register } from '../../components/Auth/Register'

export const useRoutes = (isAuthenticated: Boolean) => {
   if (isAuthenticated) {
      return (
         <>
            <Switch>
               <Route path="/" exact>
                  <Index />
               </Route>
               <Redirect to="/" />
            </Switch>
         </>
      )
   }
   return (
      <>
         <Switch>
            <Route path="/login" exact>
               <Login />
            </Route>
            <Route path="/register" exact>
               <Register />
            </Route>
            <Redirect to="/login" />
         </Switch>
      </>
   )
}
