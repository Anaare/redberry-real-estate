import { useState } from 'react';
import Button from './Button';
import styles from './Region.module.css';

export default function Region({ data, setSelectedRegion, onClose }) {
	const [selectedRegion, setSelectedRegionLocal] = useState(null);

	const handleCheckboxChange = regionName => {
		setSelectedRegionLocal(regionName);
	};

	const handleButtonClick = () => {
		setSelectedRegion(selectedRegion);
		onClose();
	};

	return (
		<div className={styles.container}>
			<h4>რეგიონის მიხედვით</h4>
			<ul className={styles.regions}>
				{data.map(region => {
					return (
						<li key={region.id}>
							<input
								type="checkbox"
								id={`region-${region.id}`}
								checked={selectedRegion === region.name}
								onChange={() => handleCheckboxChange(region.name)}
							/>
							<label htmlFor={`region-${region.id}`}>{region.name}</label>
						</li>
					);
				})}
			</ul>
			<div className={styles.btn}>
				<Button className={styles.acceptBtn} onClick={handleButtonClick}>
					არჩევა
				</Button>
			</div>
		</div>
	);
}
