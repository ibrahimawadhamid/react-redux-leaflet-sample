import * as actionTypes from '../actions/actionTypes';

const initialState = {
    isMapVisible: false,
};

const setMapVisible = (state, action) => {
    const updatedState = {isMapVisible: action.isMapVisible};
    return {
        ...state,
        ...updatedState
    };
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_MAP_VISIBLE:
            return setMapVisible(state, action);
        default:
            return state;
    }
};

export default reducer;