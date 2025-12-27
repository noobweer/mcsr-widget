export function opponentSplitDiff(playerData, opponentData, now, prevDiff) {
  const getSplit = (data) => data.timeline?.type ?? 'overworld'
  const getTime = (data) => data.timeline?.time ?? null

  const splitOrder = [
    'overworld',
    'story.enter_the_nether',
    'nether.find_bastion',
    'nether.find_fortress',
    'projectelo.timeline.blind_travel',
    'story.follow_ender_eye',
    'story.enter_the_end',
  ]

  const splitOrderClean = [
    'overworld',
    'nether',
    'bastion',
    'fortress',
    'blind',
    'stronghold',
    'end',
  ]

  const playerSplit = getSplit(playerData)
  const opponentSplit = getSplit(opponentData)

  const playerTime = getTime(playerData)
  const opponentTime = getTime(opponentData)

  const playerIndex = splitOrder.indexOf(playerSplit)
  const opponentIndex = splitOrder.indexOf(opponentSplit)

  let diffSeconds = prevDiff
  let newPrevDiff = prevDiff

  const cleanPlayerSplit = splitOrderClean[playerIndex] ?? 'overworld'
  const cleanOpponentSplit = splitOrderClean[opponentIndex] ?? 'overworld'

  // ============================================================================
  // CASE 0: оба в overworld
  // ============================================================================
  if (playerIndex === 0 && opponentIndex === 0) {
    diffSeconds = 0
    newPrevDiff = 0
  }

  // ============================================================================
  // CASE 1: оба на одном сплите → нормальное сравнение по времени
  // ============================================================================
  else if (playerIndex === opponentIndex && playerTime !== null && opponentTime !== null) {
    let rawDiff = Math.round((opponentTime - playerTime) / 1000)

    // удерживаем знак
    if (prevDiff !== 0 && Math.sign(rawDiff) !== Math.sign(prevDiff)) {
      rawDiff = Math.abs(rawDiff) * Math.sign(prevDiff)
    }

    diffSeconds = rawDiff
    newPrevDiff = rawDiff
  }

  // ============================================================================
  // CASE 2: разные сплиты → считаем diff как таймер,
  //         который растёт каждую секунду
  // ============================================================================
  else {
    // Оппонент впереди → diff должен расти в плюс
    if (opponentIndex > playerIndex) {
      diffSeconds = prevDiff + 5
    }
    // Игрок впереди → diff уменьшается
    else if (playerIndex > opponentIndex) {
      diffSeconds = prevDiff - 5
    }

    newPrevDiff = diffSeconds
  }

  return {
    playerSplit: cleanPlayerSplit,
    opponentSplit: cleanOpponentSplit,
    diffSeconds,
    newPrevDiff,
  }
}
