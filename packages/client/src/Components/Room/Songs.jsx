/* eslint-disable implicit-arrow-linebreak */
import React from 'react'
import {
  List,
  ListItem,
  makeStyles,
} from '@material-ui/core'

import { connect } from 'react-redux'

const useStyles = makeStyles(({ spacing, palette }) => ({
  namesContainer: {
    display: 'flex',
    flexDirection: 'column',

  },
  title: {
    alignItems: 'center',
    justifyItems: 'center',
    display: 'inline-grid',
    margin: spacing(),
    fontSize: 15,
    fontWeight: 'bold',
  },
  list: {
    width: '100%',
  },
  container: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
  },
  listItem: {
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
  },
  listIndex: {
    marginRight: spacing(2),
    display: 'inline-grid',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyItems: 'center',
    background: palette.grey[400],
    color: '#fff',
    borderRadius: '50%',
    fontSize: 14,
  },
  listText: {
    flex: '1 1 auto',
    fontWeight: 'bold',
    marginTop: spacing(),
    marginBottom: spacing(),
  },
  coinText: {
    fontWeight: 'bold',
    fontSize: 17,
    margin: spacing(),
    marginLeft: 0,
    '&[aria-selected="true"]': {
      color: palette.primary.main,
    },
  },
  profitPerStep: {
    alignSelf: 'start',
    marginLeft: spacing(8),
    marginBottom: spacing(),
  },
  routeLength: {
    alignSelf: 'start',
    marginLeft: spacing(8),
    color: palette.grey[600],
  },
  line: {
    width: 50,
    height: 50,
    borderRadius: '50%',
  },
  artist: {
    marginBottom: spacing(),
    color: 'rgb(200, 200, 200)',
  },
}), { name: 'Actions' })

function Songs(props) {
  const classes = useStyles()
  const {
    songs,
    onClick,
  } = props

  return (
    <>
      <List aria-label="actions list" className={classes.list}>
        {songs.map(({
          uri, name, artist, image, playing, album,
        }) =>
          (
            <ListItem
              key={uri}
              button
              onClick={() => onClick({
                uri, name, artist, image,
              })}
              className={classes.listItem}
            >
              <div className={classes.container}>
                <div
                  className={classes.listIndex}
                >
                  <div
                    className={classes.line}
                    role="button"
                    tabIndex={0}
                    style={{
                      backgroundImage: `url(${image})`,
                      backgroundPosition: 'center',
                      backgroundSize: 'cover',
                      backgroundRepeat: 'no-repeat',
                    }}
                    alt="grid-button"
                  />
                </div>
                <div className={classes.namesContainer}>
                  <div
                    className={classes.coinText}
                    aria-selected={playing}
                  >
                    {name}
                  </div>
                  <div className={classes.artist}>
                    {`${artist} - ${album}`}
                  </div>
                </div>
              </div>
            </ListItem>
          ))}
      </List>
    </>
  )
}

export default connect()(Songs)
