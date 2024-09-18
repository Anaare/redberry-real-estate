import { useState } from 'react';
import Button from './Button';
import styles from './RangeInfo.module.css';
function Area({ setMinArea, setMaxArea, onClose }) {
	const [localMinArea, setLocalMinArea] = useState('');
	const [localMaxArea, setLocalMaxArea] = useState('');

	const handleChoose = () => {
		if (localMinArea && localMaxArea) {
			setMinArea(localMinArea);
			setMaxArea(localMaxArea);
		}
		onClose();
	};

	return (
		<div className={styles.area}>
			<h4>ფართობის მიხედვით</h4>
			<div className={styles.inputs}>
				<input
					type="text"
					placeholder="დან"
					value={localMinArea}
					onChange={e => setLocalMinArea(e.target.value)}
				/>
				<input
					type="text"
					placeholder="მდე"
					value={localMaxArea}
					onChange={e => setLocalMaxArea(e.target.value)}
				/>
			</div>
			<div className={styles.ranges}>
				<div className={styles.min}>
					<h5>მინ. მ²</h5>
					<ul>
						<li>50,000მ²</li>
						<li>50,000მ²</li>
						<li>50,000მ²</li>
						<li>50,000მ²</li>
						<li>50,000მ²</li>
						<li>50,000მ²</li>
					</ul>
				</div>
				<div className={styles.max}>
					<h5>მაქს. მ²</h5>
					<ul>
						<li>50,000მ²</li>
						<li>50,000მ²</li>
						<li>50,000მ²</li>
						<li>50,000მ²</li>
						<li>50,000მ²</li>
						<li>50,000მ²</li>
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
