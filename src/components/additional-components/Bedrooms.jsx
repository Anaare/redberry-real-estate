import { useState } from 'react';
import styles from './RangeInfo.module.css';
import Button from './Button';
function Bedrooms({ onClose }) {
	const [selectedBedrooms, setSelectedBedrooms] = useState(2);

	const handleButtonClick = () => {
		setSelectedBedrooms(2);
		onClose();
	};

	return (
		<div className={styles.bedroomsContainer}>
			<h4>საძინებლის რაოდენობა</h4>
			<div className={styles.bedroomsAmount} id="bedroomsAmount">
				<input type="text" value={selectedBedrooms || ''} disabled />
			</div>

			<div className={styles.bedroomBtn}>
				<Button className={styles.bedroomChooseBtn} onClick={handleButtonClick}>
					არჩევა
				</Button>
			</div>
		</div>
	);
}

export default Bedrooms;
