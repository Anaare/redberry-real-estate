import styles from './AddAgent.module.css';
import Button from './Button';
function AddAgent() {
	return (
		<form className={styles.form}>
			<h1>აგენტის დამატება</h1>
			<div className={styles.box}>
				<div className={styles['input-group']}>
					<div>
						<label>
							<h4>სახელი*</h4>
							<input type="text" />
						</label>
					</div>
					<div>
						<label>
							<h4>გვარი</h4>
							<input type="text" />
						</label>
					</div>
					<div>
						<label>
							<h4>ელ-ფოსტა*</h4>
							<input type="email" />
						</label>
					</div>
					<div>
						<label>
							<h4>ტელეფონის ნომერი</h4>
							<input type="tel" />
						</label>
					</div>
				</div>
				<div>
					<h4>ატვირთეთ ფოტო *</h4>
					<div className={styles.photoUpload}>
						<img src="/images/icons/plus-circle.png" alt="redberry logo" />
					</div>
				</div>
				<div className={styles.buttons}>
					<Button className={styles.cancelBtn}>გაუქმება</Button>
					<Button className={styles.addBtn}>დაამატე აგენტი</Button>
				</div>
			</div>
		</form>
	);
}

export default AddAgent;
