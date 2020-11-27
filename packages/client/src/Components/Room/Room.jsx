import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { Container } from '@material-ui/core'

import SearchBar from '../Common/SearchBar'
import Songs from './Songs'
import Modal from './Modal'

const useStyles = makeStyles(({ palette }) => ({
  root: {
    height: '100%',
    background: palette.background.default,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}), { name: 'Room' })

function Room(props) {
  const classes = useStyles(props)
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('')
  const [focused, setFocused] = useState(false)
  const [action, setAction] = useState('remove')
  const [songData, setSongData] = useState(null)
  const { songs, suggestedSongs } = props

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
            onChange={({ target: { value: val } }) => setValue(val)} // TODO send search on change
            onBlur={() => {
              setTimeout(() => {
                setFocused(false)
              }, 200)
            }}
            onFocus={() => setFocused(true)}
          />
          <Songs songs={focused ? suggestedSongs : songs} onClick={onClick} />
        </Container>
      </div>
      {songData && <Modal open={open} handleClose={() => setOpen(false)} action={action} songData={songData} />}
    </>
  )
}

const mapStateToProps = ({ app: { songs, suggestedSongs, room } }) => ({
  songs,
  suggestedSongs,
  room,
})

export default connect(mapStateToProps)(Room)
