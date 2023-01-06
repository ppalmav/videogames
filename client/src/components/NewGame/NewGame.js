import {React, useState, useEffect} from 'react'
import NavBar from '../NavBar/NavBar'
// import axios from 'axios'
import './NewGame.css'
import { createGame, getPlatforms,cleanGames, getGenres } from '../../redux/actions'
import { connect} from 'react-redux'

function NewGame({wasCreated,createGame,history,getPlatforms,allPlatforms,cleanGames,getGenres,allGenres}) {

    const [errors, setErrors] = useState({ form: 'Must complete the form' });

    // const [platforms, setPlatforms] = useState([])
    const [form, setForm] = useState({
        name: '',
        description: '',
        releaseDate: '',
        rating: 0,
        genres: [],
        platforms: []
    });
    
    // let allPlatforms;
    // const dispatch = useDispatch();
    useEffect (() => {
        getPlatforms();
        getGenres();
        // return cleanGames();
    },[getPlatforms,/*cleanGames,*/getGenres])
    //const allPlatforms = useSelector((state) => state.platforms);
    // console.log(allGenres);
    // console.log(allPlatforms);
    const handleChange = e => {
        if (e.target.parentNode.parentNode.id === 'genres') {
            if (e.target.checked) {
                setForm(prevState => ({
                    ...prevState,
                    genres: form.genres.concat(e.target.value)
                }))
            } else {
                setForm(prevState => ({
                    ...prevState,
                    genres: form.genres.filter(x => e.target.value !== x)
                }))
            }
        }
        if (e.target.parentNode.parentNode.id === 'platforms') {
            if (e.target.checked) {
                setForm(prevState => ({
                    ...prevState,
                    platforms: form.platforms.concat(e.target.name)
                }))
            } else {
                setForm(prevState => ({
                    ...prevState,
                    platforms: form.platforms.filter(x => e.target.name !== x)
                }))
            }
        }
        if (e.target.type !== 'checkbox') {
            setForm(prevState => ({
                ...prevState,
                [e.target.name]: e.target.value
            }))
        }
        setErrors(validate({
            ...form,
            [e.target.name]: e.target.value
        }))
    }
    const validate = form => {
        let errors = {};
        if (!form.name) {
            errors.name = 'Game Name is required';
        } else if (form.name.length < 3) {
            errors.name = 'Game Name must have at least 3 characters';
        } else if (form.name === 'AxiosError'){
            errors.name = 'Forbidden Game Name';
        }
        if (!form.description) {
            errors.description = 'Description is required';
        } else if (form.description.length < 10) {
            errors.description = 'Description must have at least 10 characters'
        }
        if (!form.rating) {
            errors.rating = 'Rating is required';
        } else if (!/^[1-5]$/.test(form.rating)) {
            errors.rating = 'Rating must be between 1 and 5';
        }
        return errors;
    }
    
    const handleSubmit = e => {
        e.preventDefault()
        validate(form);
        let checkboxsErrors = []
        if (form.genres.length < 1) checkboxsErrors.push('Genres is required');
        if (form.platforms.length < 1) checkboxsErrors.push('Platforms is required');
        if (Object.values(errors).length || checkboxsErrors.length) { // Object.values --> retorno un array con los values
            return alert(Object.values(errors).concat(checkboxsErrors).join('\n'));
        }
        createGame(form)
             //console.log(wasCreated)
        // while(wasCreated === ''){}
        console.log(wasCreated);
        if(!wasCreated) 
                return alert(`The name '${form.name}' and the description already exists!`)
        // console.log(err);
        // if(typeof err.original.code === 'string'){
        //     if (err.original.code === '23505')
        //         return alert(`The name '${form.name}' or the description already exists!`)
        //     else
        //         return err.original.detail && alert('ERRROR '+ err.original.code + ' : ' + err.original.detail)
        //     };

            cleanGames();
        // const err = useSelector((state) => state.error)
        // axios.post('http://localhost:3031/videogames', form)
        //           .then(res => console.log(res.data));
            alert(`${form.name} Created!`)
            history.push('/home')
       
    }

    return (
        <>
        <NavBar />
        <div className="main-add">
            <div className="container-add">
                <h4><strong>CREATE GAME</strong></h4>
                <div className="div-cont">
                    <form onSubmit={handleSubmit} onChange={handleChange}>
                        <label htmlFor='name' className="title-name"><strong>Name: </strong></label>
                        <br />
                        <input className="name" placeholder='Name' type="text" id='name' name='name' maxLength="30" autoComplete="off" required/>
                        <br />
                        <label htmlFor="description" className="title-name"><strong>Description: </strong></label>
                        <br />
                        <textarea className="name" name='description' placeholder='Description...' id="description" cols="30" rows="3" required />
                        <br />
                    <div>
                        <label htmlFor="date" className="title-name"><strong>Release Date: </strong></label>
                        {/* <br /> */}
                        <input name='releaseDate' className="dt" type="date" id="date" max={new Date().toISOString().substring(0,10)} required />
                        &nbsp; &nbsp; &nbsp;{/* <br /> */} 
                        <label htmlFor="rating" className="title-name"><strong>Rating: </strong></label>
                        {/* <br /> */}
                        <input name='rating' className="dt" placeholder='Rate from 1 to 5' type="number" min='1' max='5' id="rating" maxLength='1' autoComplete="off"/>
                        </div>    
                        <br />
                        <label className="title-name"><strong>Genres:</strong></label>
                        <div id='gyp' className='gyp-div'>
                            <div id='genres' className="genres-div">
                                {allGenres && Object.entries(allGenres).length > 0?(
                                    allGenres.map(g =>{
                                            return(
                                            <div className={g.name} key={g.id*g.id}>
                                                <input name={g.name} value={g.id} type="checkbox" id={g.name} key={g.id*g.id+1} />
                                                <label htmlFor={g.name} key={g.id*g.id+2}>{g.name}.</label>                                                
                                            </div>
                                            )
                                    })
                                ):(<>
                                <div >
                                    <input name='Indie' value='51' type="checkbox" id="Indie" />
                                    <label htmlFor="Indie">Indie.</label>
                                </div>
                                <div>
                                    <input name='Action' value='4' type="checkbox" id="Action" />
                                    <label htmlFor="Action">Action.</label>
                                </div>
                                <div>
                                    <input name='Adventure' value='3' type="checkbox" id="Adventure" />
                                    <label htmlFor="Adventure">Adventure.</label>
                                </div>
                                <div>
                                    <input name='RPG' value='5' type="checkbox" id="RPG" />
                                    <label htmlFor="RPG">RPG.</label>
                                </div>
                                <div>
                                    <input name='Strategy' value='10' type="checkbox" id="Strategy" />
                                    <label htmlFor="Strategy">Strategy.</label>
                                </div>
                                <div>
                                    <input name='Shooter' value='2' type="checkbox" id="Shooter" />
                                    <label htmlFor="Shooter">Shooter.</label>
                                </div>
                                <div>
                                    <input name='Casual' value='40' type="checkbox" id="Casual" />
                                    <label htmlFor="Casual">Casual.</label>
                                </div>
                                <div>
                                    <input name='Simulation' value='14' type="checkbox" id="Simulation" />
                                    <label htmlFor="Simulation">Simulation.</label>
                                </div>
                                <div>
                                    <input name='Puzzle' value='7' type="checkbox" id="Puzzle" />
                                    <label htmlFor="Puzzle">Puzzle.</label>
                                </div>
                                <div>
                                    <input name='Arcade' value='11' type="checkbox" id="Arcade" />
                                    <label htmlFor="Arcade">Arcade.</label>
                                </div>
                                <div>
                                    <input name='Platformer' value='83' type="checkbox" id="Platformer" />
                                    <label htmlFor="Platformer">Platformer.</label>
                                </div>
                                <div>
                                    <input name='Racing' value='1' type="checkbox" id="Racing" />
                                    <label htmlFor="Racing">Racing.</label>
                                </div>
                                <div>
                                    <input name='Massively-Multiplayer' value='59' type="checkbox" id="Massively-Multiplayer" />
                                    <label htmlFor="Massively-Multiplayer">Massively-Multiplayer.</label>
                                </div>
                                <div>
                                    <input name='Sports' value='15' type="checkbox" id="Sports" />
                                    <label htmlFor="Sports">Sports.</label>
                                </div>
                                <div>
                                    <input name='Fighting' value='6' type="checkbox" id="Fighting" />
                                    <label htmlFor="Fighting">Fighting.</label>
                                </div>
                                <div>
                                    <input name='Family' value='19' type="checkbox" id="Family" />
                                    <label htmlFor="Family">Family.</label>
                                </div>
                                <div>
                                    <input name='Board Games' value='28' type="checkbox" id="Board Games" />
                                    <label htmlFor="Board Games">Board Games.</label>
                                </div>
                                <div>
                                    <input name='Educational' value='34' type="checkbox" id="Educational" />
                                    <label htmlFor="Educational">Educational.</label>
                                </div>
                                <div>
                                    <input name='Card' value='17' type="checkbox" id="Card" />
                                    <label htmlFor="Card">Card.</label>
                                </div>
                                </>)}
                                
                            </div>
                            <label className="title-name"><strong>Platforms: </strong> </label>
                            <div id='platforms' className="plat-div">
                                {/* {allPlatforms? (<strong> {allPlatforms.length} </strong>):(<>lalala</>)} */}
                            {(allPlatforms && allGenres && allPlatforms.length > 0)?(
                                    allPlatforms.map((element, index) => {
                                        return(                                
                                            <div className={element} key={index+Object.entries(allGenres).length+1}>
                                                {/* <strong> {allPlatforms.length} </strong> */}
                                                <input name={element} type="checkbox" id={element/*Math.pow((index+Object.entries(allGenres).length+1),2)+1*/} key={Math.pow((index+Object.entries(allGenres).length+1),2)} />
                                                <label htmlFor={element} key={Math.pow((index+Object.entries(allGenres).length+1),2)+1}>{element}.</label>
                                                {/* <strong>platforms API</strong> */}
                                            </div>
                                        )
                                    })
                                ):(<>
                                <div>
                                    <input name='Android' value='Android' type="checkbox" id="Android" />
                                    <label htmlFor="Android">Android.</label>
                                </div>
                                <div>
                                    <input name='Classic Macintosh' type="checkbox" id="Classic Macintosh" />
                                    <label htmlFor="Classic Macintosh">Classic Macintosh.</label>
                                </div>
                                <div>
                                    <input name='Dreamcast' type="checkbox" id="Dreamcast" />
                                    <label htmlFor="Dreamcast">Dreamcast.</label>
                                </div>
                                <div>
                                    <input name='Linux' type="checkbox" id="Linux" />
                                    <label htmlFor="Linux">Linux.</label>
                                </div>
                                <div>
                                    <input name='Nintendo 3DS' type="checkbox" id="Nintendo 3DS" />
                                    <label htmlFor="Nintendo 3DS">Nintendo 3DS.</label>
                                </div>
                                <div>
                                    <input name='Nintendo Switch' type="checkbox" id="Nintendo Switch" />
                                    <label htmlFor="Nintendo Switch">Nintendo Switch.</label>
                                </div>
                                <div>
                                    <input name='PC' type="checkbox" id="PC" />
                                    <label htmlFor="PC">PC.</label>
                                </div>
                                <div>
                                    <input name='PS Vita' type="checkbox" id="PS Vita" />
                                    <label htmlFor="PS Vita">PS Vita.</label>
                                </div>
                                <div>
                                    <input name='PSP' type="checkbox" id="PSP" />
                                    <label htmlFor="PSP">PSP.</label>
                                </div>
                                <div>
                                    <input name='PlayStation 2' type="checkbox" id="PlayStation 2" />
                                    <label htmlFor="PlayStation 2">PlayStation 2.</label>
                                </div>
                                <div>
                                    <input name='PlayStation 3' type="checkbox" id="PlayStation 3" />
                                    <label htmlFor="PlayStation 3">PlayStation 3.</label>
                                </div>
                                <div>
                                    <input name='PlayStation 4' type="checkbox" id="PlayStation 4" />
                                    <label htmlFor="PlayStation 4">PlayStation 4.</label>
                                </div>
                                <div>
                                    <input name='PlayStation 5' type="checkbox" id="PlayStation 5" />
                                    <label htmlFor="PlayStation 5">PlayStation 5.</label>
                                </div>
                                <div>
                                    <input name='Web' type="checkbox" id="Web" />
                                    <label htmlFor="Web">Web.</label>
                                </div>
                                <div>
                                    <input name='Wii U' type="checkbox" id="Wii U" />
                                    <label htmlFor="Wii U">Wii U.</label>
                                </div>
                                <div>
                                    <input name='Xbox' type="checkbox" id="Xbox" />
                                    <label htmlFor="Xbox">Xbox.</label>
                                </div>
                                <div>
                                    <input name='Xbox 360' type="checkbox" id="Xbox 360" />
                                    <label htmlFor="Xbox 360">Xbox 360.</label>
                                </div>
                                <div>
                                    <input name='Xbox One' type="checkbox" id="Xbox One" />
                                    <label htmlFor="Xbox One">Xbox One.</label>
                                </div>
                                <div>
                                    <input name='Xbox Series S/X' type="checkbox" id="Xbox Series S/X" />
                                    <label htmlFor="Xbox Series S/X">Xbox Series S/X.</label>
                                </div>
                                <div>
                                    <input name='iOS' type="checkbox" id="iOS" />
                                    <label htmlFor="iOS">iOS.</label>
                                </div>
                                <div>
                                    <input name='macOS' type="checkbox" id="macOS" />
                                    <label htmlFor="macOS">macOS.</label>
                                </div>
                                </>)}
                                
                            </div>
                            <br />
                            <div className="div-but-form">
                            <button type='submit'><strong>Create</strong></button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}
const mapStateToProps = (state) => {
    return {
        allPlatforms: state.platforms,
        allGenres: state.genres,
        wasCreated: state.created
    }
}
export default connect(mapStateToProps,{createGame,getPlatforms,cleanGames,getGenres})(NewGame)
