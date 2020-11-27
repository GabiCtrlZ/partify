const axios = require('axios').default
const { SPOTIFY_ACTIONS_API } = require('../../consts')
const { bearer, refactorSearchRes } = require('../../lib')

module.exports = async (
  token,
  item,
  type = 'track',
  offset = 0,
) => {
  const { data } = await axios({
    method: 'GET',
    url: `${SPOTIFY_ACTIONS_API}/search?q=${item}&type=${type}&limit=${
      offset + 10
    }&offset=${offset}`,
    headers: bearer(token),
  })

  const { items } = data[`${type}s`]

  return refactorSearchRes(items)
}
