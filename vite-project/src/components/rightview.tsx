import React, { useState } from "react";

export default function Rightview() {
    const [result, setResult] = useState<string | null>(null);
    const [userInput, setUserInput] = useState<string>('');

    const guessNumber = () => {
        const randomNumber = Math.floor(Math.random() * 10);

        if (userInput !== '' && !isNaN(Number(userInput))) {
            if (parseInt(userInput) === randomNumber) {
                setResult('정답입니다! 🎉');
            } else {
                setResult(`틀렸습니다. 정답은 ${randomNumber}입니다.`);
            }
        } else {
            alert('올바른 숫자를 입력하세요.');
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setUserInput(e.target.value);
    };

    return (
        <div>
            <textarea
                value={userInput}
                onChange={handleInputChange}
                placeholder="0부터 9까지의 숫자를 입력하세요"
            />
            <br />
            <button onClick={guessNumber}>Guess a Number</button>
            <h1>{result}</h1>
        </div>
    );
}
