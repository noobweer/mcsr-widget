import axios from 'axios'

export async function getUserInfo(nickname) {
  const { data, status } = await axios.get(
    `https://api.mcsrranked.com/users/${encodeURIComponent(nickname)}`,
  )
  if (status === 200 && data.status === 'success') {
    const playerData = data.data
    return {
      uuid: playerData.uuid,
      nickname: playerData.nickname,
      elo: playerData.eloRate,
      eloRank: playerData.eloRank,
      seasonStatistics: playerData.statistics.season,
    }
  }
}
