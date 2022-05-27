import axios from 'axios';
export const GET_WINES = 'GET_WINES';
export const SET_WINES_CLEAN = 'SET_WINES_CLEAN';
export const GET_NAME = 'GET_NAME';
//export const GET_CATEGORY = 'GET_CATEGORY';
export const SET_FILTER = 'SET_FILTER';

export const getWines = (num,category) => {
    return async function (dispatch) {
      return axios.get(`http://localhost:8000/products?start=${num}&category=${category}`)
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
      return axios.get(`http://localhost:8000/products/${name}`)
    .then(response => {
      dispatch({ type: GET_NAME, payload: response.data});
    })
    .catch(err => console.error(err))
  }
}

/*export const getWineCategory = (category) => {
  console.log(category)
  return async function (dispatch){
    return axios.get(`http://localhost:8000/products/?category=${category}`)
    .then(response => {
      dispatch({ type: GET_CATEGORY, payload: response.data})
    })
    .catch(err => console.error(err))
  }
}*/

export const setFilter = (options) => {
  return { type: SET_FILTER, payload:options };
};

