import React from 'react';
import styles from './AddListing.module.css';
import DealType from './DealType';
import Location from './Location';
import Details from './Details';

function AddListing({ regions, cities, agents }) {
	return (
		<form className={styles.form}>
			<h1>ლისტინგის დამატება</h1>
			<div className={styles.formItems}>
				<DealType />
				<Location regions={regions} cities={cities} />
				<Details agents={agents} />
			</div>
		</form>
	);
}

export default AddListing;
