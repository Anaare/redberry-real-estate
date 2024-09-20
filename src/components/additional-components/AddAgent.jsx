import { useState, useEffect, useRef } from 'react';
import styles from './AddAgent.module.css';
import Button from './Button';

const token = '9d0b7326-46af-40e2-bdbf-4bab9c9b83aa';

function AddAgent({ onClose }) {
	const [formData, setFormData] = useState({
		name: '',
		surname: '',
		email: '',
		phone: '',
		avatar: null,
	});

	const [errors, setErrors] = useState({
		name: '',
		surname: '',
		email: '',
		phone: '',
	});

	const [previewUrl, setPreviewUrl] = useState('');
	const fileInputRef = useRef(null);
	const modalRef = useRef(null);

	const validateForm = () => {
		let isValid = true;
		const newErrors = {
			name: '',
			surname: '',
			email: '',
			phone: '',
		};

		if (formData.name.length < 2) {
			newErrors.name = 'სახელი უნდა შეიცავდეს მინიმუმ 2 სიმბოლოს';
			isValid = false;
		}

		if (formData.surname.length < 2) {
			newErrors.surname = 'გვარი უნდა შეიცავდეს მინიმუმ 2 სიმბოლოს';
			isValid = false;
		}

		if (!formData.email.endsWith('@redberry.ge')) {
			newErrors.email = 'ელ-ფოსტა უნდა მთავრდებოდეს @redberry.ge-ით';
			isValid = false;
		}

		if (!/^\d+$/.test(formData.phone)) {
			newErrors.phone = 'ტელეფონის ნომერი უნდა შეიცავდეს მხოლოდ ციფრებს';
			isValid = false;
		}

		setErrors(newErrors);
		return isValid;
	};

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
			console.log('Agent added successfully:', result);

			if (onClose) onClose();
		} catch (error) {
			console.error('Error adding agent:', error);
			if (error.response) {
				const errorText = await error.response.text();
				console.error('Server error response:', errorText);
			}
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
										required
									/>
								</label>
								{errors.name && <p className={styles.error}>{errors.name}</p>}
							</div>
							<div>
								<label>
									<h4>გვარი*</h4>
									<input
										type="text"
										name="surname"
										value={formData.surname}
										onChange={handleChange}
										required
									/>
								</label>
								{errors.surname && (
									<p className={styles.error}>{errors.surname}</p>
								)}
							</div>
							<div>
								<label>
									<h4>ელ-ფოსტა*</h4>
									<input
										type="email"
										name="email"
										value={formData.email}
										onChange={handleChange}
										required
									/>
								</label>
								{errors.email && <p className={styles.error}>{errors.email}</p>}
							</div>
							<div>
								<label>
									<h4>ტელეფონის ნომერი*</h4>
									<input
										type="tel"
										name="phone"
										value={formData.phone}
										onChange={handleChange}
										required
									/>
								</label>
								{errors.phone && <p className={styles.error}>{errors.phone}</p>}
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
