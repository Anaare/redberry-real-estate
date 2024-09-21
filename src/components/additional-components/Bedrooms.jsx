import { useState } from 'react';
import Button from './Button';
import styles from './RangeInfo.module.css';

function Bedrooms({ onClose, setBedrooms }) {
	const [selectedBedrooms, setSelectedBedrooms] = useState(2);

	const handleButtonClick = () => {
		setBedrooms(selectedBedrooms);
		onClose();
	};

	return (
		<div className={styles.bedroomsContainer}>
			<h4>საძინებლის რაოდენობა</h4>
			<div className={styles.bedroomsAmount} id="bedroomsAmount">
				<input
					type="number"
					value={selectedBedrooms}
					onChange={e => setSelectedBedrooms(Number(e.target.value))}
					min="1"
				/>
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
