
import { GET_ALL_GAMES, 
    SEARCH_BY_NAME,
    GET_GAME_DETAIL,
    GET_GENRES,
    ORDER_BY,
    FILTER_BY,
    CREATE_GAME,
    CLEAN_DETAIL, 
    GET_PLATFORMS,
    CLEAN_GAMES} from "../actions/";
 
 const initialState = {
 allGames: [],
 gamesBackUp: [],
 gameDetails: {},
 genres: [],
 filtered: [],
 filterBy:'',
 platforms: [],
 created:''
 };
 
 export default function rootReducer(state = initialState, action) {
 switch (action.type) {
      case GET_ALL_GAMES:
           return {
            ...state,
           allGames: action.payload, 
           gamesBackUp: action.payload,
           filtered: action.payload,
           filterBy: ''
       };
       case CLEAN_GAMES:
            return{
            ...state,
            filtered: [],
            filterBy: ''
            // allGames:[],
            // gamesBackUp:[],
            };

       case GET_GAME_DETAIL:
           return {
           ...state,
           gameDetails: action.payload
       };
       case CLEAN_DETAIL:
            return{
            ...state,
            gameDetails:[]
            };

       case SEARCH_BY_NAME:
           return {
           ...state,
           gamesBackUp: action.payload,
           filtered: action.payload
       };
 
       case GET_GENRES:
           return {
               ...state,
               genres: action.payload
           };
        
        case GET_PLATFORMS:
            return {
                ...state,
                platforms: action.payload
            };
           
       case FILTER_BY:
                state = {...state, filterBy: action.payload}
                if (action.payload === 'default'){
                    return {...state, filtered: state.gamesBackUp}
                    }
                    
                if(action.payload === 'DataBase'){
                    return {...state, filtered: state.gamesBackUp.filter((game)=> (typeof game.id) === 'string')}
                    }
                    
                if(action.payload === 'API'){
                    return {...state, filtered: state.gamesBackUp.filter((game)=> (typeof game.id) === 'number')}
                    }
                    
                else {
                    return {...state, filtered: state.gamesBackUp.filter((game) => {
                        return game.genres.find((genre) => {
                            return genre === action.payload})
                    })}
                };
 
       case ORDER_BY:
            if(action.payload === 'A-Z'){
                return {...state, filtered: [...state.filtered].sort((prev, next) => {
                    if(prev.name > next.name) return 1
                    if(prev.name < next.name) return -1
                    return 0
                })}}
                
            if(action.payload === 'Z-A'){
                return {...state, filtered: [...state.filtered].sort((prev, next) => {
                    if(prev.name > next.name) return -1
                    if(prev.name < next.name) return 1
                    return 0
                })}}
                
            if(action.payload === 'desc'){
                return {...state, filtered: [...state.filtered].sort((prev,next) => prev.rating - next.rating)}
            }
                
            if(action.payload === 'asc'){
                return {...state, filtered: [...state.filtered].sort((prev,next) => next.rating - prev.rating)}
                }     
            else {
                return {...state, filtered: [...state.filtered]}
                };
        
        case CREATE_GAME:
            // if(action.payload.original.code)
            //     return {...state, error: action.payload}
            return {...state, created: action.payload};
                // allGames:[...state.allGames, action.payload] , 
                // gamesBackUp: [...state.gamesBackUp, action.payload],
                // filtered: [...state.filtered, action.payload]

   default: 
       return state;
 }
    
 };
 