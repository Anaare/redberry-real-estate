import Header from '../Header';
import styles from './ListingPage.module.css';
function ListingPage() {
	return (
		<div>
			<Header />
			<div className={styles.container}>
				<img src="./images/icons/right.svg" className={styles.firstIcon} />
				<div className={styles.propertyContent}>
					<img src="./images/property-images/property-1.png" alt="property-1" />
					<div className={styles.description}>
						<h1>80, 458 ₾</h1>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ListingPage;
