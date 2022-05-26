import {GET_WINES, GET_NAME, GET_CATEGORY} from '../actions/actions';

const initialState = {
    wines: {},
    winesCopy: {},
}

const rootReducer = (state = initialState, action) => {
    switch (
        action.type
    ){

        case GET_WINES:
          return{
            ...state,
            wines: action.payload
        }   
        
        case GET_NAME:
            return {
                ...state,
                winesCopy: action.payload
            }
        case GET_CATEGORY:
            return {
                ...state,
                winesCopy: action.payload
            }

        default: return {...state}
    }
}

export default rootReducer;