import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import './User.css';

class User extends Component {
    render() {
        const {name, image} = this.props.user;
        const style = {backgroundImage: `url(${image})`};
        return (
            <div className="user">
                <div className="user__image" style={style}/>
                <p>{name}</p>
            </div>
        );
    }
}

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(User);
