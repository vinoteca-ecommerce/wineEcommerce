import {GET_WINES} from '../actions/actions';

const initialState = {
    wines: {},
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

        default: return {...state}
    }
}

export default rootReducer;