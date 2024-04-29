import { Link } from 'react-router-dom';
import Button from '../Button';

function HomePageActionButtons() {
	return (
		<div className="flex-1text-lg flex flex-col justify-center gap-4 sm:flex-row sm:gap-8">
			<Link to="/signup">
				<Button size="large">Get started, it&apos;s free</Button>
			</Link>

			<Link to="/home">
				<Button
					variant="primary-outline"
					size="large"
				>
					
					Visit our docs
				</Button>
			</Link>
		</div>
	);
}
export default HomePageActionButtons;
