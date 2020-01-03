import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import { getParsedTimeRemaining } from './../helper/TimerHelper';

export function TimeRemaining({ timer = {} }) {
    const time = getParsedTimeRemaining(timer.currentTime);

    return (
        <div className="timer__time">
            <div className="timer__container">
                <div className="timer__time--numbers">{time}</div>
                <div className="timer__time--icons">
                    <FontAwesomeIcon icon={timer.active ? faPause : faPlay} />
                </div>
            </div>
        </div>
    );
}
