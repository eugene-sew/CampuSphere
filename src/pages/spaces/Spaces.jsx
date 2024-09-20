import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Spaces = () => {
    const [spaces, setSpaces] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSpaces = async () => {
            try {
                const response = await axios.get('http://metacampi.pythonanywhere.com/api/places');
                setSpaces(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch spaces data');
                setLoading(false);
            }
        };

        fetchSpaces();
    }, []);

    if (loading) return <LoadingSkeleton />;
    if (error) return <div className="text-red-500 text-center">{error}</div>;

    return (
        <div className="bg-green-100 min-h-screen p-4 md:p-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-4">Campus Spaces</h1>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {spaces.map((space) => (
                    <SpaceCard key={space.id} space={space} />
                ))}
            </div>
        </div>
    );
};

const SpaceCard = ({ space }) => {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-40 md:h-48">
                <img src={space.images[0].image} alt={space.name} className="w-full h-full object-cover" />
            </div>
            <div className="p-4">
                <h2 className="text-lg md:text-xl font-semibold mb-2">{space.name}</h2>
                <p className="text-gray-600 text-sm md:text-base">{space.description}</p>
            </div>
        </div>
    );
};

const LoadingSkeleton = () => (
    <div className="bg-green-100 min-h-screen p-4 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-4 animate-pulse">Campus Spaces</h1>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Array(6).fill().map((_, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
                    <div className="h-40 md:h-48 bg-gray-300"></div>
                    <div className="p-4">
                        <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
                        <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

export default Spaces