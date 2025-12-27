import { preloadImage } from '@/lib/preloadImage'

export function preloadSplitIcons() {
  const splitOrderClean = [
    'overworld',
    'nether',
    'bastion',
    'fortress',
    'blind',
    'stronghold',
    'end',
  ]

  for (const split of splitOrderClean) {
    preloadImage(`/icons/splits/${split}.png`)
  }
}
