import Header from './components/Header';
import Filter from './components/Filter';
import PropertyCard from './components/additional-components/PropertyCard';
import styles from './components/additional-components/PropertyCard.module.css';
import FilteredInfo from './components/additional-components/FilteredInfo';
import { useState, useEffect } from 'react';

function App() {
	const [data, setData] = useState(null);
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
		const fetchData = async () => {
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
					const errorText = await response.text();
					throw new Error(
						`Network response was not ok. Status: ${response.status}. Error: ${errorText}`
					);
				}

				const result = await response.json();
				setData(result);
			} catch (error) {
				console.error('Fetch error:', error);
				setError(error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
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
				data={data}
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
				<PropertyCard />
				<PropertyCard />
				<PropertyCard />
				<PropertyCard />
				<PropertyCard />
				<PropertyCard />
				<PropertyCard />
				<PropertyCard />
			</div>
		</div>
	);
}

export default App;
