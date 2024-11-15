import types from './types';


export const increaseCounter = () => {

    return {

        type: types.INCREMENT,

    };

};

export const decreaseCounter = () => {

    return {

        type: types.DECREMENT,

    };

};
