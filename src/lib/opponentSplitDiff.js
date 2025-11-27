export function opponentSplitDiff(playerData, opponentData, now, prevDiff = 0) {
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
  // CASE 1: Оба на одном сплите → разница фиксируется
  // ============================================================================
  if (playerIndex === opponentIndex && playerTime !== null && opponentTime !== null) {
    diffSeconds = Math.round((opponentTime - playerTime) / 1000)
    newPrevDiff = diffSeconds
  }

  // ============================================================================
  // CASE 2: ОППОНЕНТ впереди (выше по списку сплитов)
  // difference = сколько прошло времени с момента его входа
  // -> ПОЛОЖИТЕЛЬНЫЙ diff (ты отстаёшь)
  // ============================================================================
  else if (opponentIndex > playerIndex && opponentTime !== null) {
    diffSeconds = Math.round((now - opponentTime) / 1000)
  }

  // ============================================================================
  // CASE 3: ИГРОК впереди
  // difference = сколько прошло времени с момента твоего входа
  // -> ОТРИЦАТЕЛЬНЫЙ diff (ты впереди)
  // ============================================================================
  else if (playerIndex > opponentIndex && playerTime !== null) {
    diffSeconds = -Math.round((now - playerTime) / 1000)
  }

  return {
    playerSplit: cleanPlayerSplit,
    opponentSplit: cleanOpponentSplit,
    diffSeconds,
    newPrevDiff,
  }
}
