import React, {useState, useEffect} from 'react'
import NavBar from '../NavBar/NavBar'
import SearchBar from './Inputs/search'
import { connect } from 'react-redux'
import Videogame from './Videogame/Videogame'
import Pagination from './Pagination/Pagination'
import FilteredBy from './Inputs/filter'
import './videogames.css'
import { getAllGames, getGenres, cleanDetail } from '../../redux/actions/'
import notFound from '../../img/notfound.gif'
import loading from '../../img/loadingship.gif'

function Videogames({filteredBy,allGames, getAllGames, getGenres, cleanDetail }) {

    const [currentPage, setCurrentPage] = useState(1)

    const [cardPerPage] = useState(15)

    //* indices de la paginación:
    const indexOfLastCard = currentPage * cardPerPage
    const indexOfFirstCard = indexOfLastCard - cardPerPage;

    var currentCards = ''; //"cards" que se deben mostrar en la pantalla

    // en caso de que al buscar un juego en particular no encuentra ninguno
    if(typeof allGames === 'string'){
        currentCards = allGames
    }else {
        currentCards = allGames.slice(indexOfFirstCard, indexOfLastCard) //uso los indices para "fraccionar que juegos muestro"
    }
    
    const paginate = (pageNumber) => {
        switch(pageNumber){ //switch para paginar el recorrido con flechas
            case 0:
                setCurrentPage(Math.ceil(allGames.length / cardPerPage ) );
                break;
            case Math.ceil(allGames.length / cardPerPage ) + 1 :
                setCurrentPage(1);
                break;
            default:
                setCurrentPage(pageNumber);
                break;
                }
    }

    useEffect (() => {
        cleanDetail();
        getAllGames();
        getGenres();
    }, [getAllGames, getGenres, cleanDetail])

    return (
      <div className="container">
        <NavBar />
        <SearchBar />
        <FilteredBy />
        <Pagination
          cardPerPage={cardPerPage}
          totalCards={allGames.length}
          paginate={paginate}
          currentPage={currentPage}
        />
        <div className="games-div">
          {currentCards.length > 0 ? (
            currentCards.map((g) => (
              <Videogame
                key={g.id}
                name={g.name}
                rating={g.rating}
                genres={g.genres}
                image={g.background_image}
                id={g.id}
              />
            ))
          ) : (filteredBy !== '')? (//si hemos filtrado (filter != ''), no hay de ese filtro
            <div>
              <img className="notfound" src={notFound} alt=""></img>
            </div>
          ) :( 
            <div>
              <img className="loading" src={loading} alt=""></img>
            </div>
          )}
        </div>
        <Pagination
          cardPerPage={cardPerPage}
          totalCards={allGames.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    );
}

const mapStateToProps = (state) => {
    return {
        allGames: state.filtered,
        filteredBy: state.filterBy
    }
}

export default connect(mapStateToProps,{ getAllGames, getGenres, cleanDetail }) (Videogames)
