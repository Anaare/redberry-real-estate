import { useState } from 'react';
import styles from './PropertyCard.module.css';
import Tag from './Tag';

function PropertyCard({ property }) {
	return (
		<div className={styles.property}>
			{property.is_rental === 0 ? <Tag>იყიდება</Tag> : <Tag>ქირავდება</Tag>}
			<img src={property.image} />

			<div className={styles.propertyInfo}>
				<h1> {property.price} ₾ </h1>
				<div className={styles.location}>
					<img src="./images/icons/location-marker.svg" alt="location icon" />
					<p className={styles.location}>
						{property.city.name}, {property.address}
					</p>
				</div>
				<div className={styles.details}>
					<div className={styles.detail}>
						<img src="./images/icons/bed.svg" alt="bed icon" />
						<span>{property.bedrooms}</span>
					</div>
					<div className={styles.detail}>
						<img src="./images/icons/area.svg" alt="area icon" />
						<span>{property.area} მ²</span>
					</div>
					<div className={styles.detail}>
						<img src="./images/icons/zip-code.svg" alt="zip code icon" />
						<span>{property.zip_code}</span>
					</div>
				</div>
			</div>
		</div>
	);
}

export default PropertyCard;
