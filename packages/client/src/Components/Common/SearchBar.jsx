import React from 'react'
// import { get } from 'lodash'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    boxShadow: 'none',
    color: 'white',
    margin: theme.spacing(),
    background: '#6c757d',
    width: '100%',
  },
  input: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    color: 'white',
    fontWeight: 'bold',
  },
}), { name: 'SearchBar' })

export default function SearchBar(props) {
  const classes = useStyles()
  const {
    value,
    onChange,
    onFocus,
    onBlur,
  } = props

  return (
    <Paper component="form" className={classes.root}>
      <InputBase
        className={classes.input}
        value={value}
        onChange={onChange}
        placeholder="Search song"
        inputProps={{ 'aria-label': 'search' }}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      <IconButton type="submit" disabled className={classes.iconButton} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  )
}
