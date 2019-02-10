import Enzyme, {shallow, render, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
// React 16 Enzyme adapter

Enzyme.configure({adapter: new Adapter()});

Object.defineProperty(window, 'getComputedStyle', {
    value: () => ({
        getPropertyValue: (prop) => {
            return prop;
        }
    })
});
