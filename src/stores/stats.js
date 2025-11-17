import { eloToRank } from '@/lib/eloToRank'
import { getUserInfo } from '@/lib/getUserInfo'
import { getUserMatches } from '@/lib/getUserMatches'
import { msToHMS } from '@/lib/msToHMS'
import { preloadImage } from '@/lib/preloadImage'
import { defineStore } from 'pinia'

export const useStatsStore = defineStore('stats', {
  state: () => ({
    uuid: '',
    elo: 0,
    eloRank: 0,
    eloChange: 0,
    rank: '',
    rankIcon: '',
    latestMatchNickname: '',
    latestMatchElo: 0,
    latestMatchRank: 0,
    latestMatchResult: 0,
    wins: 0,
    loses: 0,
    winrate: 0,
    avg: '',
    _intervalId: null,
  }),
  actions: {
    async userInfoUpdater(nickname) {
      const userInfo = await getUserInfo(nickname)

      this.elo = userInfo.elo
      this.eloRank = userInfo.eloRank
      this.uuid = userInfo.uuid

      this.rank = eloToRank(this.elo)[0]
      this.rankIcon = eloToRank(this.elo)[1]
    },

    getDayId(timestampMs) {
      return Math.floor((timestampMs - 4 * 3600 * 1000) / (24 * 3600 * 1000))
    },

    async userMatchesUpdater(nickname) {
      const userMatches = await getUserMatches(nickname)

      let tempWins = 0
      let tempLoses = 0
      let tempEloChange = 0
      const winTimings = []

      const todayId = this.getDayId(Date.now())

      for (const match of userMatches) {
        const matchDayId = this.getDayId(match.date * 1000)

        if (matchDayId === todayId) {
          const isPlayerWinner = match.result.uuid === this.uuid

          if (isPlayerWinner) {
            tempWins += 1

            if (!match.forfeited) {
              winTimings.push(match.result.time)
            }

            if (match.changes[0].uuid === this.uuid) {
              tempEloChange += match.changes[0].change
            } else {
              tempEloChange += match.changes[1].change
            }
          } else {
            if (match.result.uuid !== null) {
              tempLoses += 1
            }

            if (match.changes[0].uuid === this.uuid) {
              tempEloChange += match.changes[0].change
            } else {
              tempEloChange += match.changes[1].change
            }
          }
        }
      }

      const latestMatch = userMatches[0]
      let latestMatchNickname = ''
      let latestMatchElo = 0
      let latestMatchResult = 0
      let latestMatchRank = 0

      if (latestMatch.players[0].uuid !== this.uuid) {
        latestMatchNickname = latestMatch.players[0].nickname
        latestMatchElo = latestMatch.players[0].eloRate
        latestMatchRank = latestMatch.players[0].eloRank
      } else {
        latestMatchNickname = latestMatch.players[1].nickname
        latestMatchElo = latestMatch.players[1].eloRate
        latestMatchRank = latestMatch.players[1].eloRank
      }

      if (latestMatch.changes[0].uuid === this.uuid) {
        latestMatchResult = latestMatch.changes[0].change
      } else {
        latestMatchResult = latestMatch.changes[1].change
      }

      preloadImage(`https://mineskin.eu/helm/${latestMatchNickname}/100.png`)

      this.wins = tempWins
      this.loses = tempLoses
      this.eloChange = tempEloChange
      this.winrate = Math.round((tempWins / (tempWins + tempLoses)) * 100) || 0
      this.avg = msToHMS(winTimings.reduce((a, b) => a + b, 0) / (winTimings.length || 1))
      this.latestMatchNickname = latestMatchNickname
      this.latestMatchElo = latestMatchElo
      this.latestMatchRank = latestMatchRank
      this.latestMatchResult = latestMatchResult
    },

    startAutoUpdate(nickname) {
      if (this._intervalId) return

      this.userInfoUpdater(nickname)
      this.userMatchesUpdater(nickname)

      this._intervalId = setInterval(() => {
        this.userInfoUpdater(nickname)
        this.userMatchesUpdater(nickname)
      }, 10000)
    },
  },
})
