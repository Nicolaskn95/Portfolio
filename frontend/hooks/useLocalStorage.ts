'use client'
import { useEffect, useState } from 'react'

export function useLocalStorage<T>(key: string, initialValue: T) {
	const [value, setValue] = useState<T>(() => {
		if (typeof window === 'undefined') {
			return initialValue
		}
		const localValue = localStorage.getItem(key)
		return localValue ? (JSON.parse(localValue) as T) : initialValue
	})

	useEffect(() => {
		if (typeof window !== 'undefined') {
			localStorage.setItem(key, JSON.stringify(value))
		}
	}, [key, value])

	return [value, setValue]
}
