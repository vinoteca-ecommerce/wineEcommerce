import {GET_WINES, GET_NAME, SET_WINES_CLEAN, SET_FILTER} from '../actions/actions';

const initialState = {
    wines: {},
    //allStrains: [],
    category: '',
    orden: '',
    strain: '',
    
}

const rootReducer = (state = initialState, action) => {
    switch (
        action.type
    ){
        case GET_WINES:
            /*let strains = [];
            if(action.payload.result?.length){
                let arr = action.payload.result.map((wine)=>{return wine.strain})
                let arrSet = new Set(arr);
                strains = [...arrSet];
            }*/
          return{
            ...state,
            wines: action.payload,
            //allStrains: strains
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
                // name: action.payload.name,
                
            }

        case SET_FILTER:
            return {
                ...state,
                category: action.payload.category,
                orden: action.payload.orden,
                strain: action.payload.strain,
            }

        default: return {...state}
    }
}

export default rootReducer;