import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CircleLoading from 'react-loadingg/lib/CircleLoading'
import { connect } from 'react-redux'
import WelcomeScreen from '../WelcomeScreen/WelcomeScreen'
import Room from '../Room/Room'
import backgroundImg from '../../assets/background.webp'

import CurrelyPlaying from '../Room/CurrentlyPlaying'

const useStyles = makeStyles(
  () => ({
    container: {
      height: '100%',
      backgroundImage: `url(${backgroundImg})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
    },
  }),
  { name: 'MainScreen' }
)

function MainScreen(props) {
  const classes = useStyles(props)
  const { room, fetchCompleted } = props

  if (!fetchCompleted) return <CircleLoading />

  return (
    <div className={classes.container}>
      {!room ? (
        <WelcomeScreen />
      ) : (
        <>
          <Room />
          {/* <CurrelyPlaying /> */}
        </>
      )}
    </div>
  )
}

const mapStateToProps = ({ app: { room, fetchCompleted } }) => ({
  room,
  fetchCompleted,
})

export default connect(mapStateToProps)(MainScreen)
