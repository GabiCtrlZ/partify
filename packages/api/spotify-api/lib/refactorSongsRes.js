module.exports = (songs, currentlyPlayingSongId) => (
  songs.map(
    ({
      track: {
        name,
        id: songId,
        uri,
        album: { name: albumName, images, artists },
      },
    }) => ({
      name,
      songId,
      uri,
      album: albumName,
      image: images[0].url,
      artist: artists[0].name,
      playing: songId === currentlyPlayingSongId,
    }),
  ))
