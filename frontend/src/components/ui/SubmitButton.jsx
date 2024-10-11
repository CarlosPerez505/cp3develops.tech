import React from 'react';

const SubmitButton = ({ loading }) => {
    return (
        <button
            type="submit"
            className={`bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
        >
            {loading ? 'Sending...' : 'Send Message'}
        </button>
    );
};

export default SubmitButton;
