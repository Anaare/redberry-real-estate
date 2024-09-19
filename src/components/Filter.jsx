import React, { useState, useEffect } from 'react';
import FilterByCheckbox from './additional-components/FilterByCheckbox';
import Button from './additional-components/Button';
import Region from './additional-components/Region';
import Bedrooms from './additional-components/Bedrooms';
import Area from './additional-components/Area';
import PriceRange from './additional-components/PriceRange';
import styles from './Filter.module.css';

export default function Filter({
	regions,
	setSelectedRegion,
	setMinPrice,
	setMaxPrice,
	setMinArea,
	setMaxArea,
	onFilterChange,
}) {
	const [activeFilter, setActiveFilter] = useState(null);

	const handleRegionFilter = () => {
		setActiveFilter('region');
		onFilterChange();
	};

	const handleRegionClose = () => {
		setActiveFilter(null);
	};

	const handleBedroomFilter = () => {
		setActiveFilter('bedroom');
		onFilterChange();
	};

	const handleBedroomClose = () => {
		setActiveFilter(null);
	};

	const handlePriceRangeFilter = () => {
		setActiveFilter('priceRange');
		onFilterChange();
	};

	const handlePriceRangeClose = () => {
		setActiveFilter(null);
	};

	const handleAreaFilter = () => {
		setActiveFilter('area');
		onFilterChange();
	};

	const handleAreaClose = () => {
		setActiveFilter(null);
	};

	useEffect(() => {
		const handleKeyDown = event => {
			if (event.key === 'Escape') {
				setActiveFilter(null);
			}
		};

		window.addEventListener('keydown', handleKeyDown);

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, []);

	return (
		<div className={styles.filter}>
			<div className={styles.filterItems}>
				<FilterByCheckbox handleClick={handleRegionFilter}>
					რეგიონი
				</FilterByCheckbox>
				<FilterByCheckbox handleClick={handlePriceRangeFilter}>
					საფასო კატეგორია
				</FilterByCheckbox>
				<FilterByCheckbox handleClick={handleAreaFilter}>
					ფართობი
				</FilterByCheckbox>
				<FilterByCheckbox handleClick={handleBedroomFilter}>
					საძინებლის რაოდენობა
				</FilterByCheckbox>
			</div>
			<div className={styles.addButtons}>
				<Button className={styles.addListing}>+ ლისტინგის დამატება</Button>
				<Button className={styles.addAgent}>+ აგენტის დამატება</Button>
			</div>
			{activeFilter === 'region' && (
				<Region
					regions={regions}
					setSelectedRegion={setSelectedRegion}
					onClose={handleRegionClose}
				/>
			)}
			{activeFilter === 'bedroom' && <Bedrooms onClose={handleBedroomClose} />}
			{activeFilter === 'priceRange' && (
				<PriceRange
					onClose={handlePriceRangeClose}
					setMinPrice={setMinPrice}
					setMaxPrice={setMaxPrice}
				/>
			)}
			{activeFilter === 'area' && (
				<Area
					onClose={handleAreaClose}
					setMinArea={setMinArea}
					setMaxArea={setMaxArea}
				/>
			)}
		</div>
	);
}
