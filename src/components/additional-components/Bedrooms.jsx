import styles from './RangeInfo.module.css';
import Button from './Button';
function Bedrooms() {
	return (
		<div className={styles.modal}>
			<h4>საძინებლის რაოდენობა</h4>
			<div className={styles.bedroomsAmount} id="bedroomsAmount">
				<input type="text" value="2" disabled />
			</div>

			<div className={styles.button}>
				<Button className={styles.chooseBtn}>არჩევა</Button>
			</div>
		</div>
	);
}

export default Bedrooms;
