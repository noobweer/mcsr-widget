import axios from 'axios'

export async function getUserInfo(nickname) {
  const { data, status } = await axios.get(
    `https://api.mcsrranked.com/users/${encodeURIComponent(nickname)}`,
  )
  if (status === 200 && data.status === 'success') {
    return {
      uuid: data.data.uuid,
      nickname: data.data.nickname,
      elo: data.data.eloRate,
      eloRank: data.data.eloRank,
    }
  }
}
