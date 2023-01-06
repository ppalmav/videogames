import React,{useState} from 'react'
import { connect } from 'react-redux'
import { orderBy, filterBy } from '../../../redux/actions/'
import './filter.css'

function Filter({orderBy, genres, filterBy}) {
    //estado para ordenar automagicamente cuando se filtra
    const [order, setOrder] = useState("default");

    //en reducer primero filtramos y luego ordenamos lo filtrado
    const handleSelect = (e) => {
        filterBy(e.target.value);
        orderBy(order);
    }

    const handleSelectOrder = (e) => {
        orderBy(e.target.value);
        setOrder(e.target.value);
    }
    return (
        <div className='container-div'>
            <select  className="selectCont" onChange={handleSelect} name="" id="">
                <option className="option" value="default">Filter by...</option>
                <optgroup className="optionGroup" label="SOURCE">
                    <option className="option" value="DataBase">DataBase</option>
                    <option className="option" value="API">API</option>
                </optgroup>              
                <optgroup className="optionGroup" label="GENRES">
                    {genres && genres.map(g => <option key={g.name} value={g.name}>{g.name}</option>)}
                </optgroup>                
            </select>
            <select  className="selectCont" onChange={handleSelectOrder} name="" id="">
                <option className="option" value="default">Order by...</option>
                <optgroup className="optionGroup" label="Rating">
                    <option className="option" value="asc">Descending order</option>
                    <option className="option" value="desc">Ascending order</option>
                </optgroup>               
                <optgroup className="optionGroup" label="Alphabetic">
                    <option className="option" value="A-Z">A - Z</option>
                    <option className="option" value="Z-A">Z - A</option>
                </optgroup>     
            </select>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {

        genres: state.genres
    }
}

export default connect(mapStateToProps, {orderBy, filterBy})(Filter)