import Header from '../Header';
import styles from './ListingPage.module.css';
function ListingPage() {
	return (
		<div>
			<Header />
			<div className={styles.container}>
				<img src="./images/icons/right.svg" className={styles.firstIcon} />
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
						{/*დასამატებელია აგენტის ინფო და წაშლის ღილაკი + სტილებია დასაკორექტირებელი.
                        
                            ასევე! არ დამავიწყდეს მოდალი (წაშლის ღილაკზე დაჭერისას გამოდის)
                        */}
					</div>
				</div>
			</div>
			<p className={styles.releasedInfo}>გამოქვეყნების თარიღი 08/08/2024</p>
		</div>
	);
}

export default ListingPage;
