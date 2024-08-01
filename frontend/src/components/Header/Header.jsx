import './Header.css';
import {NavLink} from "react-router-dom";

function Header({user}) {
    return (
        <header className="header">
            <NavLink to="/" className="header__logo"></NavLink>
            <NavLink className="header__profile-link" to="/profile">{user.email}</NavLink>
        </header>
    );
}

export default Header;