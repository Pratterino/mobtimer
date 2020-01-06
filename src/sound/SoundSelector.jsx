import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { finishedSounds } from './../sound/sounds';
import { playFinishedSound, setFinishedSound } from './../sound/soundActions';
import { activeSoundSelector } from './../sound/soundReducer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import './SoundSelector.scss';

function SoundSelector({ activeFilename, playFinishedSound, setFinishedSound }) {
    const handleChange = event => setFinishedSound(event.target.value);

    const renderOptions = () =>
        finishedSounds.map(sound => (
            <option key={sound.filename} value={sound.filename} selected={activeFilename === sound.filename}>
                {sound.displayName}
            </option>
        ));

    return (
        <div className="sound-selector">
            <select onChange={handleChange}>{renderOptions()}</select>
            <div className="sound-selector__play" onClick={playFinishedSound}>
                <FontAwesomeIcon size={'xs'} icon={faPlay} />
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    activeFilename: activeSoundSelector(state),
});

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            playFinishedSound,
            setFinishedSound,
        },
        dispatch,
    );
};

SoundSelector.propTypes = {
    activeFilename: PropTypes.string,
    playFinishedSound: PropTypes.func,
    setFinishedSound: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(SoundSelector);
