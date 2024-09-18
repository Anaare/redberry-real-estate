import { useState } from 'react';
import Button from './Button';
import styles from './RangeInfo.module.css';
function PriceRange({ setMinPrice, setMaxPrice, onClose }) {
	const [localMinPrice, setLocalMinPrice] = useState('');
	const [localMaxPrice, setLocalMaxPrice] = useState('');

	const handleChoose = () => {
		if (localMinPrice && localMaxPrice) {
			setMinPrice(localMinPrice);
			setMaxPrice(localMaxPrice);
		}
		onClose();
	};

	return (
		<div className={styles.priceRange}>
			<h4>ფასის მიხედვით</h4>
			<div className={styles.inputs}>
				<input
					type="text"
					placeholder="დან"
					value={localMinPrice}
					onChange={e => setLocalMinPrice(e.target.value)}
				/>
				<input
					type="text"
					placeholder="მდე"
					value={localMaxPrice}
					onChange={e => setLocalMaxPrice(e.target.value)}
				/>
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
				<Button className={styles.chooseBtn} onClick={handleChoose}>
					არჩევა
				</Button>
			</div>
		</div>
	);
}

export default PriceRange;
