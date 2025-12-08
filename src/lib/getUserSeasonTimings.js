import axios from 'axios'

export async function getUserSeasonTimings(uuid) {
  const userTimings = []
  try {
    const latestRes = await axios.get(
      `https://api.mcsrranked.com/users/${uuid}/matches?type=2&count=1&sort=newest`,
    )

    if (!latestRes.data.data?.length) {
      console.log('Нет матчей')
      return userTimings
    }

    const currentSeason = latestRes.data.data[0].season

    let beforeId = null
    let hasMore = true

    while (hasMore) {
      const params = `type=2&count=50&season=${currentSeason}${beforeId ? `&before=${beforeId}` : ''}`
      const url = `https://api.mcsrranked.com/users/${uuid}/matches?${params}`

      const res = await axios.get(url)

      if (!res.data.data.length) {
        break
      }

      const matches = res.data.data

      for (const match of matches) {
        if (match.season !== currentSeason) {
          hasMore = false
          break
        }

        const r = match.result
        if (match.forfeited === false && r.uuid === uuid) {
          userTimings.push(r.time)
        }
      }

      if (matches.length < 50) {
        hasMore = false
      } else {
        beforeId = matches[matches.length - 1].id
      }
    }

    return userTimings
  } catch (error) {
    console.error('ERROR:', error.response?.data || error.message)
    return userTimings
  }
}
