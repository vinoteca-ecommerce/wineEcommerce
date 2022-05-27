import {GET_WINES, GET_NAME, /*GET_CATEGORY*/ SET_WINES_CLEAN, SET_FILTER} from '../actions/actions';

const initialState = {
    wines: {},
    winesCopy: {},
    category: ''
}

const rootReducer = (state = initialState, action) => {
    switch (
        action.type
    ){

        case GET_WINES:
          return{
            ...state,
            wines: action.payload,
            winesCopy: action.payload
        }   

        
        case SET_WINES_CLEAN:
            return{
              ...state,
              wines: {}
          }   

        
        case GET_NAME:
            return {
                ...state,
                wines: action.payload
            }

        /*case GET_CATEGORY:
            return {
                ...state,
                wines: action.payload
            }*/

        case SET_FILTER:
            return {
                ...state,
                category: action.payload.category
            }

        default: return {...state}
    }
}

export default rootReducer;