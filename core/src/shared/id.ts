export class Id {
	static generate(): string {
		// Simple unique ID generator (for demonstration purposes)
		const p1 = Math.random().toString(36).substring(2, 9)
		const p2 = Math.random().toString(36).substring(2, 9)
		const p3 = Date.now().toString(36)
		return `${p1}-${p2}-${p3}`
	}
}
