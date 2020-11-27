const addToPlaylist = require('./add')
const createPlaylist = require('./create')
const removeFromPlaylist = require('./remove')
const getTracksFromPlaylist = require('./getTracks')

module.exports = {
  addToPlaylist,
  createPlaylist,
  removeFromPlaylist,
  getTracksFromPlaylist,
}
