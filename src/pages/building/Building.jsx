import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from 'react-router-dom';
import Header from './Header'; // Import the Header component
import { MapPin } from 'lucide-react'; // Import the location pin icon

const BuildingCard = ({ building }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
      <Carousel showThumbs={false} showStatus={false}>
        {building.images.map((img, index) => (
          <div key={index}>
            <img src={img.image} alt={`${building.name} - ${index + 1}`} className="w-full h-48 object-cover" />
          </div>
        ))}
      </Carousel>
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{building.name}</h2>
        <p className="text-gray-600 mb-2">{building.description.slice(0, 100)}...</p>
        <p className="text-gray-600 mb-2">Floors: {building.floors}</p>
        <div className="flex items-center space-x-2">
          <Link to={`/building/${building.id}`} className="text-blue-500 hover:text-blue-700">
            View More
          </Link>
          
        </div>
      </div>
    </div>
  );
};

const BuildingSkeleton = () => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
    <div className="h-48 bg-gray-300"></div>
    <div className="p-4">
      <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2"></div>
    </div>
  </div>
);

const Building = () => {
  const [buildings, setBuildings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBuildings = async () => {
      try {
        const response = await axios.get('http://metacampi.pythonanywhere.com/api/buildings'); 
        setBuildings(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch buildings data');
        setLoading(false);
      }
    };

    fetchBuildings();
  }, []);

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div>
      <Header /> {/* Include the Header component */}
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Campus Buildings</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading
            ? Array(6).fill().map((_, index) => <BuildingSkeleton key={index} />)
            : buildings.map((building) => (
                <BuildingCard key={building.id} building={building} />
              ))
          }
        </div>
      </div>
    </div>
  );
};

export default Building;