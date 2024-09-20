import React, { useState, useEffect } from 'react';
import Map, { Marker } from 'react-map-gl';
import DeckGL from '@deck.gl/react';
import { PolygonLayer } from '@deck.gl/layers';
import axios from 'axios';
import { MapPin } from 'lucide-react'; // Import the location pin icon

const PKEY = 'pk.eyJ1IjoiMWV1Z2VuZWRldiIsImEiOiJjbHprMDEwZjEwMGdhMmpzYzhuZm1sMzZ0In0.4AI9CH3UZTnPMgK6p-fGNw';
const MAP_STYLE = 'mapbox://styles/mapbox/streets-v11'; // Flat street style
const INITIAL_VIEW_STATE = {
  longitude: 0.4697674512863159,
  latitude: 6.590838339577427,
  zoom: 15, // Adjusted for a flat view
  pitch: 0, // Flat view
  bearing: 0
};

function Maps() {
  const [places, setPlaces] = useState([]);
  const [spaces, setSpaces] = useState([]);

  useEffect(() => {
    const fetchPlacesAndSpaces = async () => {
      try {
        const placesResponse = await axios.get('http://metacampi.pythonanywhere.com/api/places/'); // Update with your API endpoint
        const spacesResponse = await axios.get('http://metacampi.pythonanywhere.com/api/buildings/'); // Update with your API endpoint
        setPlaces(placesResponse.data);
        setSpaces(spacesResponse.data);
      } catch (error) {
        console.error('Error fetching places and spaces:', error);
      }
    };

    fetchPlacesAndSpaces();
  }, []);

  const renderMarker = (item) => {
    const hasImage = item.images && item.images.length > 0;
    return (
      <Marker
        key={item.id}
        longitude={item.longitude}
        latitude={item.latitude}
        anchor="bottom"
      >
        {hasImage ? (
          <img src={item.images[0].image} alt={item.name} className="w-10 h-10 rounded-full" />
        ) : (
          <MapPin className="w-10 h-10 text-red-500" />
        )}
      </Marker>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Campus Map</h1>
      <DeckGL
        initialViewState={INITIAL_VIEW_STATE}
        controller={true}
      >
        <Map
          mapStyle={MAP_STYLE}
          mapboxAccessToken={PKEY}
        >
          {/* Render markers for places */}
          {places.map(renderMarker)}
          {/* Render markers for spaces */}
          {spaces.map(renderMarker)}
        </Map>
      </DeckGL>
    </div>
  );
}

export default Maps;
