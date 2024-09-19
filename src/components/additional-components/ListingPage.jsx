import Header from '../Header';
import Button from './Button';
import styles from './ListingPage.module.css';
import PropertyCard from './PropertyCard';

function ListingPage() {
	return (
		<div>
			<Header />
			<div className={styles.container}>
				<img src="./images/icons/left.svg" className={styles.firstIcon} />
				<div className={styles.propertyContent}>
					<img src="./images/property-images/property-1.png" alt="property-1" />
					<div className={styles.description}>
						<h1>80, 458 ₾</h1>
						<div className={styles.details}>
							<div className={styles.info}>
								<img
									src="./images/icons/location-marker.svg"
									alt="location icon"
								/>
								<span>თბილისი, ი. ჭავჭავაძის 53</span>
							</div>
							<div className={styles.info}>
								<img src="./images/icons/area.svg" alt="area icon" />
								<span>ფართი 55 მ²</span>
							</div>
							<div className={styles.info}>
								<img src="./images/icons/bed.svg" alt="bed icon" />
								<span>საძინებელი 2</span>
							</div>
							<div className={styles.info}>
								<img src="./images/icons/zip-code.svg" alt="zip code icon" />
								<span>საფოსტო ინდექსი 2525</span>
							</div>
							<p>
								იყიდება ბინა ჭავჭავაძის ქუჩაზე, ვაკეში. ბინა არის ახალი
								რემონტით, ორი საძინებლით და დიდი აივნით. მოწყობილია ავეჯითა და
								ტექნიკით.
							</p>
						</div>
						<div className={styles.agentInfo}>
							<img src="./images/agents/agent-1.png" alt="agent-name" />
							<div>
								<p>სოფიო გელოვანი</p> {/* data from API*/}
								<span>აგენტი</span>
							</div>
							<div className={styles.contactInfo}>
								<div className={styles.mail}>
									<img src="./images/icons/envelope.svg" alt="envelope icon" />
									<p>sophio.gelovani@redberry.ge</p> {/* data from API */}
								</div>
								<div className={styles.phone}>
									<img src="./images/icons/phone.svg" alt="phone icon" />
									<p>577 77 77 77</p> {/* data from API */}
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
					<img src="./images/icons/left.svg" className={styles.secondIcon} />
					<div className={styles.propertiesList}>
						<PropertyCard /> {/* based on related info */}
						<PropertyCard /> {/* based on related info */}
						<PropertyCard /> {/* based on related info */}
						<PropertyCard /> {/* based on related info */}
					</div>
					<img src="./images/icons/right.svg" className={styles.thirdIcon} />
				</div>
			</div>
		</div>
	);
}

export default ListingPage;
