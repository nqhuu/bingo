import types from '../action/types';


const INITIAL_STATE = {

    count: 0,
};

const reducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case types.INCREMENT:

            return {

                ...state, count: state.count + 1,

            };

        case types.DECREMENT:

            return {
                ...state, count: state.count - 1,

            };

        default: return state;

    }

};

export default reducer;