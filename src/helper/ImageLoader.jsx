import * as React from 'react';
import { useState } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './ImageLoader.scss';

function ImageLoader({ src }) {
    const [loaded, setLoaded] = useState(false);
    const className = classNames('img', `${loaded ? 'loaded' : 'loading'}`);

    return <img src={src} className={className} onLoad={() => setLoaded(true)} alt="" />;
}

ImageLoader.propTypes = {
    src: PropTypes.string,
};
export default ImageLoader;
