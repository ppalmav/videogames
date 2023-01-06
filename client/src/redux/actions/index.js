import axios from '../../../node_modules/axios';

export const GET_ALL_GAMES = 'GET_ALL_GAMES';
export const SEARCH_BY_NAME = 'SEARCH_BY_NAME';
export const GET_GAME_DETAIL = 'GET_GAME_DETAIL';
export const GET_GENRES = 'GET_GENRES';
export const GET_PLATFORMS = 'GET_PLATFORMS';
export const ORDER_BY = 'ORDER_BY';
export const FILTER_BY = 'FILTER_BY';
export const CREATE_GAME = 'CREATE_GAME';
export const CLEAN_DETAIL = 'CLEAN_DETAIL';
export const CLEAN_GAMES = 'CLEAN_GAMES';

export function getAllGames() {
    return function (dispatch) {
      return axios
        .get("/videogames/")
        .then((res) => {
          dispatch({ type: GET_ALL_GAMES, payload: res.data });
        })
        .catch((err) => {
          return err;
        });
    };
  }
  
  
  //* Trae todos los juegos encontrados por nombre (QUERY: "name")
  export function searchByName(name) {
    return function (dispatch) {
      return axios
        .get(`/videogames?name=${name}`)
        .then((res) => {
          dispatch({ type: SEARCH_BY_NAME, payload: res.data });
        })
        .catch((err) => {
          return err;
        });
    };
  }
  
  //* Trae los detalles del juego pasado por (params :ID)
  export function getVideogameDetail(id) {
    return function (dispatch) {
      axios
        .get(`/videogame/${id}`)
        .then((res) => {
          //console.log(res)
          dispatch({ type: GET_GAME_DETAIL, payload: res.data });
        })
        .catch((err) => {
          //console.log(err)
          dispatch({ type: GET_GAME_DETAIL, payload: err });
          return err;
        });
    };
  }
  
  //* Trae todos los generos
  export function getGenres() {
    return function (dispatch) {
      axios
        .get(`/genres`)
        .then((res) => {
          dispatch({ type: GET_GENRES, payload: res.data });
        })
        .catch((err) => {
          return err;
        });
    };
  }

    // //* Trae todas las plataformas
    export function getPlatforms() {
      return function (dispatch) {
        axios
          .get(`/platforms`)
          .then((res) => {
            dispatch({ type: GET_PLATFORMS, payload: res.data });
          })
          .catch((err) => {
            return err;
          });
      };
    }
  
  //* Ordenamiento
  export function orderBy(order) {
    return function (dispatch) {
      dispatch({ type: ORDER_BY, payload: order });
    };
  }
  
  //* Filtrado
  export function filterBy(order) {
    return function (dispatch) {
      dispatch({ type: FILTER_BY, payload: order });
    };
  }
  // Crea los juegos en la BD
  export function createGame(game) {
    return function (dispatch) {
      return axios
        .post("/videogames/",game)
        .then((res) => {
          console.log(res.data);
          dispatch({ type: CREATE_GAME, payload: res.data });
        })
        .catch((err) => {
          return dispatch({ type: CREATE_GAME, payload: err });;
        });
    };
  }

  export function cleanDetail(){
    return function (dispatch) {
      dispatch({type: CLEAN_DETAIL});
    };
  }

  export function cleanGames(){
    return function (dispatch) {
      dispatch({type: CLEAN_GAMES});
    };
}