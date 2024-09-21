import React, { useState, useEffect, useRef } from 'react';
import styles from './AddAgent.module.css';
import Button from './Button';

const token = '9d0b7326-46af-40e2-bdbf-4bab9c9b83aa';

function AddAgent({ onClose, onListingChange, onAgentAdded }) {
	const [formData, setFormData] = useState({
		name: '',
		surname: '',
		email: '',
		phone: '',
		avatar: null,
	});

	const [previewUrl, setPreviewUrl] = useState('');
	const fileInputRef = useRef(null);
	const modalRef = useRef(null);

	const [validationErrors, setValidationErrors] = useState({
		name: '',
		surname: '',
		email: '',
		phone: '',
	});

	const handleChange = e => {
		const { name, value } = e.target;
		setFormData(prevState => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleFileChange = e => {
		const file = e.target.files[0];
		if (file) {
			setFormData(prevState => ({
				...prevState,
				avatar: file,
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

	const validateForm = () => {
		let isValid = true;
		const errors = {
			name: '',
			surname: '',
			email: '',
			phone: '',
		};

		if (formData.name.length < 2) {
			isValid = false;
			errors.name = 'ჩაწერეთ ვალიდური მონაცემები';
		}

		if (formData.surname.length < 2) {
			isValid = false;
			errors.surname = 'ჩაწერეთ ვალიდური მონაცემები';
		}

		if (!formData.email.endsWith('@redberry.ge')) {
			isValid = false;
			errors.email = 'ჩაწერეთ ვალიდური მონაცემები';
		}

		if (!/^\d+$/.test(formData.phone)) {
			isValid = false;
			errors.phone = 'ჩაწერეთ ვალიდური მონაცემები';
		}

		setValidationErrors(errors);
		return isValid;
	};

	const handleSubmit = async e => {
		e.preventDefault();

		if (!validateForm()) {
			return;
		}

		const formDataPayload = new FormData();
		formDataPayload.append('name', formData.name);
		formDataPayload.append('surname', formData.surname);
		formDataPayload.append('email', formData.email);
		formDataPayload.append('phone', formData.phone);

		if (formData.avatar instanceof File) {
			formDataPayload.append('avatar', formData.avatar);
		}

		try {
			const response = await fetch(
				'https://api.real-estate-manager.redberryinternship.ge/api/agents',
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

			if (onAgentAdded) {
				onAgentAdded(result);
			}

			if (onListingChange) {
				onListingChange();
			}

			if (onClose) {
				onClose();
			}

			alert('Agent Added Successfully 🎉');
		} catch (error) {
			console.error('Error adding agent:', error);
		}
	};

	useEffect(() => {
		const handleKeyDown = event => {
			if (event.key === 'Escape') {
				onClose();
			}
		};

		const handleClickOutside = event => {
			if (modalRef.current && !modalRef.current.contains(event.target)) {
				onClose();
			}
		};

		window.addEventListener('keydown', handleKeyDown);
		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [onClose]);

	const handleCancel = () => {
		if (onClose) onClose();
	};

	return (
		<div className={styles.modalOverlay}>
			<div ref={modalRef} className={styles.modalContent}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<h1>აგენტის დამატება</h1>
					<div className={styles.box}>
						<div className={styles['input-group']}>
							<div>
								<label>
									<h4>სახელი*</h4>
									<input
										type="text"
										name="name"
										value={formData.name}
										onChange={handleChange}
										className={validationErrors.name ? styles.invalid : ''}
										required
									/>
									<span className={styles.validationInfo}>
										<img src="/images/icons/tick.svg" alt="tick" />
										{validationErrors.name || 'მინიმუმ 2 სიმბოლო'}
									</span>
								</label>
							</div>
							<div>
								<label>
									<h4>გვარი*</h4>
									<input
										type="text"
										name="surname"
										value={formData.surname}
										onChange={handleChange}
										className={validationErrors.surname ? styles.invalid : ''}
										required
									/>
									<span className={styles.validationInfo}>
										<img src="/images/icons/tick.svg" alt="tick" />
										{validationErrors.surname || 'მინიმუმ 2 სიმბოლო'}
									</span>
								</label>
							</div>
							<div>
								<label>
									<h4>ელ-ფოსტა*</h4>
									<input
										type="email"
										name="email"
										value={formData.email}
										onChange={handleChange}
										className={validationErrors.email ? styles.invalid : ''}
										required
									/>
									<span className={styles.validationInfo}>
										<img src="/images/icons/tick.svg" alt="tick" />
										{validationErrors.email || 'გამოიყენეთ @redberry.ge ფოსტა'}
									</span>
								</label>
							</div>
							<div>
								<label>
									<h4>ტელეფონის ნომერი*</h4>
									<input
										type="tel"
										name="phone"
										value={formData.phone}
										onChange={handleChange}
										className={validationErrors.phone ? styles.invalid : ''}
										required
									/>
									<span className={styles.validationInfo}>
										<img src="/images/icons/tick.svg" alt="tick" />
										{validationErrors.phone || 'მხოლოდ რიცხვები'}
									</span>
								</label>
							</div>
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
										alt="Selected avatar"
										className={styles.avatarPreview}
									/>
								) : (
									<img src="/images/icons/plus-circle.png" alt="Upload" />
								)}
							</div>
						</div>
						<div className={styles.buttons}>
							<Button className={styles.cancelBtn} onClick={handleCancel}>
								გაუქმება
							</Button>
							<Button className={styles.addBtn} type="submit">
								დაამატე აგენტი
							</Button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}

export default AddAgent;
