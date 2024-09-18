import Button from './Button';
import styles from './DeleteListingModal.module.css';

function DeleteListingModal() {
	return (
		<div className={styles.deleteModal}>
			<h4>გსურთ წაშალოთ ლისტინგი?</h4>
			<div className={styles.buttons}>
				<Button className={styles.cancelBtn}>გაუქმება</Button>
				<Button className={styles.acceptBtn}>დადასტურება</Button>
			</div>
		</div>
	);
}

export default DeleteListingModal;
