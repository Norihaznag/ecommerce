'use client'

import { Provider } from 'react-redux'
import { store } from '../context/store/store'

export function ContextProvider({ children }) {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  )
}
