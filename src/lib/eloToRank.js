export const eloToRank = (elo) => {
  if (elo < 400) return ['Coal 1', 'coal1']
  if (elo < 500) return ['Coal 2', 'coal2']
  if (elo < 600) return ['Coal 3', 'coal3']

  if (elo < 700) return ['Iron 1', 'iron1']
  if (elo < 800) return ['Iron 2', 'iron2']
  if (elo < 900) return ['Iron 3', 'iron3']

  if (elo < 1000) return ['Gold 1', 'gold1']
  if (elo < 1100) return ['Gold 2', 'gold2']
  if (elo < 1200) return ['Gold 3', 'gold3']

  if (elo < 1300) return ['Emerald 1', 'emerald1']
  if (elo < 1400) return ['Emerald 2', 'emerald2']
  if (elo < 1500) return ['Emerald 3', 'emerald3']

  if (elo < 1650) return ['Diamond 1', 'diamond1']
  if (elo < 1800) return ['Diamond 2', 'diamond2']
  if (elo < 2000) return ['Diamond 3', 'diamond3']

  return ['Netherite', 'netherite']
}
