import React, {Component} from 'react';

const createHOC = (objectToAssign) => (WrappedComponent) => {
    class HOC extends Component {

        render() {
            const props = {...this.props, ...objectToAssign};
            return <WrappedComponent {...props}/>
        }
    }

    return HOC;
};

export default createHOC;
