import { useState } from 'react';
import Button from './Button';
import styles from './RangeInfo.module.css';

function PriceRange({ setMinPrice, setMaxPrice, onClose }) {
	const [localMinPrice, setLocalMinPrice] = useState('');
	const [localMaxPrice, setLocalMaxPrice] = useState('');
	const [hasError, setHasError] = useState(false);

	const handleChoose = () => {
		if (parseFloat(localMinPrice) > parseFloat(localMaxPrice)) {
			setHasError(true);
		} else {
			setHasError(false);
			if (localMinPrice && localMaxPrice) {
				setMinPrice(localMinPrice);
				setMaxPrice(localMaxPrice);
			}
			onClose();
		}
	};

	return (
		<div className={styles.priceRange}>
			<h4>ფასის მიხედვით</h4>
			<div className={styles.inputs}>
				<input
					type="number"
					placeholder="დან"
					value={localMinPrice}
					onChange={e => setLocalMinPrice(e.target.value)}
					min="0"
					className={hasError ? styles.errorInput : ''}
				/>
				<input
					type="number"
					placeholder="მდე"
					value={localMaxPrice}
					onChange={e => setLocalMaxPrice(e.target.value)}
					min="0"
					className={hasError ? styles.errorInput : ''}
				/>
			</div>

			{hasError && (
				<p className={styles.errorMessage}>ჩაწერეთ ვალიდური მონაცემები</p>
			)}

			<div className={styles.ranges}>
				<div className={styles.min}>
					<h5>მინ. ფასი</h5>
					<ul>
						<li onClick={() => setLocalMinPrice('50000')}>50,000₾</li>
						<li onClick={() => setLocalMinPrice('100000')}>100,000₾</li>
						<li onClick={() => setLocalMinPrice('150000')}>150,000₾</li>
						<li onClick={() => setLocalMinPrice('200000')}>200,000₾</li>
						<li onClick={() => setLocalMinPrice('300000')}>300,000₾</li>
					</ul>
				</div>
				<div className={styles.max}>
					<h5>მაქს. ფასი</h5>
					<ul>
						<li onClick={() => setLocalMaxPrice('100000')}>100,000₾</li>
						<li onClick={() => setLocalMaxPrice('150000')}>150,000₾</li>
						<li onClick={() => setLocalMaxPrice('200000')}>200,000₾</li>
						<li onClick={() => setLocalMaxPrice('300000')}>300,000₾</li>
						<li onClick={() => setLocalMaxPrice('400000')}>400,000₾</li>
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
