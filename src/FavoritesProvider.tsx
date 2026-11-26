import {
  useCallback,
  useMemo,
  useReducer,
  type ReactNode,
} from 'react'
import { FavoritesContext } from './FavoritesContext'

type FavoritesState = {
  productIds: string[]
}

type FavoritesAction = {
  type: 'toggle'
  productId: string
}

function favoritesReducer(
  state: FavoritesState,
  action: FavoritesAction,
): FavoritesState {
  switch (action.type) {
    case 'toggle':
      return state.productIds.includes(action.productId)
        ? {
            productIds: state.productIds.filter(
              (productId) => productId !== action.productId,
            ),
          }
        : { productIds: [...state.productIds, action.productId] }
  }
}

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(favoritesReducer, { productIds: [] })
  const toggleFavorite = useCallback((productId: string) => {
    dispatch({ type: 'toggle', productId })
  }, [])
  const value = useMemo(
    () => ({ productIds: state.productIds, toggleFavorite }),
    [state.productIds, toggleFavorite],
  )

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  )
}
