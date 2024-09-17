import Button from './Button';
import styles from './FilteredInfo.module.css';
function FilteredInfo() {
	return (
		<div className={styles.container}>
			<div className={styles.info}>
				<p>თბილისი</p>
				<img src="./images/icons/remove.svg" alt="x" />
			</div>
			<div className={styles.info}>
				<p>55 მ² - 90 მ²</p>
				<img src="./images/icons/remove.svg" alt="x" />
			</div>
			<div className={styles.info}>
				<p>20000₾ - 100000₾</p>
				<img src="./images/icons/remove.svg" alt="x" />
			</div>
			<div className={styles.info}>
				<p>1</p>
				<img src="./images/icons/remove.svg" alt="x" />
			</div>
			<div>
				<Button className={styles.btn}>გასუფთავება</Button>
			</div>
		</div>
	);
}

export default FilteredInfo;
