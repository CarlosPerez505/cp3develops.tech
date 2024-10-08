import React from 'react';

const GetStartedButton = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-500 transition"
        >
            Get Started
        </button>
    );
};

export default GetStartedButton;
