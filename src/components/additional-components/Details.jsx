import styles from './AddListing.module.css';
import Button from './Button';

function Details() {
	return (
		<div className={styles.details}>
			<h3>ბინის დეტალები</h3>
			<div className={styles['input-group']}>
				<div>
					<label>
						<h4>ფასი</h4>
						<input type="number" />
					</label>
				</div>
				<div>
					<label>
						<h4>ფართობი</h4>
						<input type="number" />
					</label>
				</div>
			</div>
			<div>
				<label>
					<h4>საძინებლების რაოდენობა</h4>
					<input type="number" />
				</label>
			</div>
			<div>
				<h4>აღწერა *</h4>
				<textarea /> {/* Min 5 words (add react validation)*/}
			</div>
			<div>
				<h4>ატვირთეთ ფოტო *</h4>
				<div className={styles.photoUpload}>
					<img src="/images/plus-circle.png" alt="redberry logo" />
				</div>
			</div>
			<div>
				<h3>აგენტი</h3>
				<div>
					<h4>აირჩიე</h4>
					<select>
						<option>გიორგი ბრეგვაძე</option> {/* From BACKEND!*/}
					</select>
				</div>
			</div>
			<div className={styles.buttons}>
				<Button className={styles.cancelBtn}>გაუქმება</Button>
				<Button className={styles.addBtn}>დაამატე ლისტინგი</Button>
			</div>
		</div>
	);
}

export default Details;
