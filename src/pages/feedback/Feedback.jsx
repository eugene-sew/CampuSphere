import React, { useState } from 'react';
import axios from 'axios';

const Feedback = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [feedback, setFeedback] = useState('');
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState('');
	const [showToast, setShowToast] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError('');
		setSuccess(false);

		try {
			const response = await axios.post('http://metacampi.pythonanywhere.com/api/feedback/', {
				name,
				email,
				feedback,
			});
			if (response.status === 200) {
				setSuccess(true);
				setShowToast(true);
				setName('');
				setEmail('');
				setFeedback('');
				setTimeout(() => setShowToast(false), 3000); // Hide toast after 3 seconds
			}
		} catch (err) {
			setError('Failed to submit feedback. Please try again later.');
		} finally {
			setLoading(false);
		}
	};

	const handleNewFeedback = () => {
		setSuccess(false);
		setShowToast(false);
	};

	return (
		<div className="bg-green-100 min-h-screen p-4 md:p-8 flex items-center justify-center">
			{showToast && (
				<div className="absolute top-4 right-4 bg-green-500 text-white p-3 rounded-md shadow-md">
					Thank you for your feedback!
				</div>
			)}
			{!success ? (
				<div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
					<h1 className="text-2xl font-bold mb-4">Feedback</h1>
					{error && <div className="text-red-500 mb-4">{error}</div>}
					<form onSubmit={handleSubmit}>
						<div className="mb-4">
							<label className="block text-sm font-medium mb-1" htmlFor="name">Name</label>
							<input
								type="text"
								id="name"
								value={name}
								onChange={(e) => setName(e.target.value)}
								required
								className="border border-gray-300 rounded-md p-2 w-full"
							/>
						</div>
						<div className="mb-4">
							<label className="block text-sm font-medium mb-1" htmlFor="email">Email</label>
							<input
								type="email"
								id="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
								className="border border-gray-300 rounded-md p-2 w-full"
							/>
						</div>
						<div className="mb-4">
							<label className="block text-sm font-medium mb-1" htmlFor="feedback">Feedback</label>
							<textarea
								id="feedback"
								value={feedback}
								onChange={(e) => setFeedback(e.target.value)}
								required
								rows="4"
								className="border border-gray-300 rounded-md p-2 w-full"
							/>
						</div>
						<button
							type="submit"
							disabled={loading}
							className={`w-full bg-blue-500 text-white rounded-md p-2 ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
						>
							{loading ? 'Submitting...' : 'Submit Feedback'}
						</button>
					</form>
				</div>
			) : (
				<div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
					<h1 className="text-2xl font-bold mb-4">Feedback Submitted!</h1>
					<p className="text-gray-700 mb-4">Thank you for your feedback. We appreciate your input!</p>
					<button
						onClick={handleNewFeedback}
						className="w-full bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600"
					>
						Submit New Feedback
					</button>
				</div>
			)}
		</div>
	);
};

export default Feedback;