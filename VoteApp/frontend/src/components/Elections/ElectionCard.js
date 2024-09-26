import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ElectionCard from './ElectionCard';

const ElectionList = () => {
    const [elections, setElections] = useState([]);

    useEffect(() => {
        const fetchElections = async () => {
            const res = await axios.get('/api/elections');
            setElections(res.data);
        };
        fetchElections();
    }, []);

    return (
        <div>
            <h2>Available Elections</h2>
            {elections.map((election) => (
                <ElectionCard key={election._id} election={election} />
            ))}
        </div>
    );
};

export default ElectionList;