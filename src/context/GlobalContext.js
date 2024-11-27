'use client'
import { createContext, useContext, useState } from 'react'

// Create a context
const GlobalContext = createContext()

/**
 * The GlobalContextProvider component wraps your app and provides context to all components.
 * This is a required component for the GlobalContext to work.
 *
 * @example
 * <GlobalContextProvider>
 *   <App />
 * </GlobalContextProvider>
 */
export function MessageCountContextProvider({ children }) {
	const [unreadCount, setUnreadCount] = useState(0)

	return (
		<GlobalContext.Provider
			value={{
				unreadCount,
				setUnreadCount,
			}}>
			{children}
		</GlobalContext.Provider>
	)
}

export function useMessageCountContext() {
	return useContext(GlobalContext)
}
