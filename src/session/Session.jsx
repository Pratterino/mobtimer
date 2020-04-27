import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import QRCode from 'qrcode.react';
import './Session.scss';

function Session(props) {
    const { settings } = props;
    return (
        <section className="Session">
            <p>Join session!</p>
            <QRCode value={`mobtimer-client://join?sessionId=${settings.sessionId}`} />
            <p>{settings.sessionId}</p>
        </section>
    );
}

const mapStateToProps = state => ({
    settings: state.settings,
});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export const unwrapped = Session;
export default connect(mapStateToProps, mapDispatchToProps)(Session);
