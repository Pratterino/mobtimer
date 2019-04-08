import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import moment from "moment";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";

import {fetchReleaseCommits, removeToaster} from "./../toaster/toasterActions";
import {aMonthAgo, numberOfMonthsToasterLives} from "./../toaster/toasterReducer";
import './Toaster.scss';

class Toaster extends Component {
    state = {
        classNames: '',
    };

    componentDidMount() {
        this.props.fetchReleaseCommits();
        setTimeout(() => this.setState({classNames: 'show'}), 1000);
    }

    getPercentageLeftOfToaster = (release) => {
        let commitDate = moment(release.date);
        return `${(moment.duration(commitDate.diff(aMonthAgo)).asMonths() / numberOfMonthsToasterLives) * 100}%`;
    };

    render() {
        const {toasters} = this.props;

        if (toasters && toasters.releases.length) {
            return (
                <div className="Toaster">
                    {toasters.releases.map(release =>
                        <div className={`toaster-item ${this.state.classNames}`}>
                            <div className="toaster-item__header">
                                <FontAwesomeIcon
                                    icon={faTimes}
                                    size="1x"
                                    title="Remove message"
                                    className="toaster-item__remove"
                                    onClick={() => this.props.removeToaster(release)}
                                />
                                {moment(release.date).calendar(null, {
                                    lastDay: '[Yesterday at] HH:mm',
                                    sameDay: '[Today at] HH:mm',
                                    nextDay: '[Tomorrow at] HH:mm',
                                    lastWeek: '[Last] dddd [at] HH:mm',
                                    nextWeek: 'dddd [at] HH:mm',
                                    sameElse: 'L'
                                })}
                            </div>
                            <div className="toaster-item__progressbar"
                                 style={{width: this.getPercentageLeftOfToaster(release)}}/>
                            <div className="toaster-item__message">{release.message}</div>
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
