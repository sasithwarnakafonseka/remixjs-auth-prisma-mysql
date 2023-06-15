import { Link, NavLink } from '@remix-run/react';

function MainNavigation() {
    return (
        <nav id="main-navigation">
            <div className='logo'>
                <ul>
                    <li className="nav-item">
                        <Link to="/">Logo</Link>
                    </li>
                </ul>
            </div>
            <div className='nav'>
                <ul className="dropdown-custom">
                    <li className="nav-item">
                        <NavLink to="/">Home</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/pricing">My Pricing</NavLink>
                    </li>
                    <li className="nav-item">
                        <div className="btn-group">
                            <NavLink to="/login" className="btn btn-primary active">Login</NavLink>
                            <NavLink to="/register" className="btn btn-primary">Register</NavLink>
                        </div>
                    </li>
                </ul>

            </div>

        </nav>
    );
}

export default MainNavigation;