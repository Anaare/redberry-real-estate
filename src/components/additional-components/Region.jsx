import { useState } from 'react';
import Button from './Button';
import styles from './Region.module.css';

export default function Region({ regions, setSelectedRegion, onClose }) {
	const [selectedRegion, setSelectedRegionLocal] = useState(null);

	const handleCheckboxChange = regionName => {
		setSelectedRegionLocal(regionName);
		console.log(selectedRegion);
	};

	const handleButtonClick = () => {
		if (selectedRegion) {
			setSelectedRegion(selectedRegion);
		}
		onClose();
	};

	{
		regions.map(region => console.log(region));
	}
	return (
		<div className={styles.container}>
			<h4>რეგიონის მიხედვით</h4>
			<ul className={styles.regions}>
				{regions.map(region => (
					<li key={region.id}>
						<input
							type="checkbox"
							id={`region-${region.id}`}
							checked={selectedRegion === region.name}
							onChange={() => handleCheckboxChange(region.name)}
						/>
						<label htmlFor={`region-${region.id}`}>{region.name}</label>
					</li>
				))}
			</ul>
			<div className={styles.btn}>
				<Button className={styles.acceptBtn} onClick={handleButtonClick}>
					არჩევა
				</Button>
			</div>
		</div>
	);
}
