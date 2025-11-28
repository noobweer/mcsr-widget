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
  // CASE 0: оба в overworld → diff всегда 0
  // ============================================================================
  if (playerIndex === 0 && opponentIndex === 0) {
    diffSeconds = 0
    newPrevDiff = 0
  }

  // ============================================================================
  // CASE 1: оба на одном сплите → сравнение по времени входа
  // → знак не должен изменяться, пока не сменится сам сплит
  // ============================================================================
  else if (playerIndex === opponentIndex && playerTime !== null && opponentTime !== null) {
    let rawDiff = Math.round((opponentTime - playerTime) / 1000)

    // Удержание знака:
    // если знак изменился внутри одного сплита → возвращаем старый
    if (prevDiff !== 0 && Math.sign(rawDiff) !== Math.sign(prevDiff)) {
      rawDiff = Math.abs(rawDiff) * Math.sign(prevDiff)
    }

    diffSeconds = rawDiff
    newPrevDiff = rawDiff
  }

  // ============================================================================
  // CASE 2: оппонент дальше по сплитам → он впереди
  // ============================================================================
  else if (opponentIndex > playerIndex && opponentTime !== null) {
    diffSeconds = Math.round((now - opponentTime) / 1000)
    newPrevDiff = diffSeconds
  }

  // ============================================================================
  // CASE 3: игрок дальше по сплитам → он впереди
  // ============================================================================
  else if (playerIndex > opponentIndex && playerTime !== null) {
    diffSeconds = -Math.round((now - playerTime) / 1000)
    newPrevDiff = diffSeconds
  }

  return {
    playerSplit: cleanPlayerSplit,
    opponentSplit: cleanOpponentSplit,
    diffSeconds,
    newPrevDiff,
  }
}
