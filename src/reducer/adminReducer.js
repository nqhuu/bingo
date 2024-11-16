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
            let bingo = action.data
            if (state.result.length === 0) {
                let copyState = [...state.result, bingo]
                console.log('bingo copyState', copyState)
                return {
                    ...state,
                    result: [...copyState]
                }
            }
            console.log('length', state.result.length)

            if (state.result.length !== 0) {
                let flag = false
                console.log('length', state.result.length)
                let copyState = [...state.result]
                console.log('copyState', copyState)
                flag = copyState.some((item, index) => {
                    let arr1 = [...item].sort((a, b) => a - b);
                    let arr2 = [...bingo].sort((a, b) => a - b);
                    console.log('arr2', arr2)
                    for (let i = 0; i < arr1.length; i++) {
                        if (arr1[i] !== arr2[i]) {
                            return true;
                        }
                    }
                })
                if (flag) {
                    return {
                        ...state,
                        result: [...state.result, bingo]
                    }
                }
            }

        default:
            return state;
    }

}

export default adminReducer;