import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Login } from '../../pages/Login/Login'
import { Index } from '../../pages/Index/Index'
import { Register } from '../../pages/Register/Register'
import { DetailTodo } from '../../pages/TodoLink/DetailTodo'
import { Chat } from '../../pages/Chat/Chat'

export const useRoutes = (isAuthenticated: Boolean) => {
   if (isAuthenticated) {
      return (
         <>
            <Switch>
               <Route path="/" exact>
                  <Index />
               </Route>
               <Route path="/chat" exact>
                  <Chat />
               </Route>
               <Route path="/:id" exact>
                  <DetailTodo />
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
