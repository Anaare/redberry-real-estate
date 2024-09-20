import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';
import styles from './ListingPage.module.css';

function ListingPage({ property, onClose, agents }) {
	{
		/* 
		
		3. Buttons:
		
			2. second left Icon => must move back  in related listings
			3. right Icon => must move further in listings list
			4. delete listing (DELETE operation imo)
		*/
	}

	const token = '9d0b7326-46af-40e2-bdbf-4bab9c9b83aa';

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
									<p>{agentInfo.email}</p> {/* data from API */}
								</div>
								<div className={styles.phone}>
									<img src="./images/icons/phone.svg" alt="phone icon" />
									<p>{agentInfo.phone}</p>
								</div>
							</div>
						</div>
						<div>
							<Button className={styles.btn}>ლისტინგის წაშლა</Button>
						</div>
					</div>
				</div>
			</div>
			<p className={styles.releasedInfo}>გამოქვეყნების თარიღი 08/08/2024</p>
			<div className={styles.relatedProperties}>
				<h1>ბინები მსგავს ლოკაციაზე</h1>
				<div className={styles.propertiesContainer}>
					<img src="/images/icons/left.svg" className={styles.secondIcon} />
					<div className={styles.propertiesList}>
						{/* Property Card based on the related info */}
					</div>
					<img src="/images/icons/right.svg" className={styles.thirdIcon} />
				</div>
			</div>
		</div>
	);
}

export default ListingPage;
