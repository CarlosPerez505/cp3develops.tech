import React, { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const VITE_MAPBOX_ACCESS_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const Map = () => {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [showHeatMap, setShowHeatMap] = useState(true);
    const [mapStyle, setMapStyle] = useState('mapbox://styles/mapbox/streets-v12');
    const markersRef = useRef({});

    // Starting from a very zoomed out position (space)
    const spaceCenter = [0, 0]; // Approximate center of the earth
    const southwestCenter = [-107.874, 36.414]; // Centered on Four Corners

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
            style: mapStyle,
            center: spaceCenter, // Start from "space"
            zoom: 1, // Very zoomed out, simulating space view
            pitch: 45,
            bearing: -20,
        });

        map.current.on('load', () => {
            map.current.resize();
            addHeatMapLayer(fakeHeatMapData);
            addPersonMarkers(fakeHeatMapData);

            // Fly to the Four Corners region on map load
            setTimeout(() => {
                map.current.flyTo({
                    center: southwestCenter, // Four Corners coordinates
                    zoom: 7, // Zoom into Four Corners region
                    speed: 1.5, // Speed of the animation
                    curve: 1.8, // Path curve during animation
                    easing: (t) => t, // Linear easing
                    essential: true // Makes sure the animation happens on all devices
                });
            }, 2000); // Delay the flyTo by 2 seconds to let the map load
        });
    }, [mapStyle]); // Re-run effect when map style changes

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
            if (!showHeatMap) marker.addTo(map.current); // Show markers only if heatmap is off
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
            // Toggle markers based on the heatmap visibility
            Object.values(markersRef.current).forEach(marker => {
                if (newVisibility) {
                    marker.remove();
                } else {
                    marker.addTo(map.current);
                }
            });

            return newVisibility;
        });
    };

    return (
        <div className="w-full max-w-7xl mx-auto p-4 bg-gray-900 text-white">
            <div className="bg-gray-800 shadow-md p-4 mb-4 rounded-lg">
                <button
                    onClick={handleToggleHeatMap}
                    className="w-full sm:w-auto mt-4 bg-red-600 text-white px-4 py-2 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors duration-300"
                >
                    {showHeatMap ? 'Hide Heatmap' : 'Show Heatmap'}
                </button>
            </div>

            <div
                ref={mapContainer}
                className="w-full h-[500px] sm:h-[600px] rounded-lg overflow-hidden shadow-lg"
            />
        </div>
    );
};

export default Map;


