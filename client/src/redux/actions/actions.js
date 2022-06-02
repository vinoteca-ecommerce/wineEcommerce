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

export const DELETE_PRODUCT = 'DELETE_PRODUCT'
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT'

export const ALL_FAVORITES = 'ALL_FAVORITES'
export const ADD_FAVS = 'ADD_FAVS'

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


export const addFavorites = (payload)=>{
  return async function(dispatch){
    return axios.post(`http://localhost:8000/products/favs/${payload.id}`, payload, { headers: authHeader()  } )
    .then(response=>{
      console.log('CARGASTE UN NUEVO WINE')
      console.log(response.data)
    return dispatch({
      type: ADD_FAVS,
      payload: response.data
    })
    })
  }
}