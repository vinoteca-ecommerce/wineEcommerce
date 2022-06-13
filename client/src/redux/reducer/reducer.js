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
  ALL_FAVORITES2,
  DELETE_FAV,
  MERCADO_PAGO,
  POST_PURCHASE,
  GET_PURCHASE,
  GET_ORDERS,
  PUT_PURCHASE,
  DELETE_CART,
  GET_PURCHASE_ID,
  UPDATE_USER,
  USER_UPDATE,

 POST_USER_ADDRESS,
 GET_USER_ADDRESS,
 UPDATE_USER_ADDRESS,
 PUT_COMMENT,
 PURCHASE_EMAIL,
  UPDATE_STOCK,
  UPDATE_CART,
  GET_WINESCOPY,
  UPDATE_CARTSUB,
  FILTER_CART,
  FILTER_CART_DB

 

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
  favoritesId: [],
  purchase: [],
  orders: [],
  linkmp: "",
  idPurchase: "",
  userAddress: [],
  winesCopy: {},
  Cart: []

};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_WINES:
      
      return {
        ...state,
        wines: action.payload,
        
      };
      case GET_WINESCOPY:
        
        return {
          
          ...state,
          winesCopy: action.payload
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
      localStorage.setItem("ShoppingCar", JSON.stringify(shoppingcarAdd));
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

      return {
        ...state,
        Cart: action.payload,
      };

    case GET_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case DELETE_USER:
      return {
        ...state,
        users: action.payload,
      };
    case GET_USER:
      return {
        ...state,
        user: action.payload,
      };
    //ADD FAVS////////////////
    case ADD_FAVS:
      return {
        ...state,
      };
    //DELETE FAVS////////////////
    case DELETE_FAV:
      return {
        ...state,
      };
    //ALL FAVS///////////////////////
    case ALL_FAVORITES:
      let arr = []
      for(let i=0; i<state.favorites.length; i++){
        arr.push(state.favorites[i]._id) 
      }
      if(arr.length !== 0) localStorage.setItem('favorites', JSON.stringify(arr));

      return {
        ...state,
        favorites: action.payload,
        favoritesId: arr
      };

      case ALL_FAVORITES2:
  
        return {
          ...state,
          favorites: action.payload,
        };


    case MERCADO_PAGO:
      return {
        ...state,
        linkmp: action.payload,
      };
    case POST_PURCHASE:
      localStorage.setItem("idPurchase", JSON.stringify(action.payload));
      return {
        ...state,
        idPurchase: action.payload,
      };
    case PUT_PURCHASE:
      return {
        ...state,
      };
    case DELETE_CART:
      return {
        ...state,
      };
    case GET_PURCHASE:
      return {
        ...state,
        purchase: action.payload
      }
    case GET_ORDERS:
      return{
        ...state,
        orders: action.payload
      }
    case GET_PURCHASE_ID:
      return{
        ...state,
        purchase: action.payload
      } 
    case UPDATE_USER:
      return{
        ...state
      }
    case USER_UPDATE:
      return{
        ...state
      }
    case PURCHASE_EMAIL:
      return{
        ...state
      }  

    case UPDATE_STOCK:
      return{
        ...state
      } 

    case GET_USER_ADDRESS:
      return {
        ...state,
        userAddress: action.payload
      }  

    case POST_USER_ADDRESS:
      return {
        ...state
      } 

    case UPDATE_USER_ADDRESS:
      return {
        ...state,
        userAddress: action.payload
      }
      case PUT_COMMENT:
        
        return {
          ...state,
        };

        case UPDATE_CART:
          
          let cart = state.Cart
         let wine = cart.find(e => e.wineActual._id === action.payload.wineActual._id)
   
          if(wine){
            wine.cant += 1
            
          } else {
            cart.push(action.payload)
            
          }
         
          return{
            ...state,
            Cart: cart
            
          };
          case UPDATE_CARTSUB:
         
            let cartSUB = state.Cart
            let wineSUB = cartSUB.find(e => e.wineActual._id === action.payload.wineActual._id)
            if(wineSUB){
              wineSUB.cant -= 1
              
            } else {
              cartSUB.push(action.payload)
              
            }
           
            return{
              ...state,
              Cart: cartSUB
              
            }

            case FILTER_CART:
         
              let cartSUBFILTER = state.Cart
             
              let wineSUBSILTER = cartSUBFILTER.filter(e => e.wineActual._id !== action.payload)
           
            
             
              return{
                ...state,
                Cart: wineSUBSILTER
                
              }

              case FILTER_CART_DB:

              return{
                ...state,
                
              }


          
          

    default:
      return { ...state };
  }
};

export default rootReducer;
