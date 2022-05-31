import axios from 'axios';
import authHeader from '../../components/services/auth-header';
export const GET_WINES = 'GET_WINES';
export const SET_WINES_CLEAN = 'SET_WINES_CLEAN';
export const GET_NAME = 'GET_NAME';
export const SET_FILTER = 'SET_FILTER';
export const POST_WINE = 'POST_WINE';
 export const GET_CATEGORIES = 'GET_CATEGORIES';
export const GET_STRAIN = 'GET_STRAIN'


export const getWines = (num,category,orden,strain) => {
    return async function (dispatch) {
      return axios.get(`http://localhost:8000/products?start=${num}&category=${category}&orden=${orden}&producer=${strain}`)
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
// {headers: authHeader()}
export const postWine = (data) => {
  console.log(data)
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


