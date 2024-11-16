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
            return {
                ...state,
                arrayDial: action.data
            }
        case types.CHECK_BINGO_SUCCESS:
            // let bingo = action.data.sort((a, b) => a - b);
            let bingo = action.data;
            // let bingoCopy = [...bingo].sort((a, b) => a - b);
            // console.log(bingoCopy)
            if (state.result.length === 0) {
                let copyState = [...state.result, bingo]
                return {
                    ...state,
                    result: [...copyState]
                }
            }

            if (state.result.length > 0) {
                let flag;
                let copyState = [...state.result];
                flag = copyState.some((item, index) => {
                    let arr1 = [...item].sort();
                    return arr1.every((value, index) => {
                        let arr2 = [...bingo].sort();
                        console.log('arr2', arr2)
                        return value === arr2[index]
                    });
                })
                if (!flag) {
                    return {
                        ...state,
                        result: [...state.result, bingo]
                    }
                } else {
                    return {
                        ...state
                    }
                };
            }

        default:
            return state;
    }

}

export default adminReducer;