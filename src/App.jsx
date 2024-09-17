import Header from './components/Header';
import Filter from './components/Filter';
import PropertyCard from './components/additional-components/PropertyCard';
import styles from './components/additional-components/PropertyCard.module.css';
import FilteredInfo from './components/additional-components/FilteredInfo';
import ListingPage from './components/additional-components/ListingPage';
function App() {
	return (
		<div className="main-container">
			{/* <Header />
			<Filter /> */}
			{/* <AddListing /> */}
			{/* <AddAgent /> */}
			{/* <Region /> */}
			{/* <PriceRange /> */}
			{/* <Area /> */}
			{/* <Bedrooms /> */}
			{/* <NotFound /> */}
			{/* <FilteredInfo />
			<div className={styles.propertyCards}>
				<PropertyCard />
				<PropertyCard />
				<PropertyCard />
				<PropertyCard />
				<PropertyCard />
				<PropertyCard />
				<PropertyCard />
				<PropertyCard />
			</div> */}

			<ListingPage />
		</div>
	);
}

export default App;
