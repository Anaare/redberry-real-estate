import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
			const reader = new FileReader();
			reader.onloadend = () => {
				setFormData(prevState => ({
					...prevState,
					avatar: reader.result.split(',')[1], // Get Base64 string
				}));
			};
			reader.readAsDataURL(file);
		}
	};

	const fetchExistingAgents = async () => {
		try {
			const response = await fetch('https://api.yourserver.com/agents', {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const data = await response.json();
			return data;
		} catch (error) {
			console.error('Error fetching agents:', error);
			return [];
		}
	};

	const handleSubmit = async e => {
		e.preventDefault();

		const existingAgents = await fetchExistingAgents();
		const lastId = existingAgents.reduce(
			(max, agent) => Math.max(max, agent.id),
			0
		);
		const newId = lastId + 1;

		const payload = {
			id: newId,
			name: formData.name,
			email: formData.email,
			phone: formData.phone,
			avatar: formData.avatar,
		};

		try {
			const response = await fetch('https://api.yourserver.com/agents', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(payload),
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			if (onClose) onClose();
		} catch (error) {
			console.error('Error adding agent:', error);
		}
	};

	useEffect(() => {
		const handleKeyDown = event => {
			if (event.key === 'Escape') {
				onClose(null);
			}
		};

		window.addEventListener('keydown', handleKeyDown);

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, []);

	const handleCancel = () => {
		if (onClose) onClose();
	};

	return (
		<div className={styles.modalOverlay}>
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
						</div>
						<div>
							<label>
								<h4>გვარი</h4>
								<input
									type="text"
									name="surname"
									value={formData.surname}
									onChange={handleChange}
								/>
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
									required
								/>
							</label>
						</div>
						<div>
							<label>
								<h4>ტელეფონის ნომერი</h4>
								<input
									type="tel"
									name="phone"
									value={formData.phone}
									onChange={handleChange}
								/>
							</label>
						</div>
					</div>
					<div>
						<h4>ატვირთეთ ფოტო *</h4>
						<div className={styles.photoUpload}>
							<input
								type="file"
								accept="image/*"
								onChange={handleFileChange}
								style={{ display: 'none' }}
								id="fileInput"
							/>
							<label htmlFor="fileInput">
								<img src="/images/icons/plus-circle.png" alt="Upload" />
							</label>
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
	);
}

export default AddAgent;
