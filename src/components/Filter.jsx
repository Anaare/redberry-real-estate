import React, { useState } from 'react';
import FilterByCheckbox from './additional-components/FilterByCheckbox';
import Button from './additional-components/Button';
import styles from './Filter.module.css';
import Region from './additional-components/Region';

export default function Filter({ data, setSelectedRegion }) {
	const [activeFilter, setActiveFilter] = useState(null);
	const [showRegion, setShowRegion] = useState(false);

	const handleRegionFilter = () => {
		setActiveFilter('region');
	};

	const handleRegionClose = () => {
		setActiveFilter(null);
		setShowRegion(false);
	};

	return (
		<div className={styles.filter}>
			<div className={styles.filterItems}>
				<FilterByCheckbox handleClick={handleRegionFilter}>
					რეგიონი
				</FilterByCheckbox>
				<FilterByCheckbox>საფასო კატეგორია</FilterByCheckbox>
				<FilterByCheckbox>ფართობი</FilterByCheckbox>
				<FilterByCheckbox>საძინებლის რაოდენობა</FilterByCheckbox>
			</div>
			<div className={styles.addButtons}>
				<Button className={styles.addListing}>+ ლისტინგის დამატება</Button>
				<Button className={styles.addAgent}>+ აგენტის დამატება</Button>
			</div>
			{activeFilter === 'region' && (
				<Region
					data={data}
					setSelectedRegion={setSelectedRegion}
					onClose={handleRegionClose}
				/>
			)}
		</div>
	);
}
