import styles from './AddListing.module.css';

export default function Location() {
	return (
		<div className={styles.location}>
			<h3>მდებარეობა</h3>
			<div className={styles['input-group']}>
				<div>
					<label>
						მისამართი *
						<input type="text" />
						{/*validations WITH react! at least 2 symbols*/}
					</label>
				</div>

				<div>
					<label>
						საფოსტო ინდექსი *
						<input type="number" />
						{/*validations WITH react! only numbers */}
					</label>
				</div>
			</div>
			<div className={styles['input-group']}>
				<div>
					<label>
						რეგიონი
						<select>
							<option>კახეთი</option> {/*  I need data from backend */}
						</select>
					</label>
				</div>
				<div>
					<label>
						ქალაქი
						<select>
							<option>თელავი</option>
							{/* MUST BE Available only after choosing the city */}
						</select>
					</label>
				</div>
			</div>
		</div>
	);
}
