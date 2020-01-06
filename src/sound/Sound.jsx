import React from 'react';
import PropTypes from 'prop-types';

function Sound({ timer, stopTimer, startTimer }) {
    return (
        <div>
            {timer.active ? (
                <button onClick={stopTimer}>Pause timer</button>
            ) : (
                <button onClick={startTimer}>Start timer</button>
            )}
        </div>
    );
}

Sound.propTypes = {
    timer: PropTypes.object.isRequired,
    stopTimer: PropTypes.func.isRequired,
    startTimer: PropTypes.func.isRequired,
};

export default Sound;
