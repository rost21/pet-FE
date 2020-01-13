import { IRootReducer } from '../rootReducer'

export const isLoggedIn = (state: IRootReducer): boolean => state.auth.isLoggedIn