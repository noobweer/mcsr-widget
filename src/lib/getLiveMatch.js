import axios from 'axios'

export async function getLiveMatch(uuid) {
  const { data } = await axios.get('https://api.mcsrranked.com/live')

  if (data.status !== 'success') return null

  return data.data.liveMatches.find((match) => match.players.some((p) => p.uuid === uuid)) || null
}
