import { NavLink } from 'react-router-dom'
import './NavBar.css'

export default function NavBar(){
    return (
        <nav>
            <span><NavLink to='/'>Éditeur</NavLink></span>
        </nav>
    );
};