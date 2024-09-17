import React from 'react';
import Header from '../Header';
import styles from './AddListing.module.css';
import DealType from './DealType';
import Location from './Location';
import Details from './Details';
function AddListing() {
	return (
		<>
			<Header />
			<form className={styles.form}>
				<h1>ლისტინგის დამატება</h1>
				<div className={styles.formItems}>
					<DealType />
					<Location />
					<Details />
				</div>
			</form>
		</>
	);
}

export default AddListing;
