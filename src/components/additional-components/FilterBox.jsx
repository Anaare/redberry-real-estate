import PropertyCard from './PropertyCard';
import styles from './FilterBox.module.css';

function FilterBox({ property, properties }) {
	const sameLocation = properties.filter(
		prop =>
			prop.address === property.address &&
			prop.id !== property.id &&
			prop.city.name === property.city.name
	);

	return (
		<div className={styles.scrollContainer}>
			<button
				className={`${styles.scrollButton} ${styles.scrollPrev}`}
				aria-label="Previous Slide"
			>
				‹
			</button>
			<div className={styles.scrollWrapper}>
				{sameLocation.length > 0
					? sameLocation.map(prop => (
							<PropertyCard key={prop.id} property={prop} />
					  ))
					: ''}
			</div>
			<button
				className={`${styles.scrollButton} ${styles.scrollNext}`}
				aria-label="Next Slide"
			>
				›
			</button>
		</div>
	);
}

export default FilterBox;
