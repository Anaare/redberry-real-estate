import React from 'react';
import Button from './Button';
import styles from '../Filter.module.css';

function FilterByCheckbox({ children, handleClick }) {
	return (
		<>
			<Button className={styles.filterItemBtn} onClick={handleClick}>
				{children}
				<img src="/images/icons/icon-chevron-down.png" alt="icon" />
			</Button>
		</>
	);
}

export default FilterByCheckbox;
