import { Technology } from '@core/technology/Technology'
import TechnologiesWorked from './TechnologiesWorked'

interface ResumeProps {
	technologies: Technology[]
}

export default function Resume(props: ResumeProps) {
	return (
		<div>
			<TechnologiesWorked technologies={props.technologies} />
		</div>
	)
}
