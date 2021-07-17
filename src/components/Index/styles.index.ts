import { makeStyles } from '@material-ui/core'

const useStylesIndex = makeStyles((theme) => ({
   root: {
      minWidth: 275,
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
   table: {
      minWidth: 650,
   },
   paper: {
      margin: '0 auto',
      marginTop: '100px',
      maxWidth: '500px',
      height: 'auto',
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      top: '9%',
      right: '32%',
   },
   addTodoButton: {
      marginTop: '10px',
      marginLeft: '10px',
      background: '#28A745',
      color: '#fff',
   },
   showTodoData: {
      cursor: 'pointer',
   },
   updateTodoButton: {
      margin: '0 auto',
      background: '#FFC107',
      color: '#fff',
   },
   deleteTodoButton: {
      margin: '0 auto',
      background: '#DC3545',
      color: '#fff',
   },
   unCompleteTodoButton: {
      cursor: 'pointer',
   },
   inputModalHeader: {
      textAlign: 'center',
   },
   textFieldModal: {
      width: '100%',
      marginTop: '30px',
   },
   modalBlockWithButtons: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '30px',
   },
   okButton: {
      background: '#28A745',
      color: '#fff',
      display: 'block',
   },
   closeButton: {
      background: '#DC3545',
      color: '#fff',
      display: 'block',
   },
   closeModalWithTodoData: {
      background: '#DC3545',
      color: '#fff',
      display: 'block',
      margin: '0 auto',
      marginTop: '20px',
   },
}))

export default useStylesIndex
