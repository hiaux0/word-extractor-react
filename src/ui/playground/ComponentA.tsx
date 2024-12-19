import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { sharedArrayAtom } from './state';

const ComponentA = () => {
    const [array, setArray] = useAtom(sharedArrayAtom);
    const [input, setInput] = useState("");

    const addToArray = () => {
        if (input.trim()) {
            setArray([...array, input]);
            setInput("");
        }
    };

    return (
        <div>
            <h2>Component A</h2>
            <input 
                type="text" 
                value={input} 
                onChange={(e) => setInput(e.target.value)} 
                placeholder="Add an item" 
            />
            <button onClick={addToArray}>Add</button>
        </div>
    );
};

export default ComponentA;
