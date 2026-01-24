import { Technology } from '@core/technology/Technology'
import TechnologiesWorked from './TechnologiesWorked'
import Knowledge from './Knowledge'
import MiniCV from './MiniCV'

interface ResumeProps {
	technologies: Technology[]
}

export default function Resume(props: ResumeProps) {
	return (
		<div className="flex gap-4">
			<div className="flex-1"></div>
			<MiniCV />
			<Knowledge />
			<TechnologiesWorked list={props.technologies} />
		</div>
	)
}
