import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import WelcomeScreen from '../WelcomeScreen/WelcomeScreen'
import Room from '../Room/Room'
import backgroundImg from '../../assets/background.webp'

const useStyles = makeStyles(() => ({
  container: {
    height: '100%',
    backgroundImage: `url(${backgroundImg})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  },
}), { name: 'MainScreen' })

function MainScreen(props) {
  const classes = useStyles(props)
  const { room } = props

  return (
    <div className={classes.container}>
      {!room ? <WelcomeScreen /> : <Room />}
    </div>
  )
}

const mapStateToProps = ({ app: { songs, room } }) => ({
  songs,
  room,
})

export default connect(mapStateToProps)(MainScreen)
