import styles from './RangeInfo.module.css';
import Button from './Button';
function PriceRange() {
	return (
		<div className={styles.modal}>
			<h4>ფასის მიხედვით</h4>
			<div className={styles.inputs}>
				<input type="text" value="დან" />
				<input type="text" value="მდე" />
			</div>
			<div className={styles.ranges}>
				<div className={styles.min}>
					<h5>მინ. ფასი</h5>
					<ul>
						<li>50,000₾</li>
						<li>100,000₾</li>
						<li>150,000₾</li>
						<li>200,000₾</li>
						<li>300,000₾</li>
					</ul>
				</div>
				<div className={styles.max}>
					<h5>მაქს. ფასი</h5>
					<ul>
						<li>50,000₾</li>
						<li>100,000₾</li>
						<li>150,000₾</li>
						<li>200,000₾</li>
						<li>300,000₾</li>
					</ul>
				</div>
			</div>
			<div className={styles.button}>
				<Button className={styles.chooseBtn}>არჩევა</Button>
			</div>
		</div>
	);
}

export default PriceRange;
