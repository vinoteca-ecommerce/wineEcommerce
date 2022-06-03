import {
  GET_WINES,
  GET_NAME,
  SET_WINES_CLEAN,
  SET_FILTER,
  POST_WINE,
  GET_CATEGORIES,
  GET_STRAIN,
  GET_PRODUCT,
  SET_LOCAL_STORAGE,
  ADD_LOCAL_STORAGE,
  SUB_LOCAL_STORAGE,
  DELETE_LOCAL_STORAGE,
  DELETE_PRODUCT,
  UPDATE_PRODUCT,
  //SET_SHOPPINGCAR,
  GET_SHOPPINGCAR,
  GET_USERS,
  DELETE_USER,
  GET_USER,
  ADD_FAVS,

  ALL_FAVORITES,
  DELETE_FAV,

  MERCADO_PAGO,
  POST_PURCHASE,
  PUT_PURCHASE,
  DELETE_CART

} from "../actions/actions";

const initialState = {
  wines: {},
  allProducers: [],
  category: "",
  orden: "",
  producer: "",
  categories: [],
  shoppingcar: [],
  users: [],
  user: [],
  favorites: [],
  linkmp: '',
  idPurchase:'',

};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_WINES:
      return {
        ...state,
        wines: action.payload,
      };

    case SET_WINES_CLEAN:
      return {
        ...state,
        wines: {},
      };

    case GET_NAME:
      return {
        ...state,
        wines: action.payload,
      };

    case SET_FILTER:
      return {
        ...state,
        category: action.payload.category,
        orden: action.payload.orden,
        producer: action.payload.producer,
      };

    case GET_STRAIN:
      return {
        ...state,
        allProducers: action.payload,
      };

    case POST_WINE:
      return {
        ...state,
      };

    case GET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };

    case GET_PRODUCT:
      return {
        ...state,
        wines: action.payload,
      };

    case SET_LOCAL_STORAGE:
      return {
        ...state,
        shoppingcar: action.payload,
      };

    case ADD_LOCAL_STORAGE:
      let sum = 1;
      let shoppingcarAdd = [...state.shoppingcar];

      for (let i = 0; i < state.shoppingcar?.length; i++) {
        if (state.shoppingcar[i].id === action.payload) {
          if (state.shoppingcar[i].cont >= 1) {
            sum += state.shoppingcar[i].cont;
            state.shoppingcar[i].cont = sum;
            shoppingcarAdd = [...state.shoppingcar];
          }
        }
      }
      localStorage.removeItem("ShoppingCar");
      localStorage.setItem("ShoppingCar", JSON.stringify(shoppingcarAdd))
      return {
        ...state,
        shoppingcar: shoppingcarAdd,
      };

    case SUB_LOCAL_STORAGE:
      let sum2 = 1;
      let shoppingcarSub = [...state.shoppingcar];

      for (let i = 0; i < state.shoppingcar?.length; i++) {
        if (state.shoppingcar[i].id === action.payload) {
          if (state.shoppingcar[i].cont > 1) {
            sum2 = state.shoppingcar[i].cont - sum2;
            state.shoppingcar[i].cont = sum2;
            shoppingcarSub = [...state.shoppingcar];
          }
        }
      }
      localStorage.removeItem("ShoppingCar");
      localStorage.setItem("ShoppingCar", JSON.stringify(shoppingcarSub));
      return {
        ...state,
        shoppingcar: shoppingcarSub,
      };

    case DELETE_LOCAL_STORAGE:
      let shoppingcarDelete = state.shoppingcar.filter(
        (shopcar) => shopcar.id !== action.payload
      );

      localStorage.removeItem("ShoppingCar");
      localStorage.setItem("ShoppingCar", JSON.stringify(shoppingcarDelete));
      return {
        ...state,
        shoppingcar: shoppingcarDelete,
      };

    case DELETE_PRODUCT:
      return {
        ...state,
        wines: action.payload,
      };
    case UPDATE_PRODUCT:
      return {
        ...state,
        wines: action.payload,
      };

    /*case SET_SHOPPINGCAR:
      localStorage.removeItem("ShoppingCar");
      localStorage.setItem("ShoppingCar", JSON.stringify(action.payload));
      return {
        ...state,
        shoppingcar: action.payload,
      };*/
      case GET_SHOPPINGCAR:
        localStorage.removeItem("ShoppingCar");
        localStorage.setItem("ShoppingCar", JSON.stringify(action.payload));
        return {
          ...state,
          shoppingcar: action.payload,
        };

    case GET_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case  DELETE_USER:
      return{
        ...state,
        users: action.payload
      }
    case GET_USER:
      return{
        ...state,
        user: action.payload
      }
    //ADD FAVS////////////////
    case ADD_FAVS:
    console.log('llego al reducer el add favs')
    return{
      ...state
    }
    //DELETE FAVS////////////////
    case DELETE_FAV:
      console.log(action.payload)
      return{
      ...state
      }
    //ALL FAVS///////////////////////
    case ALL_FAVORITES:
      // console.log(action.payload)
      return{
        ...state,
        favorites: action.payload
      }
   case MERCADO_PAGO:
      return {
    ...state,
    linkmp: action.payload
    }
  case POST_PURCHASE:
    
    localStorage.setItem("idPurchase", JSON.stringify(action.payload));
      return {
       ...state,
       idPurchase: action.payload
      }
      case PUT_PURCHASE:
        return {
          ...state,
          
        };
        case DELETE_CART:
          return{
            ...state
          }

    default:
      return { ...state };
  }
};

export default rootReducer;