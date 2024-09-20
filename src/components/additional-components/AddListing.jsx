import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AddListing.module.css';
import Button from './Button';
import AddAgent from './AddAgent';
import { Link } from 'react-router-dom';
const token = '9d0b7326-46af-40e2-bdbf-4bab9c9b83aa';

function AddListing({ regions, cities, agents, onClose, onListingAdded }) {
	const [formData, setFormData] = useState({
		is_rental: 0,
		region_id: '',
		price: '',
		zip_code: '',
		area: '',
		city_id: '',
		address: '',
		agent_id: '',
		bedrooms: '',
		description: '',
		image: null,
	});

	const [errors, setErrors] = useState({});
	const [previewUrl, setPreviewUrl] = useState('');
	const fileInputRef = useRef(null);
	const modalRef = useRef(null);
	const [isAddAgentModalOpen, setIsAddAgentModalOpen] = useState(false);

	const navigate = useNavigate();
	const validateForm = () => {
		let isValid = true;
		const newErrors = {};

		if (formData.address.length < 2) {
			newErrors.address = 'მისამართი უნდა შეიცავდეს მინიმუმ 2 სიმბოლოს';
			isValid = false;
		}

		if (formData.zip_code.length < 2) {
			newErrors.zip_code = 'საფოსტო ინდექსი უნდა შეიცავდეს მინიმუმ 2 სიმბოლოს';
			isValid = false;
		}

		if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
			newErrors.price = 'ფასი უნდა იყოს დადებითი რიცხვი';
			isValid = false;
		}

		if (isNaN(Number(formData.area)) || Number(formData.area) <= 0) {
			newErrors.area = 'ფართობი უნდა იყოს დადებითი რიცხვი';
			isValid = false;
		}

		if (isNaN(Number(formData.bedrooms)) || Number(formData.bedrooms) < 0) {
			newErrors.bedrooms =
				'საძინებლების რაოდენობა უნდა იყოს არაუარყოფითი რიცხვი';
			isValid = false;
		}

		if (formData.description.trim().split(/\s+/).length < 5) {
			newErrors.description = 'აღწერა უნდა შეიცავდეს მინიმუმ 5 სიტყვას';
			isValid = false;
		}

		setErrors(newErrors);
		return isValid;
	};

	const handleChange = e => {
		const { name, value, type, checked } = e.target;
		setFormData(prevState => ({
			...prevState,
			[name]: type === 'radio' ? (checked ? 1 : 0) : value,
		}));
	};

	const handleFileChange = e => {
		const file = e.target.files[0];
		if (file) {
			setFormData(prevState => ({
				...prevState,
				image: file,
			}));
			const reader = new FileReader();
			reader.onloadend = () => {
				setPreviewUrl(reader.result);
			};
			reader.readAsDataURL(file);
		}
	};

	const handlePhotoUploadClick = () => {
		fileInputRef.current.click();
	};

	const handleSubmit = async e => {
		e.preventDefault();

		if (!validateForm()) {
			return;
		}

		if (!formData.agent_id) {
			setErrors(prev => ({
				...prev,
				agent: 'გთხოვთ, აირჩიეთ ან დაამატეთ აგენტი',
			}));
			return;
		}

		const formDataPayload = new FormData();
		for (const key in formData) {
			if (key === 'image' && formData[key] instanceof File) {
				formDataPayload.append('image', formData[key]);
			} else if (formData[key] || formData[key] === 0) {
				// Include 0 values
				formDataPayload.append(key, formData[key]);
			}
		}

		try {
			const response = await fetch(
				'https://api.real-estate-manager.redberryinternship.ge/api/real-estates',
				{
					method: 'POST',
					headers: {
						Authorization: `Bearer ${token}`,
					},
					body: formDataPayload,
				}
			);

			if (!response.ok) {
				const errorText = await response.text();
				console.error(
					`HTTP error! status: ${response.status}, message: ${errorText}`
				);
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const result = await response.json();
			console.log(result);
			// if (onListingAdded) onListingAdded(result);
			if (onClose) onClose();
			navigate('/');
		} catch (error) {
			console.error('Error adding listing:', error);
			setErrors(prevErrors => ({
				...prevErrors,
				submit:
					error.message ||
					'An error occurred while submitting the form. Please try again.',
			}));
		}
	};

	const handleClick = () => {
		setIsAddAgentModalOpen(true); // Open the AddAgent modal
	};

	const closeAddAgentModal = () => {
		setIsAddAgentModalOpen(false); // Close the AddAgent modal
	};

	const handleAgentAdded = newAgent => {
		// When a new agent is added, select the new agent in the dropdown
		setFormData(prevFormData => ({
			...prevFormData,
			agent_id: newAgent.id,
		}));
		closeAddAgentModal(); // Close modal after adding
		onAgentAdded(newAgent); // Add new agent to parent
	};

	const handleCancel = () => {
		if (onClose) onClose();
	};

	return (
		<div className={styles.modalOverlay}>
			<div ref={modalRef} className={styles.modalContent}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<h1>ლისტინგის დამატება</h1>
					<div className={styles.formItems}>
						<div>
							<h3>გარიგების ტიპი</h3>
							<div className={styles.dealType}>
								<label className={styles.sale}>
									<input
										type="radio"
										name="is_rental"
										checked={!formData.is_rental}
										onChange={() =>
											setFormData(prev => ({ ...prev, is_rental: false }))
										}
									/>
									იყიდება
								</label>
								<label className={styles.rent}>
									<input
										type="radio"
										name="is_rental"
										checked={formData.is_rental}
										onChange={() =>
											setFormData(prev => ({ ...prev, is_rental: true }))
										}
									/>
									ქირავდება
								</label>
							</div>
						</div>

						<div className={styles.location}>
							<h3>მდებარეობა</h3>
							<div className={styles['input-group']}>
								<div>
									<label>
										<h4>მისამართი*</h4>
										<input
											type="text"
											name="address"
											value={formData.address}
											onChange={handleChange}
											required
										/>
									</label>
									{errors.address && (
										<p className={styles.error}>{errors.address}</p>
									)}
								</div>
								<div>
									<label>
										<h4>საფოსტო ინდექსი*</h4>
										<input
											type="text"
											name="zip_code"
											value={formData.zip_code}
											onChange={handleChange}
											required
										/>
									</label>
									{errors.zip_code && (
										<p className={styles.error}>{errors.zip_code}</p>
									)}
								</div>
							</div>
							<div className={styles['input-group']}>
								<div>
									<label>
										<h4>რეგიონი</h4>
										<select
											name="region_id"
											value={formData.region_id}
											onChange={handleChange}
											required
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
								{formData.region_id && (
									<div>
										<label>
											<h4>ქალაქი</h4>
											<select
												name="city_id"
												value={formData.city_id}
												onChange={handleChange}
												required
											>
												<option value="">აირჩიეთ ქალაქი</option>
												{cities
													.filter(
														city =>
															city.region_id === Number(formData.region_id)
													)
													.map(city => (
														<option key={city.id} value={city.id}>
															{city.name}
														</option>
													))}
											</select>
										</label>
									</div>
								)}
							</div>
						</div>

						<div className={styles.details}>
							<h3>ბინის დეტალები</h3>
							<div className={styles['input-group']}>
								<div>
									<label>
										<h4>ფასი</h4>
										<input
											type="number"
											name="price"
											value={formData.price}
											onChange={handleChange}
											required
										/>
									</label>
									{errors.price && (
										<p className={styles.error}>{errors.price}</p>
									)}
								</div>
								<div>
									<label>
										<h4>ფართობი</h4>
										<input
											type="number"
											name="area"
											value={formData.area}
											onChange={handleChange}
											required
										/>
									</label>
									{errors.area && <p className={styles.error}>{errors.area}</p>}
								</div>
							</div>
							<div>
								<label>
									<h4>საძინებლების რაოდენობა</h4>
									<input
										type="number"
										name="bedrooms"
										value={formData.bedrooms}
										onChange={handleChange}
										required
									/>
								</label>
								{errors.bedrooms && (
									<p className={styles.error}>{errors.bedrooms}</p>
								)}
							</div>
							<div>
								<h4>აღწერა *</h4>
								<textarea
									name="description"
									value={formData.description}
									onChange={handleChange}
									required
								/>
								{errors.description && (
									<p className={styles.error}>{errors.description}</p>
								)}
							</div>
							<div>
								<h4>ატვირთეთ ფოტო *</h4>
								<div
									className={styles.photoUpload}
									onClick={handlePhotoUploadClick}
								>
									<input
										type="file"
										accept="image/*"
										onChange={handleFileChange}
										style={{ display: 'none' }}
										ref={fileInputRef}
										required
									/>
									{previewUrl ? (
										<img
											src={previewUrl}
											alt="Selected property"
											className={styles.propertyPreview}
										/>
									) : (
										<img src="/images/icons/plus-circle.png" alt="Upload" />
									)}
								</div>
							</div>
							<div>
								<h3>აგენტი</h3>
								<div className={styles.agent}>
									<h4>აირჩიე</h4>
									<Button className={styles.agentBtn} onClick={handleClick}>
										<img src="/images/icons/plus-circle.png" alt="add button" />
										დაამატე აგენტი
									</Button>
									<select
										name="agent_id"
										value={formData.agent_id}
										onChange={handleChange}
										required
									>
										<option value="">აირჩიეთ აგენტი</option>
										{agents.map(agent => (
											<option key={agent.id} value={agent.id}>
												{agent.name} {agent.surname}
											</option>
										))}
									</select>
								</div>
							</div>
							{errors.submit && <p className={styles.error}>{errors.submit}</p>}
							<div className={styles.buttons}>
								<Link to={`/`}>
									<Button
										className={styles.cancelBtn}
										onClick={onClose}
										type="button"
									>
										გაუქმება
									</Button>
								</Link>
								<Button className={styles.addBtn} type="submit">
									დაამატე ლისტინგი
								</Button>
							</div>
						</div>
					</div>
				</form>
			</div>
			{isAddAgentModalOpen && (
				<AddAgent
					onClose={closeAddAgentModal}
					onAgentAdded={handleAgentAdded}
				/>
			)}
		</div>
	);
}

export default AddListing;
