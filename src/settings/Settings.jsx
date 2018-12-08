import React, {Component} from "react";

class Settings extends Component {
    handleChange = (event) => {
        console.log("TODO: ", {minutes: event.target.value})
    };

    render() {
        return (
            <div>
                Inga settings ännu.
            </div>
        );
    }
}

export default Settings;
