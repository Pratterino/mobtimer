import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './Input.scss';

class Input extends Component {

    constructor(props) {
        super(props);
        this.state = {
            editMode: true,
            text: "",
        };
    }

    onCheckboxClick = (e) => {
        e.preventDefault();
        this.setState({
            editMode: !this.state.editMode,
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.handleInputSubmit(this.state.text);
        this.setState({
            text: "",
            editMode: false,
        });
    };

    render() {
        return (
            <form className="Input" onSubmit={this.handleSubmit}>
                <div className="input-container">
                    <div className="parent">
                        <input
                            checked={this.state.editMode}
                            className="cbox"
                            type="checkbox"
                            onChange={this.onCheckboxClick}
                        />
                        <label
                            className="add"
                            onClick={this.onCheckboxClick}
                            htmlFor="cbox"
                        >{this.props.children}
                        </label>
                        <input
                            value={this.state.text}
                            className="message"
                            type="text"
                            ref={(input) => {
                                this.inputRef = input
                            }}
                            onChange={(e) => {
                                this.setState({text: e.target.value})
                            }}
                        />
                    </div>
                </div>
            </form>
        );
    }
}

Input.propTypes = {
    handleInputSubmit: PropTypes.func.isRequired,
};
export default Input;

