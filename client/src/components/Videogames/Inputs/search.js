import {React, useState} from 'react'
import { connect, useDispatch } from 'react-redux'
import { searchByName, getAllGames, cleanGames } from '../../../redux/actions/'
import './search.css'


function SearchBar({searchByName, getAllGames}) {

    const [input, setInput] = useState({
        buscar: ''
    })

    const handleInputChange = function(e) {
          setInput({
          [e.target.name]: e.target.value
        });
    }

    const handleOnClick = () => {
        searchByName(input.buscar)
        // setInput({
        //     buscar: ''
        // });
    }
    const dispatch = useDispatch();
    const handleOnClickAll = () => {
        dispatch(cleanGames());
        getAllGames();
        setInput({
            buscar: ''
        });
    }

    return (
      <div className="searchbar-div">
        <button className="btn" onClick={handleOnClickAll}>
        <strong>All Games please</strong>
        </button>
        <input
          className="searchbar-btn"
          name="buscar"
          placeholder="type any game"
          onChange={handleInputChange}
          value={input.buscar}
          autoComplete="off"
        ></input>
        <button className="btn" onClick={handleOnClick}>
          <strong>Search it</strong>
        </button>
      </div>
    );
}

export default connect(null, { searchByName, getAllGames })(SearchBar)
