import axios from 'axios';
export const GET_WINES = 'GET_WINES';

export const getWines = (num) => {
    return async function (dispatch) {
      return axios.get("http://localhost:8000/products?start="+num)
      .then(response => {
        dispatch({ type: GET_WINES, payload: response.data });
      })
      .catch(err => console.error(err))
    };
};