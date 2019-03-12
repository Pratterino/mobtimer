import React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {finishedSounds} from "./../sound/sounds";
import {playFinishedSound, setFinishedSound} from "./../sound/soundActions";
import {activeSoundSelector} from "./../sound/soundReducer";
import {Emojione} from "react-emoji-render";
import "./SoundSelector.scss"

class SoundSelector extends React.PureComponent {
    handleChange = (event) => {
        this.props.setFinishedSound(event.target.value);
    };

    renderOptions = () => {
        return finishedSounds.map(sound => (
            <option
                key={sound.filename}
                value={sound.filename}
                selected={this.props.activeFilename === sound.filename}
            >{sound.displayName}</option>
        ));
    };

    render() {
        return (
            <div className="sound-selector">
                <select
                    onChange={this.handleChange}
                >{this.renderOptions()}
                </select>
                <div className="sound-selector__play" onClick={this.props.playFinishedSound}>
                    <Emojione
                        text=":arrow_forward:"
                    />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    activeFilename: activeSoundSelector(state),
});


const mapDispatchToProps = dispatch => bindActionCreators({
    playFinishedSound,
    setFinishedSound,
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(SoundSelector);
