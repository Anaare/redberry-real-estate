import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Filter from './components/Filter';
import PropertyCard from './components/additional-components/PropertyCard';
import FilteredInfo from './components/additional-components/FilteredInfo';
import ListingPage from './components/additional-components/ListingPage';
import AddListing from './components/additional-components/AddListing';
import AddAgent from './components/additional-components/AddAgent';
import styles from './components/additional-components/PropertyCard.module.css';

const token = '9d0b7326-46af-40e2-bdbf-4bab9c9b83aa';

function App() {
	const [regions, setRegions] = useState(null);
	const [cities, setCities] = useState(null);
	const [properties, setProperties] = useState([]);
	const [filteredProperties, setFilteredProperties] = useState([]);
	const [selectedPropertyId, setSelectedPropertyId] = useState(null);
	const [agents, setAgents] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [selectedRegion, setSelectedRegion] = useState('');
	const [minPrice, setMinPrice] = useState('');
	const [maxPrice, setMaxPrice] = useState('');
	const [minArea, setMinArea] = useState('');
	const [maxArea, setMaxArea] = useState('');
	const [bedrooms, setBedrooms] = useState('');
	const [filters, setFilters] = useState({
		region: false,
		price: false,
		area: false,
		bedrooms: false,
	});
	const [showAddAgentModal, setShowAddAgentModal] = useState(false);
	const [refreshData, setRefreshData] = useState(false);

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

		const fetchCities = async () => {
			try {
				const response = await fetch(
					'https://api.real-estate-manager.redberryinternship.ge/api/cities',
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
				setCities(data);
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
				setFilteredProperties(data);
			} catch (e) {
				setError(e.message);
			} finally {
				setLoading(false);
			}
		};

		const fetchAgents = async () => {
			try {
				const response = await fetch(
					'https://api.real-estate-manager.redberryinternship.ge/api/agents',
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
				setAgents(data);
			} catch (e) {
				setError(e.message);
			} finally {
				setLoading(false);
			}
		};

		fetchRegions();
		fetchProperties();
		fetchAgents();
		fetchCities();
	}, [refreshData]);

	const handleRemoveFilter = filterType => {
		setFilters(prevFilters => ({
			...prevFilters,
			[filterType]: false,
		}));

		switch (filterType) {
			case 'region':
				setSelectedRegion('');
				break;
			case 'price':
				setMinPrice('');
				setMaxPrice('');
				break;
			case 'area':
				setMinArea('');
				setMaxArea('');
				break;
			case 'bedrooms':
				setBedrooms('');
				break;
			default:
				break;
		}
	};

	const handleClearAllFilters = () => {
		setFilters({
			region: false,
			price: false,
			area: false,
			bedrooms: false,
		});
		setSelectedRegion('');
		setMinPrice('');
		setMaxPrice('');
		setMinArea('');
		setMaxArea('');
		setBedrooms('');
	};

	const openAddAgentModal = () => {
		setShowAddAgentModal(true);
	};

	const closeAddAgentModal = () => {
		setShowAddAgentModal(false);
	};

	const filterProperties = () => {
		const filtered = properties.filter(property => {
			const matchesRegion =
				!filters.region || property.city.region.name === selectedRegion;

			const matchesPrice =
				!filters.price ||
				((minPrice !== '' ? property.price >= parseInt(minPrice) : true) &&
					(maxPrice !== '' ? property.price <= parseInt(maxPrice) : true));

			const matchesArea =
				!filters.area ||
				((minArea === '' || property.area >= parseInt(minArea)) &&
					(maxArea === '' || property.area <= parseInt(maxArea)));

			const matchesBedrooms =
				!filters.bedrooms || property.bedrooms === parseInt(bedrooms);

			return matchesRegion && matchesPrice && matchesArea && matchesBedrooms;
		});

		setFilteredProperties(filtered);
	};

	useEffect(() => {
		filterProperties();
	}, [selectedRegion, minPrice, maxPrice, minArea, maxArea, bedrooms, filters]);

	const handlePropertySelect = propertyId => {
		setSelectedPropertyId(propertyId);
	};

	const handleCloseListingPage = () => {
		setSelectedPropertyId(null);
	};

	const selectedProperty = properties.find(
		property => property.id === selectedPropertyId
	);

	const handleDataRefresh = () => {
		setRefreshData(prevState => !prevState);
	};

	const handleFilterChange = (filterType, value) => {
		console.log('Filter change:', filterType, value);
		setFilters(prevFilters => ({
			...prevFilters,
			[filterType]: true,
		}));

		switch (filterType) {
			case 'region':
				setSelectedRegion(value);
				break;
			case 'price':
				if (typeof value === 'object' && value !== null) {
					if (value.min !== undefined) setMinPrice(value.min);
					if (value.max !== undefined) setMaxPrice(value.max);
				}
				break;
			case 'area':
				if (typeof value === 'object' && value !== null) {
					setMinArea(value.min);
					setMaxArea(value.max);
				}
				break;
			case 'bedrooms':
				setBedrooms(value);
				break;
			default:
				break;
		}
	};

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error.message}</p>;

	return (
		<Router>
			<Header />
			<Routes>
				<Route
					path="/"
					element={
						<div className="main-container">
							<Filter
								regions={regions}
								setSelectedRegion={value => handleFilterChange('region', value)}
								setMinPrice={value =>
									handleFilterChange('price', { min: value, max: maxPrice })
								}
								setMaxPrice={value =>
									handleFilterChange('price', { min: minPrice, max: value })
								}
								setMinArea={value =>
									handleFilterChange('area', { min: value, max: maxArea })
								}
								setMaxArea={value =>
									handleFilterChange('area', { min: minArea, max: value })
								}
								setBedrooms={value => handleFilterChange('bedrooms', value)}
								onFilterChange={filterProperties}
								onAddAgentClick={openAddAgentModal}
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
								{filteredProperties.length > 0 ? (
									filteredProperties.map(property => (
										<PropertyCard
											key={property.id}
											property={property}
											onSelect={handlePropertySelect}
										/>
									))
								) : (
									<div className={styles.noResults}>
										აღნიშნული მონაცემებით განცხადება არ იძებნება
									</div>
								)}
							</div>
							{showAddAgentModal && (
								<div className={styles.modal}>
									<AddAgent onClose={closeAddAgentModal} />
								</div>
							)}
						</div>
					}
				/>
				<Route
					path="/listing/:id"
					element={
						<ListingPage
							properties={properties}
							onListingChange={handleDataRefresh}
						/>
					}
				/>
				<Route
					path="/add-listing"
					element={
						<AddListing
							regions={regions}
							cities={cities}
							initialAgents={agents}
							onListingChange={handleDataRefresh}
						/>
					}
				/>
			</Routes>
		</Router>
	);
}

export default App;
