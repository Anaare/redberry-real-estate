import Button from './Button';
import styles from './FilteredInfo.module.css';

export default function FilteredInfo({
	region,
	minPrice,
	maxPrice,
	minArea,
	maxArea,
	bedrooms,
}) {
	return (
		<div className={styles.container}>
			<div className={styles.info}>
				<p>{region}</p>
				<img src="./images/icons/remove.svg" alt="x" />
			</div>
			<div className={styles.info}>
				<p>{`${minArea} მ² - ${maxArea} მ²`}</p>
				<img src="./images/icons/remove.svg" alt="x" />
			</div>
			<div className={styles.info}>
				<p>{`${minPrice}₾ - ${maxPrice}₾`}</p>
				<img src="./images/icons/remove.svg" alt="x" />
			</div>
			<div className={styles.info}>
				<p>{bedrooms}</p>
				<img src="./images/icons/remove.svg" alt="x" />
			</div>
			<div>
				<Button className={styles.btn}>გასუფთავება</Button>
			</div>
		</div>
	);
}
