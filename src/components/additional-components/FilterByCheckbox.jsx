import React from 'react';
import Button from './Button';
import styles from '../Filter.module.css';

function FilterByCheckbox({ children }) {
	return (
		<>
			<Button className={styles.filterItemBtn}>
				{children}
				<img src="/images/icons/icon-chevron-down.png" alt="icon" />
			</Button>
		</>
	);
}

export default FilterByCheckbox;
