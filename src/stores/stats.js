import { eloToRank } from '@/lib/eloToRank'
import { getLatestMatch } from '@/lib/getLatestMatch'
import { getLiveMatch } from '@/lib/getLiveMatch'
import { getUserInfo } from '@/lib/getUserInfo'
import { getUserMatches } from '@/lib/getUserMatches'
import { msToHMS } from '@/lib/msToHMS'
import { opponentSplitDiff } from '@/lib/opponentSplitDiff'
import { preloadImage } from '@/lib/preloadImage'
import { defineStore } from 'pinia'

export const useStatsStore = defineStore('stats', {
  state: () => ({
    // Player Info
    uuid: '',
    elo: 0,
    eloRank: 0,
    eloChange: 0,
    rank: '',
    rankIcon: '',
    wins: 0,
    loses: 0,
    winrate: 0,
    avg: '',

    // Latest Match and Opponent Info
    latestMatchNickname: 'Opponent',
    latestMatchElo: 0,
    latestMatchRank: 0,
    latestMatchResult: 0,

    // Live Match and Opponent Info
    isLiveMatch: false,
    liveMatchUUID: '',
    liveMatchNickname: '',
    liveMatchElo: 0,
    liveMatchRank: 0,
    liveMatchAvg: '',
    liveMatchSplit: '',
    liveMatchDiff: 0,
    liveMatchDiffTemp: 0,

    _intervalId: null,
    __intervalId: null,
  }),
  actions: {
    async userInfoUpdater(nickname) {
      const userInfo = await getUserInfo(nickname)
      if (!userInfo) return

      this.elo = userInfo.elo
      this.eloRank = userInfo.eloRank
      this.uuid = userInfo.uuid
      this.rank = eloToRank(this.elo)[0]
      this.rankIcon = eloToRank(this.elo)[1]
    },

    async userMatchesUpdater(nickname) {
      const userMatches = await getUserMatches(nickname)
      if (!userMatches || !userMatches.length) return

      // TODO: Move to env variable SESSION_GAP
      const SESSION_GAP = 6 * 3600 * 1000 // 6 hours
      const NOW = Date.now()

      const latestMatch = userMatches[0]
      const latestMatchTimeMs = latestMatch.date * 1000

      if (NOW - latestMatchTimeMs > SESSION_GAP) {
        this.wins = 0
        this.loses = 0
        this.eloChange = 0
        this.winrate = 0
        this.avg = msToHMS(0)
        return
      }

      let sessionMatches = [latestMatch]
      let previousMatchTime = latestMatchTimeMs

      for (let i = 1; i < userMatches.length; i++) {
        const match = userMatches[i]
        const matchTimeMs = match.date * 1000

        if (previousMatchTime - matchTimeMs <= SESSION_GAP) {
          sessionMatches.push(match)
          previousMatchTime = matchTimeMs
        } else {
          break
        }
      }

      let wins = 0
      let loses = 0
      let eloChange = 0
      const winTimings = []

      for (const match of sessionMatches) {
        const isWinner = match.result.uuid === this.uuid

        if (isWinner) {
          wins++
          if (!match.forfeited) winTimings.push(match.result.time)
        } else if (match.result.uuid !== null) {
          loses++
        }

        const changeObj = match.changes[0].uuid === this.uuid ? match.changes[0] : match.changes[1]

        eloChange += changeObj.change
      }

      this.wins = wins
      this.loses = loses
      this.eloChange = eloChange
      this.winrate = Math.round((wins / (wins + loses)) * 100) || 0

      const avgMs = winTimings.reduce((a, b) => a + b, 0) / (winTimings.length || 1)
      this.avg = msToHMS(avgMs)
    },

    async userLatestMatchUpdater(uuid) {
      const latestMatch = await getLatestMatch(uuid)
      if (!latestMatch) return

      const latestMatchOpponent =
        latestMatch.players[0].uuid !== uuid ? latestMatch.players[0] : latestMatch.players[1]

      const latestMatchResult =
        latestMatch.changes[0].uuid === uuid
          ? latestMatch.changes[0].change
          : latestMatch.changes[1].change

      if (latestMatchOpponent.nickname === this.latestMatchNickname) {
        return
      }

      preloadImage(`https://mineskin.eu/helm/${latestMatchOpponent.nickname}/100.png`)

      this.latestMatchNickname = latestMatchOpponent.nickname
      this.latestMatchElo = latestMatchOpponent.eloRate
      this.latestMatchRank = latestMatchOpponent.eloRank
      this.latestMatchResult = latestMatchResult
    },

    async userLiveMatchUpdater(uuid) {
      const liveMatch = await getLiveMatch(uuid)
      if (!liveMatch) {
        this.isLiveMatch = false
        this.resetOpponentData()
        return
      }

      const allUUIDs = Object.keys(liveMatch.data)
      const opponentUUID = allUUIDs.find((id) => id !== uuid)

      if (opponentUUID && this.liveMatchUUID !== opponentUUID) {
        this.liveMatchUUID = opponentUUID

        const opponentInfo = await getUserInfo(opponentUUID)
        const avgTime = Math.round(
          opponentInfo.seasonStatistics.completionTime.ranked /
            opponentInfo.seasonStatistics.completions.ranked,
        )

        const opponentData = {
          nickname: opponentInfo.nickname,
          elo: opponentInfo.elo,
          rank: opponentInfo.eloRank,
          avg: msToHMS(avgTime),
        }

        this.applyOpponentData(opponentData)
        preloadImage(`https://mineskin.eu/helm/${opponentInfo.nickname}/100.png`)
      }

      const playerData = liveMatch.data[uuid]
      const opponentDataLive = liveMatch.data[opponentUUID]
      if (playerData && opponentDataLive) {
        const splitsData = opponentSplitDiff(
          playerData,
          opponentDataLive,
          liveMatch.currentTime,
          this.liveMatchDiffTemp,
        )
        this.liveMatchSplit = splitsData.opponentSplit
        this.liveMatchDiff = splitsData.diffSeconds
        this.liveMatchDiffTemp = splitsData.newPrevDiff
      }

      this.isLiveMatch = true
    },

    startAutoUpdate(nickname, uuid, liveMatch) {
      if (this._intervalId) return
      this._intervalId = setInterval(() => {
        this.userInfoUpdater(nickname)
        this.userMatchesUpdater(nickname)
        this.userLatestMatchUpdater(uuid)
      }, 10000)
      if (liveMatch) {
        this.__intervalId = setInterval(() => {
          this.userLiveMatchUpdater(uuid)
        }, 5000)
      }
    },

    resetOpponentData() {
      this.liveMatchUUID = ''
      this.liveMatchNickname = ''
      this.liveMatchElo = 0
      this.liveMatchRank = 0
      this.liveMatchAvg = ''
    },

    applyOpponentData(data) {
      this.liveMatchNickname = data.nickname
      this.liveMatchElo = data.elo
      this.liveMatchRank = data.rank
      this.liveMatchAvg = data.avg
    },
  },
})
