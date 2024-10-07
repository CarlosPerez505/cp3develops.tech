import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // Adjust path

const AboutMe = ({ theme }) => {
    return (
        <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">About Me</h2>
            <Card className={`${
                theme === 'dark'
                    ? 'bg-darkPurple bg-opacity-50 backdrop-filter backdrop-blur-lg shadow-lg'
                    : 'bg-lightViolet bg-opacity-50 backdrop-filter backdrop-blur-lg shadow-md'
            } border-none p-6`}>
                <CardContent>
                    <p>
                        I am a full-stack web developer and engineer with over 11 years of professional mechanical
                        experience. My background in mechanical work has given me a unique perspective that I now apply
                        to building impactful and reliable software solutions.
                    </p>
                </CardContent>
            </Card>
        </section>
    );
};

export default AboutMe;
