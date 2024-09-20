import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Loader, Home, Layers, Users, Image as ImageIcon } from 'lucide-react';
import Header from './Header'; // Import the Header component

const BuildingDetails = () => {
    const { id } = useParams();
    const [building, setBuilding] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [currentImage, setCurrentImage] = useState('');

    useEffect(() => {
        const fetchBuildingDetails = async () => {
            try {
                const response = await axios.get(`http://metacampi.pythonanywhere.com/api/buildings/${id}`);
                setBuilding(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch building details');
                setLoading(false);
            }
        };

        fetchBuildingDetails();
    }, [id]);

    const openModal = (image) => {
        setCurrentImage(image);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setCurrentImage('');
    };

    if (loading) return <LoadingSkeleton />;
    if (error) return <div className="text-red-500 text-center">{error}</div>;

    return (
        <div className="container">
            <Header /> {/* Include the Header component */}
            <div className='mx-auto px-4 py-8'>
            <h1 className="text-xl font-bold mb-4">{building.name}</h1>
            <Carousel showThumbs={false} showStatus={false} infiniteLoop>
                {building.images.map((img, index) => (
                    <div key={index} className="relative">
                        <img 
                            src={img.image} 
                            alt={`${building.name} - ${index + 1}`} 
                            className="w-full h-72 object-cover rounded-lg shadow-md cursor-pointer" 
                            onClick={() => openModal(img.image)} 
                        />
                    </div>
                ))}
            </Carousel>
            {modalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={closeModal}>
                    <img src={currentImage} alt="Modal" className="max-w-full max-h-full" />
                </div>
            )}
            <div className="mt-8 ">
                <p className="text-gray-700 mb-2">{building.description}</p>
                <div className="flex items-center mb-6">
                    <Home className="mr-2 text-gray-600" /> <span className="text-gray-600">Floors: {building.floors}</span>
                </div>
                <h3 className="font-semibold mt-4"><Layers className="inline mr-2 text-gray-600" />Offices:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {building.offices.map((office, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-md p-4 flex items-center">
                            <Users className="text-gray-600 mr-2" />
                            <div>
                                <h4 className="font-semibold">{office.name}</h4>
                                <p className="text-gray-600">Floor {office.floor}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <h3 className="font-semibold mt-4"><ImageIcon className="inline mr-2 text-gray-600" />Lecture Halls:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {building.lecture_halls.map((hall, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-md p-4 flex items-center">
                            <ImageIcon className="text-gray-600 mr-2" />
                            <div>
                                <h4 className="font-semibold">{hall.name}</h4>
                                <p className="text-gray-600">Floor {hall.floor}, Capacity: {hall.capacity}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            </div>
        </div>
    );
};

const LoadingSkeleton = () => (
    <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
            <div className="h-48 bg-gray-300 rounded-lg mb-4"></div>
            <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
        </div>
    </div>
);

export default BuildingDetails;
