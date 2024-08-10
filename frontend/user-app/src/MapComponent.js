import React, { useEffect, useState } from 'react';
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';
import io from 'socket.io-client';

const MapComponent = () => {
    const [locations, setLocations] = useState([]);
    const socket = io('http://localhost:5000'); // Adjust URL as needed

    useEffect(() => {
        socket.on('location_update', (data) => {
            setLocations(prevLocations => [...prevLocations.filter(loc => loc.vehicleId !== data.vehicleId), data]);
        });

        return () => {
            socket.disconnect();
        };
    }, [socket]);

    return (
        <LoadScript googleMapsApiKey="AIzaSyB8A3GQxkkTbhvfWOw-xptqG77UNoPy1gA">
            <GoogleMap
                mapContainerStyle={{ height: "400px", width: "800px" }}
                center={{ lat: locations[0]?.latitude || 0, lng: locations[0]?.longitude || 0 }}
                zoom={10}
            >
                {locations.map((loc, index) => (
                    <Marker
                        key={index}
                        position={{ lat: loc.latitude, lng: loc.longitude }}
                    />
                ))}
            </GoogleMap>
        </LoadScript>
    );
};

export default MapComponent;
