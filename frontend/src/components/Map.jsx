import React, { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import {Tabs, TabsList, TabsTrigger} from "@radix-ui/react-tabs";
import axios from 'axios'; // We'll use axios for making API calls

const VITE_MAPBOX_ACCESS_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const Map = () => {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [showHeatMap, setShowHeatMap] = useState(true);
    const [showMarkers, setShowMarkers] = useState(true);
    const [isDayMode, setIsDayMode] = useState(true); // Track day/night mode
    const [searchQuery, setSearchQuery] = useState(''); // Search input state
    const markersRef = useRef({});

    // Coordinates for Albuquerque, NM
    const albuquerqueCenter = [-106.6504, 35.0844];
    const zoomedOutCenter = [0, 0]; // Approximate center of the earth

    const fakeHeatMapData = [
        { latitude: 36.4072, longitude: -105.573, description: 'Taos, NM' },
        { latitude: 34.5199, longitude: -105.8701, description: 'Roswell, NM' },
        { latitude: 35.6870, longitude: -105.9378, description: 'Santa Fe, NM' },
        { latitude: 35.0844, longitude: -106.6504, description: 'Albuquerque, NM' },
        { latitude: 32.2217, longitude: -110.9265, description: 'Tucson, AZ' }
    ];

    // Initialize the map
    useEffect(() => {
        if (map.current) return; // Prevent re-initialization

        mapboxgl.accessToken = VITE_MAPBOX_ACCESS_TOKEN;
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12', // Start in day mode
            center: zoomedOutCenter, // Start from space
            zoom: 1, // Space zoom level
            pitch: 45,
            bearing: -20,
            projection: 'globe', // Enable globe projection for 3D
        });

        // Add navigation controls (zoom and rotation)
        map.current.addControl(new mapboxgl.NavigationControl());

        // Optionally add a geolocation control to center on user's location
        map.current.addControl(new mapboxgl.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true
            },
            trackUserLocation: true,
            showUserHeading: true
        }));

        // Optionally add fullscreen control
        map.current.addControl(new mapboxgl.FullscreenControl());

        map.current.on('style.load', () => {
            map.current.setProjection('globe'); // Ensure globe projection
            map.current.setPaintProperty('background', 'background-color', isDayMode ? '#87ceeb' : '#001122'); // Set appropriate globe color
        });

        map.current.on('load', () => {
            map.current.resize();
            addHeatMapLayer(fakeHeatMapData);
            addPersonMarkers(fakeHeatMapData);

            // Fly to Albuquerque after a delay to simulate starting from space
            setTimeout(() => {
                map.current.flyTo({
                    center: albuquerqueCenter, // Albuquerque coordinates
                    zoom: 17, // Zoom closely to buildings level
                    speed: 1.5, // Animation speed
                    curve: 1.8, // Path curve during the animation
                    pitch: 60, // Tilt for 3D effect
                    bearing: -20, // Ensure bearing remains consistent
                    essential: true // Ensures the animation runs smoothly on all devices
                });

                // Add 3D buildings
                map.current.addLayer({
                    id: '3d-buildings',
                    source: 'composite',
                    'source-layer': 'building',
                    filter: ['==', 'extrude', 'true'],
                    type: 'fill-extrusion',
                    minzoom: 15,
                    paint: {
                        'fill-extrusion-color': isDayMode ? '#aaa' : '#444', // Day: lighter color, Night: darker color
                        'fill-extrusion-height': [
                            'interpolate',
                            ['linear'],
                            ['zoom'],
                            15,
                            0,
                            16,
                            ['get', 'height']
                        ],
                        'fill-extrusion-base': [
                            'interpolate',
                            ['linear'],
                            ['zoom'],
                            15,
                            0,
                            16,
                            ['get', 'min_height']
                        ],
                        'fill-extrusion-opacity': 0.8 // Adjust opacity for better visibility
                    }
                });
            }, 2000); // Start animation after a delay of 2 seconds
        });
    }, [isDayMode]); // Also trigger when day/night mode changes

    const addHeatMapLayer = (data) => {
        if (!map.current || !data.length) return;

        if (map.current.getSource('heat')) {
            map.current.removeLayer('heatmap-layer');
            map.current.removeSource('heat');
        }

        map.current.addSource('heat', {
            type: 'geojson',
            data: {
                type: 'FeatureCollection',
                features: data.map(point => ({
                    type: 'Feature',
                    geometry: { type: 'Point', coordinates: [point.longitude, point.latitude] }
                }))
            }
        });

        map.current.addLayer({
            id: 'heatmap-layer',
            type: 'heatmap',
            source: 'heat',
            layout: { visibility: showHeatMap ? 'visible' : 'none' },
            paint: {
                'heatmap-weight': 1,
                'heatmap-intensity': ['interpolate', ['linear'], ['zoom'], 0, 1, 9, 3],
                'heatmap-color': [
                    'interpolate',
                    ['linear'],
                    ['heatmap-density'],
                    0, 'rgba(33,102,172,0)',
                    0.2, 'rgb(103,169,207)',
                    0.4, 'rgb(209,229,240)',
                    0.6, 'rgb(253,219,199)',
                    0.8, 'rgb(239,138,98)',
                    1, 'rgb(178,24,43)'
                ],
                'heatmap-radius': ['interpolate', ['linear'], ['zoom'], 0, 2, 9, 20],
                'heatmap-opacity': 0.7,
            }
        });
    };

    const addPersonMarkers = (data) => {
        if (!map.current) return;

        Object.values(markersRef.current).forEach(marker => marker.remove());
        markersRef.current = {};

        data.forEach((location, index) => {
            const el = document.createElement('div');
            el.className = 'marker';
            el.style.backgroundColor = 'red';
            el.style.width = '12px';
            el.style.height = '12px';
            el.style.borderRadius = '50%';

            const popup = new mapboxgl.Popup({ offset: 25 }).setText(location.description);

            const marker = new mapboxgl.Marker(el)
                .setLngLat([location.longitude, location.latitude])
                .setPopup(popup);

            markersRef.current[index] = marker;
            if (showMarkers) marker.addTo(map.current);
        });
    };

    const handleToggleHeatMap = () => {
        setShowHeatMap((prev) => {
            const newVisibility = !prev;
            if (map.current && map.current.getLayer('heatmap-layer')) {
                map.current.setLayoutProperty(
                    'heatmap-layer',
                    'visibility',
                    newVisibility ? 'visible' : 'none'
                );
            }
            return newVisibility;
        });
    };

    const handleToggleMarkers = () => {
        setShowMarkers((prev) => {
            const newVisibility = !prev;
            Object.values(markersRef.current).forEach(marker => {
                if (newVisibility) {
                    marker.addTo(map.current);
                } else {
                    marker.remove();
                }
            });
            return newVisibility;
        });
    };

    const handleToggleDayNight = () => {
        if (isDayMode) {
            map.current.setStyle('mapbox://styles/mapbox/dark-v10'); // Switch to night mode
            map.current.once('style.load', () => {
                map.current.setPaintProperty('background', 'background-color', '#001122'); // Night mode globe color
                map.current.setProjection('globe');
            });
        } else {
            map.current.setStyle('mapbox://styles/mapbox/light-v10'); // Switch to day mode
            map.current.once('style.load', () => {
                map.current.setPaintProperty('background', 'background-color', '#87ceeb'); // Day mode globe color
                map.current.setProjection('globe');
            });
        }
        setIsDayMode(!isDayMode); // Toggle the mode
    };

    // Search function using Mapbox Geocoding API
    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery) return;
        try {
            const response = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery}.json`, {
                params: {
                    access_token: VITE_MAPBOX_ACCESS_TOKEN,
                    limit: 1
                }
            });
            const result = response.data.features[0];
            if (result) {
                const [longitude, latitude] = result.center;
                map.current.flyTo({
                    center: [longitude, latitude],
                    zoom: 14, // Zoom in on the search result
                    speed: 1.5,
                    curve: 1.8,
                    essential: true
                });
            }
        } catch (error) {
            console.error("Error searching location: ", error);
        }
    };

    return (
        <div className="w-full max-w-7xl mx-auto p-4 bg-gray-900 text-white">
            {/* Search bar */}
            <form onSubmit={handleSearch} className="mb-4">
                <input
                    type="text"
                    placeholder="Search location..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="px-4 py-2 rounded w-full text-black"
                />
                <button type="submit" className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    Search
                </button>
            </form>

            <div className="bg-gray-800 shadow-md p-4 mb-4 rounded-lg">
                <Tabs defaultValue="Heatmap" onValueChange={(value) => {
                    if (value === "Heatmap") handleToggleHeatMap();
                    if (value === "Markers") handleToggleMarkers();
                    if (value === "DayNight") handleToggleDayNight();
                }}>
                    <TabsList className="flex gap-4 mb-8">
                        <TabsTrigger value="Heatmap" className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-purple-600">
                            Toggle Heatmap
                        </TabsTrigger>
                        <TabsTrigger value="Markers" className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-purple-600">
                            Toggle Markers
                        </TabsTrigger>
                        <TabsTrigger value="DayNight" className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-purple-600">
                            Toggle Day/Night
                        </TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>

            <div
                ref={mapContainer}
                className="w-full h-[500px] sm:h-[600px] rounded-lg overflow-hidden shadow-lg"
            />
        </div>
    );
};

export default Map;
