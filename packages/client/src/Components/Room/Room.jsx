import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { Container } from '@material-ui/core'

import SearchBar from '../Common/SearchBar'
import CurrelyPlaying from './CurrentlyPlaying'
import Songs from './Songs'
import Modal from './Modal'
import { searchSongs, pollSongs } from '../../store/actions/app'
import useInterval from '../../lib/useInterval'
import { POLLING_DELAY } from '../../consts'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    overflow: 'auto',
    background: theme.palette.background.default,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingBottom: theme.measurements.playingClosedDrawerHight,
  },
}), { name: 'Room' })

function Room(props) {
  const classes = useStyles(props)
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('')
  const [focused, setFocused] = useState(false)
  const [action, setAction] = useState('remove')
  const [songData, setSongData] = useState(null)
  const { songs, suggestedSongs, dispatch } = props

  useInterval(() => {
    dispatch(pollSongs())
  }, POLLING_DELAY)

  const onClick = (data) => {
    if (focused) setAction('add')
    else setAction('remove')
    setSongData(data)
    setOpen(true)
  }

  return (
    <>
      <div className={classes.root}>
        <Container className={classes.container}>
          <SearchBar
            value={value}
            onChange={({ target: { value: val } }) => {
              dispatch(searchSongs(val))
              setValue(val)
            }}
            onBlur={() => {
              setTimeout(() => {
                setFocused(false)
              }, 200)
            }}
            onFocus={() => setFocused(true)}
          />
          <Songs songs={focused ? suggestedSongs : songs} onClick={onClick} />
        </Container>
        <CurrelyPlaying />
      </div>
      {songData && (
        <Modal
          open={open}
          handleClose={() => setOpen(false)}
          action={action}
          songData={songData}
        />
      )}
    </>
  )
}

const mapStateToProps = ({
  app: {
    songs, currelyPlayingSong, suggestedSongs, room,
  },
}) => ({
  songs,
  currelyPlayingSong,
  suggestedSongs,
  room,
})

export default connect(mapStateToProps)(Room)
