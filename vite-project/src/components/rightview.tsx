
export default function Rightview() {
}


import React, { useState, useEffect } from 'react';

const Game = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <div>
            <div
                style={{
                    position: 'absolute',
                    left: position.x,
                    top: position.y,
                    width: '20px',
                    height: '20px',
                    backgroundColor: 'red',
                }}
            ></div>
        </div>
    );
};

export default Game;
