import { createContext, useContext, useEffect } from 'react';
import { useLocalStorageState } from '../hooks/useLocalStorageState';

const DarkModeContext = createContext();

// since dark mode state is being used by multiple components
// like for the dark mode button in the header
// it is also used to change the logo, so we create a context and provide
// it to the complete app instead of storing the state locally

function DarkModeProvider({ children }) {
	// useLocalStorageState is our custom hook
	const [isDarkMode, setIsDarkMode] = useLocalStorageState(
		window.matchMedia('(prefers-color-scheme: dark)').matches,
		'isDarkMode'
	);

	useEffect(
		function () {
			if (isDarkMode) {
				document.documentElement.classList.add('dark-mode');
				document.documentElement.classList.remove('light-mode');
			} else {
				document.documentElement.classList.add('light-mode');
				document.documentElement.classList.remove('dark-mode');
			}
		},
		[isDarkMode]
	);

	function toggleDarkMode() {
		setIsDarkMode(isDark => !isDark);
	}

	return (
		<DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
			{children}
		</DarkModeContext.Provider>
	);
}

function useDarkMode() {
	const context = useContext(DarkModeContext);
	if (!context) throw new Error('DarkModeContext was used outside of DarkModeProvider');
	return context;
}

export { DarkModeProvider, useDarkMode };
