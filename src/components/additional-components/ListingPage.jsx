import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from './Button';
import styles from './ListingPage.module.css';
import FilterBox from './FilterBox';
function ListingPage({ property, onClose, properties, onListingChange }) {
	const token = '9d0b7326-46af-40e2-bdbf-4bab9c9b83aa';
	const navigate = useNavigate();

	const [propertyDataById, setPropertyDataId] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	useEffect(() => {
		const fetchPropertyData = async () => {
			try {
				const response = await fetch(
					`https://api.real-estate-manager.redberryinternship.ge/api/real-estates/${property.id}`,
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
				console.log(data);
				setPropertyDataId(data);
			} catch (e) {
				setError(e.message);
			} finally {
				setLoading(false);
			}
		};
		fetchPropertyData();
	}, [property.id]);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error.message}</p>;

	const agentInfo = propertyDataById?.agent;

	const handleDelete = async () => {
		try {
			const response = await fetch(
				`https://api.real-estate-manager.redberryinternship.ge/api/real-estates/${property.id}`,
				{
					method: 'DELETE',
					headers: {
						accept: 'application/json',
						Authorization: `Bearer ${token}`,
					},
				}
			);

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			// Optionally, show a success message
			alert('Listing deleted successfully.');

			// Navigate back to the home page or another page
			navigate('/');
			if (onListingChange) onListingChange();
		} catch (e) {
			// Handle error if needed
			alert(`Failed to delete listing: ${e.message}`);
		}
	};

	return (
		<div>
			<div className={styles.container}>
				<Link to={`/`}>
					<img src="/images/icons/left.svg" className={styles.firstIcon} />
				</Link>
				<div className={styles.propertyContent}>
					<img src={property.image} alt="property-1" />
					<div className={styles.description}>
						<h1>{property.price} ₾</h1>
						<div className={styles.details}>
							<div className={styles.info}>
								<img
									src="/images/icons/location-marker.svg"
									alt="location icon"
								/>
								<span>
									{property.city.name}, {property.address}
								</span>
							</div>
							<div className={styles.info}>
								<img src="/images/icons/area.svg" alt="area icon" />
								<span>ფართი {property.area} მ²</span>
							</div>
							<div className={styles.info}>
								<img src="/images/icons/bed.svg" alt="bed icon" />
								<span>{property.bedrooms} </span>
							</div>
							<div className={styles.info}>
								<img src="/images/icons/zip-code.svg" alt="zip code icon" />
								<span>{property.zip_code}</span>
							</div>
							<p>{property.description}</p>
						</div>
						<div className={styles.agentInfo}>
							<img src={agentInfo.avatar} alt="agent-name" />
							<div>
								<p>
									{agentInfo.name} {agentInfo.surname}
								</p>

								<span>აგენტი</span>
							</div>
							<div className={styles.contactInfo}>
								<div className={styles.mail}>
									<img src="/images/icons/envelope.svg" alt="envelope icon" />
									<p>{agentInfo.email}</p>
								</div>
								<div className={styles.phone}>
									<img src="./images/icons/phone.svg" alt="phone icon" />
									<p>{agentInfo.phone}</p>
								</div>
							</div>
						</div>
						<div>
							<Button className={styles.btn} onClick={handleDelete}>
								ლისტინგის წაშლა
							</Button>
						</div>
					</div>
				</div>
			</div>
			<p className={styles.releasedInfo}>გამოქვეყნების თარიღი 08/08/2024</p>
			<div className={styles.relatedProperties}>
				<h1>ბინები მსგავს ლოკაციაზე</h1>
				<div className={styles.propertiesContainer}>
					<div>
						<FilterBox property={property} properties={properties} />
					</div>
				</div>
			</div>
		</div>
	);
}

export default ListingPage;
