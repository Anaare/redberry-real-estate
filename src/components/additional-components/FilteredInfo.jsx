import Button from './Button';
import styles from './FilteredInfo.module.css';

export default function FilteredInfo({
	region,
	minPrice,
	maxPrice,
	minArea,
	maxArea,
	bedrooms,
	filters,
	onRemoveFilter,
	onClearAllFilters,
}) {
	const anyFilterActive = Object.values(filters).some(value => value);

	return (
		<div className={styles.container}>
			{filters.region && (
				<div className={styles.info}>
					<p>{region}</p>
					<img
						src="./images/icons/remove.svg"
						alt="x"
						onClick={() => onRemoveFilter('region')}
					/>
				</div>
			)}
			{filters.area && (
				<div className={styles.info}>
					<p>{`${minArea} მ² - ${maxArea} მ²`}</p>
					<img
						src="./images/icons/remove.svg"
						alt="x"
						onClick={() => onRemoveFilter('area')}
					/>
				</div>
			)}
			{filters.price && (
				<div className={styles.info}>
					<p>{`${minPrice}₾ - ${maxPrice}₾`}</p>
					<img
						src="./images/icons/remove.svg"
						alt="x"
						onClick={() => onRemoveFilter('price')}
					/>
				</div>
			)}
			{filters.bedrooms && (
				<div className={styles.info}>
					<p>{bedrooms}</p>
					<img
						src="./images/icons/remove.svg"
						alt="x"
						onClick={() => onRemoveFilter('bedrooms')}
					/>
				</div>
			)}
			{anyFilterActive && (
				<div>
					<Button className={styles.btn} onClick={onClearAllFilters}>
						გასუფთავება
					</Button>
				</div>
			)}
		</div>
	);
}
