import React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {finishedSounds} from "./../sound/sounds";
import {setFinishedSound} from "./../sound/soundActions";
import {activeSoundSelector} from "./../sound/soundReducer";

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
            <select
                onChange={this.handleChange}
            >{this.renderOptions()}
            </select>
        );
    }
}

const mapStateToProps = state => ({
    activeFilename: activeSoundSelector(state),
});


const mapDispatchToProps = dispatch => bindActionCreators({
    setFinishedSound,
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(SoundSelector);
