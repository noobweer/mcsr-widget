export const eloChangeFormatter = (eloChange) => {
  if (eloChange > 0) {
    return '+'
  } else if (eloChange < 0) {
    return '-'
  }
  return '+'
}
