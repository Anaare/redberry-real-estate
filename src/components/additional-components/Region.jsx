import { useState, useEffect } from 'react';

function Region() {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(
					'https://api.real-estate-manager.redberryinternship.ge/api/cities',
					{
						method: 'GET',
						headers: {
							'Content-Type': 'application/json',
						},
					}
				);

				if (!response.ok) {
					const errorText = await response.text();
					throw new Error(
						`Network response was not ok. Status: ${response.status}. Error: ${errorText}`
					);
				}

				const result = await response.json();
				setData(result);
			} catch (error) {
				console.error('Fetch error:', error);
				setError(error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error.message}</p>;

	return <div></div>;
}

export default Region;
