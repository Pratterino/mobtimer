import React, { useState } from 'react';
import './Input.scss';

interface IProps {
    handleInputSubmit: Function;
}

function Input({ handleInputSubmit }: IProps) {
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleInputSubmit(inputValue);
        setInputValue('');
    };

    return (
        <form className="Input" onSubmit={handleSubmit}>
            <div className="input-container">
                <div className="parent">
                    <label htmlFor="input-name">Add user</label>
                    <input
                        name="input-name"
                        value={inputValue}
                        className="message"
                        autoComplete="off"
                        type="text"
                        onChange={e => {
                            setInputValue(e.target.value);
                        }}
                    />
                </div>
            </div>
        </form>
    );
}

export default Input;
