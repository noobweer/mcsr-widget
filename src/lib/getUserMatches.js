import axios from 'axios'

export async function getUserMatches(nickname) {
  const { data, status } = await axios.get(
    `https://api.mcsrranked.com/users/${encodeURIComponent(nickname)}/matches`,
    {
      params: {
        excludedecay: false,
        type: 2,
        count: 50,
        _t: Date.now(),
      },
    },
  )
  if (status === 200 && data.status === 'success') {
    return data.data
  }
  return null
}
