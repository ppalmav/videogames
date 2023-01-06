import { Link } from 'react-router-dom';
import './landingpage.css'
// import imagen from '../../img/landingimg.png'

export default function Landingpage() {

  return (
      <div className='titulo'>
            <div className='btnIngresar'>
              <Link to="/home">
                <button id='ingresar'>
                  Ingresar
                </button>
              </Link>
            </div>
            {/* <div className="landing-img">
               <img src={imagen} alt="imagen de landing"></img>
            </div> */}
        </div>
  );
}