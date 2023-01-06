import {React, useEffect} from 'react'
import { connect }from 'react-redux'
import { getVideogameDetail } from '../../../../redux/actions/'
import Navbar from '../../../NavBar/NavBar'
import photo from '../../../../img/default.jpg'
import { NavLink } from 'react-router-dom'
import loading from '../../../../img/loadingship.gif'
import './GameDetail.css'
// import Error404 from '../../../Error404/Error404'
import IdNotFound from '../../../Error404/IdNotFound'

function GameDetail(props) {

    // const {getVideogameDetail, gameDetails} = props
    // const {idVideogame} = props.match.params;

    // me carga los details del juego

    
    const {gameDetails} = props
    useEffect(() => {
        const {getVideogameDetail} = props
        const {idVideogame} = props.match.params;
        getVideogameDetail(idVideogame);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    return (
      <div className="container-detail">
        {(gameDetails.name!=='AxiosError')?(
        <>
        <Navbar />
        <div className="details-div">
          {gameDetails.name ? (
            <div>
              <h2 className="title">{gameDetails.name} {/*gameDetails.code*/}</h2>
                <div className='center-img'>
                    <div className="div-img" style={{ backgroundImage: `url(${gameDetails.background_image||photo})` }}>
                    {/* <img src={gameDetails.background_image} alt="Videogame"></img> */}
                    </div>
                </div>
              {/* {gameDetails.background_image ? (
                <div className='center-img'>
                <div className="div-img" style={{ backgroundImage: `url(${gameDetails.background_image||photo})` }}>
                  <img src={gameDetails.background_image} alt="Videogame"></img>
                </div>
                </div>
              ) : (
                <div className="div-img" style={{ backgroundImage: `url(${photo})` }}>
                  <img src={photo} alt="Videogame"></img>
                </div>
              )} */}
              {
                <p>
                  <strong>Release Date:{" "}
                  {`${gameDetails.releaseDate || "None"}`}
                  </strong>
                </p>
              }
              <p>
                <strong>Rating: {`${gameDetails.rating}`} <span className='star'>★</span></strong>
              </p>
              {gameDetails.description &&
              gameDetails.genres &&
              gameDetails.platforms ? (
                <div className="div-descr">
                    {
                    <p>
                      <strong>Genres</strong>:{" "}
                      {`${gameDetails.genres.join(", ")}`}
                    </p>
                  }
                  {
                    <p>
                      <strong>Platforms</strong>:{" "}
                      {`${
                        typeof gameDetails.platforms === "string"
                          ? gameDetails.platforms
                          : gameDetails.platforms.join(", ")
                      }`}
                    </p>
                  }
                  {
                    <p className="description">
                      {gameDetails.description.replace(/(<([^>]+)>)/gi, "")}
                    </p>
                  }
                  
                  <NavLink to="/home">
                    <button><strong>Go back</strong></button>
                  </NavLink>
                </div>
              ) : (
                <h1>Cargando...</h1>
              )}
            </div>
          ) : (
            
            <div>
                <h1>Cargando...
                </h1>
                <img className="loading" src={loading} alt=""></img>
            </div>
          )}
        </div>
        </>
        ):(
            <div>
                <IdNotFound errorName={gameDetails.response.data.errorMsg}></IdNotFound>
            {/* { gameDetails.name!=='AxiosError'?(
                <IdNotFound errorName={gameDetails.errorName}></IdNotFound>
            ):(
                <IdNotFound errorName={gameDetails.response.data.errorMsg}></IdNotFound>
            )} */}
            {/* // <IdNotFound errorName= {gameDetails.errorName?gameDetails.errorName:gameDetails.name} ></IdNotFound> */}
            </div>
        )}
      </div>
    );


}

const mapStateToProps = (state) => {
    return {
        gameDetails: state.gameDetails
    }
}

export default connect(mapStateToProps, {getVideogameDetail}) (GameDetail)
