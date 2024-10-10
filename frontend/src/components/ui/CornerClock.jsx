import React, { useEffect, useState } from 'react';

const CornerClock = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatTime = (date) => {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    };

    return (
        <div className="fixed top-4 right-4 bg-gray-800 text-white p-2 rounded-md shadow-lg">
            <span className="font-mono text-lg">{formatTime(time)}</span>
        </div>
    );
};

export default CornerClock;