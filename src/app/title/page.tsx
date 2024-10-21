"use client"; // Ensure this is a client component
import { useEffect, useState } from 'react';

interface Title {
    _id: string;
    'title:': string
}

export default function TitlePage() {
    const [titles, setTitles] = useState<Title[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);



    useEffect(() => {
        const fetchTitles = async () => {
            try {
                const response = await fetch('/api/title');
                console.log("response from front page", response);
                if (!response.ok) {
                    throw new Error('Failed to fetch titles');
                }
                const data = await response.json();
                setTitles(data);
                console.log("data", data);
            } catch (err:any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTitles();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>Titles</h1>
            <ul>
                {titles.map((titleObj) => (
                    <li key={titleObj._id}>
                        <h2>{titleObj['title:']}</h2>
                    </li>
                ))}
            </ul>
        </div>
    );
}
