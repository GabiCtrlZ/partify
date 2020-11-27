import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'

const useStyles = makeStyles(({ spacing }) => ({
  container: {
    maxWidth: '100%',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  searchRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: `${spacing(3)}px 0 ${spacing(2)}px`,
  },
}), { name: 'MainScreen' })

function MainScreen(props) {
  const classes = useStyles(props)
  const { songs } = props

  return (
    <div className={classes.container}>
      <div>
        hello
        {songs}
      </div>
    </div>
  )
}

const mapStateToProps = ({ app: { songs } }) => ({
  songs,
})

export default connect(mapStateToProps)(MainScreen)
