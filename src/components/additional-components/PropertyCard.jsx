import styles from './PropertyCard.module.css';

function PropertyCard() {
	return (
		<div className={styles.property}>
			<img src="./images/property-images/property-1.png" />

			<div className={styles.propertyInfo}>
				<h1>80 000 ₾ </h1>
				<div className={styles.location}>
					<img src="./images/icons/location-marker.svg" alt="location icon" />
					<p className={styles.location}>თბილისი, ი.ჭავჭავაძის 53</p>
				</div>
				<div className={styles.details}>
					<div className={styles.detail}>
						<img src="./images/icons/bed.svg" alt="bed icon" />
						<span>2</span>
					</div>
					<div className={styles.detail}>
						<img src="./images/icons/area.svg" alt="area icon" />
						<span>55 მ²</span>
					</div>
					<div className={styles.detail}>
						<img src="./images/icons/zip-code.svg" alt="zip code icon" />
						<span>0160</span>
					</div>
				</div>
			</div>
		</div>
	);
}

export default PropertyCard;
