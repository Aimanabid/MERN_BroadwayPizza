import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './Location.css'; // Assuming you create this CSS file for styles
import Navbar from '../../Navbar/Navbar';
import Logo from '../../Logo/Logo';

const Location = () => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);

  const branches = [
    // Lahore Branches
    { name: "Broadway Pizza DHA Phase 5, Lahore", lat: 31.4622, lng: 74.4092 },
    { name: "Broadway Pizza Gulberg 3, Lahore", lat: 31.5204, lng: 74.3469 },
    { name: "Broadway Pizza Johar Town, Lahore", lat: 31.4722, lng: 74.2817 },
    { name: "Broadway Pizza Emporium Mall, Lahore", lat: 31.46798, lng: 74.2652 },
    { name: "Broadway Pizza Shadman, Lahore", lat: 31.5497, lng: 74.3357 },
    { name: "Broadway Pizza Bahria Town, Lahore", lat: 31.3654, lng: 74.2179 },
    // Karachi Branches  
    { name: "Broadway Pizza Clifton, Karachi", lat: 24.8138, lng: 67.0299 },
    { name: "Broadway Pizza DHA Phase 2, Karachi", lat: 24.8216, lng: 67.0694 },
    { name: "Broadway Pizza Gulshan-e-Iqbal, Karachi", lat: 24.9212, lng: 67.1100 },
    { name: "Broadway Pizza North Nazimabad, Karachi", lat: 24.9401, lng: 67.0378 },
    { name: "Broadway Pizza Bahadurabad, Karachi", lat: 24.8899, lng: 67.0844 },
    { name: "Broadway Pizza Shaheed-e-Millat, Karachi", lat: 24.8652, lng: 67.0774 },
    // Islamabad Branches
    { name: "Broadway Pizza F-10 Markaz, Islamabad", lat: 33.6957, lng: 73.0153 },
    { name: "Broadway Pizza Blue Area, Islamabad", lat: 33.7068, lng: 73.0577 },
    { name: "Broadway Pizza G-11 Markaz, Islamabad", lat: 33.6844, lng: 73.0497 },
    // Rawalpindi Branches
    { name: "Broadway Saddar, Rawalpindi", lat: 33.5979, lng: 73.0473 },
    { name: "Broadway Peshawar Road, Rawalpindi", lat: 33.6164, lng: 73.0331 },
    // Faisalabad Branches
    { name: "Broadway D Ground, Faisalabad", lat: 31.4067, lng: 73.0869 },
    { name: "Broadway Jinnah Colony, Faisalabad", lat: 31.4203, lng: 73.0790 },
    // Multan Branches
    { name: "Broadway Gulgasht Colony, Multan", lat: 30.2154, lng: 71.4674 },
    { name: "Broadway Cantt Area, Multan", lat: 30.1860, lng: 71.4840 },
    // Gujranwala Branch
    { name: "Broadway Citi Housing, Gujranwala", lat: 32.1595, lng: 74.1836 },
    // Sialkot Branch
    { name: "Broadway Cantt Area, Sialkot", lat: 32.5060, lng: 74.5381 },
  ];

  function getDistance(lat1, lon1, lat2, lon2) {
    const R = 6371e3; // Earth radius in meters
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in meters
  }

  function findNearestBranches(userLat, userLng, numBranches = 3) {
    const distances = branches.map(branch => ({
      branch,
      distance: getDistance(userLat, userLng, branch.lat, branch.lng)
    }));

    // Sort branches by distance
    distances.sort((a, b) => a.distance - b.distance);

    // Return the closest branches
    return distances.slice(0, numBranches).map(item => item.branch);
  }

  useEffect(() => {
    // Initialize the map
    mapInstance.current = L.map(mapRef.current).setView([31.5204, 74.3469], 12); // Default location (Lahore)

    // Add OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(mapInstance.current);

    // Set the default marker icon
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
      iconUrl: require('leaflet/dist/images/marker-icon.png'),
      shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
    });

    // Try to get the user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;

        // Add a marker for the user's current location
        const userMarker = L.marker([userLat, userLng]).addTo(mapInstance.current)
          .bindPopup("Your Location")
          .openPopup();

        // Find the nearest three Broadway Pizza branches
        const nearestBranches = findNearestBranches(userLat, userLng);

        // Add markers for the nearest branches
        nearestBranches.forEach(branch => {
          L.marker([branch.lat, branch.lng]).addTo(mapInstance.current)
            .bindPopup(branch.name);
        });

        // Center the map on the user's location
        mapInstance.current.setView([userLat, userLng], 11);

      }, () => {
        alert("Geolocation failed. Using default location.");
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }

    // Cleanup on unmount
    return () => {
      mapInstance.current.remove();
    };
  }, []);

  return (
    <>
      <div className="container-fluid">
        <div className="row">
            <Navbar />
          <div className="col-11">
            <Logo />
            <div className="container">
              <h5 className="text-center"> Our Location</h5>
              <div className="row">
                <div id="map" ref={mapRef} style={{ height: '500px' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Location;
