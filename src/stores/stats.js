import { eloToRank } from '@/lib/eloToRank'
import { getLiveMatch } from '@/lib/getLiveMatch'
import { getUserInfo } from '@/lib/getUserInfo'
import { getUserMatches } from '@/lib/getUserMatches'
import { getUserSeasonTimings } from '@/lib/getUserSeasonTimings'
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
    latestMatchNickname: '',
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
    // Новое: для предотвращения спама запросов
    _opponentLocks: {}, // Локи по UUID оппонента (true если запрос в процессе)
    _opponentCache: {}, // Кэш данных оппонента { uuid: { nickname, elo, rank, avg } }
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
    async userMatchesUpdater(nickname) {
      const userMatches = await getUserMatches(nickname)
      if (!userMatches.length) return
      let tempWins = 0
      let tempLoses = 0
      let tempEloChange = 0
      const winTimings = []
      const latestMatch = userMatches[0]
      const latestMatchTime = latestMatch.date * 1000
      const NOW = Date.now()
      const SESSION_GAP = 6 * 3600 * 1000
      if (NOW - latestMatchTime > SESSION_GAP) {
        this.wins = 0
        this.loses = 0
        this.eloChange = 0
        this.winrate = 0
        this.avg = msToHMS(0)
        this.latestMatchNickname = ''
        this.latestMatchElo = 0
        this.latestMatchRank = 0
        this.latestMatchResult = 0
        return
      }
      const sessionMatches = [latestMatch]
      let lastMatchTime = latestMatchTime
      for (let i = 1; i < userMatches.length; i++) {
        const matchTime = userMatches[i].date * 1000
        if (lastMatchTime - matchTime <= SESSION_GAP) {
          sessionMatches.push(userMatches[i])
          lastMatchTime = matchTime
        } else {
          break
        }
      }
      for (const match of sessionMatches) {
        const isPlayerWinner = match.result.uuid === this.uuid
        if (isPlayerWinner) {
          tempWins++
          if (!match.forfeited) {
            winTimings.push(match.result.time)
          }
        } else if (match.result.uuid !== null) {
          tempLoses++
        }
        if (match.changes[0].uuid === this.uuid) {
          tempEloChange += match.changes[0].change
        } else {
          tempEloChange += match.changes[1].change
        }
      }
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
    async userLiveMatchUpdater(uuid) {
      const liveMatch = await getLiveMatch(uuid)
      if (!liveMatch) {
        this.isLiveMatch = false
        this.resetOpponentData() // Сбрасываем данные оппонента при завершении матча
        return
      }

      const allUUIDs = Object.keys(liveMatch.data)
      const opponentUUID = allUUIDs.find((id) => id !== uuid)

      if (opponentUUID) {
        // Если оппонент сменился — сбрасываем данные и готовимся к загрузке
        if (this.liveMatchUUID !== opponentUUID) {
          this.resetOpponentData()
          this.liveMatchUUID = opponentUUID
        }

        // Проверяем кэш: если данные уже есть — используем их сразу
        if (this._opponentCache[opponentUUID]) {
          this.applyOpponentData(this._opponentCache[opponentUUID])
        } else if (!this._opponentLocks[opponentUUID]) {
          // Нет в кэше и не в процессе — запускаем запрос (только один раз!)
          this._opponentLocks[opponentUUID] = true
          try {
            const [opponentInfo, opponentTimings] = await Promise.all([
              getUserInfo(opponentUUID),
              getUserSeasonTimings(opponentUUID),
            ])

            const avgTime =
              opponentTimings.length > 0
                ? Math.round(opponentTimings.reduce((a, b) => a + b, 0) / opponentTimings.length)
                : 0

            const opponentData = {
              nickname: opponentInfo.nickname,
              elo: opponentInfo.elo,
              rank: opponentInfo.eloRank,
              avg: msToHMS(avgTime),
            }

            // Сохраняем в кэш
            this._opponentCache[opponentUUID] = opponentData
            this.applyOpponentData(opponentData)
            preloadImage(`https://mineskin.eu/helm/${opponentInfo.nickname}/100.png`)
          } catch (err) {
            console.error('ERROR LOADING OPPONENT DATA:', err)
            this.liveMatchNickname = 'Unknown Player'
          } finally {
            this._opponentLocks[opponentUUID] = false
          }
        }
        // Если запрос в процессе — просто ждём, данные применятся когда он завершится
      }

      // Обновляем сплиты независимо от загрузки статистики
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
      }, 10000)
      if (liveMatch) {
        this.__intervalId = setInterval(() => {
          this.userLiveMatchUpdater(uuid)
        }, 5000)
      }
    },
    // Вспомогательные методы для чистоты
    resetOpponentData() {
      this.liveMatchUUID = ''
      this.liveMatchNickname = ''
      this.liveMatchElo = 0
      this.liveMatchRank = 0
      this.liveMatchAvg = ''
      // Не чистим кэш — он может пригодиться для будущих матчей
    },
    applyOpponentData(data) {
      this.liveMatchNickname = data.nickname
      this.liveMatchElo = data.elo
      this.liveMatchRank = data.rank
      this.liveMatchAvg = data.avg
    },
  },
})
