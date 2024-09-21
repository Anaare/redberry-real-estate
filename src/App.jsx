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
				setFilteredProperties(data); // Initialize filtered properties with all properties
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
	};

	const handleClearAllFilters = () => {
		setFilters({
			region: false,
			price: false,
			area: false,
			bedrooms: false,
		});
	};

	const openAddAgentModal = () => {
		setShowAddAgentModal(true);
	};

	const closeAddAgentModal = () => {
		setShowAddAgentModal(false);
	};

	const filterProperties = () => {
		const filtered = properties.filter(property => {
			const matchesRegion = filters.region
				? property.city.region === selectedRegion // Adjust this if your property object has region information directly or through city
				: true;
			const matchesPrice = filters.price
				? property.price >= minPrice && property.price <= maxPrice
				: true;
			const matchesArea = filters.area
				? property.area >= minArea && property.area <= maxArea
				: true;
			const matchesBedrooms = filters.bedrooms
				? property.bedrooms === bedrooms
				: true;

			return matchesRegion || matchesPrice || matchesArea || matchesBedrooms;
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
								setSelectedRegion={setSelectedRegion}
								setMinPrice={setMinPrice}
								setMaxPrice={setMaxPrice}
								setMinArea={setMinArea}
								setMaxArea={setMaxArea}
								onFilterChange={filterProperties} // Trigger filter logic
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
								{filteredProperties.map(property => (
									<PropertyCard
										key={property.id}
										property={property}
										onSelect={handlePropertySelect}
									/>
								))}
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
						selectedProperty && (
							<ListingPage
								property={selectedProperty}
								onClose={handleCloseListingPage}
								properties={properties}
								onListingChange={handleDataRefresh}
							/>
						)
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
