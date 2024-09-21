import { useState } from 'react';
import Button from './Button';
import styles from './RangeInfo.module.css';

function Area({ setMinArea, setMaxArea, onClose }) {
	const [localMinArea, setLocalMinArea] = useState('');
	const [localMaxArea, setLocalMaxArea] = useState('');
	const [hasError, setHasError] = useState(false);

	const handleChoose = () => {
		if (parseFloat(localMinArea) > parseFloat(localMaxArea)) {
			setHasError(true);
		} else {
			setHasError(false);
			if (localMinArea && localMaxArea) {
				setMinArea(localMinArea);
				setMaxArea(localMaxArea);
			}
			onClose();
		}
	};

	return (
		<div className={styles.area}>
			<h4>ფართობის მიხედვით</h4>
			<div className={styles.inputs}>
				<input
					type="number"
					placeholder="დან"
					value={localMinArea}
					onChange={e => setLocalMinArea(e.target.value)}
					min="0"
					className={hasError ? styles.errorInput : ''}
				/>
				<input
					type="number"
					placeholder="მდე"
					value={localMaxArea}
					onChange={e => setLocalMaxArea(e.target.value)}
					min="0"
					className={hasError ? styles.errorInput : ''}
				/>
			</div>

			{hasError && (
				<p className={styles.errorMessage}>ჩაწერეთ ვალიდური მონაცემები</p>
			)}

			<div className={styles.ranges}>
				<div className={styles.min}>
					<h5>მინ. მ²</h5>
					<ul>
						<li onClick={() => setLocalMinArea('50')}>50მ²</li>
						<li onClick={() => setLocalMinArea('100')}>100მ²</li>
						<li onClick={() => setLocalMinArea('150')}>150მ²</li>
						<li onClick={() => setLocalMinArea('200')}>200მ²</li>
						<li onClick={() => setLocalMinArea('250')}>250მ²</li>
						<li onClick={() => setLocalMinArea('300')}>300მ²</li>
					</ul>
				</div>
				<div className={styles.max}>
					<h5>მაქს. მ²</h5>
					<ul>
						<li onClick={() => setLocalMaxArea('100')}>100მ²</li>
						<li onClick={() => setLocalMaxArea('150')}>150მ²</li>
						<li onClick={() => setLocalMaxArea('200')}>200მ²</li>
						<li onClick={() => setLocalMaxArea('250')}>250მ²</li>
						<li onClick={() => setLocalMaxArea('300')}>300მ²</li>
						<li onClick={() => setLocalMaxArea('350')}>350მ²</li>
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

export default Area;
