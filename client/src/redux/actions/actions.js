import axios from 'axios';
import authHeader from '../../components/services/auth-header';
export const GET_WINES = 'GET_WINES';
export const SET_WINES_CLEAN = 'SET_WINES_CLEAN';
export const GET_NAME = 'GET_NAME';
export const SET_FILTER = 'SET_FILTER';
export const POST_WINE = 'POST_WINE';
export const GET_CATEGORIES = 'GET_CATEGORIES';
export const GET_STRAIN = 'GET_STRAIN';

export const GET_PRODUCT = 'GET_PRODUCT'
export const SET_LOCAL_STORAGE = 'SET_LOCAL_STORAGE';
export const ADD_LOCAL_STORAGE = 'ADD_LOCAL_STORAGE';
export const SUB_LOCAL_STORAGE = 'SUB_LOCAL_STORAGE';
export const DELETE_LOCAL_STORAGE = 'DELETE_LOCAL_STORAGE';

export const MERCADO_PAGO = 'MERCADO_PAGO'

//export const SET_SHOPPINGCAR = 'SET_SHOPPINGCAR';
export const GET_SHOPPINGCAR = 'GET_SHOPPINGCAR';

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const GET_USERS = 'GET_USERS';
export const DELETE_USER = 'DELETE_USER';
export const GET_USER = 'GET_USER';
export const GET_ORDERS = 'GET_ORDERS';

export const GET_PURCHASE = 'GET_PURCHASE';
export const POST_PURCHASE = 'POST_PURCHASE';
export const ALL_FAVORITES = 'ALL_FAVORITES';
export const ADD_FAVS = 'ADD_FAVS';
export const DELETE_FAV = 'DELETE_FAV';
export const PUT_PURCHASE ='PUT_PURCHASE'
export const DELETE_CART = 'DELETE_CART'

export const GET_PURCHASE_ID = 'GET_PURCHASE_ID'

export const getWines = (num,category,orden,producer) => {
    return async function (dispatch) {
      return axios.get(`http://localhost:8000/products?start=${num}&category=${category}&orden=${orden}&producer=${producer}`)
      .then(response => {
        dispatch({ type: GET_WINES, payload: response.data });
      })
      .catch(err => console.error(err))
    };
};

export const setWineClean = () => {
  return { type: SET_WINES_CLEAN };
};

export const getWinesById = (id) => {
  return async function (dispatch) {
    return axios.get("http://localhost:8000/products/"+id)
    .then(response => {
      dispatch({ type: GET_WINES, payload: response.data });
    })
    .catch(err => console.error(err))
  };
};

export const getWineName = (name) => {
    return async function(dispatch){
      return axios.get(`http://localhost:8000/products/?name=${name}`)
    .then(response => {
      dispatch({ type: GET_NAME, payload: response.data});
    })
    .catch(err => console.error(err))
  }
}


export const setFilter = (options) => {
  return { type: SET_FILTER, payload:options };
};

export const postWine = (data) => {
  return async function(dispatch){
    return axios.post('http://localhost:8000/products', data, { headers: authHeader() } )
    .then(response => {
      dispatch({type: POST_WINE, payload: response.data})
    })
 .catch(err => console.error(err))
  }
}


export const getCategories = () => {
  return async function(dispatch){
    return axios.get('http://localhost:8000/category')
    .then(response => {
      dispatch({type: GET_CATEGORIES, payload: response.data})
    })
   .catch(err => console.error(err))
  }
}

export const getStrains = () => {
  return async function(dispatch){
    return axios.get(`http://localhost:8000/products/producer`)
  .then(response => {
    dispatch({ type: GET_STRAIN, payload: response.data});
  })
  .catch(err => console.error(err))
}
}

export const deleteProduct = (id)=>{
  return async function(dispatch){
    return axios.delete(`http://localhost:8000/products/${id}`, { headers: authHeader()  } )
      .then(response =>{ 
        dispatch({type: DELETE_PRODUCT, payload: response.data})
        
      }).catch(err => console.log(err)) 
  }

}

export const updateProduct = (id, data)=>{

  return async function(dispatch){
    return axios.put(`http://localhost:8000/products/${id}`, data ,  { headers: authHeader() })
      .then(response =>{
          dispatch({type: UPDATE_PRODUCT, payload: response.data})
      }).catch(err=> console.log(err))
  }
}


//CARRITO DE COMPRAS LOCAL STORAGE
export const setLocalStorage = (data) => {
  return { type: SET_LOCAL_STORAGE, payload: data };
};

export const addLocalStorage = (data) => {
  return { type: ADD_LOCAL_STORAGE, payload: data };
};

export const subLocalStorage = (data) => {
  return { type: SUB_LOCAL_STORAGE, payload: data };
};

export const deleteLocalStorage = (data) => {
  return { type: DELETE_LOCAL_STORAGE, payload: data };
};


