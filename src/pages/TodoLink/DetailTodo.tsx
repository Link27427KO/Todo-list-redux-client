import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserTodoById } from '../../redux/actions/todo'
import { RootState } from '../../redux/store'
import { Button, Card, CardContent, Typography } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
export const DetailTodo = () => {
   const history = useHistory()
   let currentLocation = window.location.pathname
   let todoId = currentLocation.slice(1, currentLocation.length)
   const dispatch = useDispatch()
   const getTodo = useCallback(() => {
      dispatch(getUserTodoById(todoId))
   }, [])
   useEffect(() => {
      getTodo()
   }, [getTodo])

   const todo = useSelector((state: RootState) => state.todo.todo)

   return (
      <>
         <Card
            style={{ maxWidth: '400px', margin: '0 auto', marginTop: '50px' }}
         >
            <CardContent>
               <Typography>
                  <strong>Task title:</strong> {todo?.title}
               </Typography>
               <Typography>
                  <strong>Description:</strong> {todo?.description}
               </Typography>
               <Typography>
                  <strong>Creating date:</strong> {todo?.date}
               </Typography>
               <Typography>
                  <strong>Status:</strong>{' '}
                  {todo?.status ? 'completed' : 'not completed'}
               </Typography>
               <Button
                  style={{
                     background: '#28A745',
                     display: 'block',
                     margin: '0 auto',
                     marginTop: '20px',
                     color: '#fff',
                  }}
                  onClick={() => {
                     history.push('/')
                  }}
               >
                  Back
               </Button>
            </CardContent>
         </Card>
      </>
   )
}
