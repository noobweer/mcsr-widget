import axios from 'axios'

export async function getLatestMatch(uuid) {
  const { data } = await axios.get(
    `https://api.mcsrranked.com/users/${uuid}/matches`,
    { params: { type: 2, count: 1, _t: Date.now() } },
  )

  if (data.status !== 'success') return null
  return data.data[0]
}
