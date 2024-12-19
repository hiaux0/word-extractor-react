import React from 'react';
import { useAtom } from 'jotai';
import { sharedArrayAtom } from './state';

const ComponentB = () => {
    const [array] = useAtom(sharedArrayAtom);

    return (
        <div>
            <h2>Component B</h2>
            <ul>
                {array.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    );
};

export default ComponentB;
