import { useContext } from 'react'
import { FavoritesContext } from './FavoritesContext'

export function useFavorites() {
  const context = useContext(FavoritesContext)

  if (!context) {
    throw new Error('useFavorites phải được dùng bên trong FavoritesProvider.')
  }

  return context
}
