import { Link } from 'react-router-dom';
import styles from './Header.module.css';

export default function Header() {
	return (
		<header className={styles.header}>
			<Link to={`/`}>
				<img
					src="/images/redberry-logo.png"
					alt="redberry logo"
					className={styles.logo}
				/>
			</Link>
		</header>
	);
}
