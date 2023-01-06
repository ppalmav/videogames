import React from 'react'
import { Link } from 'react-router-dom'
import './videogame.css'
import photoDef from '../../../img/default.jpg'


export default function Videogame(props) {
  
    return (
      <div className="container-game" style={{ backgroundImage: `url(${props.image?props.image:photoDef})` }}>
        <div className="title-game">{props.name}</div>

        
        <div className="info">
          {
            <span>
              <strong><span className='star'>★ </span>{`${props.rating}`}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              {/* Genr{typeof props.genres !== "string"?(<span>es</span>):(<span>e</span>)} :{" "} */}
              {`${
                typeof props.genres === "string"
                  ? props.genres
                  : props.genres.join(", ")
              }`}
              </strong>
            </span>
          }
        </div>
        <div className="div-button">
          {props.id && (
            <Link to={`/videogame/${props.id}`}>
              <button className="Link"><strong>Description</strong></button>
            </Link>
          )}
        </div>
        
      </div>
    );
}