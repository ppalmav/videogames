// import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Landing from '../components/LandingPage/landingpage';
// import Home from '../components/Home/Home'
import Videogames from '../components/Videogames/Videogames';
import NewGame from '../components/NewGame/NewGame';
import GameDetail from '../components/Videogames/Videogame/GameDetail/GameDetail';
import Error404 from '../components/Error404/Error404';

function App() {
  return (
    <BrowserRouter>
          <Switch>
          <Route exact path="/" component={Landing} />
          {/* <Route exact path = '/home' component = {Home} /> */}
          <Route exact path = '/home' component = {Videogames} />
          <Route exact path = '/videogame/:idVideogame' component = {GameDetail} />
          <Route exact path = '/newgame' component = {NewGame} />
          <Route path ='*' component={Error404} />
          </Switch>
      </BrowserRouter>
  );
}

export default App;
