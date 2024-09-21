import Button from './Button';
import styles from './DeleteListingModal.module.css';

function DeleteListingModal({ onClose, onConfirm }) {
	return (
		<div className={styles.modalOverlay}>
			<div className={styles.deleteModal}>
				<h4>გსურთ წაშალოთ ლისტინგი?</h4>
				<div className={styles.buttons}>
					<Button className={styles.cancelBtn} onClick={onClose}>
						გაუქმება
					</Button>
					<Button className={styles.acceptBtn} onClick={onConfirm}>
						დადასტურება
					</Button>
				</div>
			</div>
		</div>
	);
}

export default DeleteListingModal;
