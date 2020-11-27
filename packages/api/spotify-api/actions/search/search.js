const axios = require('axios').default
const { SPOTIFY_ACTIONS_API } = require('../../consts')
const { bearer } = require('../../lib/getAuthHeader')

module.exports = async (
  { activeUsers },
  id,
  item,
  type,
  offset = 0,
) => {
  const { data } = await axios({
    method: 'GET',
    url: `${SPOTIFY_ACTIONS_API}/search?q=${item}&type=${type}limit=${
      offset + 10
    }&offset=${offset}`,
    headers: bearer(id, activeUsers),
  })

  return data[`${type}s`].items
}
