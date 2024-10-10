import React from 'react';

const GetStartedButton = ({ onClick, disabled }) => {
    return (
        <button
            onClick={onClick}
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={disabled}
        >
            Send Message
        </button>
    );
};

export default GetStartedButton;