import { createContext } from 'react'

export type FavoritesContextValue = {
  productIds: string[]
  toggleFavorite: (productId: string) => void
}

export const FavoritesContext = createContext<FavoritesContextValue | null>(null)
