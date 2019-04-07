import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {fetchReleaseCommits, removeToaster} from "./../toaster/toasterActions";
import './Toaster.scss';

class Toaster extends Component {
    state = {
    classNames: '',
    };

    componentDidMount() {
        this.props.fetchReleaseCommits();
        setTimeout(() => this.setState({classNames: 'show'}), 1000);
    }

    render() {
        const {toasters} = this.props;

        if (toasters && toasters.releases.length) {
            return (
                <div className="Toaster">
                    {toasters.releases.map(release =>
                        <div className={`toaster-item ${this.state.classNames}`}>
                            <button onClick={() => this.props.removeToaster(release.sha)}>x</button>
                            <sub>{new Date(release.date).toISOString()}</sub>
                            <p>{release.message}</p>
                        </div>
                    )}
                </div>
            );
        }

        return null;
    }
}

const mapStateToProps = state => ({
    toasters: state.toasters,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchReleaseCommits,
    removeToaster,
}, dispatch);

export const unwrapped = Toaster;
export default connect(mapStateToProps, mapDispatchToProps)(Toaster);
