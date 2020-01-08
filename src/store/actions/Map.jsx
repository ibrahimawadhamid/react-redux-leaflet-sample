import * as actionTypes from "./actionTypes";

export const setMapVisible = (isMapVisible) => {
    return {
        type: actionTypes.SET_MAP_VISIBLE,
        isMapVisible: isMapVisible
    };
};