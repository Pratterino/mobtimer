import React, {Component} from "react";

class Settings extends Component {
    handleChange = (event) => {
        console.log("TODO: ", {minutes: event.target.value})
    };

    render() {
        return (
            <div>
                <h3>Minutes</h3>
                <input
                    type="number"
                    value={this.props.minutes}
                    onChange={this.handleChange}
                />
            </div>
        );
    }
}

export default Settings;
