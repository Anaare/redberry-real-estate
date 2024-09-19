import { useState } from 'react';
import styles from './AddListing.module.css';

export default function Location({ regions, cities }) {
	const [selectedRegion, setSelectedRegion] = useState(null);

	const filteredCities = cities.filter(
		city => city.region_id === selectedRegion
	);

	return (
		<div className={styles.location}>
			<h3>მდებარეობა</h3>
			<div className={styles['input-group']}>
				<div>
					<label>
						მისამართი *
						<input type="text" />
						{/* Validations with React: at least 2 symbols */}
					</label>
				</div>

				<div>
					<label>
						საფოსტო ინდექსი *
						<input type="number" />
						{/* Validations with React: only numbers */}
					</label>
				</div>
			</div>

			<div className={styles['input-group']}>
				{/* Region selection */}
				<div>
					<label>
						რეგიონი
						<select
							value={selectedRegion || ''}
							onChange={e => setSelectedRegion(Number(e.target.value))}
						>
							<option value="">აირჩიეთ რეგიონი</option>
							{regions.map(region => (
								<option key={region.id} value={region.id}>
									{region.name}
								</option>
							))}
						</select>
					</label>
				</div>

				{selectedRegion && (
					<div>
						<label>
							ქალაქი
							<select>
								{filteredCities.length > 0 ? (
									filteredCities.map(city => (
										<option key={city.id} value={city.id}>
											{city.name}
										</option>
									))
								) : (
									<option>ქალაქები არ მოიძებნა</option>
								)}
							</select>
						</label>
					</div>
				)}
			</div>
		</div>
	);
}
