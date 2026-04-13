'use client'

import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
	type ReactNode,
} from 'react'
import { LOCALE_STORAGE_KEY, messages, type Locale } from './messages'

type LocaleContextValue = {
	locale: Locale
	setLocale: (locale: Locale) => void
	t: (key: string, vars?: Record<string, string | number>) => string
}

const LocaleContext = createContext<LocaleContextValue | null>(null)

function readStoredLocale(): Locale | null {
	if (typeof window === 'undefined') return null
	try {
		const raw = window.localStorage.getItem(LOCALE_STORAGE_KEY)
		if (raw === 'en' || raw === 'pt') return raw
	} catch {
		// ignore
	}
	return null
}

export function LocaleProvider({ children }: { children: ReactNode }) {
	const [locale, setLocaleState] = useState<Locale>('pt')
	const [hydrated, setHydrated] = useState(false)

	useEffect(() => {
		const stored = readStoredLocale()
		if (stored) setLocaleState(stored)
		setHydrated(true)
	}, [])

	useEffect(() => {
		if (!hydrated) return
		try {
			window.localStorage.setItem(LOCALE_STORAGE_KEY, locale)
		} catch {
			// ignore
		}
		document.documentElement.lang = locale === 'en' ? 'en' : 'pt-BR'
	}, [locale, hydrated])

	const setLocale = useCallback((next: Locale) => {
		setLocaleState(next)
	}, [])

	const t = useCallback(
		(key: string, vars?: Record<string, string | number>) => {
			const table = messages[locale]
			let out = table[key] ?? messages.pt[key] ?? key
			if (vars) {
				for (const [k, v] of Object.entries(vars)) {
					out = out.replaceAll(`{${k}}`, String(v))
				}
			}
			return out
		},
		[locale],
	)

	const value = useMemo(
		() => ({
			locale,
			setLocale,
			t,
		}),
		[locale, setLocale, t],
	)

	return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}

export function useLocale(): LocaleContextValue {
	const ctx = useContext(LocaleContext)
	if (!ctx) {
		throw new Error('useLocale must be used within LocaleProvider')
	}
	return ctx
}
