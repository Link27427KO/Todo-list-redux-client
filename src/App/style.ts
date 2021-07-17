import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
   root: (props: { color: string }) => ({
      background: props.color,
   }),
   navbar: {
      float: 'right',
   },
}))

export default useStyles
