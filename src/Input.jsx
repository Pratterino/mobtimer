import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './Input.scss';

class Input extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "",
        };
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.handleInputSubmit(this.state.text);
        this.setState({
            text: "",
        });
    };

    render() {
        return (
            <form className="Input" onSubmit={this.handleSubmit}>
                <div className="input-container">
                    <div className="parent">
                        <label
                            className="add"
                            htmlFor="input-name"
                        >Add name</label>
                        <input
                            name="input-name"
                            value={this.state.text}
                            className="message"
                            autoComplete="off"
                            type="text"
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

