import types from "../action/types";

const initialState = {
    bingoAll: [],
    result: [],
    arrayDial: [],
    win: false
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.FETCH_BINGO_ALL_SUCCESS:
            return {
                ...state,
                bingoAll: action.data
            }
        case types.DIAL_BINGO_SUCCESS:
            // console.log('adminReducer', action.data)
            return {
                ...state,
                arrayDial: action.data
            }
        default:
            return state;
    }

}

export default adminReducer;