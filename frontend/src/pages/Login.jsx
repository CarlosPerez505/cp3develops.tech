import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Login = () => {
    const { loginWithRedirect } = useAuth0();

    const handleAuth0Login = async () => {
        // Auth0 login redirect
        await loginWithRedirect({
            redirectUri: window.location.origin + '/blogAdmin'
        });
    };

    return (
        <div className="min-h-screen bg-[#1a1f2e] flex items-center justify-center">
            <div className="w-full max-w-md bg-white rounded-lg p-8">
                <h2 className="text-2xl font-semibold text-center text-[#1a1f2e] mb-8">
                    Welcome to the Admin Portal
                </h2>

                <button
                    type="button"
                    onClick={handleAuth0Login}
                    className="w-full bg-[#1a1f2e] text-white py-3 rounded hover:bg-[#252b3b] transition-colors"
                >
                    Log In with Auth0
                </button>
            </div>
        </div>
    );
};

export default Login;
