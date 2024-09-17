import styles from './AddListing.module.css';

function DealType() {
	return (
		<div>
			<h3>გარიგების ტიპი</h3>
			<div className={styles.dealType}>
				<label className={styles.sale}>
					<input type="radio" name="sale" />
					იყიდება
				</label>
				<label className={styles.rent}>
					<input type="radio" name="rent" />
					ქირავდება
				</label>
			</div>
		</div>
	);
}

export default DealType;
