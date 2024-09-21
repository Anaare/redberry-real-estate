import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Button from './Button';
import FilterBox from './FilterBox';
import DeleteListingModal from './DeleteListingModal';
import styles from './ListingPage.module.css';

const token = '9d0b7326-46af-40e2-bdbf-4bab9c9b83aa';

function ListingPage({ properties, onListingChange }) {
	const { id } = useParams();
	const navigate = useNavigate();

	const [propertyData, setPropertyData] = useState(null);
	const [showDeleteListingModal, setShowDeleteListingModal] = useState(false);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchPropertyData = async () => {
			try {
				const response = await fetch(
					`https://api.real-estate-manager.redberryinternship.ge/api/real-estates/${id}`,
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
				setPropertyData(data);
			} catch (e) {
				setError(e.message);
			} finally {
				setLoading(false);
			}
		};

		fetchPropertyData();
	}, [id]);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error}</p>;
	if (!propertyData) return <p>No property found</p>;

	const agentInfo = propertyData.agent;

	const openDeleteListingModal = () => {
		setShowDeleteListingModal(true);
	};

	const closeDeleteListingModal = () => {
		setShowDeleteListingModal(false);
	};

	const handleDelete = async () => {
		try {
			const response = await fetch(
				`https://api.real-estate-manager.redberryinternship.ge/api/real-estates/${id}`,
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

			alert('Listing deleted successfully.');

			navigate('/');
			if (onListingChange) onListingChange();
		} catch (e) {
			alert(`Failed to delete listing: ${e.message}`);
		} finally {
			setShowDeleteListingModal(false);
		}
	};

	return (
		<div>
			<div className={styles.container}>
				<Link to="/">
					<img
						src="/images/icons/left.svg"
						className={styles.firstIcon}
						alt="Back"
					/>
				</Link>
				<div className={styles.propertyContent}>
					<img src={propertyData.image} alt="property" />
					<div className={styles.description}>
						<h1>{propertyData.price} ₾</h1>
						<div className={styles.details}>
							<div className={styles.info}>
								<img
									src="/images/icons/location-marker.svg"
									alt="location icon"
								/>
								<span>
									{propertyData.city.name}, {propertyData.address}
								</span>
							</div>
							<div className={styles.info}>
								<img src="/images/icons/area.svg" alt="area icon" />
								<span>ფართი {propertyData.area} მ²</span>
							</div>
							<div className={styles.info}>
								<img src="/images/icons/bed.svg" alt="bed icon" />
								<span>{propertyData.bedrooms} </span>
							</div>
							<div className={styles.info}>
								<img src="/images/icons/zip-code.svg" alt="zip code icon" />
								<span>{propertyData.zip_code}</span>
							</div>
							<p>{propertyData.description}</p>
						</div>
						<div className={styles.agentInfo}>
							<img
								src={agentInfo.avatar}
								alt={`${agentInfo.name} ${agentInfo.surname}`}
							/>
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
									<img src="/images/icons/phone.svg" alt="phone icon" />
									<p>{agentInfo.phone}</p>
								</div>
							</div>
						</div>
						<div>
							<Button className={styles.btn} onClick={openDeleteListingModal}>
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
						<FilterBox property={propertyData} properties={properties} />
					</div>
				</div>
			</div>

			{showDeleteListingModal && (
				<DeleteListingModal
					onConfirm={handleDelete}
					onClose={closeDeleteListingModal}
				/>
			)}
		</div>
	);
}

export default ListingPage;
