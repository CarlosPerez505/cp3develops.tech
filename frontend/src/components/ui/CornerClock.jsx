import React, { useEffect, useState } from 'react';

const CornerCountdown = () => {
    const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeRemaining(calculateTimeRemaining());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    function calculateTimeRemaining() {
        const now = new Date();
        const targetDate = getNextSundayMidnight();
        const difference = targetDate - now;

        const time = {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / (1000 * 60)) % 60),
            seconds: Math.floor((difference / 1000) % 60),
        };

        return time;
    }

    function getNextSundayMidnight() {
        const now = new Date();
        const sunday = new Date(now);
        sunday.setDate(now.getDate() + ((7 - now.getDay()) % 7));
        sunday.setHours(24, 0, 0, 0); // Set to midnight
        return sunday;
    }

    const formatTime = ({ days, hours, minutes, seconds }) => {
        return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    };

    return (
        <div className="fixed top-4 right-4 p-6 rounded-lg shadow-lg bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800">
            <div className="text-center font-mono text-4xl text-white animate-pulse">
                <span className="block text-glow">
                    {formatTime(timeRemaining)}
                </span>
            </div>
        </div>
    );
};

export default CornerCountdown;