//ADD FAVORITES
export const addFavorites = (payload)=>{
  return async function(dispatch){
    return axios.post(`http://localhost:8000/products/favs/${payload.id}`, payload, { headers: authHeader()  } )
    .then(response=>{
      return dispatch({
      type: ADD_FAVS,
      payload: response.data
    })
    })
    .catch(err=>console.log(err)) 
  }
}
//DELETE FAVORITES
export const deleteFav =(id)=>{
  return async function(dispatch){
    return axios.delete(`http://localhost:8000/products/favs/${id}`,{ headers: authHeader()  })
    .then(response=>{
      // console.log(response)
      dispatch({
        type:DELETE_FAV, payload: response.data
      })
    })
    .catch(err=>console.log(err)) 
  }
}
// TODOS LOS FAVORITOS
export const allFavs = (id)=>{
  return async function(dispatch){
    // return axios.get('http://localhost:8000/products/favs', { headers: authHeader()  })
    return axios.get(`http://localhost:8000/users/${id}`, { headers: authHeader()  })
    .then(response => {
      // console.log(response.data.favorites)
      dispatch({ type: ALL_FAVORITES, payload: response.data.favorites });
    })
    .catch(err => console.error(err))
  }

}

//CARRITO DE COMPRAS BASE DE DATOS
export const setShoppingCar = (data)=>{
  return async function(dispatch){
    return axios.post(`http://localhost:8000/products/cart`, data,  { headers: authHeader() })
      /*.then(response =>{
          dispatch({type: SET_SHOPPINGCAR, payload: response.data})
      }).catch(err=> console.log(err))*/
  }
}

export const getShoppingCar = ()=>{
  return async function(dispatch){
    return axios.get(`http://localhost:8000/products/cart`, { headers: authHeader() })
      .then(response =>{
          dispatch({type: GET_SHOPPINGCAR, payload: response.data.cart})
      }).catch(err=> console.log(err))
  }
}

export const getUsers = ()=>{
    return async function(dispatch){
      return axios.get('http://localhost:8000/users', { headers: authHeader() })
      .then(response =>{
        dispatch({type: GET_USERS, payload: response.data})
      }).catch(err => console.log(err))
    }
}

export const deleteUser = (id)=>{
  return async function(dispatch){
    return axios.delete(`http://localhost:8000/users/${id}`, { headers: authHeader()  } )
      .then(response =>{ 
        dispatch({type: DELETE_USER, payload: response.data})
        
      }).catch(err => console.log(err)) 
  }

}

export const getUserById = (id)=>{
  return async function(dispatch){
    return axios.get(`http://localhost:8000/users/${id}`, { headers: authHeader()  } )
      .then(response =>{ 
        dispatch({type: GET_USER, payload: response.data})
        
      }).catch(err => console.log(err)) 
  }

}

export const postMP = (data) => {
  return async function(dispatch){
    return axios.post('http://localhost:8000/products/payment',data)
    .then(response => { 
      
      dispatch({type: MERCADO_PAGO, payload: response.data.url})
    })
 .catch(err => console.error(err))
  }
}

export const postPurchase = (data) => {
  return async function(dispatch){
    return axios.post('http://localhost:8000/purchase',data,{ headers: authHeader()  } )
    .then(response => { 
      console.log(response.data)
      dispatch({type: POST_PURCHASE, payload: response.data})
      
    })
    
 .catch(err => console.error(err))
  }
}
export const putPurchase = (id, data)=>{

  return async function(dispatch){
    return axios.put(`http://localhost:8000/purchase/${id}`, data ,  { headers: authHeader() })
    .then(response =>{
      dispatch({type: PUT_PURCHASE, payload: response.data})
      }).catch(err=> console.log(err))
  }
}

export const getPurchase = () => {
  return async function(dispatch){
    return axios.get('http://localhost:8000/purchase/all', {headers: authHeader()})
    .then(response => {
      dispatch({type: GET_PURCHASE, payload: response.data})
    })
    .catch(err=> console.log(err))
  }
}

export const deleteCart = ()=>{
  return async function(dispatch){
    return axios.delete(`http://localhost:8000/products/cart`, { headers: authHeader()  } )
      .then(response =>{ 
        dispatch({type: DELETE_CART, payload: response.data})
        
      }).catch(err => console.log(err)) 
  }

}

export const getOrders = () =>{
  return async function(dispatch){
    return axios.get('http://localhost:8000/purchase', {headers: authHeader()})
    .then(response =>{
      dispatch({ type: GET_ORDERS, payload: response.data})
    }).catch(err => console.log(err))
  }
}


export const getPurchaseId = (id)=>{
  return async function(dispatch){
    return axios.get(`http://localhost:8000/purchase/${id}`, {headers: authHeader()})
      .then(response=>{
        dispatch({type: GET_PURCHASE_ID, payload: response.data})
      }).catch(err => console.log(err))
  }


}