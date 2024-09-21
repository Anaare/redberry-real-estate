import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
	setBedrooms,
	onFilterChange,
	onAddAgentClick,
}) {
	const [activeFilter, setActiveFilter] = useState(null);
	const navigate = useNavigate();

	const handleFilterClick = filterType => {
		setActiveFilter(activeFilter === filterType ? null : filterType);
	};

	const handleFilterClose = () => {
		setActiveFilter(null);
		onFilterChange();
	};

	const handleAddListing = () => {
		navigate('/add-listing');
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
				<FilterByCheckbox handleClick={() => handleFilterClick('region')}>
					რეგიონი
				</FilterByCheckbox>
				<FilterByCheckbox handleClick={() => handleFilterClick('priceRange')}>
					ფასის კატეგორია
				</FilterByCheckbox>
				<FilterByCheckbox handleClick={() => handleFilterClick('area')}>
					ფართობი
				</FilterByCheckbox>
				<FilterByCheckbox handleClick={() => handleFilterClick('bedroom')}>
					საძინებლის რაოდენობა
				</FilterByCheckbox>
			</div>
			<div className={styles.addButtons}>
				<Button className={styles.addListing} onClick={handleAddListing}>
					+ ლისტინგის დამატება
				</Button>
				<Button className={styles.addAgent} onClick={onAddAgentClick}>
					+ აგენტის დამატება
				</Button>
			</div>
			{activeFilter === 'region' && (
				<Region
					regions={regions}
					setSelectedRegion={setSelectedRegion}
					onClose={handleFilterClose}
				/>
			)}
			{activeFilter === 'bedroom' && (
				<Bedrooms setBedrooms={setBedrooms} onClose={handleFilterClose} />
			)}
			{activeFilter === 'priceRange' && (
				<PriceRange
					setMinPrice={setMinPrice}
					setMaxPrice={setMaxPrice}
					onClose={handleFilterClose}
				/>
			)}
			{activeFilter === 'area' && (
				<Area
					setMinArea={setMinArea}
					setMaxArea={setMaxArea}
					onClose={handleFilterClose}
				/>
			)}
		</div>
	);
}
