
import { NavLink } from 'react-router-dom';

function NavBar() {
    return (
        <nav>
            <NavLink to='/' >🔄 Counter</NavLink>
            <NavLink to='/search' >🔎 NASA Assets</NavLink>
        </nav>
    )
}

export default NavBar;