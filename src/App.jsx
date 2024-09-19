import Header from './components/Header';
import Filter from './components/Filter';
import PropertyCard from './components/additional-components/PropertyCard';
import styles from './components/additional-components/PropertyCard.module.css';
import FilteredInfo from './components/additional-components/FilteredInfo';
import { useState, useEffect } from 'react';

const token = '9d0b7326-46af-40e2-bdbf-4bab9c9b83aa';

function App() {
	const [regions, setRegions] = useState(null);
	const [properties, setProperties] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [selectedRegion, setSelectedRegion] = useState('თბილისი');
	const [minPrice, setMinPrice] = useState(20000);
	const [maxPrice, setMaxPrice] = useState(100000);
	const [minArea, setMinArea] = useState(55);
	const [maxArea, setMaxArea] = useState(90);
	const [bedrooms, setBedrooms] = useState(1);
	const [filters, setFilters] = useState({
		region: true,
		price: true,
		area: true,
		bedrooms: true,
	});

	useEffect(() => {
		const fetchRegions = async () => {
			try {
				const response = await fetch(
					'https://api.real-estate-manager.redberryinternship.ge/api/regions',
					{
						method: 'GET',
						headers: {
							'Content-Type': 'application/json',
						},
					}
				);

				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}

				const data = await response.json();
				setRegions(data);
			} catch (e) {
				setError(e.message);
			}
		};

		const fetchProperties = async () => {
			try {
				const response = await fetch(
					'https://api.real-estate-manager.redberryinternship.ge/api/real-estates',
					{
						method: 'GET',
						headers: {
							Authorization: `Bearer ${token}`,
							'Content-Type': 'application/json',
						},
					}
				);

				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}

				const data = await response.json();
				setProperties(data);
			} catch (e) {
				setError(e.message);
			} finally {
				setLoading(false);
			}
		};

		fetchRegions();
		fetchProperties();
	}, []);

	const handleRemoveFilter = filterType => {
		setFilters(prevFilters => ({
			...prevFilters,
			[filterType]: false,
		}));
	};

	const handleClearAllFilters = () => {
		setFilters({
			region: false,
			price: false,
			area: false,
			bedrooms: false,
		});
	};

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error.message}</p>;

	return (
		<div className="main-container">
			<Header />
			<Filter
				regions={regions}
				setSelectedRegion={setSelectedRegion}
				setMinPrice={setMinPrice}
				setMaxPrice={setMaxPrice}
				setMinArea={setMinArea}
				setMaxArea={setMaxArea}
			/>
			<FilteredInfo
				region={selectedRegion}
				minPrice={minPrice}
				maxPrice={maxPrice}
				minArea={minArea}
				maxArea={maxArea}
				bedrooms={bedrooms}
				filters={filters}
				onRemoveFilter={handleRemoveFilter}
				onClearAllFilters={handleClearAllFilters}
			/>
			<div className={styles.propertyCards}>
				{properties.map(property => (
					<PropertyCard key={property.id} property={property} />
				))}
			</div>
		</div>
	);
}

export default App;
