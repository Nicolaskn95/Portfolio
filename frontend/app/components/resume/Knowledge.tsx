export default function Knowledge() {
	return (
		<div className="flex flex-col p-6 items-center justify-around bg-black border border-zinc-800 rounded-2xl">
			<Item main="150" label="Países atendidos"></Item>
			<Item main="+2" label="anos de experiência"></Item>
		</div>
	)
}

function Item(props: { main: string; label: string }) {
	return (
		<div className=" flex flex-col items-center gap-1 mx-4">
			<span className="text-red-500 text-3xl font-bold leading-6">{props.main}</span>
			<span className="text-white/70 text-sm">{props.label}</span>
		</div>
	)
}
