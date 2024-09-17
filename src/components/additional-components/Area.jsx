import styles from './RangeInfo.module.css';
import Button from './Button';
function Area() {
	return (
		<div className={styles.modal}>
			<h4>ფართობის მიხედვით</h4>
			<div className={styles.inputs}>
				<input type="text" value="დან" />
				<input type="text" value="მდე" />
			</div>
			<div className={styles.ranges}>
				<div className={styles.min}>
					<h5>მინ. მ²</h5>
					<ul>
						<li>50,000₾</li>
						<li>50,000₾</li>
						<li>50,000₾</li>
						<li>50,000₾</li>
						<li>50,000₾</li>
						<li>50,000₾</li>
					</ul>
				</div>
				<div className={styles.max}>
					<h5>მაქს. მ²</h5>
					<ul>
						<li>50,000₾</li>
						<li>50,000₾</li>
						<li>50,000₾</li>
						<li>50,000₾</li>
						<li>50,000₾</li>
						<li>50,000₾</li>
					</ul>
				</div>
			</div>
			<div className={styles.button}>
				<Button className={styles.chooseBtn}>არჩევა</Button>
			</div>
		</div>
	);
}

export default Area;
