import React from 'react';
import styles from './AddListing.module.css';

function AddListing({ regions, cities, agents }) {
	return (
		<form className={styles.form}>
			<h1>ლისტინგის დამატება</h1>
			<div className={styles.formItems}></div>
		</form>
	);
}

export default AddListing;
