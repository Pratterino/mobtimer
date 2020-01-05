import * as React from 'react';
import { Component } from 'react';
import PropTypes from 'prop-types';
import './ImageLoader.scss';

const _loaded = {};
const loadingClassName = 'img-loading';
const loadedClassName = 'img-loaded';

class ImageLoader extends Component {
    state = {
        loaded: _loaded[this.props.src],
    };

    onLoad = () => {
        _loaded[this.props.src] = true;
        this.setState(() => ({ loaded: true }));
    };

    render() {
        const className = `${this.state.loaded ? loadedClassName : loadingClassName}`;
        return <img src={this.props.src} className={className} onLoad={this.onLoad} alt="" />;
    }
}

ImageLoader.propTypes = {
    src: PropTypes.string,
};
export default ImageLoader;
