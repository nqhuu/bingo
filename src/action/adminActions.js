import types from './types';
// import { types } from '../action/types'
import { getAllBingoService } from '../services/appService'

export const getAllBingo = () => {
    return async (dispatch) => {
        try {
            const response = await getAllBingoService();
            dispatch(getAllBingoSuccess(response));
        } catch (e) {
            console.error(e);
        }
    };
}

export const getAllBingoSuccess = (data) => ({
    type: types.FETCH_BINGO_ALL_SUCCESS,
    data: data
})

export const arrayDialPost = (data) => {
    // console.log('arrayDialPost data', data);
    return async (dispatch) => {
        try {
            if (data) {
                dispatch(arrayDialSuccess(data));
            }

        } catch (e) {
            console.error(e);
        }
    }
}

export const arrayDialSuccess = (data) => ({
    type: types.DIAL_BINGO_SUCCESS,
    data: data
})


export const getCheckBingo = (data) => {
    return async (dispatch) => {
        try {
            if (data) {
                await dispatch(CheckBingoSuccess(data));
            }
        } catch (e) {
            console.error(e);
        }
    }
}

export const CheckBingoSuccess = (data) => ({
    type: types.CHECK_BINGO_SUCCESS,
    data: data
})