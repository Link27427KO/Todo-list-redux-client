import React, { useCallback, useEffect } from 'react'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../../redux/actions/auth'
import useStylesNavbar from './styles.navbar'
import { useHistory } from 'react-router-dom'
import { RootState } from '../../redux/store'
import { getRegisteredUser } from '../../redux/actions/user'

const options = ['Logout']

const ITEM_HEIGHT = 48

export default function Navbar() {
   const history = useHistory()
   const classes = useStylesNavbar()
   const dispatch = useDispatch()

   const getUser = useCallback(() => {
      dispatch(getRegisteredUser())
   }, [])

   useEffect(() => {
      getUser()
   }, [getUser])

   const isLoading = useSelector((state: RootState) => state.todo.isLoading)
   const user = useSelector((state: RootState) => state.user.user)

   const [anchorEl, setAnchorEl] = React.useState(null)
   const open = Boolean(anchorEl)

   const handleClick = (event: any) => {
      setAnchorEl(event.currentTarget)
   }

   const handleClose = () => {
      setAnchorEl(null)
   }

   const logoutHandler = () => {
      dispatch(logoutUser())
      setAnchorEl(null)
      history.push('/login')
   }

   return (
      <div
         className={classes.navbar}
         style={{ display: 'flex', justifyContent: 'space-between' }}
      >
         <div style={{ float: 'left', marginLeft: '20px' }}>
            {!isLoading && (
               <div style={{ marginTop: '10px' }}>
                  Hello, {user?.name} {user?.surname}
               </div>
            )}
         </div>
         <div>
            <div style={{ display: 'flex' }}>
               <div style={{ marginTop: '10px' }}>{user?.email}</div>
               <IconButton
                  aria-label="more"
                  aria-controls="long-menu"
                  aria-haspopup="true"
                  onClick={handleClick}
               >
                  <MoreVertIcon />
               </IconButton>
            </div>
            <Menu
               id="long-menu"
               anchorEl={anchorEl}
               keepMounted
               open={open}
               onClose={handleClose}
               PaperProps={{
                  style: {
                     maxHeight: ITEM_HEIGHT * 4.5,
                     width: '20ch',
                  },
               }}
            >
               {options.map((option) => (
                  <MenuItem
                     key={option}
                     selected={option === 'Logout'}
                     onClick={logoutHandler}
                  >
                     {option}
                  </MenuItem>
               ))}
            </Menu>
         </div>
      </div>
   )
}
